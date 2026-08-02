lexer grammar PSCLexer;

options {
	caseInsensitive = true;
	superClass = PSCLexerBase;
}
tokens {
	INDENT,
	DEDENT
}

WHITESPACE: (' ' | '\t')+ -> skip;
NEWLINE: '\r'? '\n' (' ' | '\t')*;
COMMENT: ('#' | '//') ~[\r\n]*;

LPAREN: '(';
RPAREN: ')';

// Literals
SQUOTE: '\'';
DQUOTE: '"';
STRING: (SQUOTE .*? SQUOTE | DQUOTE .*? DQUOTE);

fragment DIGIT: [0-9];
INTEGER: DIGIT+;
FLOAT: DIGIT* '.' DIGIT+;

BOOLEAN: 'true' | 'false';

// Operators
PLUS: '+';
MINUS: '-';
MULTIPLY: '*';
DIVIDE: '/';
MODULO: ('%' | 'mod');
EXPONENT: ('^' | '**');

AND: 'and';
OR: 'or';
NOT: 'not';

EQUAL: '=';
NEQUAL: '<>';
GT: '>';
LT: '<';
GTEQ: '>=';
LTEQ: '<=';

// Statements

// If, else if, else
IF: 'if';
ELSE: 'else';

// While, do-while
WHILE: 'while';
DO: 'do';

// Repeat-until
REPEAT: 'repeat';
UNTIL: 'until';

// For
FOR: 'for';
FROM: 'from';
DOWN: 'down';
TO: 'to';

// Assignment
ASSIGN: '<-';

// IO
INPUT: 'input';
OUTPUT: 'output';

// Identifier
ID: [a-z_] [a-z_0-9]*;