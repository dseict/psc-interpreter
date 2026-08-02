// Generated from ./src/antlr/PSCParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./PSCParser.js";
import { AddOpContext } from "./PSCParser.js";
import { MulOpContext } from "./PSCParser.js";
import { ExpOpContext } from "./PSCParser.js";
import { CompOpContext } from "./PSCParser.js";
import { ExprContext } from "./PSCParser.js";
import { OrExprContext } from "./PSCParser.js";
import { NotExprContext } from "./PSCParser.js";
import { AndExprContext } from "./PSCParser.js";
import { CompExprContext } from "./PSCParser.js";
import { AddExprContext } from "./PSCParser.js";
import { MulExprContext } from "./PSCParser.js";
import { ExpExprContext } from "./PSCParser.js";
import { AtomContext } from "./PSCParser.js";
import { LitsContext } from "./PSCParser.js";
import { StmtsContext } from "./PSCParser.js";
import { StmtContext } from "./PSCParser.js";
import { BlockContext } from "./PSCParser.js";
import { IfStmtContext } from "./PSCParser.js";
import { WhileStmtContext } from "./PSCParser.js";
import { DoWhileStmtContext } from "./PSCParser.js";
import { RepeatUntilStmtContext } from "./PSCParser.js";
import { ForStmtContext } from "./PSCParser.js";
import { AsmStmtContext } from "./PSCParser.js";
import { InputStmtContext } from "./PSCParser.js";
import { OutputStmtContext } from "./PSCParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PSCParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class PSCParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `PSCParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.addOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddOp?: (ctx: AddOpContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.mulOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMulOp?: (ctx: MulOpContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.expOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpOp?: (ctx: ExpOpContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.compOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompOp?: (ctx: CompOpContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.orExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpr?: (ctx: OrExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.notExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpr?: (ctx: NotExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.andExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpr?: (ctx: AndExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.compExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompExpr?: (ctx: CompExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.addExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddExpr?: (ctx: AddExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.mulExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMulExpr?: (ctx: MulExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.expExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpExpr?: (ctx: ExpExprContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom?: (ctx: AtomContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.lits`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLits?: (ctx: LitsContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.stmts`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmts?: (ctx: StmtsContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.ifStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStmt?: (ctx: IfStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.whileStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStmt?: (ctx: WhileStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.doWhileStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoWhileStmt?: (ctx: DoWhileStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.repeatUntilStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeatUntilStmt?: (ctx: RepeatUntilStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.forStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStmt?: (ctx: ForStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.asmStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAsmStmt?: (ctx: AsmStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.inputStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInputStmt?: (ctx: InputStmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PSCParser.outputStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutputStmt?: (ctx: OutputStmtContext) => Result;
}

