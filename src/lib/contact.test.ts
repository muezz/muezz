import { describe, expect, it } from "vite-plus/test";

import { escapeHtml, renderContactEmail, validateContact } from "./contact";

const valid = {
  email: "someone@example.com",
  mobile: "+1 415 555 2671",
  message: "Hello there",
};

describe("validateContact", () => {
  it("accepts a complete submission", () => {
    expect(validateContact(valid)).toBeNull();
  });

  it("accepts international numbers with a country code", () => {
    expect(validateContact({ ...valid, mobile: "+44 20 7946 0958" })).toBeNull();
  });

  it("reports one message per invalid field", () => {
    expect(validateContact({ email: "nope", mobile: "123", message: "   " })).toEqual({
      email: "Please enter a valid email.",
      mobile: "Please enter a valid mobile number, with country code.",
      message: "Message cannot be empty.",
    });
  });

  it("rejects missing fields", () => {
    expect(validateContact({})).toMatchObject({
      email: expect.any(String),
      mobile: expect.any(String),
      message: expect.any(String),
    });
  });
});

describe("renderContactEmail", () => {
  it("escapes user-supplied HTML", () => {
    const html = renderContactEmail({ ...valid, message: '<img src=x onerror="alert(1)">' });
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });

  it("formats the phone number", () => {
    expect(renderContactEmail(valid)).toContain("+1 415 555 2671");
  });
});

describe("escapeHtml", () => {
  it("escapes every special character", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });
});
