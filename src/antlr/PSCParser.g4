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
notExpr: NOT* compExpr;
andExpr: notExpr (AND notExpr)*;
compExpr: addExpr (compOp addExpr)*;
addExpr: mulExpr (addOp mulExpr)*;
mulExpr: expExpr (mulOp expExpr)*;
expExpr: atom (expOp atom)*;
atom: lits | ID | LPAREN expr RPAREN;

lits: MINUS? INTEGER | MINUS? FLOAT | STRING | BOOLEAN;

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

asmStmt: ID ASSIGN expr;

// IO statements
inputStmt: INPUT ID;
outputStmt: OUTPUT expr;