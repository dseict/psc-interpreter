import { describe, expect, it, test } from 'vitest'
import { interpret, type InterpreterOptions } from '.'
import { AccessNonExistingVariableError, ArrayAccessNotArrayError, ArrayIndexNotIntegerError, ArrayIndexOutOfBoundsError, ConditionNotBooleanError, ForRangeNotNumberError, OperationValueTypeMismatchError } from './error'

function output(code: string, options?: InterpreterOptions) {
  const out = [] as string[]
  interpret(`output ${code}`, { outputFunction: (s) => out.push(s), ...options })
  return out[0]
}

function outputOf(code: string, options?: InterpreterOptions) {
  const out = [] as string[]
  interpret(code, { outputFunction: (s) => out.push(s), ...options })
  return out
}

function running(code: string, options?: InterpreterOptions) {
  interpret(code, options)
}

describe("parse literals", () => {
  describe("string", () => {
    test.for([
      [`'hello'`, "hello"],
      [`"hello"`, "hello"],
      [`'HeLLo'`, "HeLLo"],
    ])("%s -> %s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
  describe("number", () => {
    test.for([
      [`1`, "1"],
      [`-1`, "-1"],
      [`11.1`, "11.1"],
      [`-11.11`, "-11.11"],
      [`.1`, "0.1"],
      [`-.11`, "-0.11"],
    ])("%s -> %s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
  describe("boolean", () => {
    test.for([
      [`true`, "true"],
      [`True`, "true"],
      [`TRUE`, "true"],
      [`false`, "false"],
      [`False`, "false"],
      [`FALSE`, "false"],
    ])("%s -> %s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
  describe("array", () => {
    test.for([
      [`[]`, "[]"],
      [`[1, 2, 3]`, "[1,2,3]"],
      [`[1, 'a', true]`, "[1,a,true]"],
      [`[[1, 2], [3, 4]]`, "[[1,2],[3,4]]"],
      [`[[1, [ 2, true], 'a'], [3, 4]]`, "[[1,[2,true],a],[3,4]]"],
    ])("%s -> %s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
})

describe("variables", () => {
  it("should assign variable", () => {
    const code = [
      "A <- 1",
      "output A"
    ].join("\n")
    expect(outputOf(code)).toStrictEqual(["1"])
  })
  it("should throw if access non-existing variable", () => {
    const code = [
      "output A"
    ].join("\n")
    expect(() => running(code)).toThrow(AccessNonExistingVariableError)
  })
  it("should have correct scope in strict scope mode", () => {
    const code = [
      "A <- 1",
      "if true",
      "  B <- 2",
      "output B"
    ].join("\n")
    expect(() => outputOf(code, { strictVariableScope: true })).toThrow(AccessNonExistingVariableError)
  })
})

describe("operator precedence", () => {
  test.for([
    ["true or false and false", "true"],
    ["false and false or true", "true"],
    ["2 + 2 > 5", "false"],
    ["2+4>2 or 9+9>2 and 9>1", "true"],
    ["1+2*2+2", "7"],
    ["2**4*2+2", "34"],
    ["-2+-2*-10", "18"],
    ["--2", "2"],
    ["+-2", "-2"],
    ["not false and not true", "false"],
    ["not false and not true or not false", "true"],
    ["not (false and true)", "true"],
  ])("%s -> %s", ([a, b]) => {
    expect(output(a!)).toBe(b)
  })
})

describe("evaluate expression", () => {
  describe("should evaluate expression correctly", () => {
    test.for([
      [`1 + 2`, "3"],
      [`2 - 1`, "1"],
      [`2 * 2`, "4"],
      [`9 / 3`, "3"],
      [`2 ^ 4`, "16"],
      [`2 ** 4`, "16"],
      [`19 % 4`, "3"],
      [`3/(19%(9+2))/2^(5-2*(4+7))%7+(2)`, `${3 / (19 % (9 + 2)) / 2 ** (5 - 2 * (4 + 7)) % 7 + (2)}`],
      ["true and true", "true"],
      ["true and false", "false"],
      ["false and false", "false"],
      ["true or true", "true"],
      ["false or false", "false"],
      ["true or false", "true"],
      ["not true", "false"],
      ["not false", "true"],
      ["1 < 2", "true"],
      ["1 > 2", "false"],
      ["1 <= 2", "true"],
      ["1 >= 2", "false"],
      ["1 = 2", "false"],
      ["1 <> 2", "true"],
    ])("%s -> %s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
  describe("should not evaluate operation with wrong value type", () => {
    test.for([
      "not 1", "1 and 1", "1 or 'abc'", "'a' + 9", "'a' * 9", "true ^ 2", "true > 2", "true > false"
    ])("%s", (c) => {
      expect(() => running(c)).toThrow(OperationValueTypeMismatchError)
    })
  }
  )
  describe("should smart casting during evaluation", () => {
    test.for([
      [`"1"+1`, "2"],
      [`2+"0.2"`, "2.2"],
      [`"true" and true`, "true"]
    ])("%s -> %s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
})

describe("arrays", () => {
  it("should assign array to variable", () => {
    const code = [
      "A <- [1, 2, 3]",
      "output A"
    ].join("\n")
    expect(outputOf(code)).toStrictEqual(["[1,2,3]"])
  })
  describe("should access element of an array literal correctly", () => {
    test.for([
      ["[0,2,1][1]", "0"],
      ["[1,2,3,4,5][2]", "2"],
      ["[1,2,5,6,7][4]", "6"],
      ["[1,2,5,6,7][4]", "6"],
    ])("%s -> %s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
  it("should access element of an array variable correctly", () => {
    const code = [
      "A <- [1,2,3,4]",
      "output A[1]"
    ].join("\n")
    expect(outputOf(code)).toStrictEqual(["1"])
  })
  describe("should throw for bad array indices", () => {
    test.for([
      "[0,2,3][0]", "[0,2,3][4]", "[0,2,3][-1]"
    ])("%s", (c) => {
      expect(() => output(c)).toThrow(ArrayIndexOutOfBoundsError)
    })
    test.for([
      "[0,2,3][0.1]", "[0,2,3][-1.5]", "[0,2,3]['abc']", "[0,1,2][true]"
    ])("%s", (c) => {
      expect(() => output(c)).toThrow(ArrayIndexNotIntegerError)
    })
  })
  describe("should throw if it is not even an array", () => {
    test.for([
      "'2'[0]", "true[4]", "2[-1]"
    ])("%s", (c) => {
      expect(() => output(c)).toThrow(ArrayAccessNotArrayError)
    })
  })
  describe("should be able to chain array access", () => {
    test.for([
      ["[1,[9,9.9],3][2][1]", "9"],
      ["[true, false, [9, 1]][3][1]", "9"]
    ])("%s", ([a, b]) => {
      expect(output(a!)).toBe(b)
    })
  })
  it("should be able to iterate through an array", () => {
    const code = [
      "A <- [10,9,8,7,6,5,4,3,2,1]",
      "for i from 1 to 10",
      "  output A[i]"
    ].join("\n")
    expect(outputOf(code)).toStrictEqual(["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"])
  })
})

describe("execute control flow statements", () => {
  describe("if statement", () => {
    it("should run if body when condition is true", () => {
      const code = [
        "if 1=1",
        "  output 'A'",
        "else",
        "  output 'B'"
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["A"])
    })
    it("should run else body when condition is false", () => {
      const code = [
        "if 1=2",
        "  output 'A'",
        "else",
        "  output 'B'"
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["B"])
    })
    it("should run if else body correctly", () => {
      const code = [
        "if 1=2",
        "  output 'A'",
        "else if 1=3",
        "  output 'B'",
        "else if 1=1",
        "  output 'C'",
        "else",
        "  output 'D'"
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["C"])
    })
    it("should throw if condition is not boolean", () => {
      const code = [
        "if 1",
        "  1"
      ].join("\n")
      expect(() => running(code)).toThrow(ConditionNotBooleanError)
    })
  })
  describe("while loop", () => {
    it("should run while loop correctly", () => {
      const code = [
        "A<-0",
        "while A < 4",
        "  output A",
        "  A<-A+1",
        "  output A",
        "output A"
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["0", "1", "1", "2", "2", "3", "3", "4", "4"])
    })
    it("should throw if condition is not boolean", () => {
      const code = [
        "while 1",
        "  1"
      ].join("\n")
      expect(() => running(code)).toThrow(ConditionNotBooleanError)
    })
  })
  describe("do-while loop", () => {
    it("should run do-while loop correctly", () => {
      const code = [
        "A<-0",
        "do",
        "  output A",
        "  A<-A+1",
        "  output A",
        "while A < 4",
        "output A"
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["0", "1", "1", "2", "2", "3", "3", "4", "4"])
    })
    it("should throw if condition is not boolean", () => {
      const code = [
        "do",
        "  1",
        "while 1"
      ].join("\n")
      expect(() => running(code)).toThrow(ConditionNotBooleanError)
    })
  })
  describe("repeat-until loop", () => {
    it("should run repeat-until loop correctly", () => {
      const code = [
        "A<-0",
        "repeat",
        "  output A",
        "  A<-A+1",
        "  output A",
        "until A >= 4",
        "output A"
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["0", "1", "1", "2", "2", "3", "3", "4", "4"])
    })
    it("should throw if condition is not boolean", () => {
      const code = [
        "repeat",
        "  1",
        "until 1"
      ].join("\n")
      expect(() => running(code)).toThrow(ConditionNotBooleanError)
    })
  })
  describe("for loop", () => {
    it("should run ascending for loop correctly", () => {
      const code = [
        "for i from 1 to 4",
        "  output i",
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["1", "2", "3", "4"])
    })
    it("should run descending for loop correctly", () => {
      const code = [
        "for i from 4 down to 1",
        "  output i",
      ].join("\n")
      expect(outputOf(code)).toStrictEqual(["4", "3", "2", "1"])
    })
    it("should not run for loop body if start > end", () => {
      const code = [
        "for i from 4 to 1",
        "  output i",
      ].join("\n")
      expect(outputOf(code)).toStrictEqual([])
    })
    it("should delete for loop variable at the end", () => {
      const code = [
        "for i from 4 to 1",
        "  1",
        "output i"
      ].join("\n")
      expect(() => running(code)).toThrow(AccessNonExistingVariableError)
    })
    it("should throw if start/end is not number", () => {
      const code = [
        "for i from 'a' to 'b'",
        "  1"
      ].join("\n")
      expect(() => running(code)).toThrow(ForRangeNotNumberError)
    })
  })


  it("should be able to nest", () => {
    const code = [
      "for i from 1 to 2",
      "  A <- 0",
      "  while A < 100",
      "    output A",
      "    if 1=1",
      "      A <- A + 10",
      "      if false",
      "        1",
      "      do",
      "        A <- A + 20",
      "        output A",
      "      while A % 3 = 1",
      "      if false",
      "        1",
      "      if true",
      "        A <- A - 1",
      "        if true",
      "          A <- A + 9"
    ].join("\n")
    expect(outputOf(code)).toStrictEqual(["0", "30", "38", "68", "76", "106", "126", "0", "30", "38", "68", "76", "106", "126"])
  })
})

describe("error message", () => {
  it("should show correct error line col", () => {
    const code = [
      "1",
      "2",
      "33333333",
      "44",
      "output ABC + 1",
      "4444"
    ].join("\n")
    expect(() => running(code)).toThrow("\(at ln 5 col 7\)")
  })

  it("should show correct error line col", () => {
    const code = [
      "1",
      "2",
      "while 123 + 2",
      "  1"
    ].join("\n")
    expect(() => running(code)).toThrow("\(from ln 3 col 6 to ln 3 col 12\)")
  })
})