import { describe, expect, it, test } from "vitest";
import { interpret, type InterpreterOptions } from ".";
import {
  AccessNonExistingVariableError,
  ArrayAccessNotArrayError,
  ConditionNotBooleanError,
  ForRangeNotNumberError,
  InvalidArrayIndexError,
  OperationValueTypeMismatchError,
} from "./error";

async function output(code: string, options: Partial<InterpreterOptions> = {}) {
  const out = [] as string[];
  await interpret(`output ${code}`, {
    outputFunction: (s) => out.push(s),
    ...options,
  });
  return out[0];
}

async function outputOf(
  code: string,
  options: Partial<InterpreterOptions> = {},
) {
  const out = [] as string[];
  await interpret(code, { outputFunction: (s) => out.push(s), ...options });
  return out;
}

async function running(
  code: string,
  options: Partial<InterpreterOptions> = {},
) {
  await interpret(code, options);
}

describe("parse literals", () => {
  describe("string", () => {
    test.for([
      [`'hello'`, "hello"],
      [`"hello"`, "hello"],
      [`'HeLLo'`, "HeLLo"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("number", () => {
    test.for([
      [`1`, "1"],
      [`-1`, "-1"],
      [`11.1`, "11.1"],
      [`-11.11`, "-11.11"],
      [`.1`, "0.1"],
      [`-.11`, "-0.11"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("boolean", () => {
    test.for([
      [`true`, "true"],
      [`True`, "true"],
      [`TRUE`, "true"],
      [`false`, "false"],
      [`False`, "false"],
      [`FALSE`, "false"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("array", () => {
    test.for([
      [`[]`, "[]"],
      [`[1, 2, 3]`, "[1,2,3]"],
      [`[1, 'a', true]`, "[1,a,true]"],
      [`[[1, 2], [3, 4]]`, "[[1,2],[3,4]]"],
      [`[[1, [ 2, true], 'a'], [3, 4]]`, "[[1,[2,true],a],[3,4]]"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
});

describe("variables", () => {
  it("should assign variable", async () => {
    const code = ["A <- 1", "output A"].join("\n");
    expect(await outputOf(code)).toStrictEqual(["1"]);
  });
  it("should throw if access non-existing variable", async () => {
    const code = ["output A"].join("\n");
    await expect(() => running(code)).rejects.toThrow(
      AccessNonExistingVariableError,
    );
  });
  it("should have correct scope in strict scope mode", async () => {
    const code = ["A <- 1", "if true", "  B <- 2", "output B"].join("\n");
    await expect(() =>
      outputOf(code, { strictVariableScope: true }),
    ).rejects.toThrow(AccessNonExistingVariableError);
  });
});

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
  ])("%s -> %s", async ([a, b]) => {
    expect(await output(a!)).toBe(b);
  });
});

describe("io statements", () => {
  it("should output correctly", async () => {
    const code = ["output 1", "output 2"].join("\n");
    expect(await outputOf(code)).toStrictEqual(["1", "2"]);
  });
  it("should input correctly", async () => {
    const code = ["input A", "output A"].join("\n");
    const inputs = ["1", "2"];
    let i = 0;
    await interpret(code, {
      inputFunction: () => Promise.resolve(inputs[i++]),
      outputFunction: (s) => expect(s).toBe(inputs[i - 1]),
    });
  });
});

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
      [
        `3/(19%(9+2))/2^(5-2*(4+7))%7+(2)`,
        `${((3 / (19 % (9 + 2)) / 2 ** (5 - 2 * (4 + 7))) % 7) + 2}`,
      ],
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
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("should not evaluate operation with wrong value type", () => {
    test.for([
      "not 1",
      "1 and 1",
      "1 or 'abc'",
      "'a' + 9",
      "'a' * 9",
      "true ^ 2",
      "true > 2",
      "true > false",
    ])("%s", async (c) => {
      await expect(() => running(c)).rejects.toThrow(
        OperationValueTypeMismatchError,
      );
    });
  });
  describe("should smart casting during evaluation", () => {
    test.for([
      [`"1"+1`, "2"],
      [`2+"0.2"`, "2.2"],
      [`"true" and true`, "true"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
});

describe("1D arrays", () => {
  it("should assign array to variable", async () => {
    const code = ["A <- [1, 2, 3]", "output A"].join("\n");
    expect(await outputOf(code)).toStrictEqual(["[1,2,3]"]);
  });
  describe("should access element of an array literal correctly", () => {
    test.for([
      ["[0,2,1][1]", "0"],
      ["[1,2,3,4,5][2]", "2"],
      ["[1,2,5,6,7][4]", "6"],
      ["[1,2,5,6,7][4]", "6"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  it("should access element of an array variable correctly", async () => {
    const code = ["A <- [1,2,3,4]", "output A[1]"].join("\n");
    expect(await outputOf(code)).toStrictEqual(["1"]);
  });
  it("should assign to an element of an array variable correctly", async () => {
    const code = ["A <- [1,2,3,4]", "A[2] <- 9", "output A"].join("\n");
    expect(await outputOf(code)).toStrictEqual(["[1,9,3,4]"]);
  });
  describe("should throw for bad array indices", () => {
    test.for(["[0,2,3][0]", "[0,2,3][4]", "[0,2,3][-1]"])("%s", async (c) => {
      await expect(() => output(c)).rejects.toThrow(InvalidArrayIndexError);
    });
    test.for([
      "[0,2,3][0.1]",
      "[0,2,3][-1.5]",
      "[0,2,3]['abc']",
      "[0,1,2][true]",
    ])("%s", async (c) => {
      await expect(() => output(c)).rejects.toThrow(InvalidArrayIndexError);
    });
  });
  describe("should throw if it is not even an array", () => {
    test.for(["'2'[0]", "true[4]", "2[-1]"])("%s", async (c) => {
      await expect(() => output(c)).rejects.toThrow(ArrayAccessNotArrayError);
    });
  });
  describe("should be able to chain array access", () => {
    test.for([
      ["[1,[9,9.9],3][2][1]", "9"],
      ["[true, false, [9, 1]][3][1]", "9"],
    ])("%s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  it("should be able to iterate through an array", async () => {
    const code = [
      "A <- [10,9,8,7,6,5,4,3,2,1]",
      "for i from 1 to 10",
      "  output A[i]",
    ].join("\n");
    expect(await outputOf(code)).toStrictEqual([
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "1",
    ]);
  });
  it("should create an array implicitly when assigning to an index", async () => {
    const code = ["A[2] <- 2", "output A"].join("\n");
    expect(await outputOf(code)).toStrictEqual(["[,2]"]);
  });
  it("should extend an array implicitly when assigning to an index", async () => {
    const code = ["A <- [1,2]", "A[5] <- 5", "output A"].join("\n");
    expect(await outputOf(code)).toStrictEqual(["[1,2,,,5]"]);
  });
  it("should throw if assigning to an index of a non-array variable", async () => {
    const code = ["A <- 1", "A[2] <- 2"].join("\n");
    await expect(() => running(code)).rejects.toThrow(ArrayAccessNotArrayError);
  });
  it("should throw if assigning to an index that is not an integer", async () => {
    const code = ["A <- [1,2]", "A[2.5] <- 2"].join("\n");
    await expect(() => running(code)).rejects.toThrow(InvalidArrayIndexError);
  });
  it("should throw if assigning to an index that is out of bounds", async () => {
    const code = ["A <- [1,2]", "A[0] <- 2"].join("\n");
    await expect(() => running(code)).rejects.toThrow(InvalidArrayIndexError);
  });
});

describe("2D arrays", () => {
  it("should assign 2D array to variable", async () => {
    expect(
      await outputOf(["A <- [[1,2],[3,4]]", "output A"].join("\n")),
    ).toStrictEqual(["[[1,2],[3,4]]"]);
  });
  it("should access element of a 2D array variable correctly", async () => {
    expect(
      await outputOf(["A <- [[1,2],[3,4]]", "output A[1][2]"].join("\n")),
    ).toStrictEqual(["2"]);
    expect(
      await outputOf(["A <- [[1,2],[3,4]]", "output A[1,2]"].join("\n")),
    ).toStrictEqual(["2"]);
  });
  it("should assign to an element of a 2D array variable correctly", async () => {
    expect(
      await outputOf(
        ["A <- [[1,2],[3,4]]", "A[1][2] <- 9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[[1,9],[3,4]]"]);
    expect(
      await outputOf(
        ["A <- [[1,2],[3,4]]", "A[1,2] <- 9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[[1,9],[3,4]]"]);
  });
  it("should automatically create a 2D array when assigning to an index", async () => {
    expect(
      await outputOf(["A[1][2] <- 9", "output A"].join("\n")),
    ).toStrictEqual(["[[,9]]"]);
    expect(
      await outputOf(["A[1,2] <- 9", "output A"].join("\n")),
    ).toStrictEqual(["[[,9]]"]);
  });
  it("should automatically extend a 2D array when assigning to an index", async () => {
    expect(
      await outputOf(
        ["A <- [[1,2],[3,4,9]]", "A[4][4] <- 9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[[1,2],[3,4,9],,[,,,9]]"]);
    expect(
      await outputOf(
        ["A <- [[1,2],[3,4,9]]", "A[4,4] <- 9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[[1,2],[3,4,9],,[,,,9]]"]);
  });
  it("should create a 2D array when assigning to an index which is empty", async () => {
    expect(
      await outputOf(
        ["A <- [1]", "A[3] <- 9", "A[2][3]<-9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[1,[,,9],9]"]);
    expect(
      await outputOf(
        ["A <- [[1,2],[3,4,9]]", "A[4][4] <- 9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[[1,2],[3,4,9],,[,,,9]]"]);
    expect(
      await outputOf(
        ["A <- [[1,2],[3,4,9]]", "A[4,4] <- 9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[[1,2],[3,4,9],,[,,,9]]"]);
  });
  it("should create a 2D array when assigning to an index which is empty", async () => {
    expect(
      await outputOf(
        ["A <- [1]", "A[3] <- 9", "A[2][3]<-9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[1,[,,9],9]"]);
    expect(
      await outputOf(
        ["A <- [1]", "A[3] <- 9", "A[2,3]<-9", "output A"].join("\n"),
      ),
    ).toStrictEqual(["[1,[,,9],9]"]);
  });
});

describe("execute control flow statements", () => {
  describe("if statement", () => {
    it("should run if body when condition is true", async () => {
      const code = ["if 1=1", "  output 'A'", "else", "  output 'B'"].join(
        "\n",
      );
      expect(await outputOf(code)).toStrictEqual(["A"]);
    });
    it("should run else body when condition is false", async () => {
      const code = ["if 1=2", "  output 'A'", "else", "  output 'B'"].join(
        "\n",
      );
      expect(await outputOf(code)).toStrictEqual(["B"]);
    });
    it("should run if else body correctly", async () => {
      const code = [
        "if 1=2",
        "  output 'A'",
        "else if 1=3",
        "  output 'B'",
        "else if 1=1",
        "  output 'C'",
        "else",
        "  output 'D'",
      ].join("\n");
      expect(await outputOf(code)).toStrictEqual(["C"]);
    });
    it("should throw if condition is not boolean", async () => {
      const code = ["if 1", "  1"].join("\n");
      await expect(() => running(code)).rejects.toThrow(
        ConditionNotBooleanError,
      );
    });
  });
  describe("while loop", () => {
    it("should run while loop correctly", async () => {
      const code = [
        "A<-0",
        "while A < 4",
        "  output A",
        "  A<-A+1",
        "  output A",
        "output A",
      ].join("\n");
      expect(await outputOf(code)).toStrictEqual([
        "0",
        "1",
        "1",
        "2",
        "2",
        "3",
        "3",
        "4",
        "4",
      ]);
    });
    it("should throw if condition is not boolean", async () => {
      const code = ["while 1", "  1"].join("\n");
      await expect(() => running(code)).rejects.toThrow(
        ConditionNotBooleanError,
      );
    });
  });
  describe("do-while loop", () => {
    it("should run do-while loop correctly", async () => {
      const code = [
        "A<-0",
        "do",
        "  output A",
        "  A<-A+1",
        "  output A",
        "while A < 4",
        "output A",
      ].join("\n");
      expect(await outputOf(code)).toStrictEqual([
        "0",
        "1",
        "1",
        "2",
        "2",
        "3",
        "3",
        "4",
        "4",
      ]);
    });
    it("should throw if condition is not boolean", async () => {
      const code = ["do", "  1", "while 1"].join("\n");
      await expect(() => running(code)).rejects.toThrow(
        ConditionNotBooleanError,
      );
    });
  });
  describe("repeat-until loop", () => {
    it("should run repeat-until loop correctly", async () => {
      const code = [
        "A<-0",
        "repeat",
        "  output A",
        "  A<-A+1",
        "  output A",
        "until A >= 4",
        "output A",
      ].join("\n");
      expect(await outputOf(code)).toStrictEqual([
        "0",
        "1",
        "1",
        "2",
        "2",
        "3",
        "3",
        "4",
        "4",
      ]);
    });
    it("should throw if condition is not boolean", async () => {
      const code = ["repeat", "  1", "until 1"].join("\n");
      await expect(() => running(code)).rejects.toThrow(
        ConditionNotBooleanError,
      );
    });
  });
  describe("for loop", () => {
    it("should run ascending for loop correctly", async () => {
      const code = ["for i from 1 to 4", "  output i"].join("\n");
      expect(await outputOf(code)).toStrictEqual(["1", "2", "3", "4"]);
    });
    it("should run descending for loop correctly", async () => {
      const code = ["for i from 4 down to 1", "  output i"].join("\n");
      expect(await outputOf(code)).toStrictEqual(["4", "3", "2", "1"]);
    });
    it("should not run for loop body if start > end", async () => {
      const code = ["for i from 4 to 1", "  output i"].join("\n");
      expect(await outputOf(code)).toStrictEqual([]);
    });
    it("should delete for loop variable at the end", async () => {
      const code = ["for i from 4 to 1", "  1", "output i"].join("\n");
      await expect(() => running(code)).rejects.toThrow(
        AccessNonExistingVariableError,
      );
    });
    it("should throw if start/end is not number", async () => {
      const code = ["for i from 'a' to 'b'", "  1"].join("\n");
      await expect(() => running(code)).rejects.toThrow(ForRangeNotNumberError);
    });
  });

  it("should be able to nest", async () => {
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
      "          A <- A + 9",
    ].join("\n");
    expect(await outputOf(code)).toStrictEqual([
      "0",
      "30",
      "38",
      "68",
      "76",
      "106",
      "126",
      "0",
      "30",
      "38",
      "68",
      "76",
      "106",
      "126",
    ]);
  });
});

describe("error message", () => {
  it("should show correct error line col", async () => {
    const code = ["1", "2", "33333333", "44", "output ABC + 1", "4444"].join(
      "\n",
    );
    await expect(() => running(code)).rejects.toThrow("(at ln 5 col 7)");
  });

  it("should show correct error line col", async () => {
    const code = ["1", "2", "while 123 + 2", "  1"].join("\n");
    await expect(() => running(code)).rejects.toThrow(
      "(from ln 3 col 6 to ln 3 col 12)",
    );
  });
});

describe("interpreter options", () => {
  it("should be able to change array start index", async () => {
    const code = ["A <- [1,2,3]", "output A[1]"].join("\n");
    expect(await outputOf(code, { arrayStartIndex: 0 })).toStrictEqual(["2"]);
    expect(await outputOf(code, { arrayStartIndex: 1 })).toStrictEqual(["1"]);
  });

  it("should be able to change output function", async () => {
    const code = ["output 1", "output 2"].join("\n");
    const out: any[] = [];
    await interpret(code, { outputFunction: (s) => out.push(s) });
    expect(out).toStrictEqual(["1", "2"]);
  });

  it("should be able to change input function", async () => {
    const code = ["input A", "output A"].join("\n");
    const inputs = ["1", "2"];
    let i = 0;
    await interpret(code, {
      inputFunction: () => Promise.resolve(inputs[i++]),
      outputFunction: (s) => expect(s).toBe(inputs[i - 1]),
    });
  });

  it("should be able to use strict variable scope", async () => {
    const code = ["A <- 1", "if true", "  B <- 2", "output B"].join("\n");
    await expect(() =>
      outputOf(code, { strictVariableScope: true }),
    ).rejects.toThrow(AccessNonExistingVariableError);
    expect(await outputOf(code, { strictVariableScope: false })).toStrictEqual([
      "2",
    ]);
  });
});
