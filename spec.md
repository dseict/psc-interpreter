# Program

A program consists of 2 parts:

- Subprogram definitions
- Main statements

Main statements must come after subprogram definitions.

# Comments

Comments are used to add explanatory notes to the code. They are ignored by the interpreter.

Comments are represented by text after a `#` or `//` symbol, and continue until the end of the line.

For example:

```psc
# This is a comment
// This is also a comment
output "Hello, World!" # This is a comment after a statement
```

# Data types

## String

A string is a sequence of characters.

### String literal

String literals are represented by text enclosed in a pair of single quotes (`'`) or double quotes (`"`).

For example:

```psc
"egg" // valid
'egg" // invalid
"" // valid
```

String literals are parsed strictly as is, meaning escape sequences are not interpreted.

For example:

```psc
"\n" // interpreted as "\n" instead of a newline character
"\\" // interpreted as "\\" instead of a single backslash
```

### Output of strings

Strings are output as is, enclosed in a pair of double quotes (`"`). Escape sequences are not interpreted.

### Smart Casting of strings

A string is automatically converted to a number, boolean, or null value.

Smart casting is done as follows:

- If a string matches the following:
  - `"true"` (case-insensitive)
    - Parsed as a boolean `true`
  - `"false"` (case-insensitive)
    - Parsed as a boolean `false`
  - `"null"` (case-insensitive)
    - Parsed as a `null` value
  - If the string matches `/^-?\d*(\.\d+)?$/` and it is not an empty string, then it is parsed as a number using JavaScript's `Number()` function.

## Number

A number is a numeric value that can be either an integer or a floating-point number.

### Number literals

Number literals are represented in two formats:

- Integer literals: Non-negative base-10 integers (e.g., `0`, `1`, `42`).
- Floating-point literals: Non-negative base-10 decimal numbers (e.g., `3.14`, `0.001`, `2.0`).

Leading and trailing zeros are allowed and ignored.

For example:

```psc
1 // valid
5.5 // valid
1.0 // valid
001 // interpreted as 1

```

Number literals can be further modified by the unary operators `+` and `-` to indicate positive or negative values, respectively.

### Output of numbers

Numbers are output in base-10 decimal format without leading or trailing zeros, and without a decimal point for integers.

Negative numbers are output with a leading `-` sign.

## Boolean

A boolean is a logical value that can be either true or false.

### Boolean literals

Boolean literals are represented by the keywords `true` and `false`, which are case-insensitive.

For example:

```psc
true // valid
FALSE // valid
TruE // valid
FaLsE // valid
```

### Output of booleans

Booleans are output in lowercase as `true` or `false`.

## Array

An array is an ordered collection of values, which can be of any data type.

### Starting index

By default, array indexing is 1-based, meaning the first element of the array is at index 1. The starting index can be set using the option `arrayStartIndex`

### Accessing elements

Array elements are accessed using the array access operator.

### Array literals

Array literals are represented by a comma-separated list of literals or expressions, enclosed in a pair of square brackets (`[ ]`).

For example:

```psc
[] // empty array
[1, 2, 3] // valid
["hello", "world"] // valid
[A+1, B, "hello"] // where A and B are variables
```

### Output of arrays

Arrays are output as a comma-separated list of values, enclosed in a pair of square brackets (`[ ]`), without any whitespace. Each value is output according to its data type.

## Null

### Null literals

Null literals are represented by the keyword `null`, which is case-insensitive.

### Output of null

Null is output as `null`.

## Undefined

Undefined is not a defined data type. It is a special value that represents the absence of a value. It is mainly used to represent array elements without a value.

### Output of undefined

Undefined does not produce any output.

For example:

```psc
A[3] <- 1
output A // outputs [,,1]
```

## Subprograms

Subprograms are special data types that represent a block of code that can be called with or without arguments and must return a value.

See more in the Subprograms section.

# Expression

Expressions are made up of literals, variables, function calls, and operators. They are evaluated to produce a value.

## Operators

Operators are symbols that perform operations on one or more operands in order to produce a new value.

If an operator is used on operands of incompatible types, an `OperationValueTypeMismatchError` is thrown.

## Arithmetic operators

### Addition operators (`+`)

An addition operator is used for performing addition on two numbers.

For example:

```psc
1 + 2 // evaluates to 3
"1" + "2" // evaluates to 3
2 + "2.0" // evaluates to 4
```

### Subtraction operators (`-`)

A subtraction operator is used for performing subtraction on two numbers.

For example:

```psc
5 - 2 // evaluates to 3
"5" - "2" // evaluates to 3
"5.0" - 2 // evaluates to 3
```

### Multiplication operators (`*`)

A multiplication operator is used for performing multiplication on two numbers.

For example:

```psc
2 * 3 // evaluates to 6
"2" * "3" // evaluates to 6
"2.0" * 3 // evaluates to 6
```

### Division operators (`/`)

A division operator is used for performing division on two numbers.

For example:

```psc
6 / 2 // evaluates to 3
"6" / "2" // evaluates to 3
"6.0" / 2 // evaluates to 3
```

### Modulus operators (`%` / `mod`)

A modulus operator is used for performing modulus operation on two numbers.

For example:

```psc
5 % 2 // evaluates to 1
"5" mod "2" // evaluates to 1
"5.0" % 2 // evaluates to 1
```

### Exponentiation operators (`^` / `**`)

An exponentiation operator is used for performing exponentiation on two numbers.

For example:

```psc
2 ^ 3 // evaluates to 8
"2" ** "3" // evaluates to 8
"2.0" ^ 3 // evaluates to 8
```

## Comparison operators

### Equality operators (`=`)

An equality operator is used for comparing two values of any type for equality.

For example:

```psc
1 = 1 // evaluates to true
"hello" = "hello" // evaluates to true
1 = "1" // evaluates to true after smart casting
1 = 2 // evaluates to false
```

### Inequality operators (`<>`)

An inequality operator is used for comparing two values of any type for inequality.

For example:

```psc
1 <> 2 // evaluates to true
"hello" <> "world" // evaluates to true
1 <> "1" // evaluates to false after smart casting
```

### Greater than operators (`>`)

A greater than operator is used for comparing two values of either number type or string type for greater than relationship.

For example:

```psc
2 > 1 // evaluates to true
"b" > "a" // evaluates to true
"abc" > "cba" // evaluates to false
"2" > "1" // evaluates to true after smart casting
```

### Less than operators (`<`)

A less than operator is used for comparing two values of either number type or string type for less than relationship.

For example:

```psc
1 < 2 // evaluates to true
"a" < "b" // evaluates to true
"cba" < "abc" // evaluates to false
"1" < "2" // evaluates to true after smart casting
```

### Greater than or equal to operators (`>=`)

A greater than operator is used for comparing two values of either number type or string type for greater than or equal to relationship.

For example:

```psc
1 >= 1 // evaluates to true
"b" >= "a" // evaluates to true
"abc" >= "cba" // evaluates to false
"2" >= "1" // evaluates to true after smart casting
```

### Less than or equal to operators (`<=`)

A less than operator is used for comparing two values of either number type or string type for less than or equal to relationship.

For example:

```psc
1 <= 2 // evaluates to true
"a" <= "b" // evaluates to true
"cba" <= "abc" // evaluates to false
"1" <= "2" // evaluates to true after smart casting
```

## Logical AND operators (`and`)

A logical and operator is used for performing logical conjunction on two boolean values.

```psc
true and true // evaluates to true
true and false // evaluates to false
false and true // evaluates to false
false and false // evaluates to false
```

## Logical OR operators (`or`)

A logical or operator is used for performing logical disjunction on two boolean values.

```psc
true or true // evaluates to true
true or false // evaluates to true
false or true // evaluates to true
false or false // evaluates to false
```

## Logical NOT operators (`not`)

A negation operator is used for negating a boolean value.

```psc
not true // evaluates to false
not false // evaluates to true
```

## Unary operators

### Unary negation operators (`-`)

A unary negation operator is used for negating a number.

```psc
-1 // evaluates to -1
-"1" // evaluates to -1 after smart casting
--1 // evaluates to 1
```

### Unary positive operators (`+`)

A unary positive operator is used to explicitly indicate a positive number. It does not perform any operation on the value.

## Grouping operators (`(` and `)`)

A group operator is used to group expressions and control the order of evaluation. Expressions within parentheses are evaluated first, before any other operations outside the parentheses.

For example:

```psc
(1 + 2) * 3 // evaluates to 9
1 + (2 * 3) // evaluates to 7
```

## Array access operators (`[` and `]`)

An array access operator is placed after an array to access a specific element recursively by its comma-separated indices, which are enclosed in the square brackets. The index is 1-based by default.

For example:

```psc
// assuming 1-based indexing
[1, 2, 3][1] // evaluates to 1
["a", "b", "c"][2] // evaluates to "b"
[[1, 2], [3, 4]][2][1] // evaluates to 3
[[1, 2], [3, 4]][2, 1] // evaluates to 3
```

If the index is out of bounds or invalid, `InvalidArrayIndexError` is thrown.

If using the operator on a non-array value, an `ArrayAccessNotArrayError` is thrown.

## Subprogram call operators (`(` and `)`)

A subprogram call operator is placed after a subprogram name to call the subprogram. Inside the parentheses, a comma-separated list of arguments can be provided to pass values to the subprogram.

For example:

```psc
subprogram add(a, b)
  return a + b
add(1, 2) // call subprogram add with arguments 1 and 2
```

If a subprogram is called with the wrong number of arguments, `UnmatchedArgumentsError` is thrown.

If the operator is used on a non-subprogram value, `OperationValueTypeMismatchError` is thrown.

## Atom

An atom is the most basic unit of an expression. It can be a literal or an identifier (variable name).

# Variables

Variables are named storage locations that can hold values of any data type and subprograms. They can be assigned values and used in expressions.

If a variable is used before it is assigned a value, `AccessNonExistingVariableError` is thrown.

## Naming

Variable names can contain letters, digits, and underscores, but must not start with a digit. They are case-sensitive.

## Declaration and assignment

Variables are declared implicitly when they are first assigned a value. They can be reassigned to a new value of any data type.

For example:

```psc
x <- 1 // declare and assign x to 1
x <- "hello" // reassign x to "hello"
```

## Scope

Variables have a scope, which is the region of the program where they can be accessed.

Variables declared in the global scope are accessible throughout the program, while variables declared within a subprogram are only accessible within that subprogram.

Variable scoping is implemented using a stack of scopes. When a subprogram is called, a new scope is pushed onto the stack. When the subprogram returns, the scope is popped off the stack.

The bottom of the stack is the global scope, which is always present. The top of the stack is the current scope, which is where variables are declared.

For example:

```psc
x <- 1 // global variable
subprogram hello()
  y <- 2 // local variable
  output x // since x is in the global scope
  output y // since y is in the same local scope here
hello()
output x // since x is in the global scope
output y // invalid, since y is only in the local scope of hello()
```

When `strictVariableScope` is set, whenever a block is entered, a new scope is pushed onto the stack. When the block is exited, the scope is popped off the stack.

For example:

```psc
x <- 1 // global variable
if true
  y <- 2 // local variable
  output x // since x is in the global scope
  output y // since y is in the same local scope here
output x // since x is in the global scope
output y // invalid, since y is only in the local scope of the if block
```

# Statements

## Code blocks

Code blocks are used to group multiple statements together. They are defined by indentation, where all statements in the block must be indented by the same amount.

Each indentation level is represented by 2 spaces. Tabs are not allowed.

## Control flow statements

### If and if-else statements

If statements are used for conditional execution of code blocks.

An if statement consists of 3 parts:

- An `if` keyword followed by a condition
- A block of code
- Optionally, an `else` keyword followed by either another if statement or a block of code

For example:

```psc
if 1 + 1 = 2
  output "1 + 1 = 2"
else
  output "1 + 1 <> 2"

if 1 + 1 = 3
  output "1 + 1 = 2"
else if 1 + 1 = 2
  output "1 + 1 <> 2"
else
  output "1 + 1 <> 2"
```

If the condition evaluates to a non-boolean value, a `ConditionNotBooleanError` is thrown.

### While loops

While loops are used to repeatedly execute a block of code as long as a specified condition is true.

While loops consist of 2 parts:

- A `while` keyword followed by a condition
- A block of code

For example:

```psc
x <- 0
while x < 5
  output x
  x <- x + 1
// output: 0, 1, 2, 3, 4
```

If the condition evaluates to a non-boolean value, a `ConditionNotBooleanError` is thrown.

### Do-while loops

Do-while loops are used to repeatedly execute a block of code as long as a specified condition is true, but the block of code is executed before the condition is evaluated.

Do-while loops consist of 2 parts:

- A `do` keyword followed by a block of code
- A `while` keyword followed by a condition

For example:

```psc
x <- 0
do
  output x
  x <- x + 1
while x < 5
// output: 0, 1, 2, 3, 4
```

If the condition evaluates to a non-boolean value, a `ConditionNotBooleanError` is thrown.

### Repeat-until loops

Repeat-until loops are used to repeatedly execute a block of code until a specified condition is true, but the block of code is executed before the condition is evaluated.

Repeat-until loops consist of 2 parts:

- A `repeat` keyword followed by a block of code
- An `until` keyword followed by a condition

For example:

```psc
x <- 0
repeat
  output x
  x <- x + 1
until x >= 5
// output: 0, 1, 2, 3, 4
```

If the condition evaluates to a non-boolean value, a `ConditionNotBooleanError` is thrown.

### For loops

For loops are used to repeatedly execute a block of code for a specified range of values.

For loops consist of 2 parts:

- A `for` keyword followed by a variable name, a `from` keyword, a starting value, a `to` or `down to` keyword, and an ending value
- A code block

For example:

```psc
for i from 1 to 5
  output i
// output: 1, 2, 3, 4, 5

for i from 5 down to 1
  output i
// output: 5, 4, 3, 2, 1
```

If the starting or ending value evaluates to non-integer values, a `ForRangeNotIntegerError` is thrown.

If the for loop variable is already defined, a `ForVariableReuseError` is thrown.

## Assignment statement

Assignment statements are used to assign a value to a storage location.

The left-hand side (LHS) of an assignment statement must be one of the following:

- An identifier
- Another LHS followed by an array access operator

For example:

```psc
x <- 1 // assigns 1 to variable x
x <- 2 // reassigns 2 to variable x

arr <- [1, 2, 3] // assigns an array to variable arr
arr[1] <- 4 // assigns 4 to the first element of arr
arr[2] <- 5 // assigns 5 to the second element of arr
```

### Implicit creation and extension of arrays

If the LHS is an array access, and:

- The identifier is undefined, an array is implicitly created and assigned to the identifier.
- The index is greater than the current length of the array, the array is implicitly expanded to accommodate the new index, and all new elements are initialized to `undefined`.

```psc
A[1] <- 1 // A -> undefined -> implicitly declare as array of length 1
A[1][1] <- 1 // A -> undefined -> implicitly declare as array of length 1, A[1] -> undefined -> implicitly declare as array of length 1 and assign 1 to A[1][1]

B <- [1]
B[2] <- 2 // B = [1,2]
B[4] <- 4 // B = [1,2,,4]

C <- [1]
C[3][1] <- 2 // C = [1,,[2]]
```

## IO statements

### Input statement

Input statements are used to read a value from the user and assign it to a variable.

For example:

```psc
input A // waits for user input and assigns the value to variable A
```

### Output statement

Output statements are used to print a value to the console.

For example:

```psc
output "Hello, World!" // prints "Hello, World!"
output 1 + 2 // prints 3
output A // prints the value of variable A
```

# Subprograms

## Subprogram definition

A subprogram is a named block of code that can be called with or without arguments and must return a value.

A subprogram is defined using the `subprogram` keyword, followed by the subprogram name, an optional list of arguments enclosed in parentheses, and a block of code.

When defining a subprogram, we are assigning a function to the global scope using the subprogram identifier as the variable name.

The `return` statement is used to explicitly return a value from a subprogram. If a subprogram does not have a `return` statement, it will return `null` by default.

```psc
subprogram add(a,b) // a subprogram that takes two arguments a and b
  return a + b // returns the sum of a and b
subprogram hello() // a subprogram that takes no arguments
  output "Hello, World!" // returns null by default
```

Subprograms must be defined at the top of the file, before any other statements.

```psc
subprogram add(a, b) // defined at the top of the file
  return a + b

add(1, 2) // returns 3

subprogram subtract(a, b) // syntax error, defined after other statements
  return a - b
```

## Calling a subprogram

A subprogram is called using the subprogram call operator.
