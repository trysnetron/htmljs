import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { Document } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import * as mod from "./mod.mjs";

const testElement = mod.element("h1")([[
  "style",
  "color: red;",
  "font-size: 18px;",
]], ["hello"]);

const testEmptyElement = mod.emptyElement("input")([["type", "text"], [
  "required",
]]);

Deno.test("string render", () => {
  const rendered = mod.toString(testElement);
  assertEquals(rendered, '<h1 style="color: red; font-size: 18px;">hello</h1>');

  const renderedEmpty = mod.toString(testEmptyElement);
  assertEquals(renderedEmpty, '<input type="text" required/>');
});

Deno.test("dom render", () => {
  const document = new Document();

  const el = mod.toDom(document, testElement);

  assertEquals(el.tagName, "H1");
  assertEquals(el.innerText, "hello");
  assertEquals(el.getAttribute("style"), "color: red; font-size: 18px;");

  const emptyEl = mod.toDom(document, testEmptyElement);

  assertEquals(emptyEl.tagName, "INPUT");
  assertEquals(emptyEl.getAttribute("type"), "text");
  assertEquals(emptyEl.getAttribute("required"), "");
});

// Deno.test("premade elements have correct names", () => {
//   const document = new Document();
//   for (const p of Object.getOwnPropertyNames(mod).filter(p => !["element", "emptyElement", "toString", "toDom"].includes(p))) {
//     const element = (mod as object)[p]([], []);
//     assertEquals(mod.toDom(document, element).tagName, p.toUpperCase());
//   }
// });
