// Generated from ./PSCParser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import PSCParserVisitor from "./PSCParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class PSCParser extends Parser {
	public static readonly INDENT = 1;
	public static readonly DEDENT = 2;
	public static readonly WHITESPACE = 3;
	public static readonly NEWLINE = 4;
	public static readonly COMMENT = 5;
	public static readonly COMMA = 6;
	public static readonly LPAREN = 7;
	public static readonly RPAREN = 8;
	public static readonly LSQUARE = 9;
	public static readonly RSQUARE = 10;
	public static readonly SQUOTE = 11;
	public static readonly DQUOTE = 12;
	public static readonly STRING = 13;
	public static readonly INTEGER = 14;
	public static readonly FLOAT = 15;
	public static readonly BOOLEAN = 16;
	public static readonly PLUS = 17;
	public static readonly MINUS = 18;
	public static readonly MULTIPLY = 19;
	public static readonly DIVIDE = 20;
	public static readonly MODULO = 21;
	public static readonly EXPONENT = 22;
	public static readonly AND = 23;
	public static readonly OR = 24;
	public static readonly NOT = 25;
	public static readonly EQUAL = 26;
	public static readonly NEQUAL = 27;
	public static readonly GT = 28;
	public static readonly LT = 29;
	public static readonly GTEQ = 30;
	public static readonly LTEQ = 31;
	public static readonly IF = 32;
	public static readonly ELSE = 33;
	public static readonly WHILE = 34;
	public static readonly DO = 35;
	public static readonly REPEAT = 36;
	public static readonly UNTIL = 37;
	public static readonly FOR = 38;
	public static readonly FROM = 39;
	public static readonly DOWN = 40;
	public static readonly TO = 41;
	public static readonly ASSIGN = 42;
	public static readonly INPUT = 43;
	public static readonly OUTPUT = 44;
	public static readonly ID = 45;
	public static readonly SUBPROGRAM = 46;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_addOp = 1;
	public static readonly RULE_mulOp = 2;
	public static readonly RULE_expOp = 3;
	public static readonly RULE_compOp = 4;
	public static readonly RULE_expr = 5;
	public static readonly RULE_orExpr = 6;
	public static readonly RULE_andExpr = 7;
	public static readonly RULE_compExpr = 8;
	public static readonly RULE_addExpr = 9;
	public static readonly RULE_mulExpr = 10;
	public static readonly RULE_expExpr = 11;
	public static readonly RULE_unaryExpr = 12;
	public static readonly RULE_notExpr = 13;
	public static readonly RULE_primaryExpr = 14;
	public static readonly RULE_groupExpr = 15;
	public static readonly RULE_atom = 16;
	public static readonly RULE_lits = 17;
	public static readonly RULE_intLits = 18;
	public static readonly RULE_floatLits = 19;
	public static readonly RULE_arrayLits = 20;
	public static readonly RULE_stmts = 21;
	public static readonly RULE_stmt = 22;
	public static readonly RULE_block = 23;
	public static readonly RULE_ifStmt = 24;
	public static readonly RULE_whileStmt = 25;
	public static readonly RULE_doWhileStmt = 26;
	public static readonly RULE_repeatUntilStmt = 27;
	public static readonly RULE_forStmt = 28;
	public static readonly RULE_asmStmt = 29;
	public static readonly RULE_lvalue = 30;
	public static readonly RULE_inputStmt = 31;
	public static readonly RULE_outputStmt = 32;
	public static readonly RULE_subprogram = 33;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "','", "'('", 
                                                            "')'", "'['", 
                                                            "']'", "'''", 
                                                            "'\"'", null, 
                                                            null, null, 
                                                            null, "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", null, 
                                                            null, "'and'", 
                                                            "'or'", "'not'", 
                                                            "'='", "'<>'", 
                                                            "'>'", "'<'", 
                                                            "'>='", "'<='", 
                                                            "'if'", "'else'", 
                                                            "'while'", "'do'", 
                                                            "'repeat'", 
                                                            "'until'", "'for'", 
                                                            "'from'", "'down'", 
                                                            "'to'", "'<-'", 
                                                            "'input'", "'output'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "INDENT", 
                                                             "DEDENT", "WHITESPACE", 
                                                             "NEWLINE", 
                                                             "COMMENT", 
                                                             "COMMA", "LPAREN", 
                                                             "RPAREN", "LSQUARE", 
                                                             "RSQUARE", 
                                                             "SQUOTE", "DQUOTE", 
                                                             "STRING", "INTEGER", 
                                                             "FLOAT", "BOOLEAN", 
                                                             "PLUS", "MINUS", 
                                                             "MULTIPLY", 
                                                             "DIVIDE", "MODULO", 
                                                             "EXPONENT", 
                                                             "AND", "OR", 
                                                             "NOT", "EQUAL", 
                                                             "NEQUAL", "GT", 
                                                             "LT", "GTEQ", 
                                                             "LTEQ", "IF", 
                                                             "ELSE", "WHILE", 
                                                             "DO", "REPEAT", 
                                                             "UNTIL", "FOR", 
                                                             "FROM", "DOWN", 
                                                             "TO", "ASSIGN", 
                                                             "INPUT", "OUTPUT", 
                                                             "ID", "SUBPROGRAM" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "addOp", "mulOp", "expOp", "compOp", "expr", "orExpr", "andExpr", 
		"compExpr", "addExpr", "mulExpr", "expExpr", "unaryExpr", "notExpr", "primaryExpr", 
		"groupExpr", "atom", "lits", "intLits", "floatLits", "arrayLits", "stmts", 
		"stmt", "block", "ifStmt", "whileStmt", "doWhileStmt", "repeatUntilStmt", 
		"forStmt", "asmStmt", "lvalue", "inputStmt", "outputStmt", "subprogram",
	];
	public get grammarFileName(): string { return "PSCParser.g4"; }
	public get literalNames(): (string | null)[] { return PSCParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return PSCParser.symbolicNames; }
	public get ruleNames(): string[] { return PSCParser.ruleNames; }
	public get serializedATN(): number[] { return PSCParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, PSCParser._ATN, PSCParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PSCParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 34071184) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 14429) !== 0)) {
				{
				this.state = 68;
				this.stmts();
				}
			}

			this.state = 71;
			this.match(PSCParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public addOp(): AddOpContext {
		let localctx: AddOpContext = new AddOpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PSCParser.RULE_addOp);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 73;
			_la = this._input.LA(1);
			if(!(_la===17 || _la===18)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public mulOp(): MulOpContext {
		let localctx: MulOpContext = new MulOpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PSCParser.RULE_mulOp);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 75;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670016) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expOp(): ExpOpContext {
		let localctx: ExpOpContext = new ExpOpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, PSCParser.RULE_expOp);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 77;
			this.match(PSCParser.EXPONENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compOp(): CompOpContext {
		let localctx: CompOpContext = new CompOpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, PSCParser.RULE_compOp);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 79;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4227858432) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expr(): ExprContext {
		let localctx: ExprContext = new ExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PSCParser.RULE_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 81;
			this.orExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public orExpr(): OrExprContext {
		let localctx: OrExprContext = new OrExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, PSCParser.RULE_orExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 83;
			this.andExpr();
			this.state = 88;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===24) {
				{
				{
				this.state = 84;
				this.match(PSCParser.OR);
				this.state = 85;
				this.andExpr();
				}
				}
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public andExpr(): AndExprContext {
		let localctx: AndExprContext = new AndExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, PSCParser.RULE_andExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 91;
			this.compExpr();
			this.state = 96;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===23) {
				{
				{
				this.state = 92;
				this.match(PSCParser.AND);
				this.state = 93;
				this.compExpr();
				}
				}
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compExpr(): CompExprContext {
		let localctx: CompExprContext = new CompExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PSCParser.RULE_compExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 99;
			this.addExpr();
			this.state = 105;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4227858432) !== 0)) {
				{
				{
				this.state = 100;
				this.compOp();
				this.state = 101;
				this.addExpr();
				}
				}
				this.state = 107;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public addExpr(): AddExprContext {
		let localctx: AddExprContext = new AddExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PSCParser.RULE_addExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 108;
			this.mulExpr();
			this.state = 114;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 109;
					this.addOp();
					this.state = 110;
					this.mulExpr();
					}
					}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public mulExpr(): MulExprContext {
		let localctx: MulExprContext = new MulExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, PSCParser.RULE_mulExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 117;
			this.expExpr();
			this.state = 123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670016) !== 0)) {
				{
				{
				this.state = 118;
				this.mulOp();
				this.state = 119;
				this.expExpr();
				}
				}
				this.state = 125;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expExpr(): ExpExprContext {
		let localctx: ExpExprContext = new ExpExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, PSCParser.RULE_expExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 126;
			this.unaryExpr();
			this.state = 132;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 127;
				this.expOp();
				this.state = 128;
				this.unaryExpr();
				}
				}
				this.state = 134;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unaryExpr(): UnaryExprContext {
		let localctx: UnaryExprContext = new UnaryExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, PSCParser.RULE_unaryExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 138;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 135;
					_la = this._input.LA(1);
					if(!(_la===17 || _la===18)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 140;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			}
			this.state = 141;
			this.notExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public notExpr(): NotExprContext {
		let localctx: NotExprContext = new NotExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, PSCParser.RULE_notExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 146;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===25) {
				{
				{
				this.state = 143;
				this.match(PSCParser.NOT);
				}
				}
				this.state = 148;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 149;
			this.primaryExpr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public primaryExpr(): PrimaryExprContext;
	public primaryExpr(_p: number): PrimaryExprContext;
	// @RuleVersion(0)
	public primaryExpr(_p?: number): PrimaryExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: PrimaryExprContext = new PrimaryExprContext(this, this._ctx, _parentState);
		let _prevctx: PrimaryExprContext = localctx;
		let _startState: number = 28;
		this.enterRecursionRule(localctx, 28, PSCParser.RULE_primaryExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 152;
			this.groupExpr();
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 168;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new PrimaryExprContext(this, _parentctx, _parentState);
					this.pushNewRecursionContext(localctx, _startState, PSCParser.RULE_primaryExpr);
					this.state = 154;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 155;
					this.match(PSCParser.LSQUARE);
					this.state = 156;
					this.expr();
					this.state = 161;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===6) {
						{
						{
						this.state = 157;
						this.match(PSCParser.COMMA);
						this.state = 158;
						this.expr();
						}
						}
						this.state = 163;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 164;
					this.match(PSCParser.RSQUARE);
					}
					}
				}
				this.state = 170;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public groupExpr(): GroupExprContext {
		let localctx: GroupExprContext = new GroupExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, PSCParser.RULE_groupExpr);
		try {
			this.state = 176;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 13:
			case 14:
			case 15:
			case 16:
			case 18:
			case 45:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 171;
				this.atom();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 172;
				this.match(PSCParser.LPAREN);
				this.state = 173;
				this.expr();
				this.state = 174;
				this.match(PSCParser.RPAREN);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atom(): AtomContext {
		let localctx: AtomContext = new AtomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, PSCParser.RULE_atom);
		try {
			this.state = 180;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 13:
			case 14:
			case 15:
			case 16:
			case 18:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 178;
				this.lits();
				}
				break;
			case 45:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 179;
				this.match(PSCParser.ID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lits(): LitsContext {
		let localctx: LitsContext = new LitsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, PSCParser.RULE_lits);
		try {
			this.state = 187;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 182;
				this.intLits();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 183;
				this.floatLits();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 184;
				this.arrayLits();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 185;
				this.match(PSCParser.STRING);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 186;
				this.match(PSCParser.BOOLEAN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public intLits(): IntLitsContext {
		let localctx: IntLitsContext = new IntLitsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, PSCParser.RULE_intLits);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 190;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 189;
				this.match(PSCParser.MINUS);
				}
			}

			this.state = 192;
			this.match(PSCParser.INTEGER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public floatLits(): FloatLitsContext {
		let localctx: FloatLitsContext = new FloatLitsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, PSCParser.RULE_floatLits);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 195;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 194;
				this.match(PSCParser.MINUS);
				}
			}

			this.state = 197;
			this.match(PSCParser.FLOAT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayLits(): ArrayLitsContext {
		let localctx: ArrayLitsContext = new ArrayLitsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, PSCParser.RULE_arrayLits);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 199;
			this.match(PSCParser.LSQUARE);
			this.state = 208;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 34071168) !== 0) || _la===45) {
				{
				this.state = 200;
				this.expr();
				this.state = 205;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===6) {
					{
					{
					this.state = 201;
					this.match(PSCParser.COMMA);
					this.state = 202;
					this.expr();
					}
					}
					this.state = 207;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 210;
			this.match(PSCParser.RSQUARE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stmts(): StmtsContext {
		let localctx: StmtsContext = new StmtsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, PSCParser.RULE_stmts);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 214;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					this.state = 214;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 7:
					case 9:
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
					case 18:
					case 25:
					case 32:
					case 34:
					case 35:
					case 36:
					case 38:
					case 43:
					case 44:
					case 45:
						{
						this.state = 212;
						this.stmt();
						}
						break;
					case 4:
						{
						this.state = 213;
						this.match(PSCParser.NEWLINE);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 216;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stmt(): StmtContext {
		let localctx: StmtContext = new StmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, PSCParser.RULE_stmt);
		try {
			this.state = 227;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 218;
				this.expr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 219;
				this.ifStmt();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 220;
				this.whileStmt();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 221;
				this.doWhileStmt();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 222;
				this.repeatUntilStmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 223;
				this.forStmt();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 224;
				this.asmStmt();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 225;
				this.inputStmt();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 226;
				this.outputStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, PSCParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 229;
			this.match(PSCParser.NEWLINE);
			this.state = 230;
			this.match(PSCParser.INDENT);
			this.state = 231;
			this.stmts();
			this.state = 233;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 232;
				this.match(PSCParser.NEWLINE);
				}
			}

			this.state = 235;
			this.match(PSCParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ifStmt(): IfStmtContext {
		let localctx: IfStmtContext = new IfStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, PSCParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 237;
			this.match(PSCParser.IF);
			this.state = 238;
			this.expr();
			this.state = 239;
			this.block();
			this.state = 244;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 240;
				this.match(PSCParser.ELSE);
				this.state = 241;
				this.ifStmt();
				}
				break;
			case 2:
				{
				this.state = 242;
				this.match(PSCParser.ELSE);
				this.state = 243;
				this.block();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public whileStmt(): WhileStmtContext {
		let localctx: WhileStmtContext = new WhileStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, PSCParser.RULE_whileStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 246;
			this.match(PSCParser.WHILE);
			this.state = 247;
			this.expr();
			this.state = 248;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public doWhileStmt(): DoWhileStmtContext {
		let localctx: DoWhileStmtContext = new DoWhileStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, PSCParser.RULE_doWhileStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 250;
			this.match(PSCParser.DO);
			this.state = 251;
			this.block();
			this.state = 252;
			this.match(PSCParser.WHILE);
			this.state = 253;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public repeatUntilStmt(): RepeatUntilStmtContext {
		let localctx: RepeatUntilStmtContext = new RepeatUntilStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, PSCParser.RULE_repeatUntilStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 255;
			this.match(PSCParser.REPEAT);
			this.state = 256;
			this.block();
			this.state = 257;
			this.match(PSCParser.UNTIL);
			this.state = 258;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forStmt(): ForStmtContext {
		let localctx: ForStmtContext = new ForStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, PSCParser.RULE_forStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 260;
			this.match(PSCParser.FOR);
			this.state = 261;
			this.match(PSCParser.ID);
			this.state = 262;
			this.match(PSCParser.FROM);
			this.state = 263;
			this.expr();
			this.state = 265;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 264;
				this.match(PSCParser.DOWN);
				}
			}

			this.state = 267;
			this.match(PSCParser.TO);
			this.state = 268;
			this.expr();
			this.state = 269;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public asmStmt(): AsmStmtContext {
		let localctx: AsmStmtContext = new AsmStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, PSCParser.RULE_asmStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 271;
			this.lvalue(0);
			this.state = 272;
			this.match(PSCParser.ASSIGN);
			this.state = 273;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public lvalue(): LvalueContext;
	public lvalue(_p: number): LvalueContext;
	// @RuleVersion(0)
	public lvalue(_p?: number): LvalueContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: LvalueContext = new LvalueContext(this, this._ctx, _parentState);
		let _prevctx: LvalueContext = localctx;
		let _startState: number = 60;
		this.enterRecursionRule(localctx, 60, PSCParser.RULE_lvalue, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 276;
			this.match(PSCParser.ID);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 292;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new LvalueContext(this, _parentctx, _parentState);
					this.pushNewRecursionContext(localctx, _startState, PSCParser.RULE_lvalue);
					this.state = 278;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 279;
					this.match(PSCParser.LSQUARE);
					this.state = 280;
					this.expr();
					this.state = 285;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===6) {
						{
						{
						this.state = 281;
						this.match(PSCParser.COMMA);
						this.state = 282;
						this.expr();
						}
						}
						this.state = 287;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 288;
					this.match(PSCParser.RSQUARE);
					}
					}
				}
				this.state = 294;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public inputStmt(): InputStmtContext {
		let localctx: InputStmtContext = new InputStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, PSCParser.RULE_inputStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 295;
			this.match(PSCParser.INPUT);
			this.state = 296;
			this.lvalue(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public outputStmt(): OutputStmtContext {
		let localctx: OutputStmtContext = new OutputStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, PSCParser.RULE_outputStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 298;
			this.match(PSCParser.OUTPUT);
			this.state = 299;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public subprogram(): SubprogramContext {
		let localctx: SubprogramContext = new SubprogramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, PSCParser.RULE_subprogram);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 301;
			this.match(PSCParser.SUBPROGRAM);
			this.state = 302;
			this.match(PSCParser.ID);
			this.state = 303;
			this.match(PSCParser.LPAREN);
			this.state = 312;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===45) {
				{
				this.state = 304;
				this.match(PSCParser.ID);
				this.state = 309;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===6) {
					{
					{
					this.state = 305;
					this.match(PSCParser.COMMA);
					this.state = 306;
					this.match(PSCParser.ID);
					}
					}
					this.state = 311;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 314;
			this.match(PSCParser.RPAREN);
			this.state = 315;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 14:
			return this.primaryExpr_sempred(localctx as PrimaryExprContext, predIndex);
		case 30:
			return this.lvalue_sempred(localctx as LvalueContext, predIndex);
		}
		return true;
	}
	private primaryExpr_sempred(localctx: PrimaryExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private lvalue_sempred(localctx: LvalueContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,46,318,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,1,0,3,0,70,8,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,
	1,4,1,5,1,5,1,6,1,6,1,6,5,6,87,8,6,10,6,12,6,90,9,6,1,7,1,7,1,7,5,7,95,
	8,7,10,7,12,7,98,9,7,1,8,1,8,1,8,1,8,5,8,104,8,8,10,8,12,8,107,9,8,1,9,
	1,9,1,9,1,9,5,9,113,8,9,10,9,12,9,116,9,9,1,10,1,10,1,10,1,10,5,10,122,
	8,10,10,10,12,10,125,9,10,1,11,1,11,1,11,1,11,5,11,131,8,11,10,11,12,11,
	134,9,11,1,12,5,12,137,8,12,10,12,12,12,140,9,12,1,12,1,12,1,13,5,13,145,
	8,13,10,13,12,13,148,9,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
	1,14,5,14,160,8,14,10,14,12,14,163,9,14,1,14,1,14,5,14,167,8,14,10,14,12,
	14,170,9,14,1,15,1,15,1,15,1,15,1,15,3,15,177,8,15,1,16,1,16,3,16,181,8,
	16,1,17,1,17,1,17,1,17,1,17,3,17,188,8,17,1,18,3,18,191,8,18,1,18,1,18,
	1,19,3,19,196,8,19,1,19,1,19,1,20,1,20,1,20,1,20,5,20,204,8,20,10,20,12,
	20,207,9,20,3,20,209,8,20,1,20,1,20,1,21,1,21,4,21,215,8,21,11,21,12,21,
	216,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,3,22,228,8,22,1,23,1,23,
	1,23,1,23,3,23,234,8,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,
	24,245,8,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,27,1,27,1,27,
	1,27,1,27,1,28,1,28,1,28,1,28,1,28,3,28,266,8,28,1,28,1,28,1,28,1,28,1,
	29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,5,30,284,8,30,
	10,30,12,30,287,9,30,1,30,1,30,5,30,291,8,30,10,30,12,30,294,9,30,1,31,
	1,31,1,31,1,32,1,32,1,32,1,33,1,33,1,33,1,33,1,33,1,33,5,33,308,8,33,10,
	33,12,33,311,9,33,3,33,313,8,33,1,33,1,33,1,33,1,33,0,2,28,60,34,0,2,4,
	6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,
	56,58,60,62,64,66,0,3,1,0,17,18,1,0,19,21,1,0,26,31,322,0,69,1,0,0,0,2,
	73,1,0,0,0,4,75,1,0,0,0,6,77,1,0,0,0,8,79,1,0,0,0,10,81,1,0,0,0,12,83,1,
	0,0,0,14,91,1,0,0,0,16,99,1,0,0,0,18,108,1,0,0,0,20,117,1,0,0,0,22,126,
	1,0,0,0,24,138,1,0,0,0,26,146,1,0,0,0,28,151,1,0,0,0,30,176,1,0,0,0,32,
	180,1,0,0,0,34,187,1,0,0,0,36,190,1,0,0,0,38,195,1,0,0,0,40,199,1,0,0,0,
	42,214,1,0,0,0,44,227,1,0,0,0,46,229,1,0,0,0,48,237,1,0,0,0,50,246,1,0,
	0,0,52,250,1,0,0,0,54,255,1,0,0,0,56,260,1,0,0,0,58,271,1,0,0,0,60,275,
	1,0,0,0,62,295,1,0,0,0,64,298,1,0,0,0,66,301,1,0,0,0,68,70,3,42,21,0,69,
	68,1,0,0,0,69,70,1,0,0,0,70,71,1,0,0,0,71,72,5,0,0,1,72,1,1,0,0,0,73,74,
	7,0,0,0,74,3,1,0,0,0,75,76,7,1,0,0,76,5,1,0,0,0,77,78,5,22,0,0,78,7,1,0,
	0,0,79,80,7,2,0,0,80,9,1,0,0,0,81,82,3,12,6,0,82,11,1,0,0,0,83,88,3,14,
	7,0,84,85,5,24,0,0,85,87,3,14,7,0,86,84,1,0,0,0,87,90,1,0,0,0,88,86,1,0,
	0,0,88,89,1,0,0,0,89,13,1,0,0,0,90,88,1,0,0,0,91,96,3,16,8,0,92,93,5,23,
	0,0,93,95,3,16,8,0,94,92,1,0,0,0,95,98,1,0,0,0,96,94,1,0,0,0,96,97,1,0,
	0,0,97,15,1,0,0,0,98,96,1,0,0,0,99,105,3,18,9,0,100,101,3,8,4,0,101,102,
	3,18,9,0,102,104,1,0,0,0,103,100,1,0,0,0,104,107,1,0,0,0,105,103,1,0,0,
	0,105,106,1,0,0,0,106,17,1,0,0,0,107,105,1,0,0,0,108,114,3,20,10,0,109,
	110,3,2,1,0,110,111,3,20,10,0,111,113,1,0,0,0,112,109,1,0,0,0,113,116,1,
	0,0,0,114,112,1,0,0,0,114,115,1,0,0,0,115,19,1,0,0,0,116,114,1,0,0,0,117,
	123,3,22,11,0,118,119,3,4,2,0,119,120,3,22,11,0,120,122,1,0,0,0,121,118,
	1,0,0,0,122,125,1,0,0,0,123,121,1,0,0,0,123,124,1,0,0,0,124,21,1,0,0,0,
	125,123,1,0,0,0,126,132,3,24,12,0,127,128,3,6,3,0,128,129,3,24,12,0,129,
	131,1,0,0,0,130,127,1,0,0,0,131,134,1,0,0,0,132,130,1,0,0,0,132,133,1,0,
	0,0,133,23,1,0,0,0,134,132,1,0,0,0,135,137,7,0,0,0,136,135,1,0,0,0,137,
	140,1,0,0,0,138,136,1,0,0,0,138,139,1,0,0,0,139,141,1,0,0,0,140,138,1,0,
	0,0,141,142,3,26,13,0,142,25,1,0,0,0,143,145,5,25,0,0,144,143,1,0,0,0,145,
	148,1,0,0,0,146,144,1,0,0,0,146,147,1,0,0,0,147,149,1,0,0,0,148,146,1,0,
	0,0,149,150,3,28,14,0,150,27,1,0,0,0,151,152,6,14,-1,0,152,153,3,30,15,
	0,153,168,1,0,0,0,154,155,10,1,0,0,155,156,5,9,0,0,156,161,3,10,5,0,157,
	158,5,6,0,0,158,160,3,10,5,0,159,157,1,0,0,0,160,163,1,0,0,0,161,159,1,
	0,0,0,161,162,1,0,0,0,162,164,1,0,0,0,163,161,1,0,0,0,164,165,5,10,0,0,
	165,167,1,0,0,0,166,154,1,0,0,0,167,170,1,0,0,0,168,166,1,0,0,0,168,169,
	1,0,0,0,169,29,1,0,0,0,170,168,1,0,0,0,171,177,3,32,16,0,172,173,5,7,0,
	0,173,174,3,10,5,0,174,175,5,8,0,0,175,177,1,0,0,0,176,171,1,0,0,0,176,
	172,1,0,0,0,177,31,1,0,0,0,178,181,3,34,17,0,179,181,5,45,0,0,180,178,1,
	0,0,0,180,179,1,0,0,0,181,33,1,0,0,0,182,188,3,36,18,0,183,188,3,38,19,
	0,184,188,3,40,20,0,185,188,5,13,0,0,186,188,5,16,0,0,187,182,1,0,0,0,187,
	183,1,0,0,0,187,184,1,0,0,0,187,185,1,0,0,0,187,186,1,0,0,0,188,35,1,0,
	0,0,189,191,5,18,0,0,190,189,1,0,0,0,190,191,1,0,0,0,191,192,1,0,0,0,192,
	193,5,14,0,0,193,37,1,0,0,0,194,196,5,18,0,0,195,194,1,0,0,0,195,196,1,
	0,0,0,196,197,1,0,0,0,197,198,5,15,0,0,198,39,1,0,0,0,199,208,5,9,0,0,200,
	205,3,10,5,0,201,202,5,6,0,0,202,204,3,10,5,0,203,201,1,0,0,0,204,207,1,
	0,0,0,205,203,1,0,0,0,205,206,1,0,0,0,206,209,1,0,0,0,207,205,1,0,0,0,208,
	200,1,0,0,0,208,209,1,0,0,0,209,210,1,0,0,0,210,211,5,10,0,0,211,41,1,0,
	0,0,212,215,3,44,22,0,213,215,5,4,0,0,214,212,1,0,0,0,214,213,1,0,0,0,215,
	216,1,0,0,0,216,214,1,0,0,0,216,217,1,0,0,0,217,43,1,0,0,0,218,228,3,10,
	5,0,219,228,3,48,24,0,220,228,3,50,25,0,221,228,3,52,26,0,222,228,3,54,
	27,0,223,228,3,56,28,0,224,228,3,58,29,0,225,228,3,62,31,0,226,228,3,64,
	32,0,227,218,1,0,0,0,227,219,1,0,0,0,227,220,1,0,0,0,227,221,1,0,0,0,227,
	222,1,0,0,0,227,223,1,0,0,0,227,224,1,0,0,0,227,225,1,0,0,0,227,226,1,0,
	0,0,228,45,1,0,0,0,229,230,5,4,0,0,230,231,5,1,0,0,231,233,3,42,21,0,232,
	234,5,4,0,0,233,232,1,0,0,0,233,234,1,0,0,0,234,235,1,0,0,0,235,236,5,2,
	0,0,236,47,1,0,0,0,237,238,5,32,0,0,238,239,3,10,5,0,239,244,3,46,23,0,
	240,241,5,33,0,0,241,245,3,48,24,0,242,243,5,33,0,0,243,245,3,46,23,0,244,
	240,1,0,0,0,244,242,1,0,0,0,244,245,1,0,0,0,245,49,1,0,0,0,246,247,5,34,
	0,0,247,248,3,10,5,0,248,249,3,46,23,0,249,51,1,0,0,0,250,251,5,35,0,0,
	251,252,3,46,23,0,252,253,5,34,0,0,253,254,3,10,5,0,254,53,1,0,0,0,255,
	256,5,36,0,0,256,257,3,46,23,0,257,258,5,37,0,0,258,259,3,10,5,0,259,55,
	1,0,0,0,260,261,5,38,0,0,261,262,5,45,0,0,262,263,5,39,0,0,263,265,3,10,
	5,0,264,266,5,40,0,0,265,264,1,0,0,0,265,266,1,0,0,0,266,267,1,0,0,0,267,
	268,5,41,0,0,268,269,3,10,5,0,269,270,3,46,23,0,270,57,1,0,0,0,271,272,
	3,60,30,0,272,273,5,42,0,0,273,274,3,10,5,0,274,59,1,0,0,0,275,276,6,30,
	-1,0,276,277,5,45,0,0,277,292,1,0,0,0,278,279,10,1,0,0,279,280,5,9,0,0,
	280,285,3,10,5,0,281,282,5,6,0,0,282,284,3,10,5,0,283,281,1,0,0,0,284,287,
	1,0,0,0,285,283,1,0,0,0,285,286,1,0,0,0,286,288,1,0,0,0,287,285,1,0,0,0,
	288,289,5,10,0,0,289,291,1,0,0,0,290,278,1,0,0,0,291,294,1,0,0,0,292,290,
	1,0,0,0,292,293,1,0,0,0,293,61,1,0,0,0,294,292,1,0,0,0,295,296,5,43,0,0,
	296,297,3,60,30,0,297,63,1,0,0,0,298,299,5,44,0,0,299,300,3,10,5,0,300,
	65,1,0,0,0,301,302,5,46,0,0,302,303,5,45,0,0,303,312,5,7,0,0,304,309,5,
	45,0,0,305,306,5,6,0,0,306,308,5,45,0,0,307,305,1,0,0,0,308,311,1,0,0,0,
	309,307,1,0,0,0,309,310,1,0,0,0,310,313,1,0,0,0,311,309,1,0,0,0,312,304,
	1,0,0,0,312,313,1,0,0,0,313,314,1,0,0,0,314,315,5,8,0,0,315,316,3,46,23,
	0,316,67,1,0,0,0,28,69,88,96,105,114,123,132,138,146,161,168,176,180,187,
	190,195,205,208,214,216,227,233,244,265,285,292,309,312];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PSCParser.__ATN) {
			PSCParser.__ATN = new ATNDeserializer().deserialize(PSCParser._serializedATN);
		}

		return PSCParser.__ATN;
	}


	static DecisionsToDFA = PSCParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(PSCParser.EOF, 0);
	}
	public stmts(): StmtsContext {
		return this.getTypedRuleContext(StmtsContext, 0) as StmtsContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_program;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AddOpContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PLUS(): TerminalNode {
		return this.getToken(PSCParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(PSCParser.MINUS, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_addOp;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitAddOp) {
			return visitor.visitAddOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MulOpContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MULTIPLY(): TerminalNode {
		return this.getToken(PSCParser.MULTIPLY, 0);
	}
	public DIVIDE(): TerminalNode {
		return this.getToken(PSCParser.DIVIDE, 0);
	}
	public MODULO(): TerminalNode {
		return this.getToken(PSCParser.MODULO, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_mulOp;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitMulOp) {
			return visitor.visitMulOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpOpContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EXPONENT(): TerminalNode {
		return this.getToken(PSCParser.EXPONENT, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_expOp;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitExpOp) {
			return visitor.visitExpOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompOpContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQUAL(): TerminalNode {
		return this.getToken(PSCParser.EQUAL, 0);
	}
	public NEQUAL(): TerminalNode {
		return this.getToken(PSCParser.NEQUAL, 0);
	}
	public GT(): TerminalNode {
		return this.getToken(PSCParser.GT, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(PSCParser.LT, 0);
	}
	public GTEQ(): TerminalNode {
		return this.getToken(PSCParser.GTEQ, 0);
	}
	public LTEQ(): TerminalNode {
		return this.getToken(PSCParser.LTEQ, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_compOp;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitCompOp) {
			return visitor.visitCompOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public orExpr(): OrExprContext {
		return this.getTypedRuleContext(OrExprContext, 0) as OrExprContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_expr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public andExpr_list(): AndExprContext[] {
		return this.getTypedRuleContexts(AndExprContext) as AndExprContext[];
	}
	public andExpr(i: number): AndExprContext {
		return this.getTypedRuleContext(AndExprContext, i) as AndExprContext;
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(PSCParser.OR, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_orExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitOrExpr) {
			return visitor.visitOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AndExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public compExpr_list(): CompExprContext[] {
		return this.getTypedRuleContexts(CompExprContext) as CompExprContext[];
	}
	public compExpr(i: number): CompExprContext {
		return this.getTypedRuleContext(CompExprContext, i) as CompExprContext;
	}
	public AND_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.AND);
	}
	public AND(i: number): TerminalNode {
		return this.getToken(PSCParser.AND, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_andExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitAndExpr) {
			return visitor.visitAndExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public addExpr_list(): AddExprContext[] {
		return this.getTypedRuleContexts(AddExprContext) as AddExprContext[];
	}
	public addExpr(i: number): AddExprContext {
		return this.getTypedRuleContext(AddExprContext, i) as AddExprContext;
	}
	public compOp_list(): CompOpContext[] {
		return this.getTypedRuleContexts(CompOpContext) as CompOpContext[];
	}
	public compOp(i: number): CompOpContext {
		return this.getTypedRuleContext(CompOpContext, i) as CompOpContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_compExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitCompExpr) {
			return visitor.visitCompExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AddExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public mulExpr_list(): MulExprContext[] {
		return this.getTypedRuleContexts(MulExprContext) as MulExprContext[];
	}
	public mulExpr(i: number): MulExprContext {
		return this.getTypedRuleContext(MulExprContext, i) as MulExprContext;
	}
	public addOp_list(): AddOpContext[] {
		return this.getTypedRuleContexts(AddOpContext) as AddOpContext[];
	}
	public addOp(i: number): AddOpContext {
		return this.getTypedRuleContext(AddOpContext, i) as AddOpContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_addExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitAddExpr) {
			return visitor.visitAddExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MulExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expExpr_list(): ExpExprContext[] {
		return this.getTypedRuleContexts(ExpExprContext) as ExpExprContext[];
	}
	public expExpr(i: number): ExpExprContext {
		return this.getTypedRuleContext(ExpExprContext, i) as ExpExprContext;
	}
	public mulOp_list(): MulOpContext[] {
		return this.getTypedRuleContexts(MulOpContext) as MulOpContext[];
	}
	public mulOp(i: number): MulOpContext {
		return this.getTypedRuleContext(MulOpContext, i) as MulOpContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_mulExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitMulExpr) {
			return visitor.visitMulExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public unaryExpr_list(): UnaryExprContext[] {
		return this.getTypedRuleContexts(UnaryExprContext) as UnaryExprContext[];
	}
	public unaryExpr(i: number): UnaryExprContext {
		return this.getTypedRuleContext(UnaryExprContext, i) as UnaryExprContext;
	}
	public expOp_list(): ExpOpContext[] {
		return this.getTypedRuleContexts(ExpOpContext) as ExpOpContext[];
	}
	public expOp(i: number): ExpOpContext {
		return this.getTypedRuleContext(ExpOpContext, i) as ExpOpContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_expExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitExpExpr) {
			return visitor.visitExpExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public notExpr(): NotExprContext {
		return this.getTypedRuleContext(NotExprContext, 0) as NotExprContext;
	}
	public PLUS_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.PLUS);
	}
	public PLUS(i: number): TerminalNode {
		return this.getToken(PSCParser.PLUS, i);
	}
	public MINUS_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.MINUS);
	}
	public MINUS(i: number): TerminalNode {
		return this.getToken(PSCParser.MINUS, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_unaryExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitUnaryExpr) {
			return visitor.visitUnaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NotExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primaryExpr(): PrimaryExprContext {
		return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext;
	}
	public NOT_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.NOT);
	}
	public NOT(i: number): TerminalNode {
		return this.getToken(PSCParser.NOT, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_notExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitNotExpr) {
			return visitor.visitNotExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public groupExpr(): GroupExprContext {
		return this.getTypedRuleContext(GroupExprContext, 0) as GroupExprContext;
	}
	public primaryExpr(): PrimaryExprContext {
		return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext;
	}
	public LSQUARE(): TerminalNode {
		return this.getToken(PSCParser.LSQUARE, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public RSQUARE(): TerminalNode {
		return this.getToken(PSCParser.RSQUARE, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PSCParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_primaryExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitPrimaryExpr) {
			return visitor.visitPrimaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atom(): AtomContext {
		return this.getTypedRuleContext(AtomContext, 0) as AtomContext;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(PSCParser.LPAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(PSCParser.RPAREN, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_groupExpr;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitGroupExpr) {
			return visitor.visitGroupExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lits(): LitsContext {
		return this.getTypedRuleContext(LitsContext, 0) as LitsContext;
	}
	public ID(): TerminalNode {
		return this.getToken(PSCParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_atom;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitAtom) {
			return visitor.visitAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LitsContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public intLits(): IntLitsContext {
		return this.getTypedRuleContext(IntLitsContext, 0) as IntLitsContext;
	}
	public floatLits(): FloatLitsContext {
		return this.getTypedRuleContext(FloatLitsContext, 0) as FloatLitsContext;
	}
	public arrayLits(): ArrayLitsContext {
		return this.getTypedRuleContext(ArrayLitsContext, 0) as ArrayLitsContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(PSCParser.STRING, 0);
	}
	public BOOLEAN(): TerminalNode {
		return this.getToken(PSCParser.BOOLEAN, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_lits;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitLits) {
			return visitor.visitLits(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntLitsContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(PSCParser.INTEGER, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(PSCParser.MINUS, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_intLits;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitIntLits) {
			return visitor.visitIntLits(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FloatLitsContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FLOAT(): TerminalNode {
		return this.getToken(PSCParser.FLOAT, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(PSCParser.MINUS, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_floatLits;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitFloatLits) {
			return visitor.visitFloatLits(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayLitsContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LSQUARE(): TerminalNode {
		return this.getToken(PSCParser.LSQUARE, 0);
	}
	public RSQUARE(): TerminalNode {
		return this.getToken(PSCParser.RSQUARE, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PSCParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_arrayLits;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitArrayLits) {
			return visitor.visitArrayLits(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtsContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PSCParser.NEWLINE, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_stmts;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitStmts) {
			return visitor.visitStmts(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public ifStmt(): IfStmtContext {
		return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext;
	}
	public whileStmt(): WhileStmtContext {
		return this.getTypedRuleContext(WhileStmtContext, 0) as WhileStmtContext;
	}
	public doWhileStmt(): DoWhileStmtContext {
		return this.getTypedRuleContext(DoWhileStmtContext, 0) as DoWhileStmtContext;
	}
	public repeatUntilStmt(): RepeatUntilStmtContext {
		return this.getTypedRuleContext(RepeatUntilStmtContext, 0) as RepeatUntilStmtContext;
	}
	public forStmt(): ForStmtContext {
		return this.getTypedRuleContext(ForStmtContext, 0) as ForStmtContext;
	}
	public asmStmt(): AsmStmtContext {
		return this.getTypedRuleContext(AsmStmtContext, 0) as AsmStmtContext;
	}
	public inputStmt(): InputStmtContext {
		return this.getTypedRuleContext(InputStmtContext, 0) as InputStmtContext;
	}
	public outputStmt(): OutputStmtContext {
		return this.getTypedRuleContext(OutputStmtContext, 0) as OutputStmtContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_stmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitStmt) {
			return visitor.visitStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PSCParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(PSCParser.INDENT, 0);
	}
	public stmts(): StmtsContext {
		return this.getTypedRuleContext(StmtsContext, 0) as StmtsContext;
	}
	public DEDENT(): TerminalNode {
		return this.getToken(PSCParser.DEDENT, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_block;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IF(): TerminalNode {
		return this.getToken(PSCParser.IF, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public block_list(): BlockContext[] {
		return this.getTypedRuleContexts(BlockContext) as BlockContext[];
	}
	public block(i: number): BlockContext {
		return this.getTypedRuleContext(BlockContext, i) as BlockContext;
	}
	public ELSE(): TerminalNode {
		return this.getToken(PSCParser.ELSE, 0);
	}
	public ifStmt(): IfStmtContext {
		return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_ifStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitIfStmt) {
			return visitor.visitIfStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public WHILE(): TerminalNode {
		return this.getToken(PSCParser.WHILE, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_whileStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitWhileStmt) {
			return visitor.visitWhileStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DoWhileStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DO(): TerminalNode {
		return this.getToken(PSCParser.DO, 0);
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public WHILE(): TerminalNode {
		return this.getToken(PSCParser.WHILE, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_doWhileStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitDoWhileStmt) {
			return visitor.visitDoWhileStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RepeatUntilStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public REPEAT(): TerminalNode {
		return this.getToken(PSCParser.REPEAT, 0);
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public UNTIL(): TerminalNode {
		return this.getToken(PSCParser.UNTIL, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_repeatUntilStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitRepeatUntilStmt) {
			return visitor.visitRepeatUntilStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOR(): TerminalNode {
		return this.getToken(PSCParser.FOR, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(PSCParser.ID, 0);
	}
	public FROM(): TerminalNode {
		return this.getToken(PSCParser.FROM, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public TO(): TerminalNode {
		return this.getToken(PSCParser.TO, 0);
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public DOWN(): TerminalNode {
		return this.getToken(PSCParser.DOWN, 0);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_forStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitForStmt) {
			return visitor.visitForStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AsmStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lvalue(): LvalueContext {
		return this.getTypedRuleContext(LvalueContext, 0) as LvalueContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(PSCParser.ASSIGN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_asmStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitAsmStmt) {
			return visitor.visitAsmStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LvalueContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(PSCParser.ID, 0);
	}
	public lvalue(): LvalueContext {
		return this.getTypedRuleContext(LvalueContext, 0) as LvalueContext;
	}
	public LSQUARE(): TerminalNode {
		return this.getToken(PSCParser.LSQUARE, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public RSQUARE(): TerminalNode {
		return this.getToken(PSCParser.RSQUARE, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PSCParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_lvalue;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitLvalue) {
			return visitor.visitLvalue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InputStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INPUT(): TerminalNode {
		return this.getToken(PSCParser.INPUT, 0);
	}
	public lvalue(): LvalueContext {
		return this.getTypedRuleContext(LvalueContext, 0) as LvalueContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_inputStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitInputStmt) {
			return visitor.visitInputStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OutputStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OUTPUT(): TerminalNode {
		return this.getToken(PSCParser.OUTPUT, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_outputStmt;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitOutputStmt) {
			return visitor.visitOutputStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubprogramContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SUBPROGRAM(): TerminalNode {
		return this.getToken(PSCParser.SUBPROGRAM, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(PSCParser.ID, i);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(PSCParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(PSCParser.RPAREN, 0);
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PSCParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PSCParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PSCParser.RULE_subprogram;
	}
	// @Override
	public accept<Result>(visitor: PSCParserVisitor<Result>): Result {
		if (visitor.visitSubprogram) {
			return visitor.visitSubprogram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
