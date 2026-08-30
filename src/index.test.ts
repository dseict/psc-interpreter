import { describe, expect, it, test } from "vitest";
import {
  PSCAccessNonExistingVariableError,
  PSCArrayAccessNotArrayError,
  PSCConditionNotBooleanError,
  PSCForRangeNotIntegerError,
  PSCForVariableReuseError,
  PSCInvalidArrayIndexError,
  PSCOperationValueTypeMismatchError,
  PSCSyntaxError,
  PSCUnmatchedArgumentsError,
} from "./error";
import type { PSCVisitorOptions } from "./visitor";
import { PSCInterpreter } from ".";
import type { PSCEventParams, PSCEventType } from "./events";

async function outputOf(
  code: string[],
  options: Partial<PSCVisitorOptions> = {},
) {
  const out = [] as string[];
  const interpreter = new PSCInterpreter({
    outputFunction: (s) => out.push(s),
    ...options,
  });
  await interpreter.interpret(code.join("\n"));
  return out;
}

async function output(code: string, options: Partial<PSCVisitorOptions> = {}) {
  return (await outputOf([`output ${code}`], options))[0];
}

async function running(
  code: string | string[],
  options: Partial<PSCVisitorOptions> = {},
) {
  if (typeof code === "string") {
    code = [code];
  }
  await outputOf(code, options);
}

async function eventsEmitted(code: string[], eventTypes: PSCEventType[]) {
  const emittedEvents: [PSCEventType, PSCEventParams][] = [];
  const interpreter = new PSCInterpreter();
  for (const eventType of eventTypes) {
    interpreter.on(eventType, (params: PSCEventParams) => {
      emittedEvents.push([eventType, params]);
    });
  }
  return await interpreter.interpret(code.join("\n")).then(() => emittedEvents);
}

describe("lexing and parsing", () => {
  it("should parse code that ends with no newline", async () => {
    await expect(running("output 1")).resolves.not.toThrow();
  });
  it("should parse code that ends with a newline", async () => {
    await expect(running("output 1\n")).resolves.not.toThrow();
  });
  it("should only accept spaces as valid indentation", async () => {
    await expect(running(["if true", "  output 1"])).resolves.not.toThrow();
    await expect(running(["if true", "\toutput 1"])).rejects.toThrow(
      PSCSyntaxError,
    );
  });
  it("should only accept indentation that is a multiple of 2", async () => {
    await expect(running(["if true", "  output 1"])).resolves.not.toThrow();
    await expect(running(["if true", " output 1"])).rejects.toThrow(
      PSCSyntaxError,
    );
    await expect(running(["if true", "    output 1"])).rejects.toThrow(
      PSCSyntaxError,
    );
  });
});

describe("literals", () => {
  describe("strings", () => {
    test.for([
      [`'hello'`, `"hello"`],
      [`"hello"`, `"hello"`],
      [`'HeLLo'`, `"HeLLo"`],
      [`"'"`, `"'"`],
      [`'""'`, `""""`], // TODO: Should this be `'""'` instead of `""""`?
      [`""`, `""`],
      [`" "`, `" "`],
      [`'\\'`, `"\\"`],
      [`'\\n'`, `"\\n"`],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
    test.for([`"hello'`, `"hello'`, `""""`, `''''`])(
      "%s -> PSCSyntaxError",
      async (s) => {
        await expect(() => running(s)).rejects.toThrow(PSCSyntaxError);
      },
    );
  });
  describe("numbers", () => {
    test.for([
      [`1`, "1"],
      [`-1`, "-1"],
      ["00234", "234"],
      [`11.1`, "11.1"],
      [`-11.11`, "-11.11"],
      [`-.11`, "-0.11"],
      [`+.11`, "0.11"],
      ["0.0", "0"],
      [".0", "0"],
      [`.1`, "0.1"],
      [`-.1`, "-0.1"],
      [`42.`, "42"],
      ["--1", "1"],
      ["++1", "1"],
      ["-0", "0"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("booleans", () => {
    test.for([
      [`true`, "true"],
      [`True`, "true"],
      [`TRUE`, "true"],
      [`tRuE`, "true"],
      [`false`, "false"],
      [`False`, "false"],
      [`FALSE`, "false"],
      [`fAlSe`, "false"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("array", () => {
    test.for([
      [`[]`, "[]"],
      [`[ 1 ]`, "[1]"],
      [`[1, 2, 3]`, "[1,2,3]"],
      [`[1, 'a', true]`, `[1,"a",true]`],
      [`[[1, 2], [3, 4]]`, "[[1,2],[3,4]]"],
      [`[[1, [ 2, true], 'a'], [3, 4]]`, `[[1,[2,true],"a"],[3,4]]`],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("null", () => {
    test.for([`null`, `NULL`, `Null`, `nUlL`])("%s -> null", async (a) => {
      expect(await output(a!)).toBe("null");
    });
  });
});

describe("output of data types", () => {
  describe("strings", () => {
    test.for([
      [`'hello'`, `"hello"`],
      [`"hello"`, `"hello"`],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("numbers", () => {
    test.for([
      ["1", "1"],
      ["-1", "-1"],
      ["01", "1"],
      ["1.20", "1.2"],
      ["1.0", "1"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("booleans", () => {
    test.for([
      [`TRUE`, "true"],
      [`FALSE`, "false"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("arrays", () => {
    test.for([
      [`[  ] `, "[]"],
      [`[[1, [ 2, true], 'a'], [3, 'abc']]`, `[[1,[2,true],"a"],[3,"abc"]]`],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("null", () => {
    test.for([`NULL`, `Null`])("%s -> null", async (a) => {
      expect(await output(a!)).toBe("null");
    });
  });
});

describe("operators", () => {
  describe("smart casting", () => {
    test.for([
      [`"1"`, "1"],
      [`"-1"`, "-1"],
      [`"-0.1"`, "-0.1"],
      [`"-.1"`, "-0.1"],
      [`"-.0"`, "0"],
      [`"abc"`, `"abc"`],
      [`"true"`, `true`],
      [`"FaLsE"`, `false`],
      [`"nuLL"`, `null`],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("arithmetic", () => {
    test.for([
      ["1 + 2", "3"],
      ["2 - 1", "1"],
      ["2 * 2", "4"],
      ["9 / 3", "3"],
      ["2 ^ 4", "16"],
      ["2 ** 4", "16"],
      ["19 % 4", "3"],
      ["19 mod 4", "3"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
    test.for([
      "1 + true",
      "1 - 'a'",
      "true * true",
      "true / true",
      "1 % 'a'",
      "null mod 'a'",
      "false ^ 'a'",
      "true ** 'a'",
    ])("%s -> OperationValueTypeMismatchError", async (a) => {
      await expect(() => running(a)).rejects.toThrow(
        PSCOperationValueTypeMismatchError,
      );
    });
  });
  describe("comparison", () => {
    test.for([
      ["1 = 2", "false"],
      [`"a" = "a"`, "true"],
      ["true = true", "true"],
      ["null = null", "true"],
      [`"1" = 1`, "true"],
      [`"1" = 2`, "false"],
      ["1 <> 2", "true"],
      ["true <> false", "true"],
      ["null <> null", "false"],
      [`"1" <> 1`, "false"],
      [`"a" <> "b"`, "true"],
      [`"a" <> "A"`, "true"],
      [`2 > 1`, "true"],
      [`1 > 1`, "false"],
      [`0 > 1`, "false"],
      [`2 < 1`, "false"],
      [`1 < 1`, "false"],
      [`0 < 1`, "true"],
      [`2 >= 1`, "true"],
      [`1 >= 1`, "true"],
      [`0 >= 1`, "false"],
      [`2 <= 1`, "false"],
      [`1 <= 1`, "true"],
      [`0 <= 1`, "true"],
      [`"c" > "b"`, "true"],
      [`"a" < "c"`, "true"],
      [`"b" < "b"`, "false"],
      [`"cba" > "abc"`, "true"],
      [`"abd" > "abc"`, "true"],
      [`"c" >= "c"`, "true"],
      [`"d" >= "c"`, "true"],
      [`"c" <= "c"`, "true"],
      [`"d" <= "c"`, "false"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });

    test.for(["1 > true", "1 < 'a'", "true >= false", "true <= true"])(
      "%s -> OperationValueTypeMismatchError",
      async (a) => {
        await expect(() => running(a)).rejects.toThrow(
          PSCOperationValueTypeMismatchError,
        );
      },
    );
  });
  describe("logical", () => {
    test.for([
      ["true and true", "true"],
      ["true and false", "false"],
      ["false and true", "false"],
      ["false and false", "false"],
      ["true or true", "true"],
      ["true or false", "true"],
      ["false or true", "true"],
      ["false or false", "false"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
    test.for(["true and 1", "false or 'a'", "true or null", "1 or 2"])(
      "%s -> OperationValueTypeMismatchError",
      async (a) => {
        await expect(() => running(a)).rejects.toThrow(
          PSCOperationValueTypeMismatchError,
        );
      },
    );
  });
  describe("negation", () => {
    test.for([
      ["not true", "false"],
      ["not false", "true"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
    test.for(["not 1", "not 'a'", "not null"])(
      "%s -> OperationValueTypeMismatchError",
      async (a) => {
        await expect(() => running(a)).rejects.toThrow(
          PSCOperationValueTypeMismatchError,
        );
      },
    );
  });
  describe("unary", () => {
    test.for([
      ["-1", "-1"],
      ["+1", "1"],
      ["-+-1", "1"],
      [`-"1"`, "-1"],
      [`+"1"`, "1"],
      [`-+-"1"`, "1"],
      [`-"-1"`, "1"],
      [`+"-1"`, "-1"],
      [`-"-0"`, "0"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
    test.for(["-true", "+false", "-'a'", "+'b'"])(
      "%s -> OperationValueTypeMismatchError",
      async (a) => {
        await expect(() => running(a)).rejects.toThrow(
          PSCOperationValueTypeMismatchError,
        );
      },
    );
  });
  describe("group", () => {
    test.for([
      ["(1 + 2) * 3", "9"],
      ["1 + (2 * 3)", "7"],
      ["((1 + 2) * (3 + 4))", "21"],
      ["(true or false) and (false or true)", "true"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
  });
  describe("array access", () => {
    test.for([
      ["[1, 2, 3][1]", "1"],
      ["[1, 2, 3][2]", "2"],
      ["[1, 2, 3][3]", "3"],
      ["[[1, 2], [3, 4]][1][2]", "2"],
      ["[[1, 2], [3, 4]][1,2]", "2"],
      ["[[1, 2], [3, 4]][2][2]", "4"],
      ["[[1, 2], [3, 4]][2,2]", "4"],
      ["[[1, 2], [3, [3,4]]][2,2][2]", "4"],
    ])("%s -> %s", async ([a, b]) => {
      expect(await output(a!)).toBe(b);
    });
    test.for([
      "[1, 2, 3]['a']",
      "[1, 2, 3][0]",
      "[1, 2, 3][4]",
      "[[1, 2], [3, 4]][1,3]",
      "[[1, 2], [3, 4]][-1]",
      "[1,2,3][true]",
    ])("%s -> InvalidArrayIndexError", async (a) => {
      await expect(() => output(a)).rejects.toThrow(PSCInvalidArrayIndexError);
    });
    test.for(["[1, 2, 3][1,2]", "[1, 2, true][3,6]", "[null][1][1]"])(
      "%s -> ArrayAccessNotArrayError",
      async (a) => {
        await expect(() => output(a)).rejects.toThrow(
          PSCArrayAccessNotArrayError,
        );
      },
    );
  });
});

describe("variables", () => {
  it("can be assigned, reassigned and retrieved", async () => {
    await expect(
      outputOf(["A <- 1", "output A", "A <- 2", "output A"]),
    ).resolves.toStrictEqual(["1", "2"]);
  });
  it("accessing a non-existing variable throws AccessNonExistingVariableError", async () => {
    await expect(() => running("output A")).rejects.toThrow(
      PSCAccessNonExistingVariableError,
    );
  });
  describe("must be named with a valid identifier", async () => {
    test.for(["1A <- 1", "A- <- 1", "A B <- 1", "A$ <- 1"])(
      "%s -> PSCSyntaxError",
      async (a) => {
        await expect(() => running(a)).rejects.toThrow(PSCSyntaxError);
      },
    );
    test.for(["A <- 1", "_A <- 1", "A1 <- 1", "A_ <- 1", "A_B <- 1"])(
      "%s -> ok",
      async (a) => {
        await expect(() => running(a)).not.toThrow();
      },
    );
  });
});

describe("statements", () => {
  describe("if-else", () => {
    it("should execute the block based on the condition", async () => {
      const code = ["if x=1", "  output true"];
      await expect(outputOf(["x <- 1"].concat(code))).resolves.toStrictEqual([
        "true",
      ]);
      await expect(outputOf(["x <- 0"].concat(code))).resolves.toStrictEqual(
        [],
      );
    });
    it("should optionally accept an else block", async () => {
      const code = ["if x=1", "  output true", "else", "  output false"];
      await expect(outputOf(["x <- 1"].concat(code))).resolves.toStrictEqual([
        "true",
      ]);
      await expect(outputOf(["x <- 0"].concat(code))).resolves.toStrictEqual([
        "false",
      ]);
    });
    it("should optionally accept an else if block", async () => {
      const code = [
        "if x=1",
        "  output true",
        "else if x=2",
        "  output false",
        "else",
        "  output null",
      ];
      await expect(outputOf(["x <- 1"].concat(code))).resolves.toStrictEqual([
        "true",
      ]);
      await expect(outputOf(["x <- 2"].concat(code))).resolves.toStrictEqual([
        "false",
      ]);
      await expect(outputOf(["x <- 3"].concat(code))).resolves.toStrictEqual([
        "null",
      ]);
    });
    it("should throw ConditionNotBooleanError if the condition is not boolean", async () => {
      const code = ["if 1", "  output true"];
      await expect(() => running(code)).rejects.toThrow(
        PSCConditionNotBooleanError,
      );
    });
  });
  describe("while", () => {
    it("should execute the block while the condition is true", async () => {
      const code = ["x <- 0", "while x < 5", "  output x", "  x <- x + 1"];
      await expect(outputOf(code)).resolves.toStrictEqual([
        "0",
        "1",
        "2",
        "3",
        "4",
      ]);
    });
    it("should never execute the block if the condition is false", async () => {
      const code = ["x <- 5", "while x < 5", "  output x", "  x <- x + 1"];
      await expect(outputOf(code)).resolves.toStrictEqual([]);
    });
    it("should throw ConditionNotBooleanError if the condition is not boolean", async () => {
      const code = ["x <- 0", "while x", "  output x", "  x <- x + 1"];
      await expect(() => running(code)).rejects.toThrow(
        PSCConditionNotBooleanError,
      );
    });
  });

  describe("do-while", () => {
    it("should execute the block while the condition is true", async () => {
      const code = [
        "x <- 0",
        "do",
        "  output x",
        "  x <- x + 1",
        "while x < 5",
      ];
      await expect(outputOf(code)).resolves.toStrictEqual([
        "0",
        "1",
        "2",
        "3",
        "4",
      ]);
    });
    it("should execute the block at least once", async () => {
      const code = [
        "x <- 0",
        "do",
        "  output x",
        "  x <- x + 1",
        "while x > 5",
      ];
      await expect(outputOf(code)).resolves.toStrictEqual(["0"]);
    });
    it("should throw ConditionNotBooleanError if the condition is not boolean", async () => {
      const code = ["x <- 0", "do", "  output x", "  x <- x + 1", "while x"];
      await expect(() => running(code)).rejects.toThrow(
        PSCConditionNotBooleanError,
      );
    });
  });

  describe("repeat-until", () => {
    it("should execute the block until the condition is true", async () => {
      const code = [
        "x <- 0",
        "repeat",
        "  output x",
        "  x <- x + 1",
        "until x >= 5",
      ];
      await expect(outputOf(code)).resolves.toStrictEqual([
        "0",
        "1",
        "2",
        "3",
        "4",
      ]);
    });
    it("should execute the block at least once", async () => {
      const code = [
        "x <- 0",
        "repeat",
        "  output x",
        "  x <- x + 1",
        "until x <= 5",
      ];
      await expect(outputOf(code)).resolves.toStrictEqual(["0"]);
    });
    it("should throw ConditionNotBooleanError if the condition is not boolean", async () => {
      const code = [
        "x <- 0",
        "repeat",
        "  output x",
        "  x <- x + 1",
        "until x",
      ];
      await expect(() => running(code)).rejects.toThrow(
        PSCConditionNotBooleanError,
      );
    });
  });

  describe("for", () => {
    it("should execute the block for the specified range", async () => {
      const code = ["for i from 1 to 5", "  output i"];
      await expect(outputOf(code)).resolves.toStrictEqual([
        "1",
        "2",
        "3",
        "4",
        "5",
      ]);
    });
    it("should execute the block for the specified range in reverse", async () => {
      const code = ["for i from 5 down to 1", "  output i"];
      await expect(outputOf(code)).resolves.toStrictEqual([
        "5",
        "4",
        "3",
        "2",
        "1",
      ]);
    });
    it("should throw RangeNotNumberError if the range is not an integer", async () => {
      await expect(() =>
        running(["for i from 'a' to 5", "  output i"]),
      ).rejects.toThrow(PSCForRangeNotIntegerError);
      await expect(() =>
        running(["for i from 5 to 'a'", "  output i"]),
      ).rejects.toThrow(PSCForRangeNotIntegerError);
      await expect(() =>
        running(["for i from 1.2 to 4.3", "  output i"]),
      ).rejects.toThrow(PSCForRangeNotIntegerError);
    });
    it("should throw ForVariableReuseError if the loop variable is reused", async () => {
      await expect(() =>
        running(["for i from 1 to 5", "  for i from 1 to 5", "    output i"]),
      ).rejects.toThrow(PSCForVariableReuseError);
      await expect(() =>
        running(["i <- 1", "for i from 1 to 5", "  output i"]),
      ).rejects.toThrow(PSCForVariableReuseError);
    });
  });

  describe("io", () => {
    it("should output correctly", async () => {
      const code = ["output 1", "output 'hello'", "output true", "output null"];
      await expect(outputOf(code)).resolves.toStrictEqual([
        "1",
        '"hello"',
        "true",
        "null",
      ]);
    });
    it("should input correctly", async () => {
      const code = ["input x", "output x"];
      await expect(
        outputOf(code, { inputFunction: async () => "hello" }),
      ).resolves.toStrictEqual(['"hello"']);
    });
  });

  describe("assignments", () => {
    it("should assign and reassign variables correctly", async () => {
      const code = ["x <- 1", "output x", "x <- 2", "output x"];
      await expect(outputOf(code)).resolves.toStrictEqual(["1", "2"]);
    });
    it("should assign values to array elements correctly", async () => {
      const code = ["x <- [1, 2, 3]", "output x", "x[1] <- 4", "output x"];
      await expect(outputOf(code)).resolves.toStrictEqual([
        "[1,2,3]",
        "[4,2,3]",
      ]);
    });
    describe("array element assignment", () => {
      it("should implicitly create an array", async () => {
        const code = ["x[1] <- 1", "output x"];
        await expect(outputOf(code)).resolves.toStrictEqual(["[1]"]);
      });
      it("should implicitly extend an array", async () => {
        await expect(
          outputOf(["x <- [1]", "x[5] <- 3", "output x"]),
        ).resolves.toStrictEqual(["[1,,,,3]"]);
      });
      describe("should implicitly extend/create array if necessary automatically", () => {
        test.for([
          [["x[4,1,2] <- 4", "output x"], ["[,,,[[,4]]]"]],
          [["x <- [1,2]", "x[4] <- 4", "output x"], ["[1,2,,4]"]],
          [["x <- [1,[]]", "x[2][4] <- 2", "output x"], ["[1,[,,,2]]"]],
          [["x <- [1,[]]", "x[2,4] <- 2", "output x"], ["[1,[,,,2]]"]],
          [
            ["x <- [1,[]]", "x[2,4,2,2] <- 2", "output x"],
            ["[1,[,,,[,[,2]]]]"],
          ],
        ])("%s", async ([a, b]) => {
          await expect(outputOf(a!)).resolves.toStrictEqual(b);
        });
      });

      describe("should throw ArrayAccessNotArrayError if the variable is not an array", () => {
        test.for([
          ["x <- 1", "x[1] <- 2"],
          ["x <- [[12],'a']", "x[2][1] <- 2"],
          ["x <- [[12],'a']", "x[2,1] <- 2"],
        ])("%s", async ([a, b]) => {
          await expect(() => running([a!, b!])).rejects.toThrow(
            PSCArrayAccessNotArrayError,
          );
        });
      });
    });
  });
});

describe("subprograms", () => {
  it("can define a subprogram with no arguments and call it", async () => {
    const code = ["subprogram hello()", "  output 'hello'", "hello()"];
    await expect(outputOf(code)).resolves.toStrictEqual(['"hello"']);
  });
  it("can define a subprogram with multiple arguments and call it", async () => {
    const code = ["subprogram add(a, b)", "  return a + b", "output add(1, 2)"];
    await expect(outputOf(code)).resolves.toStrictEqual(["3"]);
  });
  it("can return a value from a subprogram", async () => {
    const code = ["subprogram add(a, b)", "  return a + b", "output add(1, 2)"];
    await expect(outputOf(code)).resolves.toStrictEqual(["3"]);
  });
  it("should return null if no return statement is executed in a subprogram", async () => {
    const code = ["subprogram add(a, b)", "  output a + b", "output add(1, 2)"];
    await expect(outputOf(code)).resolves.toStrictEqual(["3", "null"]);
  });
  it("must be defined before all statements", async () => {
    const code = ["output add(1, 2)", "subprogram add(a, b)", "  return a + b"];
    await expect(() => running(code)).rejects.toThrow(PSCSyntaxError);
  });
  it("should define a subprogram as a variable in the global scope", async () => {
    const code = [
      "subprogram add(a, b)",
      "  return a + b",
      "output add",
      "output add(1, 2)",
      "A[1] <- add",
      "output A[1](1, 2)",
      "A <- 1",
    ];
    await expect(outputOf(code)).resolves.toStrictEqual([
      "[Function]",
      "3",
      "3",
    ]);
    code.push("output A(1, 2)");
    await expect(() => running(code)).rejects.toThrow(
      PSCOperationValueTypeMismatchError,
    );
  });
  it("should throw AccessNonExistingVariableError if accessing local variables inside a subprogram from outside", async () => {
    const code = [
      "subprogram test()",
      "  x <- 2",
      "  y <- 1",
      "  output x",
      "x <- 1",
      "output x",
      "test()",
      "output x",
    ];
    await expect(outputOf(code)).resolves.toStrictEqual(["1", "2", "2"]);
    code.push("output y");
    await expect(() => running(code)).rejects.toThrow(
      PSCAccessNonExistingVariableError,
    );
  });
  it("should throw OperationValueTypeMismatchError if a non-function is called as a function", async () => {
    const code = ["x <- 1", "output x()"];
    await expect(() => running(code)).rejects.toThrow(
      PSCOperationValueTypeMismatchError,
    );
  });
  it("should throw UnmatchedArgumentsError if a function is called with the wrong number of arguments", async () => {
    const code = ["subprogram test(a)", "  return a", "output test()"];
    await expect(() => running(code)).rejects.toThrow(
      PSCUnmatchedArgumentsError,
    );
  });
});

describe("options", () => {
  describe("strictVariableScope", () => {
    it("should have correct scope if strictVariableScope is enabled", async () => {
      const code = [
        "x <- 1",
        "if true",
        "  output x",
        "  x <- 2",
        "  y <- 3",
        "  output x",
        "  output y",
        "output x",
      ];
      await expect(
        outputOf(code, { strictVariableScope: true }),
      ).resolves.toStrictEqual(["1", "2", "3", "2"]);
      code.push("output y");
      await expect(() =>
        running(code, { strictVariableScope: true }),
      ).rejects.toThrow(PSCAccessNonExistingVariableError);
    });
    it("should have correct scope if strictVariableScope is disabled", async () => {
      const code = [
        "x <- 1",
        "if true",
        "  output x",
        "  x <- 2",
        "  y <- 3",
        "  output x",
        "  output y",
        "output x",
        "output y",
      ];
      await expect(
        outputOf(code, { strictVariableScope: false }),
      ).resolves.toStrictEqual(["1", "2", "3", "2", "3"]);
    });
  });
  describe("arrayStartIndex", () => {
    it("should have correct array starting index if arrayStartIndex is set", async () => {
      const code = [
        "arr <- [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        "output arr[3]",
        "output arr[4]",
        "output arr[5]",
      ];
      await expect(
        outputOf(code, { arrayStartIndex: 0 }),
      ).resolves.toStrictEqual(["4", "5", "6"]);
      await expect(
        outputOf(code, { arrayStartIndex: 1 }),
      ).resolves.toStrictEqual(["3", "4", "5"]);
      await expect(
        outputOf(code, { arrayStartIndex: 2 }),
      ).resolves.toStrictEqual(["2", "3", "4"]);
    });
  });
});

describe("comments", () => {
  it("should ignore comments", async () => {
    const code = [
      "x <- 1 # This is a comment",
      "output x # This is another comment",
      "# This is a full line comment",
      "y <- 2",
      "output y",
    ];
    await expect(outputOf(code)).resolves.toStrictEqual(["1", "2"]);
    await expect(
      outputOf(code.map((x) => x.replace("#", "//"))),
    ).resolves.toStrictEqual(["1", "2"]);
  });
});

describe("event handlers", () => {
  it("should emit a pre and post event for each statement executed", async () => {
    const code = [
      "x <- 1",
      "output x",
      "if true",
      "  output 'hello'",
      "else",
      "  output 'world'",
    ];
    await expect(
      eventsEmitted(code, ["pre_exec_stmt", "post_exec_stmt"]),
    ).resolves.toStrictEqual([
      [
        "pre_exec_stmt",
        {
          startLine: 1,
          endLine: 1,
          startCol: 0,
          endCol: 5,
          stmtType: "asmStmt",
        },
      ],
      [
        "post_exec_stmt",
        {
          startLine: 1,
          endLine: 1,
          startCol: 0,
          endCol: 5,
          stmtType: "asmStmt",
        },
      ],
      [
        "pre_exec_stmt",
        {
          startLine: 2,
          endLine: 2,
          startCol: 0,
          endCol: 7,
          stmtType: "outputStmt",
        },
      ],
      [
        "post_exec_stmt",
        {
          startLine: 2,
          endLine: 2,
          startCol: 0,
          endCol: 7,
          stmtType: "outputStmt",
        },
      ],
      [
        "pre_exec_stmt",
        {
          startLine: 3,
          endLine: 6,
          startCol: 0,
          endCol: 16, // DEDENT token takes 1 width
          stmtType: "ifStmt",
        },
      ],
      [
        "pre_exec_stmt",
        {
          startLine: 4,
          endLine: 4,
          startCol: 2,
          endCol: 15,
          stmtType: "outputStmt",
        },
      ],
      [
        "post_exec_stmt",
        {
          startLine: 4,
          endLine: 4,
          startCol: 2,
          endCol: 15,
          stmtType: "outputStmt",
        },
      ],
      [
        "post_exec_stmt",
        {
          startLine: 3,
          endLine: 6,
          startCol: 0,
          endCol: 16, // DEDENT token takes 1 width
          stmtType: "ifStmt",
        },
      ],
    ]);
  });
  it("should emit a pre and post event for each while condition check", async () => {
    const code = ["x <- 0", "while x < 3", "  output x", "  x <- x + 1"];
    await expect(
      eventsEmitted(code, ["pre_while_condition", "post_while_condition"]),
    ).resolves.toStrictEqual(
      [true, true, true, false].flatMap((c) => [
        [
          "pre_while_condition",
          {
            startLine: 2,
            endLine: 2,
            startCol: 0,
            endCol: 10,
          },
        ],
        [
          "post_while_condition",
          {
            startLine: 2,
            endLine: 2,
            startCol: 0,
            endCol: 10,
            shouldContinue: c,
          },
        ],
      ]),
    );
  });
  it("should emit a pre and post event for each do-while condition check", async () => {
    const code = ["x <- 0", "do", "  output x", "  x <- x + 1", "while x < 3"];
    await expect(
      eventsEmitted(code, [
        "pre_do_while_condition",
        "post_do_while_condition",
      ]),
    ).resolves.toStrictEqual(
      [true, true, false].flatMap((c) => [
        [
          "pre_do_while_condition",
          {
            startLine: 5,
            endLine: 5,
            startCol: 0,
            endCol: 10,
          },
        ],
        [
          "post_do_while_condition",
          {
            startLine: 5,
            endLine: 5,
            startCol: 0,
            endCol: 10,
            shouldContinue: c,
          },
        ],
      ]),
    );
  });
  it("should emit a pre and post event for each repeat-until condition check", async () => {
    const code = [
      "x <- 0",
      "repeat",
      "  output x",
      "  x <- x + 1",
      "until x >= 3",
    ];
    await expect(
      eventsEmitted(code, [
        "pre_repeat_until_condition",
        "post_repeat_until_condition",
      ]),
    ).resolves.toStrictEqual(
      [true, true, false].flatMap((c) => [
        [
          "pre_repeat_until_condition",
          {
            startLine: 5,
            endLine: 5,
            startCol: 0,
            endCol: 11,
          },
        ],
        [
          "post_repeat_until_condition",
          {
            startLine: 5,
            endLine: 5,
            startCol: 0,
            endCol: 11,
            shouldContinue: c,
          },
        ],
      ]),
    );
  });
  it("should emit a variable change event for each for-loop iteration", async () => {
    const code = ["for i from 1 to 3", "  output i"];
    await expect(
      eventsEmitted(code, ["for_variable_change"]),
    ).resolves.toStrictEqual(
      [
        [undefined, 1],
        [1, 2],
        [2, 3],
      ].map(([prev, next]) => [
        "for_variable_change",
        {
          startLine: 1,
          endLine: 1,
          startCol: 0,
          endCol: 16,
          variableName: "i",
          oldValue: prev,
          newValue: next,
        },
      ]),
    );
  });
  it("should emit a pre and post event for each expression evaluation", async () => {
    const code = ["x <- 1", "output x +1"];
    await expect(
      eventsEmitted(code, ["pre_eval_expr", "post_eval_expr"]),
    ).resolves.toStrictEqual([
      [
        "pre_eval_expr",
        {
          startLine: 1,
          endLine: 1,
          startCol: 5,
          endCol: 5,
        },
      ],
      [
        "post_eval_expr",
        {
          startLine: 1,
          endLine: 1,
          startCol: 5,
          endCol: 5,
          result: 1,
        },
      ],
      [
        "pre_eval_expr",
        {
          startLine: 2,
          endLine: 2,
          startCol: 7,
          endCol: 10,
        },
      ],
      [
        "post_eval_expr",
        {
          startLine: 2,
          endLine: 2,
          startCol: 7,
          endCol: 10,
          result: 2,
        },
      ],
    ]);
  });
});
