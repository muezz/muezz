import { describe, expect, it } from "vite-plus/test";

import { classifyLucRequest } from "./luc-analytics";

const req = (path: string, headers: Record<string, string> = {}, method = "GET") =>
  new Request(`https://muezz.dev${path}`, {
    method,
    headers: { "user-agent": "Mozilla/5.0 (iPhone) Safari", ...headers },
  });

describe("classifyLucRequest", () => {
  it("counts page views by source", () => {
    expect(classifyLucRequest(req("/ref/luc"))).toEqual({ event: "view", source: "direct" });
    expect(classifyLucRequest(req("/ref/luc?src=qr"))).toEqual({ event: "view", source: "qr" });
  });

  it("counts WhatsApp redirects by source", () => {
    expect(classifyLucRequest(req("/ref/luc?contact=whatsapp&src=page"))).toEqual({
      event: "whatsapp",
      source: "page",
    });
    expect(classifyLucRequest(req("/ref/luc?contact=whatsapp"))).toEqual({
      event: "whatsapp",
      source: "other",
    });
  });

  it("ignores print sheets, other paths, bots, prefetches and non-GETs", () => {
    expect(classifyLucRequest(req("/ref/luc?style=card"))).toBeNull();
    expect(classifyLucRequest(req("/"))).toBeNull();
    expect(classifyLucRequest(req("/ref/luc", { "user-agent": "WhatsApp/2.23" }))).toBeNull();
    expect(classifyLucRequest(req("/ref/luc", { "sec-purpose": "prefetch" }))).toBeNull();
    expect(classifyLucRequest(req("/ref/luc", {}, "HEAD"))).toBeNull();
  });
});
