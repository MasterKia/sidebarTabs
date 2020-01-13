/**
 * localize.test.js
 */

import {JSDOM} from "jsdom";
import {assert} from "chai";
import {afterEach, beforeEach, describe, it} from "mocha";
import {browser} from "./mocha/setup.js";
import {EXT_LOCALE} from "../src/mjs/constant.js";
import * as mjs from "../src/mjs/localize.js";

describe("localize", () => {
  /**
   * create jsdom
   * @returns {Object} - jsdom instance
   */
  const createJsdom = () => {
    const domstr = "<!DOCTYPE html><html><head></head><body></body></html>";
    const opt = {
      runScripts: "dangerously",
    };
    return new JSDOM(domstr, opt);
  };
  let window, document;
  beforeEach(() => {
    const dom = createJsdom();
    window = dom && dom.window;
    document = window && window.document;
    global.browser = browser;
    global.window = window;
    global.document = document;
  });
  afterEach(() => {
    window = null;
    document = null;
    delete global.browser;
    delete global.window;
    delete global.document;
  });

  it("should get browser object", () => {
    assert.isObject(browser, "browser");
  });

  describe("localize attribute value", () => {
    const func = mjs.localizeAttr;
    const globalKeys = ["Node", "NodeList"];
    beforeEach(() => {
      for (const key of globalKeys) {
        global[key] = window[key];
      }
      browser.i18n.getMessage.flush();
    });
    afterEach(() => {
      for (const key of globalKeys) {
        delete global[key];
      }
      browser.i18n.getMessage.flush();
    });

    it("should not call function if no argument given", async () => {
      const i = browser.i18n.getMessage.callCount;
      await func();
      assert.strictEqual(browser.i18n.getMessage.callCount, i, "not called");
    });

    it("should not call function if argument is not an element", async () => {
      const i = browser.i18n.getMessage.callCount;
      await func("foo");
      assert.strictEqual(browser.i18n.getMessage.callCount, i, "not called");
    });

    it("should set attribute", async () => {
      const id = "foo";
      const attrs = {
        alt: "alt",
        ariaLabel: "aria-label",
        href: "href",
        placeholder: "placeholder",
        title: "title",
      };
      const items = Object.entries(attrs);
      const p = document.createElement("p");
      const body = document.querySelector("body");
      for (const [key, value] of items) {
        p.setAttribute(value, "bar");
        browser.i18n.getMessage.withArgs(`${id}_${key}`)
          .returns(`${id}_${key}`);
      }
      p.setAttribute("data-i18n", id);
      body.appendChild(p);
      await func(p);
      for (const [key, value] of items) {
        assert.strictEqual(p.getAttribute(value), `${id}_${key}`, `${value}`);
      }
    });

    it("should not set attribute", async () => {
      const id = "";
      const attrs = {
        alt: "alt",
        ariaLabel: "aria-label",
        href: "href",
        placeholder: "placeholder",
        title: "title",
      };
      const items = Object.values(attrs);
      const p = document.createElement("p");
      const body = document.querySelector("body");
      for (const value of items) {
        p.setAttribute(value, "bar");
      }
      p.setAttribute("data-i18n", id);
      body.appendChild(p);
      await func(p);
      for (const value of items) {
        assert.strictEqual(p.getAttribute(value), "bar", `${value}`);
      }
    });
  });

  describe("localize html", () => {
    const func = mjs.localizeHtml;
    const globalKeys = ["Node", "NodeList"];
    beforeEach(() => {
      for (const key of globalKeys) {
        global[key] = window[key];
      }
      browser.i18n.getMessage.flush();
    });
    afterEach(() => {
      for (const key of globalKeys) {
        delete global[key];
      }
      browser.i18n.getMessage.flush();
    });

    it("should not set value", async () => {
      browser.i18n.getMessage.withArgs(EXT_LOCALE).returns("");
      await func();
      const root = document.documentElement;
      assert.isNull(root.getAttribute("lang"), "lang");
    });

    it("should set value", async () => {
      browser.i18n.getMessage.withArgs(EXT_LOCALE).returns("en");
      await func();
      const root = document.documentElement;
      assert.strictEqual(root.lang, "en", "lang");
    });

    it("should set value", async () => {
      browser.i18n.getMessage.withArgs(EXT_LOCALE).returns("en");
      browser.i18n.getMessage.withArgs("foo", "bar").returns("baz");
      const body = document.querySelector("body");
      const p = document.createElement("p");
      p.setAttribute("data-i18n", "foo,bar");
      body.appendChild(p);
      await func();
      const root = document.documentElement;
      assert.strictEqual(root.lang, "en", "lang");
      assert.strictEqual(p.textContent, "baz", "content");
    });

    it("should set value", async () => {
      browser.i18n.getMessage.withArgs(EXT_LOCALE).returns("en");
      browser.i18n.getMessage.withArgs("foo", "bar").returns("");
      const body = document.querySelector("body");
      const p = document.createElement("p");
      p.setAttribute("data-i18n", "foo,bar");
      p.textContent = "baz";
      body.appendChild(p);
      await func();
      const root = document.documentElement;
      assert.strictEqual(root.lang, "en", "lang");
      assert.strictEqual(p.textContent, "baz", "content");
    });
  });
});
