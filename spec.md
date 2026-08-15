# Program

# Data types

## String

String is a sequence of characters.

### String literal

String literals are represented by texts enclosed by a pair of single quotes (`'`) or double quotes (`"`).

For example:

```psc
"egg" // valid
'egg" // invalid
"" // valid
```

String literals are parsed strictly as is, meaning escape sequences are not interpreted.

For example:

```psc
"\n" // valid, interpreted as "\n" instead of a newline character
"\\" // valid, interpreted as "\\" instead of a single backslash
```

### Output of Strings

Strings are outputted as is, enclosed by a pair of double quotes (`"`). Escape sequences are not interpreted.

## Number

Number is a numeric value that can be either an integer or a floating-point number.

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
001 // valid, interpreted as 1

```

Number literals can be further modified with the unary operators `+` and `-` to indicate positive or negative values, respectively.

### Output of Numbers

Numbers are outputted in base-10 decimal format without leading or trailing zeros, and without a decimal point for integers.

Negative numbers are outputted with a leading `-` sign.

## Boolean

Boolean is a logical value that can be either true or false.

### Boolean literals

Boolean literals are represented by the keywords `true` and `false`, which are case-insensitive.

For example:

```psc
true // valid
FALSE // valid
TruE // valid
FaLsE // valid
```

### Output of Booleans

Booleans are outputted in lowercase as `true` or `false`.

## Array

Array is an ordered collection of values, which can be of any data type.

## Starting index

By default, array indexing is 1-based, meaning the first element of the array is at index 1. The starting index can be set using the option `arrayStartIndex`

## Accessing elements

Array access is done using the array indexing operator.

### Array literals

Array literals are represented by a comma-separated list of literals or expressions, enclosed by a pair of square brackets (`[ ]`).

For example:

```psc
[] // valid, empty array
[1, 2, 3] // valid
["hello", "world"] // valid
[A+1, B, "hello"] // valid, where A and B are variables
```

### Output of Arrays

Arrays are outputted as a comma-separated list of values, enclosed by a pair of square brackets (`[ ]`), without any whitespace. Each value is outputted according to its data type.

## Null

### Null literals

Null literals are represented by the keyword `null`, which is case-insensitive.

### Output of Null

Null is outputted as `null`.

## Undefined

# Expression

Expressions are made up of literals, variables, function calls, and operators. They are evaluated to produce a value.

## Operators

## Smart Casting of Strings

Smart casting is done as follows:

- If a string matches the following:
  - `true` (case-insensitive) -> true
  - `false` (case-insensitive) -> false
  - `null` (case-insensitive) -> null
- Otherwise, try the parse it as a number
  - If the string matches `/^-?\d*(\.\d+)?$/` and it is not an empty string, then it is parsed as a number using JavaScript's `Number()` function.

## Arithmetic operators

### Addition operator (`+`)

Addition operator is used for performing addition on two numbers or number-like string.

For example:

```psc
1 + 2 // valid, result is 3
"1" + "2" // valid, result is 3
2 + "2.0" // valid, result is 4
```

### Subtraction operator (`-`)

Subtraction operator is used for performing subtraction on two numbers or number-like string.

For example:

```psc
5 - 2 // valid, result is 3
"5" - "2" // valid, result is 3
"5.0" - 2 // valid, result is 3
```

### Multiplication operator (`*`)

Multiplication operator is used for performing multiplication on two numbers or number-like string.

For example:

```psc
2 * 3 // valid, result is 6
"2" * "3" // valid, result is 6
"2.0" * 3 // valid, result is 6
```

### Division operator (`/`)

Division operator is used for performing division on two numbers or number-like string.

For example:

```psc
6 / 2 // valid, result is 3
"6" / "2" // valid, result is 3
"6.0" / 2 // valid, result is 3
```

### Modulus operator (`%` / `mod`)

Modulus operator is used for performing modulus operation on two numbers or number-like string.

For example:

```psc
5 % 2 // valid, result is 1
"5" mod "2" // valid, result is 1
"5.0" % 2 // valid, result is 1
```

### Exponentiation operator (`^` / `**`)

Exponentiation operator is used for performing exponentiation on two numbers or number-like string.

For example:

```psc
2 ^ 3 // valid, result is 8
"2" ** "3" // valid, result is 8
"2.0" ^ 3 // valid, result is 8
```

## Comparison operators

### Equality operator (`=`)

Equality operators are used for comparing two values of any type for equality.

For example:

```psc
1 = 1 // valid, result is true
"hello" = "hello" // valid, result is true
1 = "1" // valid, result is true after smart casting
1 = 2 // valid, result is false
```

### Inequality operator (`<>`)

Inequality operators are used for comparing two values of any type for inequality.

For example:

```psc
1 <> 2 // valid, result is true
"hello" <> "world" // valid, result is true
1 <> "1" // valid, result is false after smart casting
```

### Greater than operator (`>`)

Greater than operators are used for comparing two values of either number type or string type for greater than relationship.

For example:

```psc
2 > 1 // valid, result is true
"b" > "a" // valid, result is true
"abc" > "cba" // valid, result is false
"2" > "1" // valid, result is true after smart casting
```

### Less than operator (`<`)

Less than operators are used for comparing two values of either number type or string type for less than relationship.

For example:

```psc
1 < 2 // valid, result is true
"a" < "b" // valid, result is true
"cba" < "abc" // valid, result is false
"1" < "2" // valid, result is true after smart casting
```

### Greater than or equal to operator (`>=`)

Greater than operators are used for comparing two values of either number type or string type for greater than or equal to relationship.

For example:

```psc
1 >= 1 // valid, result is true
"b" >= "a" // valid, result is true
"abc" >= "cba" // valid, result is false
"2" >= "1" // valid, result is true after smart casting
```

### Less than or equal to operator (`<=`)

Less than operators are used for comparing two values of either number type or string type for less than or equal to relationship.

For example:

```psc
1 <= 2 // valid, result is true
"a" <= "b" // valid, result is true
"cba" <= "abc" // valid, result is false
"1" <= "2" // valid, result is true after smart casting
```

## Logical AND operator (`and`)

Logical AND operators are used for performing logical conjunction on two boolean values.

```psc
true and true // valid, result is true
true and false // valid, result is false
false and true // valid, result is false
false and false // valid, result is false
```

## Logical OR operator (`or`)

Logical OR operators are used for performing logical disjunction on two boolean values.

```psc
true or true // valid, result is true
true or false // valid, result is true
false or true // valid, result is true
false or false // valid, result is false
```

## Logical NOT operator (`not`)

Negation operators are used for negating a boolean value.

```psc
not true // valid, result is false
not false // valid, result is true
```

## Unary operators

### Unary negation operator (`-`)

Unary negation operators are used for negating a number or number-like string.

```psc
-1 // valid, result is -1
-"1" // valid, result is -1 after smart casting
--1 // valid, result is 1
```

### Unary positive operator (`+`)

Unary positive operators are used to explicitly indicate a positive number or number-like string. It does not perform any operation on the value.

## Grouping operator (`(` and `)`)

Group operators are used to group expressions and control the order of evaluation. Expressions within parentheses are evaluated first, before any other operations outside the parentheses.

For example:

```psc
(1 + 2) * 3 // valid, result is 9
1 + (2 * 3) // valid, result is 7
```

## Array indexing operator (`[` and `]`)

Array indexing operators are placed after an array to access a specific element recursively by its comma-separated indices, which are enclosed in the square brackets. The index is 1-based, meaning the first element of the array is at index 1.

For example:

```psc
// assuming 1-based indexing
[1, 2, 3][1] // valid, result is 1
["a", "b", "c"][2] // valid, result is "b"
[[1, 2], [3, 4]][2][1] // valid, result is 3
```

## Subprogram call operator (`(` and `)`)

// TODO

## Atom

Atom is the most basic unit of an expression. It can be a literal or an identifier (variable name).

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

Variable scoping are implemented using a stack of scopes. When a subprogram is called, a new scope is pushed onto the stack. When the subprogram returns, the scope is popped off the stack.

The bottom of the stack is the global scope, which is always present. The top of the stack is the current scope, which is where variables are declared.

For example:

```psc
x <- 1 // global variable
subprogram hello()
  y <- 2 // local variable
  output x // valid, since x is in the global scope
  output y // valid, since y is in the same local scope here
hello()
output x // valid, since x is in the global scope
output y // invalid, since y is only in the local scope of hello()
```

When `strictVariableScope` is asserted, whenever a block is entered, a new scope is pushed onto the stack. When the block is exited, the scope is popped off the stack.

For example:

```psc
x <- 1 // global variable
if true
  y <- 2 // local variable
  output x // valid, since x is in the global scope
  output y // valid, since y is in the same local scope here
output x // valid, since x is in the global scope
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

If the starting or ending value evaluates to a non-integer value, a `ForRangeNotIntegerError` is thrown.

## Assignment statement

Assignment statements are used to assign a value to a storage location.

The left-hand side (LHS) of an assignment statement must be either of the following:

- An identifier
- Another LHS followed by an array indexing operator

For example:

```psc
x <- 1 // valid, assigns 1 to variable x
x <- 2 // valid, reassigns 2 to variable x

arr <- [1, 2, 3] // valid, assigns an array to variable arr
arr[1] <- 4 // valid, assigns 4 to the first element of arr
arr[2] <- 5 // valid, assigns 5 to the second element of arr
```

### Implicit creation and extension of arrays

If the LHS is an array access, and:

- The identifier is undefined, an array is implicitly created and assigned to the identifier.
- The index is greater than the current length of the array, the array is implicitly expanded to accommodate the new index, and all new elements are initialized to `undefined`.

```psc
A[1] <- 1 // valid, A -> undefined -> implicitly declare as array of length 1
A[1][1] <- 1 // valid, A -> undefined -> implicitly declare as array of length 1, A[1] -> undefined -> implicitly declare as array of length 1 and assign 1 to A[1][1]

B <- [1]
B[2] <- 2 // valid, B = [1, 2]
B[4] <- 4 // valid, B = [1, 2,, 4]

C <- [1]
C[3][1] <- 2 // valid, C = [1,, [2]]
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
subprogram add(a,b) // valid, a subprogram that takes two arguments a and b
  return a + b // returns the sum of a and b
subprogram hello() // valid, a subprogram that takes no arguments
  output "Hello, World!" // returns null by default
```

Subprogram must be defined at the top of the file, before any other statements.

```psc
subprogram add(a, b) // valid, defined at the top of the file
  return a + b

add(1, 2) // returns 3

subprogram subtract(a, b) // syntax error, defined after other statements
  return a - b
```
