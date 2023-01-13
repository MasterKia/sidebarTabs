/**
 * uri-scheme.test.js
 */

/* api */
import { assert } from 'chai';
import { describe, it } from 'mocha';

/* test */
import uriSchemes, * as mjs from '../src/mjs/uri-scheme.js';

describe('uri-scheme', () => {
  it('should get string', () => {
    assert.isArray(uriSchemes);
    for (const scheme of uriSchemes) {
      assert.isString(scheme);
      assert.isTrue(/^[a-z][a-z0-9+\-.]*$/.test(scheme));
    }
  });

  describe('is URI', () => {
    const func = mjs.isUri;

    it('should get false', () => {
      const res = func();
      assert.isFalse(res, 'result');
    });

    it('should get false', () => {
      const res = func('foo');
      assert.isFalse(res, 'result');
    });

    it('should get false', () => {
      const res = func('foo:bar');
      assert.isFalse(res, 'result');
    });

    it('should get true', () => {
      const res = func('https://example.com');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func(' https://example.com ');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func('https://example.com:8000/#foo?bar=baz');
      assert.isTrue(res, 'result');
    });

    it('should get false', () => {
      const res = func('https://example.com foo');
      assert.isFalse(res, 'result');
    });

    it('should get true', () => {
      const res = func('https://127.0.0.1');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func('https://[::1]/');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func('file:///C:/Users/Foo/');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func('mailto:foo@example.com');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func('ext+foo://example.com/');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func('web+foo://example.com/');
      assert.isTrue(res, 'result');
    });

    it('should get true', () => {
      const res = func('git+https://example.com/');
      assert.isTrue(res, 'result');
    });

    it('should get false', () => {
      const res = func('foo+https://example.com/');
      assert.isFalse(res, 'result');
    });

    it('should get false', () => {
      const res = func('git+foo://example.com/');
      assert.isFalse(res, 'result');
    });

    it('should get true', () => {
      const res = func('URN:ISBN:4-8399-0454-5');
      assert.isTrue(res, 'result');
    });
  });

  describe('sanitize URL', () => {
    const func = mjs.sanitizeUrl;

    it('should get null', () => {
      const res = func();
      assert.isNull(res, 'result');
    });

    it('should get null', () => {
      const res = func('foo');
      assert.isNull(res, 'result');
    });

    it('should get value', () => {
      const res = func('https://example.com');
      assert.strictEqual(res, 'https://example.com/', 'result');
    });

    it('should get value', () => {
      const res = func('https://example.com:8000/#foo?bar=baz qux');
      assert.strictEqual(res, 'https://example.com:8000/#foo?bar=baz%20qux',
        'result');
    });

    it('should get null', () => {
      const res = func('../../');
      assert.isNull(res, 'result');
    });

    it('should get null', () => {
      const res = func('/../');
      assert.isNull(res, 'result');
    });

    it('should get null', () => {
      const res = func('javascript:alert("XSS")');
      assert.isNull(res, 'result');
    });

    it('should get null', () => {
      const res = func('data:,Hello%2C%20World!');
      assert.isNull(res, 'result');
    });

    it('should get value', () => {
      const res = func('data:,Hello%2C%20World!', true);
      assert.strictEqual(res, 'data:,Hello%2C%20World!', 'result');
      assert.strictEqual(decodeURIComponent(res), 'data:,Hello, World!',
        'decode');
    });

    it('should get value', () => {
      const res =
        func("http://example.com/?<script>alert('XSS');</script>");
      assert.strictEqual(res,
        'http://example.com/?%26lt;script%26gt;alert(%26#39;XSS%26#39;);%26lt;/script%26gt;',
        'result');
      assert.strictEqual(decodeURIComponent(res),
        'http://example.com/?&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;',
        'decode');
    });

    it('should get value', () => {
      const res =
        func('http://example.com/"onmouseover="alert(1)"');
      assert.strictEqual(res,
        'http://example.com/%26quot;onmouseover=%26quot;alert(1)%26quot;',
        'result');
      assert.strictEqual(decodeURIComponent(res),
        'http://example.com/&quot;onmouseover=&quot;alert(1)&quot;',
        'decode');
    });
  });
});
