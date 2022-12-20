# HTML JS

This aims to be a very simple piece of JavaScript code that allow for building
and rendering of HTML (or raw XML) element trees to strings or to a DOM. It is
written in ESM style JavaScript and should work in Deno, Node and Browsers.

## Installation

### Deno

Import the latest version of the code directly from this repo:

```javascript
import * as htmljs from "https://raw.githubusercontent.com/trysnetron/htmljs/main/mod.mjs";
```

### Node or Browser

Copy-paste [mod.mjs](mod.mjs) into your project.

## Usage

Create nodes

```javascript
const tree = htmljs.div([], [
  htmljs.h1([], ["hello"]),
  htmljs.h2([], ["world"]),
]);
```

Render nodes to strings

```javascript
htmljs.toString(tree);
```

Render nodes to DOM elements (this requires a `Document` object, available
globally in Browser as `document`)

```javascript
htmljs.toDom(document, tree);
```

## Testing and benchmarking

The tests and benchmarks are written for Deno

To run tests

```
deno test
```

To run benchmarks

```
deno bench
```
