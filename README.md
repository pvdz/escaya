<h1 align="center">Escaya</h1>

<p align="center"> An 100% spec compliant, self-hosted javascript parser written in Typescript.</p>

<br>

<p align="center">
    <a href="https://lgtm.com/projects/g/escaya/escaya/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/g/escaya/escaya.svg?logo=lgtm&logoWidth=18" alt="GitHub license" /></a>
    <a href="https://github.com/escaya/escaya/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/escaya/escaya.svg" alt="License" /></a>
</p>


**Work in progress**

Still too early to release the source file to public, but a demo can be found [here](https://escaya.github.io/escaya/).


## Features

* Conforms to the standard ECMAScript® 2021 (ECMA-262 11th Edition) language specification
* Support for additional ECMAScript features for Web Browsers
* Optionally track syntactic node locations
* Emits an ECMAScript® 2021 compatible abstract syntax tree
* Error recovery mode with incremental parsing support
* JSON friendly
* No backtracking
* Low memory usage
* Optimized for use on handheld devices such as a mobile phone or tablet
* Very well tested (~15 000 unit tests with full code coverage)
* Lightweight - ~84 KB minified

## API

Escaya generates it's own `AST` that is close to the [ECMAScript® 2021 specs](https://tc39.es/ecma262/index.html), and can be used to perform [syntactic analysis](https://en.wikipedia.org/wiki/Parsing) (parsing) of a JavaScript program, and with `ES2015` and later a JavaScript program can be either [a script or a module](https://tc39.github.io/ecma262/index.html#sec-ecmascript-language-scripts-and-modules).

This is the available options:

```js
{
  // Enable stage 3 support (ESNext)
  next?: boolean;
  // Disable web compatibility
  disableWebCompat?: boolean;
  // Enable line/column location information start and end offsets to each node
  loc?: boolean;
  // Allow return in the global scope
  globalReturn?: boolean;
  // Enable implied strict mode
  impliedStrict?: boolean;
  // Adds a source attribute in every node’s loc object when the locations option is `true`
  source?: string;
  // Enable parsing in module goal in error recovery mode
  module?: boolean;
}
```

Example usage:

```ts

import { parseScript, parseModule, parse } from './escaya';

parseScript('({x: [y] = 0} = 1)');

parseModule('({x: [y] = 0} = 1)', { impliedStrict: true });

```


## Error recovery

When Escaya parser is given an input that does not represent a valid JavaScript program, it throws an exception. If parsing in
recovery mode, the parser will continue parsing and produce a syntax tree.

However, Escaya will continue to do a full parse for every keystroke. To avoid this you can enable incremental parsing. This is best demonstrated with an example.

```ts

import { recovery, update } from './escaya';

const rootNode = recovery('(foo);', 'filename.js', { module: true }); 

const ast = update(rootNode, '=> bar;', 'filename.js', { span: { start: 6, length: 0 }, newLength: 7 })

```

Now when incremental parsing has been enabled, Escaya will reuse nodes from the old tree if possible.

### Options

The options for the recovery mode  are about the same as  for `parseScript` and `parseModule` except you have to enable `{module: true}` if parsing in module goal.

No options can be set during an incremental update because it's only possible to reuse a node if it was parsed in the same context that parser are currently in. 

### AST

One of the design goals for Escaya has been that the abstract syntax tree (AST) shouldn't change. It should be the same either you are parsing in `normal mode` or `recovery mode` but there are a couple of exceptions.

For example, in `recovery mode` you are creating a `RootNode` instead of either a `Module` or `Script`. This `RootNode` has additional information such as diagnostics, context masks and mutal parser flags that you *carry over* from the recovery mode to the incremental parsing and let you continue to parse in the same context that you are currently in, unless you set a strict directive on the `RootNode`. If you do this, Escaya will parse in strict mode and you will not be able to recover any nodes from the old tree if you were first parsing in *sloppy mode*, because it's only possible to reuse a node if it was parsed with the same context that the parser used before.

## Escaya AST

The AST used by `Escaya` represents the structure of an ECMAScript program as a tree and conforms to the [ECMAScript® 2021 specification](https://tc39.es/ecma262/index.html). The AST has been designed for performance and it nearly eliminates the chance of accidentally creating an AST that does not represent an ECMAScript program while also requiring fewer bytes than the AST produced by `ESTree` and `Babel`.

The `Escaya AST` doesn't try to follow the SpiderMonkey-compatible standard that `ESTree` strictly follows. For example it distinguish `Identifier` from `IdentifierPattern`. That makes it easier to calculate the free variables of a program. 

## CLI

The CLI is still a TODO, but will parse Escaya in recovery mode and use the diagnostic messages to create an nice output so that you are always informed of invalid syntax so you can correct this.
