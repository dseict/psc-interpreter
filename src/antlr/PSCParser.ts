// Generated from ./src/antlr/PSCParser.g4 by ANTLR 4.13.2
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
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_addOp = 1;
	public static readonly RULE_mulOp = 2;
	public static readonly RULE_expOp = 3;
	public static readonly RULE_compOp = 4;
	public static readonly RULE_expr = 5;
	public static readonly RULE_orExpr = 6;
	public static readonly RULE_notExpr = 7;
	public static readonly RULE_andExpr = 8;
	public static readonly RULE_compExpr = 9;
	public static readonly RULE_addExpr = 10;
	public static readonly RULE_mulExpr = 11;
	public static readonly RULE_expExpr = 12;
	public static readonly RULE_atom = 13;
	public static readonly RULE_lits = 14;
	public static readonly RULE_intLits = 15;
	public static readonly RULE_floatLits = 16;
	public static readonly RULE_arrayLits = 17;
	public static readonly RULE_stmts = 18;
	public static readonly RULE_stmt = 19;
	public static readonly RULE_block = 20;
	public static readonly RULE_ifStmt = 21;
	public static readonly RULE_whileStmt = 22;
	public static readonly RULE_doWhileStmt = 23;
	public static readonly RULE_repeatUntilStmt = 24;
	public static readonly RULE_forStmt = 25;
	public static readonly RULE_asmStmt = 26;
	public static readonly RULE_inputStmt = 27;
	public static readonly RULE_outputStmt = 28;
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
                                                             "ID" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "addOp", "mulOp", "expOp", "compOp", "expr", "orExpr", "notExpr", 
		"andExpr", "compExpr", "addExpr", "mulExpr", "expExpr", "atom", "lits", 
		"intLits", "floatLits", "arrayLits", "stmts", "stmt", "block", "ifStmt", 
		"whileStmt", "doWhileStmt", "repeatUntilStmt", "forStmt", "asmStmt", "inputStmt", 
		"outputStmt",
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
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 33940112) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 14429) !== 0)) {
				{
				this.state = 58;
				this.stmts();
				}
			}

			this.state = 61;
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
			this.state = 63;
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
			this.state = 65;
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
			this.state = 67;
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
			this.state = 69;
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
			this.state = 71;
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
			this.state = 73;
			this.andExpr();
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===24) {
				{
				{
				this.state = 74;
				this.match(PSCParser.OR);
				this.state = 75;
				this.andExpr();
				}
				}
				this.state = 80;
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
	public notExpr(): NotExprContext {
		let localctx: NotExprContext = new NotExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, PSCParser.RULE_notExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===25) {
				{
				{
				this.state = 81;
				this.match(PSCParser.NOT);
				}
				}
				this.state = 86;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 87;
			this.compExpr();
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
		this.enterRule(localctx, 16, PSCParser.RULE_andExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 89;
			this.notExpr();
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===23) {
				{
				{
				this.state = 90;
				this.match(PSCParser.AND);
				this.state = 91;
				this.notExpr();
				}
				}
				this.state = 96;
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
		this.enterRule(localctx, 18, PSCParser.RULE_compExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 97;
			this.addExpr();
			this.state = 103;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4227858432) !== 0)) {
				{
				{
				this.state = 98;
				this.compOp();
				this.state = 99;
				this.addExpr();
				}
				}
				this.state = 105;
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
		this.enterRule(localctx, 20, PSCParser.RULE_addExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 106;
			this.mulExpr();
			this.state = 112;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 107;
					this.addOp();
					this.state = 108;
					this.mulExpr();
					}
					}
				}
				this.state = 114;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
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
		this.enterRule(localctx, 22, PSCParser.RULE_mulExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 115;
			this.expExpr();
			this.state = 121;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670016) !== 0)) {
				{
				{
				this.state = 116;
				this.mulOp();
				this.state = 117;
				this.expExpr();
				}
				}
				this.state = 123;
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
		this.enterRule(localctx, 24, PSCParser.RULE_expExpr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 124;
			this.atom();
			this.state = 130;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 125;
				this.expOp();
				this.state = 126;
				this.atom();
				}
				}
				this.state = 132;
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
	public atom(): AtomContext {
		let localctx: AtomContext = new AtomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, PSCParser.RULE_atom);
		try {
			this.state = 139;
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
				this.state = 133;
				this.lits();
				}
				break;
			case 45:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 134;
				this.match(PSCParser.ID);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 135;
				this.match(PSCParser.LPAREN);
				this.state = 136;
				this.expr();
				this.state = 137;
				this.match(PSCParser.RPAREN);
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
		this.enterRule(localctx, 28, PSCParser.RULE_lits);
		try {
			this.state = 146;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 141;
				this.intLits();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 142;
				this.floatLits();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 143;
				this.arrayLits();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 144;
				this.match(PSCParser.STRING);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 145;
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
		this.enterRule(localctx, 30, PSCParser.RULE_intLits);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 149;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 148;
				this.match(PSCParser.MINUS);
				}
			}

			this.state = 151;
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
		this.enterRule(localctx, 32, PSCParser.RULE_floatLits);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 153;
				this.match(PSCParser.MINUS);
				}
			}

			this.state = 156;
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
		this.enterRule(localctx, 34, PSCParser.RULE_arrayLits);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 158;
			this.match(PSCParser.LSQUARE);
			this.state = 167;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 33940096) !== 0) || _la===45) {
				{
				this.state = 159;
				this.expr();
				this.state = 164;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===6) {
					{
					{
					this.state = 160;
					this.match(PSCParser.COMMA);
					this.state = 161;
					this.expr();
					}
					}
					this.state = 166;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 169;
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
		this.enterRule(localctx, 36, PSCParser.RULE_stmts);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 173;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					this.state = 173;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 7:
					case 9:
					case 13:
					case 14:
					case 15:
					case 16:
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
						this.state = 171;
						this.stmt();
						}
						break;
					case 4:
						{
						this.state = 172;
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
				this.state = 175;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
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
		this.enterRule(localctx, 38, PSCParser.RULE_stmt);
		try {
			this.state = 186;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 177;
				this.expr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 178;
				this.ifStmt();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 179;
				this.whileStmt();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 180;
				this.doWhileStmt();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 181;
				this.repeatUntilStmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 182;
				this.forStmt();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 183;
				this.asmStmt();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 184;
				this.inputStmt();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 185;
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
		this.enterRule(localctx, 40, PSCParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 188;
			this.match(PSCParser.NEWLINE);
			this.state = 189;
			this.match(PSCParser.INDENT);
			this.state = 190;
			this.stmts();
			this.state = 192;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 191;
				this.match(PSCParser.NEWLINE);
				}
			}

			this.state = 194;
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
		this.enterRule(localctx, 42, PSCParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 196;
			this.match(PSCParser.IF);
			this.state = 197;
			this.expr();
			this.state = 198;
			this.block();
			this.state = 203;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				this.state = 199;
				this.match(PSCParser.ELSE);
				this.state = 200;
				this.ifStmt();
				}
				break;
			case 2:
				{
				this.state = 201;
				this.match(PSCParser.ELSE);
				this.state = 202;
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
		this.enterRule(localctx, 44, PSCParser.RULE_whileStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 205;
			this.match(PSCParser.WHILE);
			this.state = 206;
			this.expr();
			this.state = 207;
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
		this.enterRule(localctx, 46, PSCParser.RULE_doWhileStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.match(PSCParser.DO);
			this.state = 210;
			this.block();
			this.state = 211;
			this.match(PSCParser.WHILE);
			this.state = 212;
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
		this.enterRule(localctx, 48, PSCParser.RULE_repeatUntilStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 214;
			this.match(PSCParser.REPEAT);
			this.state = 215;
			this.block();
			this.state = 216;
			this.match(PSCParser.UNTIL);
			this.state = 217;
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
		this.enterRule(localctx, 50, PSCParser.RULE_forStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 219;
			this.match(PSCParser.FOR);
			this.state = 220;
			this.match(PSCParser.ID);
			this.state = 221;
			this.match(PSCParser.FROM);
			this.state = 222;
			this.expr();
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 223;
				this.match(PSCParser.DOWN);
				}
			}

			this.state = 226;
			this.match(PSCParser.TO);
			this.state = 227;
			this.expr();
			this.state = 228;
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
		this.enterRule(localctx, 52, PSCParser.RULE_asmStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			this.match(PSCParser.ID);
			this.state = 231;
			this.match(PSCParser.ASSIGN);
			this.state = 232;
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
	public inputStmt(): InputStmtContext {
		let localctx: InputStmtContext = new InputStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, PSCParser.RULE_inputStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 234;
			this.match(PSCParser.INPUT);
			this.state = 235;
			this.match(PSCParser.ID);
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
		this.enterRule(localctx, 56, PSCParser.RULE_outputStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 237;
			this.match(PSCParser.OUTPUT);
			this.state = 238;
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

	public static readonly _serializedATN: number[] = [4,1,45,241,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,1,0,3,0,60,8,0,1,0,1,0,1,1,1,
	1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,6,5,6,77,8,6,10,6,12,6,80,9,
	6,1,7,5,7,83,8,7,10,7,12,7,86,9,7,1,7,1,7,1,8,1,8,1,8,5,8,93,8,8,10,8,12,
	8,96,9,8,1,9,1,9,1,9,1,9,5,9,102,8,9,10,9,12,9,105,9,9,1,10,1,10,1,10,1,
	10,5,10,111,8,10,10,10,12,10,114,9,10,1,11,1,11,1,11,1,11,5,11,120,8,11,
	10,11,12,11,123,9,11,1,12,1,12,1,12,1,12,5,12,129,8,12,10,12,12,12,132,
	9,12,1,13,1,13,1,13,1,13,1,13,1,13,3,13,140,8,13,1,14,1,14,1,14,1,14,1,
	14,3,14,147,8,14,1,15,3,15,150,8,15,1,15,1,15,1,16,3,16,155,8,16,1,16,1,
	16,1,17,1,17,1,17,1,17,5,17,163,8,17,10,17,12,17,166,9,17,3,17,168,8,17,
	1,17,1,17,1,18,1,18,4,18,174,8,18,11,18,12,18,175,1,19,1,19,1,19,1,19,1,
	19,1,19,1,19,1,19,1,19,3,19,187,8,19,1,20,1,20,1,20,1,20,3,20,193,8,20,
	1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,204,8,21,1,22,1,22,1,
	22,1,22,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,25,1,25,1,25,
	1,25,1,25,3,25,225,8,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,27,1,
	27,1,27,1,28,1,28,1,28,1,28,0,0,29,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
	28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,0,3,1,0,17,18,1,0,19,21,1,
	0,26,31,243,0,59,1,0,0,0,2,63,1,0,0,0,4,65,1,0,0,0,6,67,1,0,0,0,8,69,1,
	0,0,0,10,71,1,0,0,0,12,73,1,0,0,0,14,84,1,0,0,0,16,89,1,0,0,0,18,97,1,0,
	0,0,20,106,1,0,0,0,22,115,1,0,0,0,24,124,1,0,0,0,26,139,1,0,0,0,28,146,
	1,0,0,0,30,149,1,0,0,0,32,154,1,0,0,0,34,158,1,0,0,0,36,173,1,0,0,0,38,
	186,1,0,0,0,40,188,1,0,0,0,42,196,1,0,0,0,44,205,1,0,0,0,46,209,1,0,0,0,
	48,214,1,0,0,0,50,219,1,0,0,0,52,230,1,0,0,0,54,234,1,0,0,0,56,237,1,0,
	0,0,58,60,3,36,18,0,59,58,1,0,0,0,59,60,1,0,0,0,60,61,1,0,0,0,61,62,5,0,
	0,1,62,1,1,0,0,0,63,64,7,0,0,0,64,3,1,0,0,0,65,66,7,1,0,0,66,5,1,0,0,0,
	67,68,5,22,0,0,68,7,1,0,0,0,69,70,7,2,0,0,70,9,1,0,0,0,71,72,3,12,6,0,72,
	11,1,0,0,0,73,78,3,16,8,0,74,75,5,24,0,0,75,77,3,16,8,0,76,74,1,0,0,0,77,
	80,1,0,0,0,78,76,1,0,0,0,78,79,1,0,0,0,79,13,1,0,0,0,80,78,1,0,0,0,81,83,
	5,25,0,0,82,81,1,0,0,0,83,86,1,0,0,0,84,82,1,0,0,0,84,85,1,0,0,0,85,87,
	1,0,0,0,86,84,1,0,0,0,87,88,3,18,9,0,88,15,1,0,0,0,89,94,3,14,7,0,90,91,
	5,23,0,0,91,93,3,14,7,0,92,90,1,0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,94,95,
	1,0,0,0,95,17,1,0,0,0,96,94,1,0,0,0,97,103,3,20,10,0,98,99,3,8,4,0,99,100,
	3,20,10,0,100,102,1,0,0,0,101,98,1,0,0,0,102,105,1,0,0,0,103,101,1,0,0,
	0,103,104,1,0,0,0,104,19,1,0,0,0,105,103,1,0,0,0,106,112,3,22,11,0,107,
	108,3,2,1,0,108,109,3,22,11,0,109,111,1,0,0,0,110,107,1,0,0,0,111,114,1,
	0,0,0,112,110,1,0,0,0,112,113,1,0,0,0,113,21,1,0,0,0,114,112,1,0,0,0,115,
	121,3,24,12,0,116,117,3,4,2,0,117,118,3,24,12,0,118,120,1,0,0,0,119,116,
	1,0,0,0,120,123,1,0,0,0,121,119,1,0,0,0,121,122,1,0,0,0,122,23,1,0,0,0,
	123,121,1,0,0,0,124,130,3,26,13,0,125,126,3,6,3,0,126,127,3,26,13,0,127,
	129,1,0,0,0,128,125,1,0,0,0,129,132,1,0,0,0,130,128,1,0,0,0,130,131,1,0,
	0,0,131,25,1,0,0,0,132,130,1,0,0,0,133,140,3,28,14,0,134,140,5,45,0,0,135,
	136,5,7,0,0,136,137,3,10,5,0,137,138,5,8,0,0,138,140,1,0,0,0,139,133,1,
	0,0,0,139,134,1,0,0,0,139,135,1,0,0,0,140,27,1,0,0,0,141,147,3,30,15,0,
	142,147,3,32,16,0,143,147,3,34,17,0,144,147,5,13,0,0,145,147,5,16,0,0,146,
	141,1,0,0,0,146,142,1,0,0,0,146,143,1,0,0,0,146,144,1,0,0,0,146,145,1,0,
	0,0,147,29,1,0,0,0,148,150,5,18,0,0,149,148,1,0,0,0,149,150,1,0,0,0,150,
	151,1,0,0,0,151,152,5,14,0,0,152,31,1,0,0,0,153,155,5,18,0,0,154,153,1,
	0,0,0,154,155,1,0,0,0,155,156,1,0,0,0,156,157,5,15,0,0,157,33,1,0,0,0,158,
	167,5,9,0,0,159,164,3,10,5,0,160,161,5,6,0,0,161,163,3,10,5,0,162,160,1,
	0,0,0,163,166,1,0,0,0,164,162,1,0,0,0,164,165,1,0,0,0,165,168,1,0,0,0,166,
	164,1,0,0,0,167,159,1,0,0,0,167,168,1,0,0,0,168,169,1,0,0,0,169,170,5,10,
	0,0,170,35,1,0,0,0,171,174,3,38,19,0,172,174,5,4,0,0,173,171,1,0,0,0,173,
	172,1,0,0,0,174,175,1,0,0,0,175,173,1,0,0,0,175,176,1,0,0,0,176,37,1,0,
	0,0,177,187,3,10,5,0,178,187,3,42,21,0,179,187,3,44,22,0,180,187,3,46,23,
	0,181,187,3,48,24,0,182,187,3,50,25,0,183,187,3,52,26,0,184,187,3,54,27,
	0,185,187,3,56,28,0,186,177,1,0,0,0,186,178,1,0,0,0,186,179,1,0,0,0,186,
	180,1,0,0,0,186,181,1,0,0,0,186,182,1,0,0,0,186,183,1,0,0,0,186,184,1,0,
	0,0,186,185,1,0,0,0,187,39,1,0,0,0,188,189,5,4,0,0,189,190,5,1,0,0,190,
	192,3,36,18,0,191,193,5,4,0,0,192,191,1,0,0,0,192,193,1,0,0,0,193,194,1,
	0,0,0,194,195,5,2,0,0,195,41,1,0,0,0,196,197,5,32,0,0,197,198,3,10,5,0,
	198,203,3,40,20,0,199,200,5,33,0,0,200,204,3,42,21,0,201,202,5,33,0,0,202,
	204,3,40,20,0,203,199,1,0,0,0,203,201,1,0,0,0,203,204,1,0,0,0,204,43,1,
	0,0,0,205,206,5,34,0,0,206,207,3,10,5,0,207,208,3,40,20,0,208,45,1,0,0,
	0,209,210,5,35,0,0,210,211,3,40,20,0,211,212,5,34,0,0,212,213,3,10,5,0,
	213,47,1,0,0,0,214,215,5,36,0,0,215,216,3,40,20,0,216,217,5,37,0,0,217,
	218,3,10,5,0,218,49,1,0,0,0,219,220,5,38,0,0,220,221,5,45,0,0,221,222,5,
	39,0,0,222,224,3,10,5,0,223,225,5,40,0,0,224,223,1,0,0,0,224,225,1,0,0,
	0,225,226,1,0,0,0,226,227,5,41,0,0,227,228,3,10,5,0,228,229,3,40,20,0,229,
	51,1,0,0,0,230,231,5,45,0,0,231,232,5,42,0,0,232,233,3,10,5,0,233,53,1,
	0,0,0,234,235,5,43,0,0,235,236,5,45,0,0,236,55,1,0,0,0,237,238,5,44,0,0,
	238,239,3,10,5,0,239,57,1,0,0,0,20,59,78,84,94,103,112,121,130,139,146,
	149,154,164,167,173,175,186,192,203,224];

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


export class NotExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public compExpr(): CompExprContext {
		return this.getTypedRuleContext(CompExprContext, 0) as CompExprContext;
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


export class AndExprContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public notExpr_list(): NotExprContext[] {
		return this.getTypedRuleContexts(NotExprContext) as NotExprContext[];
	}
	public notExpr(i: number): NotExprContext {
		return this.getTypedRuleContext(NotExprContext, i) as NotExprContext;
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
	public atom_list(): AtomContext[] {
		return this.getTypedRuleContexts(AtomContext) as AtomContext[];
	}
	public atom(i: number): AtomContext {
		return this.getTypedRuleContext(AtomContext, i) as AtomContext;
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
	public ID(): TerminalNode {
		return this.getToken(PSCParser.ID, 0);
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


export class InputStmtContext extends ParserRuleContext {
	constructor(parser?: PSCParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INPUT(): TerminalNode {
		return this.getToken(PSCParser.INPUT, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(PSCParser.ID, 0);
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
