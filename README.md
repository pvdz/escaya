<h1 align="center">Escaya</h1>

<p align="center"> An 100% spec compliant, self-hosted javascript parser written in Typescript.</p>

<br>

<p align="center">
    <a href="https://lgtm.com/projects/g/escaya/escaya/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/g/escaya/escaya.svg?logo=lgtm&logoWidth=18" alt="GitHub license" /></a>
    <a href="https://github.com/escaya/escaya/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/escaya/escaya.svg" alt="License" /></a>
</p>


**Work in progress**

Still to early to release the source file to public, but a demo can be found [here](https://escaya.github.io/escaya/).


## Features

* Conforms to the standard ECMAScript® 2021 (ECMA-262 11th Edition) language specification
* Support for additional ECMAScript features for Web Browsers
* Optionally track syntactic node locations
* Emits an ECMAScript® 2021 compatible abstract syntax tree
* Error recovery mode with incremental parsing support
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

const text = '(foo);';

const rootNode = recovery(text, 'filename.js', { module: true }); // option for parsing in module goal in recovery

const ast = update(rootNode, '=> bar;', 'filename.js', { span: { start: 6, length: 0 }, newLength: 7 })

```

Now when incremental parsing have been enabled, Escaya will reuse nodes from the old tree if possible.

### Options

The options for the recovery mode  are about the same as  for `parseScript` and `parseModule` except you have to enable `{module: true}` if parsing in module goal.

No options can be set during an incremental update because it's only possible to reuse a node if it was parsed in the same context that we're currently in. 


## Escaya AST

The abstract syntax tree (AST) used by `Escaya` represents the structure of an ECMAScript program as a tree and conforms to the [ECMAScript® 2021 specification](https://tc39.es/ecma262/index.html). The AST have been designed for performance, and it nearly eliminates the chance of accidentally creating an AST that does not represent an ECMAScript program and it consumes less bytes than the AST produced by `ESTree` and `Babel`.

The `Escaya AST` doesn't try to follow the SpiderMonkey-compatible standard that `ESTree` strictly follows, and it distinguish `Identifier` from `IdentifierPattern` and makes it easier to calculate the free variables of a program. 

## CLI

TODO
