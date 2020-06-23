/**
 * Diagnostic types
 */

/**
 * The base type of all types which represent some kind of diagnostic.
 */
export interface Diagnostic {
  kind: /* Message */ 0 | /* Warning */ 1 | /* Error */ 2 | /* Hint */ 3;
  source: any;
  message: string;
  start: number;
  end: number;
}

/**
 * The Escaya AST specification
 */

export interface Position {
  /**
   * Line number (1-indexed)
   */
  line: number;
  /**
   * Column number on the line (0-indexed)
   */
  column: number;
}

export interface SourceLocation {
  /**
   * The position of the first character of the parsed source region
   */
  start: Position;
  /**
   * The position of the first character after the parsed source region
   */
  end: Position;
}

export interface BaseNode {
  location?: SourceLocation;

  /**
   * The position of the first character of the parsed source region
   */
  start?: number;

  /**
   * The position of the first character of the parsed source region
   */
  end?: number;

  /*
   * An optional linear incrementing id to be used to optionally store
   * 4 * 4 bytes (32bit for start, stop, col, line) per
   * node as a blob of binary data on the 'buffer' property on the 'RootNode'.
   */

  id?: number;

  /*
   * Optionally stores comments as meta-data on adjacent nodes
   */
  comments?: Comment[];

  /**
   * Optionally track the state on each node upon incremental parsing
   */
  nodeFlags?: number;

  parent?: any;
}

/*
 * Comments and their different types
 */
export type CommentType = 'MultiLine' | 'SingleLine' | 'HTMLClose' | 'HTMLOpen' | 'SheBang';

export interface Comment extends BaseNode {
  type: CommentType;
  value: string;
  hasTrailingNewLine?: boolean;
}

// Every single valid AST Node

export type Node =
  | ArrayLiteral
  | ArrowFunction
  | ArrayAssignmentPattern
  | ArrayObjectPattern
  | ArrayBindingPattern
  | AssignmentExpression
  | AssignmentPattern
  | AssignmentRestElement
  | AwaitExpression
  | BigIntLiteral
  | BinaryExpression
  | BindingRestElement
  | BindingElement
  | BindingRestProperty
  | BlockStatement
  | BreakStatement
  | CallExpression
  | CaseClause
  | CatchClause
  | ClassDeclaration
  | ClassExpression
  | ConciseBody
  | CommaOperator
  | SpreadElement
  | ConditionalExpression
  | ContinueStatement
  | CoverInitializedName
  | DebuggerStatement
  | DefaultClause
  | DoWhileStatement
  | EmptyStatement
  | MissingList
  | Elision
  | ExportDeclaration
  | ExportSpecifier
  | ExpressionStatement
  | ForBinding
  | ForAwaitStatement
  | ForDeclaration
  | ForInStatement
  | FormalParameters
  | ForOfStatement
  | ForStatement
  | FunctionDeclaration
  | FunctionExpression
  | FunctionBody
  | FunctionRestParameter
  | Identifier
  | IdentifierReference
  | IdentifierName
  | LabelIdentifier
  | BindingIdentifier
  | IfStatement
  | ImportCall
  | ImportDeclaration
  | ImportMeta
  | ImportSpecifier
  | LabelledStatement
  | BooleanLiteral
  | NumericLiteral
  | NullLiteral
  | RegularExpressionLiteral
  | StringLiteral
  | MemberExpression
  | MethodDefinition
  | Module
  | NewTarget
  | PrivateName
  | PropertyDefinition
  | BindingProperty
  | NewExpression
  | ObjectLiteral
  | OptionalExpression
  | TokenNode
  | MemberChain
  | CallChain
  | PrefixUpdateExpression
  | PostfixUpdateExpression
  | ParenthesizedExpression
  | Script
  | ReturnStatement
  | SuperCall
  | SuperProperty
  | SwitchStatement
  | SpreadElement
  | TemplateExpression
  | TemplateElement
  | TemplateLiteral
  | ThisExpression
  | ThrowStatement
  | TryStatement
  | UnaryExpression
  | UniqueFormalParameters
  | VariableStatement
  | VariableDeclaration
  | LexicalDeclaration
  | LexicalBinding
  | BindingPattern
  | ObjectBindingPattern
  | ObjectAssignmentPattern
  | Synthetic
  | WhileStatement
  | WithStatement
  | YieldExpression;

export type StatementList = Statement | Declaration;
export type StatementListItem = Statement | Declaration;
export type Declaration = FunctionDeclaration | ClassDeclaration | LexicalDeclaration;

export type ShortCircuit =
  | BinaryExpression
  | AwaitExpression
  | UnaryExpression
  | UpdateExpression
  | LeftHandSideExpression;
export type Expression =
  | ArrowFunction
  | AssignmentExpression
  | ShortCircuit
  | CommaOperator
  | ConditionalExpression
  | LeftHandSideExpression
  | BindingPattern
  | NewExpression
  | YieldExpression;
export type LeftHandSideExpression =
  | CallExpression
  | ImportCall
  | ClassExpression
  | ClassDeclaration
  | FunctionExpression
  | BigIntLiteral
  | BooleanLiteral
  | NumericLiteral
  | NullLiteral
  | OptionalExpression
  | PrimaryExpression
  | PostfixUpdateExpression
  | PrefixUpdateExpression
  | RegularExpressionLiteral
  | StringLiteral
  | TemplateLiteral
  | TemplateExpression
  | MemberExpression
  | ArrowFunction;
export type PrimaryExpression =
  | ArrayLiteral
  | BigIntLiteral
  | BooleanLiteral
  | ClassExpression
  | FunctionExpression
  | IdentifierReference
  | ImportMeta
  | ImportCall
  | BooleanLiteral
  | NumericLiteral
  | NullLiteral
  | RegularExpressionLiteral
  | StringLiteral
  | Parenthesized
  | PostfixUpdateExpression
  | PrefixUpdateExpression
  | MemberExpression
  | RegularExpressionLiteral
  | StringLiteral
  | TemplateLiteral
  | ObjectLiteral
  | SpreadElement
  | SuperCall
  | NewExpression
  | SuperProperty
  | Synthetic
  | TemplateLiteral
  | UnaryExpression
  | ThisExpression;
export type Statement =
  | BlockStatement
  | BreakStatement
  | ContinueStatement
  | ClassDeclaration
  | DebuggerStatement
  | EmptyStatement
  | ExpressionStatement
  | HoistableDeclaration
  | IfStatement
  | ForStatement
  | ForInStatement
  | ForOfStatement
  | ForAwaitStatement
  | IterationStatement
  | LabelledStatement
  | LexicalDeclaration
  | ReturnStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | VariableStatement
  | WithStatement;

///////////////
// Escaya AST Nodes
///////////////

export type Parenthesized = ParenthesizedExpression | ArrowFunction;

export interface ParenthesizedExpression extends BaseNode {
  type: 'ParenthesizedExpression';
  expression: AssignmentExpression | CommaOperator;
}

export interface CommaOperator extends BaseNode {
  type: 'CommaOperator';
  leafs: Expression[];
}

export interface Elision extends BaseNode {
  type: 'Elision';
}

export interface ArrayLiteral extends BaseNode {
  type: 'ArrayLiteral';
  // The elements of the array literal; a 'Elision' node represents an elision.
  leafs: (SpreadElement | AssignmentExpression | Elision)[];
}

export interface FunctionRestParameter extends BaseNode {
  type: 'FunctionRestParameter';
  argument: ArrayBindingPattern | BindingIdentifier | ObjectBindingPattern;
}

export interface BindingRestProperty extends BaseNode {
  type: 'BindingRestProperty';
  argument: BindingIdentifier;
}

export interface BindingRestElement extends BaseNode {
  type: 'BindingRestElement';
  argument: BindingIdentifier | BindingPattern;
}

export interface SpreadElement extends BaseNode {
  type: 'SpreadElement';
  argument: AssignmentExpression;
  parent?: ArrayLiteral | CallExpression | NewExpression;
}

export type ArrowFormals = IdentifierReference | FormalParameters | SpreadElement;

// `ArrowFunction`,
// `AsyncArrowFunction`
export interface ArrowFunction extends BaseNode {
  type: 'ArrowFunction';
  params: ArrowFormals[];
  contents: ConciseBody | FunctionBody;
  // True for `AsyncArrowFunction`, false otherwise.
  async: boolean;
}

export interface ConciseBody extends BaseNode {
  type: 'ConciseBody';
  body: Expression;
}

export type AssignOp = AssignmentOperator | LogicalAssignmentOperator;

export type AssignmentOperator =
  | '='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '<<='
  | '>>='
  | '>>>='
  | '|='
  | '^='
  | '&='
  | '**=';

export type LogicalAssignmentOperator = '||=' | '&&=' | '??=';

export interface AssignmentExpression extends BaseNode {
  type: 'AssignmentExpression';
  operator: TokenNode | LogicalAssignmentOperator | AssignmentOperator;
  left: Expression | Identifier | ArrayBindingPattern | ObjectBindingPattern;
  right: Expression;
}

export interface AwaitExpression extends BaseNode {
  type: 'AwaitExpression';
  expression: any;
}

// The set of syntax tokens which are valid binary expression operators.
export type BinaryOperator =
  | '||'
  | '&&'
  | '|'
  | '^'
  | '&'
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'in'
  | 'instanceof'
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '**'
  | '??';

export interface BinaryExpression extends BaseNode {
  type: 'BinaryExpression';
  // The expression before the operator.
  left: Expression;
  operator: TokenNode | BinaryOperator;
  // The expression after the operator.
  right: Expression;
}

export interface BlockStatement extends BaseNode {
  type: 'BlockStatement';
  statements: (FunctionBody | Statement)[];
}

export interface BreakStatement extends BaseNode {
  type: 'BreakStatement';
  label: LabelIdentifier | null;
}

export interface ContinueStatement extends BaseNode {
  type: 'ContinueStatement';
  label: LabelIdentifier | null;
}

export interface CallExpression extends BaseNode {
  type: 'CallExpression';
  expression: LeftHandSideExpression;
  arguments: Arguments[];
}

export interface ClassDeclaration extends BaseNode {
  type: 'ClassDeclaration';
  // *only* 'null' in recovery mode
  name: BindingIdentifier | null;
  super: LeftHandSideExpression | null;
  leafs: ClassElement[];
}

export interface ClassExpression extends BaseNode {
  type: 'ClassExpression';
  name: BindingIdentifier | null;
  super: LeftHandSideExpression | null;
  leafs: ClassElement[];
}

export interface ClassElement extends BaseNode {
  type: 'ClassElement';
  // True if `IsStatic` of ClassElement is true.
  static: boolean;
  method: MethodDefinition;
  parent?: ClassExpression | ClassDeclaration;
}

export interface ConditionalExpression extends BaseNode {
  type: 'ConditionalExpression';
  // The `ShortCircuitExpression`.
  shortCircuit: BinaryExpression | Expression;
  // The first `AssignmentExpression`.
  consequent: Expression;
  // The second `AssignmentExpression`.
  alternate: Expression;
}

export interface DebuggerStatement extends BaseNode {
  type: 'DebuggerStatement';
}

export interface EmptyStatement extends BaseNode {
  type: 'EmptyStatement';
}

export interface ExpressionStatement extends BaseNode {
  type: 'ExpressionStatement';
  expression: Expression;
  parent?: Module | Script;
}

export type ForInOfLeft = IdentifierReference | ForDeclaration | BindingPattern;

// `for ( LeftHandSideExpression in Expression ) Statement`,
// `for ( var ForBinding in Expression ) Statement`,
// `for ( ForDeclaration in Expression ) Statement`,
// `for ( var BindingIdentifier Initializer in Expression ) Statement`
export interface ForInStatement extends IterationStatement {
  type: 'ForInStatement';
  // The expression or declaration before `in`.
  initializer: IdentifierReference | ForDeclaration | BindingPattern | Expression;
}

// `for ( LeftHandSideExpression of Expression ) Statement`,
// `for ( var ForBinding of AssignmentExpression ) Statement`,
// `for ( ForDeclaration of Expression ) Statement`
export interface ForOfStatement extends IterationStatement {
  type: 'ForOfStatement';
  // The expression or declaration before `of`.
  initializer: IdentifierReference | ForDeclaration | BindingPattern | Expression;
}

// `for await ( LeftHandSideExpression of Expression ) Statement`,
// `for await ( var ForBinding of AssignmentExpression ) Statement`,
// `for await ( ForDeclaration of Expression ) Statement`
export interface ForAwaitStatement extends IterationStatement {
  type: 'ForAwaitStatement';
  // The expression or declaration before `of`.
  initializer: IdentifierReference | ForDeclaration | BindingPattern | Expression;
}

export type ForDeclarationKind = 'let' | 'const' | 'var';

// `ForDeclaration :: LetOrConst : ForBinding`
export interface ForDeclaration extends BaseNode {
  type: 'ForDeclaration';
  kind: ForDeclarationKind;
  declarations: ForBinding | LexicalBinding | VariableDeclaration | null;
}

// `for ( Expression ; Expression ; Expression ) Statement`,
// `for ( var VariableDeclarationList ; Expression ; Expression ) Statement`
export interface ForStatement extends BaseNode {
  type: 'ForStatement';
  // The expression or declaration before the first `;`, if present
  initializer: Expression | VariableDeclaration | null;
  // The expression before the second `;`, if present
  condition: Expression | null;
  // The expression after the second `;`, if present
  incrementor: Expression | null;
  statement: Statement;
}

export interface FunctionBody extends BaseNode {
  type: 'FunctionBody';
  directives: string[];
  statements: Statement[];
}

interface FunctionDeclarationBase extends BaseNode {
  name: BindingIdentifier | null;
  // True for `GeneratorExpression` and `GeneratorDeclaration`, false otherwise.
  generator: boolean;
  // True for `AsyncFunctionExpression` and `AsyncFunctionDeclaration`, false otherwise.
  async: boolean;
  params: FormalParameters[];
  contents: FunctionBody;
}

// `FunctionDeclaration`, `GeneratorDeclaration`, `AsyncFunctionDeclaration`
export interface FunctionDeclaration extends BaseNode {
  type: 'FunctionDeclaration';
  name: BindingIdentifier | null;
  // True for `GeneratorExpression` and `GeneratorDeclaration`, false otherwise.
  generator: boolean;
  // True for `AsyncFunctionExpression` and `AsyncFunctionDeclaration`, false otherwise.
  async: boolean;
  params: MissingList | FormalParameters[];
  contents: FunctionBody;
}

// `FunctionExpresssion`, `GeneratorExpresssion`, `AsyncExpresssion`
export interface FunctionExpression extends FunctionDeclarationBase {
  type: 'FunctionExpression';
}

export interface LabelIdentifier extends BaseNode {
  type: 'LabelIdentifier';
  name: string;
}

//  Identifier:: IdentifierName but not ReservedWord
export interface IdentifierName extends BaseNode {
  type: 'IdentifierName';
  name: string;
}

export interface IdentifierReference extends BaseNode {
  type: 'IdentifierReference';
  name: string;
}

export interface BindingIdentifier extends BaseNode {
  type: 'BindingIdentifier';
  name: string;
}

export interface Identifier extends BaseNode {
  type: 'Identifier';
  name: string;
}

// `if ( Expression ) Statement`,
// `if ( Expression ) Statement else Statement`
export interface IfStatement extends BaseNode {
  type: 'IfStatement';
  expression: any;
  // The first `Statement`.
  consequent: Statement;
  // The second `Statement`, if present.
  alternate: Statement | null;
}

export type ImportOrExport = ExportDeclaration | ImportDeclaration;

export interface ImportClause extends BaseNode {
  defaultBinding: BindingIdentifier | null;
  namedImports: ImportSpecifier[];
  namedBinding: BindingIdentifier | null;
  parent?: Script | Module;
}

export interface ImportDeclaration extends ImportClause {
  type: 'ImportDeclaration';
  fromClause: StringLiteral | null;
  moduleSpecifier: StringLiteral | null;
}

export interface ImportSpecifier extends BaseNode {
  type: 'ImportSpecifier';
  name: IdentifierName | BindingIdentifier;
  // Name preceding "as" keyword (or null when "as" is absent)
  binding: IdentifierName | BindingIdentifier | null;
  parent?: ImportDeclaration;
}

export type ExportDeclarations =
  | AssignmentExpression
  | VariableStatement
  | LexicalDeclaration
  | FunctionDeclaration
  | ClassDeclaration
  | LexicalDeclaration;

export interface ExportDeclaration extends BaseNode {
  type: 'ExportDeclaration';
  declaration: ExportDeclarations | null;
  default: boolean;
  namedExports: ExportSpecifier[];
  namedBinding: IdentifierName | null;
  fromClause: StringLiteral | null;
  parent?: Script | Module;
}

export interface ExportSpecifier extends BaseNode {
  type: 'ExportSpecifier';
  name: IdentifierName;
  exportedName: IdentifierName | null;
  parent?: ImportDeclaration;
}

export type HoistableDeclaration = BaseNode;

export interface LabelledStatement extends BaseNode {
  type: 'LabelledStatement';
  label: LabelIdentifier;
  labelledItem: Statement;
}

export interface NewTarget extends BaseNode {
  type: 'NewTarget';
}

export interface NewExpression extends BaseNode {
  type: 'NewExpression';
  expression: Expression;
  arguments: Arguments[];
}

export type Arguments = Expression | AssignmentRestElement;

export interface AssignmentRestElement extends BaseNode {
  type: 'AssignmentRestElement';
  argument: Expression;
}

export interface NumericLiteral extends BaseNode {
  type: 'NumericLiteral';
  value: number;
}

export interface BigIntLiteral extends BaseNode {
  type: 'BigIntLiteral';
  value: number | null;
}
export type RegExpFlags = 'g' | 'i' | 'm' | 'u' | 's' | 'y';

export interface RegularExpressionLiteral extends BaseNode {
  type: 'RegularExpressionLiteral';
  pattern: string;
  flags: RegExpFlags;
}

export interface StringLiteral extends BaseNode {
  type: 'StringLiteral';
  value: string;
}

export interface NullLiteral extends BaseNode {
  type: 'NullLiteral';
  value: null;
}

export interface BooleanLiteral extends BaseNode {
  type: 'BooleanLiteral';
  value: boolean;
}

export interface ObjectLiteral extends BaseNode {
  type: 'ObjectLiteral';
  properties: (IdentifierReference | MethodDefinition | PropertyDefinition)[];
}

export type PropertyDefinitions =
  | PropertyDefinition
  | BindingProperty
  | SpreadElement
  | IdentifierReference
  | BindingIdentifier
  | BindingRestProperty
  | BindingRestElement
  | BindingElement
  | CoverInitializedName
  | MethodDefinition;

// `PropertyDefinition :: PropertyName : AssignmentExpression`
export interface PropertyDefinition extends BaseNode {
  type: 'PropertyDefinition';
  key: IdentifierName | NumericLiteral | StringLiteral | BigIntLiteral | null;
  // The `AssignmentExpression`.
  value: Expression | PrivateName;
  computed: boolean;
  static?: boolean;
  private?: boolean;
  parent?: ObjectLiteral;
}

export interface AssignmentProperty extends BaseNode {
  type: 'AssignmentProperty';
  key: BindingIdentifier | NumericLiteral | StringLiteral | PrivateName;
  value: BindingPattern | BindingIdentifier;
  computed: boolean;
  static?: boolean;
  private?: boolean;
  parent?: ObjectBindingPattern | ObjectAssignmentPattern;
}

export interface BindingProperty extends BaseNode {
  type: 'BindingProperty';
  key: BindingIdentifier | NumericLiteral | StringLiteral | PrivateName;
  value: BindingPattern | BindingIdentifier;
  computed: boolean;
  static?: boolean;
  private?: boolean;
  parent?: ObjectBindingPattern | ObjectAssignmentPattern;
}

export interface MethodDefinition extends BaseNode {
  type: 'MethodDefinition';
  async: boolean;
  generator: boolean;
  propertySetParameterList: BindingElement[];
  uniqueFormalParameters: FormalParameters[];
  name: Expression | PrivateName;
  contents: FunctionBody;
  parent?: ObjectLiteral | ClassElement;
}

export interface PrivateName extends BaseNode {
  type: 'PrivateName';
  id: any;
}

/* internal */
interface Program extends BaseNode {
  directives: string[];
  leafs: (ImportOrExport | Statement)[];
  // True if additional ECMAScript features for Web Browsers are enabled
  webCompat: boolean;
}

export interface Script extends Program {
  type: 'Script';
}

export interface Module extends Program {
  type: 'Module';
}

export interface ReturnStatement extends BaseNode {
  type: 'ReturnStatement';
  expression: Expression | null;
  parent?: FunctionBody | ConciseBody;
}

export interface SuperCall extends BaseNode {
  type: 'SuperCall';
  arguments: Arguments[];
}
export interface SuperProperty extends BaseNode {
  type: 'SuperProperty';
  expression: Expression | null;
  name: IdentifierName | null;
}

export interface SwitchStatement extends BaseNode {
  type: 'SwitchStatement';
  expression: Expression;
  clauses: (DefaultClause | CaseClause)[];
}

interface ClauseBase extends BaseNode {
  statements: Statement[];
  parent?: SwitchStatement;
}

export interface CaseClause extends ClauseBase {
  type: 'CaseClause';
  expression: Expression;
}

export interface DefaultClause extends ClauseBase {
  type: 'DefaultClause';
}

export interface TemplateExpression extends BaseNode {
  // The second `MemberExpression` or `CallExpression`, if present.
  type: 'TemplateExpression';
  expression: LeftHandSideExpression | null;
  // The contents of the template. This list must be alternating
  // TemplateElements and Expressions, beginning and ending with
  // TemplateElement.
  tag: Expression | TemplateElement;
}

export interface TemplateElement extends BaseNode {
  type: 'TemplateElement';
  raw: string;
  cooked: string;
}

export interface TemplateLiteral extends BaseNode {
  type: 'TemplateLiteral';
  leafs: TemplateElement[];
  expressions: Expression[];
}

export interface ThisExpression extends BaseNode {
  type: 'ThisExpression';
}

export interface ThrowStatement extends BaseNode {
  type: 'ThrowStatement';
  expression: Expression;
}

export interface TryStatement extends BaseNode {
  type: 'TryStatement';
  // The `Block`.
  block: BlockStatement;
  // The `Catch`, if present.
  catchClause: CatchClause | null;
  // The `Finally`.
  finalizer: BlockStatement | null;
}

export interface CatchClause extends BaseNode {
  type: 'CatchClause';
  binding: BindingPattern | BindingIdentifier | LexicalBinding | null;
  block: BlockStatement;
  parent?: TryStatement;
}

export type UpdateOperator = '++' | '--';

interface UpdateExpressionBase extends BaseNode {
  // True for `UpdateExpression :: ++ LeftHandSideExpression` and
  // `UpdateExpression :: -- LeftHandSideExpression`, false otherwise.
  operator: TokenNode | UpdateOperator;
  operand: LeftHandSideExpression;
}

export type UpdateExpression = PrefixUpdateExpression | PostfixUpdateExpression;

// Instead of reserving one byte for a 'isPrefix' property - 'UpdateExpression'
// are separated into 'PrefixUpdateExpression' and 'PostfixUpdateExpression'
export interface PrefixUpdateExpression extends UpdateExpressionBase {
  type: 'PrefixUpdateExpression';
}

export interface PostfixUpdateExpression extends UpdateExpressionBase {
  type: 'PostfixUpdateExpression';
}

// The set of syntax tokens which are valid unary expression operators
export type UnaryOperator = '+' | '-' | '!' | '~' | 'delete' | 'void' | 'typeof';

export interface UnaryExpression extends BaseNode {
  type: 'UnaryExpression';
  operator: TokenNode | UnaryOperator;
  operand: LeftHandSideExpression;
}

export interface VariableStatement extends BaseNode {
  type: 'VariableStatement';
  declarations: VariableDeclaration[];
}

export interface VariableDeclaration extends BaseNode {
  type: 'VariableDeclaration';
  binding: BindingPattern | BindingIdentifier;
  initializer: Expression | null;
  parent?: VariableStatement | ForDeclaration;
}

export interface LexicalDeclaration extends BaseNode {
  type: 'LexicalDeclaration';
  declarations: LexicalBinding[];
  kind: 'let' | 'const';
}

export interface UniqueFormalParameters extends BaseNode {
  type: 'UniqueFormalParameters';
  leafs: BindingPattern[];
  parent?: ArrowFunction | FunctionDeclaration | FunctionExpression;
}

export interface FormalParameters extends BaseNode {
  type: 'FormalParameters';
  leafs: (FunctionRestParameter | BindingElement)[];
  parent?: ArrowFunction | FunctionDeclaration | FunctionExpression | BindingProperty;
}

export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;

export interface BindingElement extends BaseNode {
  type: 'BindingElement';
  binding: BindingPattern | BindingIdentifier;
  initializer: Expression | null;
  parent?: FormalParameters | VariableStatement;
}

// `ForBinding :: BindingIdentifier`
// `ForBinding :: BindingPattern`
export interface ForBinding extends BaseNode {
  type: 'ForBinding';
  binding: BindingIdentifier | BindingPattern;
  initializer: Expression | null;
  parent?: ForDeclaration;
}

export interface LexicalBinding extends BaseNode {
  type: 'LexicalBinding';
  binding: BindingIdentifier | BindingPattern;
  initializer: Expression | null;
  parent?: LexicalDeclaration | ForDeclaration;
}

export interface ObjectBindingBase extends BaseNode {
  properties: (PropertyDefinition | BindingRestElement | BindingIdentifier | MethodDefinition)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern;
}

export interface ObjectBindingPattern extends ObjectBindingBase {
  type: 'ObjectBindingPattern';
  properties: (PropertyDefinition | BindingRestElement | BindingIdentifier | MethodDefinition)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern;
}

export interface ObjectAssignmentPattern extends ObjectBindingBase {
  type: 'ObjectAssignmentPattern';
}

export interface CoverInitializedName extends BaseNode {
  type: 'CoverInitializedName';
  binding: Expression;
  initializer: ObjectAssignmentPattern | ArrayAssignmentPattern;
}
export interface AssignmentPattern extends BaseNode {
  type: 'AssignmentPattern';
  left: Expression;
  right: ObjectAssignmentPattern | ArrayAssignmentPattern;
}

export interface ArrayBindingPattern extends BaseNode {
  // The elements of the array literal; a 'Elision' node represents an elision.
  type: 'ArrayBindingPattern';
  leafs: (Elision | AssignmentPattern | BindingRestElement)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern | PrimaryExpression;
}

export interface ArrayAssignmentPattern extends BaseNode {
  // The elements of the array literal; a 'Elision' node represents an elision.
  type: 'ArrayAssignmentPattern';
  leafs: (Elision | AssignmentPattern | AssignmentRestElement)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern;
}

export interface ArrayObjectPattern extends BaseNode {
  // The elements of the array literal; a 'Elision' node represents an elision.
  type: 'ArrayObjectPattern';
  leafs: (Elision | AssignmentPattern | AssignmentRestElement)[];
}

export interface IterationStatement extends BaseNode {
  expression: Expression;
  statement: Statement;
}

export interface WhileStatement extends BaseNode {
  type: 'WhileStatement';
}

export interface WithStatement extends BaseNode {
  type: 'WithStatement';
}

export interface DoWhileStatement extends BaseNode {
  type: 'DoWhileStatement';
}

// `YieldExpression :: yield`, `YieldExpression :: yield AssignmentExpression`
// `YieldExpression :: yield * AssignmentExpression`
export interface YieldExpression extends BaseNode {
  type: 'YieldExpression';
  delegate: boolean;
  // The `AssignmentExpression`, if present.
  argument: AssignmentExpression | null;
}

export interface MemberExpression extends BaseNode {
  type: 'MemberExpression';
  // The object whose property is being accessed.
  member: Expression | SuperProperty;
  // The name of the property to be accessed.
  expression: Expression | IdentifierName;
  computed: boolean;
}

export interface OptionalExpression extends BaseNode {
  type: 'OptionalExpression';
  member: Expression | null;
  chain: MemberChain | CallChain;
}

export interface CallChainBase extends BaseNode {
  chain: MemberChain | CallChain | null;
}

export interface MemberChain extends CallChainBase {
  type: 'MemberChain';
  property: Expression | IdentifierName | TemplateLiteral | null;
  computed: boolean;
}

export interface CallChain extends CallChainBase {
  type: 'CallChain';
  arguments: Arguments[] | null;
}

export interface ImportMeta extends BaseNode {
  type: 'ImportMeta';
}

export interface ImportCall extends BaseNode {
  type: 'ImportCall';
  import: Expression;
}

export type PropertyName = Expression | StringLiteral | NumericLiteral | IdentifierName;

/** Incremental */

export interface Synthetic extends BaseNode {
  type: 'Synthetic';
  value: '##'; // Dummy node inserted by the parser. No real value should exist
}

export type TokenKind =
  /* Constants/Bindings */
  | 'identifier'
  | 'number'
  | 'bigint'
  | 'string'
  | 'regular expression'
  | 'false'
  | 'true'
  | 'null'

  /* Template nodes */
  | 'template continuation'
  | 'template end'

  /* Punctuators */
  | '=>'
  | '('
  | '{'
  | '.'
  | '...'
  | '}'
  | ')'
  | ';'
  | ' | '
  | '['
  | ']'
  | ':'
  | '?'
  | '??'
  | '?.'

  /* Update operators */
  | '++'
  | '--'

  /* Assign operators */
  | '='
  | '<<='
  | '>>='
  | '>>>='
  | '**='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '^='
  | '|='
  | '&='
  | '||='
  | '&&='
  | '??='

  /* Unary/binary operators */
  | 'typeof'
  | 'delete'
  | 'void'
  | '!'
  | '~'
  | '+'
  | '-'
  | 'in'
  | 'instanceof'
  | '*'
  | '%'
  | '/'
  | '**'
  | '&&'
  | '||'
  | '==='
  | '!=='
  | '=='
  | '!='
  | '<='
  | '>='
  | '<'
  | '>'
  | '<<'
  | '>>'
  | '>>>'
  | '&'
  | '|'
  | '^'

  /* Variable declaration kinds */
  | 'var'
  | 'let'
  | 'const'

  /* Other reserved words */
  | 'break'
  | 'case'
  | 'catch'
  | 'class'
  | 'continue'
  | 'debugger'
  | 'default'
  | 'do'
  | 'else'
  | 'export'
  | 'extends'
  | 'finally'
  | 'for'
  | 'function'
  | 'if'
  | 'import'
  | 'new'
  | 'return'
  | 'super'
  | 'switch'
  | 'this'
  | 'throw'
  | 'try'
  | 'while'
  | 'with'

  /* Strict mode reserved words */
  | 'implements'
  | 'interface'
  | 'package'
  | 'private'
  | 'protected'
  | 'public'
  | 'static'
  | 'yield'

  /* Contextual keywords */
  | 'as'
  | 'async'
  | 'await'
  | 'constructor'
  | 'get'
  | 'set'
  | 'from'
  | 'of';

// A node that can include single characters, operators and keywords
export interface TokenNode extends BaseNode {
  type: TokenKind;
}

export interface MissingList extends BaseNode {
  start: number;
  length: number;
}

export interface TextSpan {
  start: number;
  length: number;
}

export interface TextChangeRange {
  span: TextSpan;
  newLength: number;
}

export interface TextRange {
  start: number;
  end: number;
}

export interface NodeCursor {
  currentNode(position: number): any;
}

export interface ArrayList extends BaseNode {
  start: number;
  end: number;
  list: any[];
}
