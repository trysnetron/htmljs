import { element, toString, toDom, XmlNode } from "./mod.mjs";
import { Document } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

const TREE_SIZE = 200;

let firstLevel: XmlNode[] = [];
for (let i = 0; i < TREE_SIZE; i++) {
  let secondLevel: XmlNode[] = [];
  for (let j = 0; j < TREE_SIZE; j++) {
    secondLevel.push(element("span")([], ["test"]));
  }
  firstLevel.push(element("div")([], secondLevel));
}
const testTree = element("div")([], firstLevel);

Deno.bench(
  `Render (${TREE_SIZE} x ${TREE_SIZE} + 1 = ${
    TREE_SIZE * TREE_SIZE + 1
  }) tree to string`,
  () => {
    toString(testTree);
  },
);

const document = new Document();

Deno.bench(
  `Render (${TREE_SIZE} x ${TREE_SIZE} + 1 = ${
    TREE_SIZE * TREE_SIZE + 1
  }) tree to DOM`,
  () => {
    toDom(document, testTree);
  },
);