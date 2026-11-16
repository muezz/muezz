import handler from "@tanstack/react-start/server-entry";

import { trackLuc, type LucAnalyticsEnv } from "#/server/luc-analytics";

/**
 * Worker entry: the default TanStack Start handler, plus visit counting for
 * Luc's page. On Cloudflare the second fetch argument is the Worker `env`.
 */
export default {
  async fetch(request: Request, env: LucAnalyticsEnv) {
    const redirect = await trackLuc(request, env);
    if (redirect) return redirect;
    return (handler.fetch as (request: Request, opts?: unknown) => Promise<Response>)(request, env);
  },
};
