parser grammar PSCParser;
options {
	tokenVocab = PSCLexer;
}

program: stmts? EOF;

addOp: PLUS | MINUS;
mulOp: MULTIPLY | DIVIDE | MODULO;
expOp: EXPONENT;
compOp: EQUAL | NEQUAL | GT | LT | GTEQ | LTEQ;

// Expression and literals

expr: orExpr;
orExpr: andExpr (OR andExpr)*;
andExpr: compExpr (AND compExpr)*;
compExpr: addExpr (compOp addExpr)*;
addExpr: mulExpr (addOp mulExpr)*;
mulExpr: expExpr (mulOp expExpr)*;
expExpr: unaryExpr (expOp unaryExpr)*;
unaryExpr: (PLUS | MINUS)* notExpr;
notExpr: NOT* primaryExpr;
primaryExpr: groupExpr | primaryExpr LSQUARE expr (COMMA expr)* RSQUARE;
groupExpr: atom | (LPAREN expr RPAREN);
atom: lits | ID;

lits: intLits | floatLits | arrayLits | STRING | BOOLEAN;
intLits: MINUS? INTEGER;
floatLits: MINUS? FLOAT;
arrayLits: LSQUARE (expr (COMMA expr)*)? RSQUARE;

// Statements
stmts: (stmt | NEWLINE)+;

stmt:
	expr
	| ifStmt
	| whileStmt
	| doWhileStmt
	| repeatUntilStmt
	| forStmt
	| asmStmt
	| inputStmt
	| outputStmt;

block:
	NEWLINE INDENT stmts NEWLINE? DEDENT; // NEWLINE is optional since might dedent twice in a row

ifStmt: IF expr block (ELSE ifStmt | ELSE block)?;

whileStmt: WHILE expr block;
doWhileStmt: DO block WHILE expr;

repeatUntilStmt: REPEAT block UNTIL expr;

forStmt: FOR ID FROM expr DOWN? TO expr block;

asmStmt: lvalue ASSIGN expr;

lvalue: ID | lvalue LSQUARE expr (COMMA expr)* RSQUARE;

// IO statements
inputStmt: INPUT lvalue;
outputStmt: OUTPUT expr;

// Subprogram
subprogram: SUBPROGRAM ID LPAREN (ID (COMMA ID)*)? RPAREN block;