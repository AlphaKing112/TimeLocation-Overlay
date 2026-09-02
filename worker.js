export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve a default config.js to prevent 404 in console if not uploaded
    if (url.pathname === "/config.js" || url.pathname === "/config") {
      const defaultJs = `window.OVERLAY_CONFIG = window.OVERLAY_CONFIG || {
  openWeatherApiKey: "",
  mapboxApiKey: "",
  workerEndpoint: "${url.origin}/overlay",
  units: "imperial",
  layout: "card",
  theme: "glass"
};`;
      return new Response(defaultJs, {
        headers: {
          "Content-Type": "application/javascript; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Handle /overlay API endpoint
    if (url.pathname === "/overlay" || url.pathname === "/overlay/") {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      };

      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
      }

      // GET /overlay: Return active overlay settings
      if (request.method === "GET") {
        try {
          const data = env.OVERLAY_KV ? await env.OVERLAY_KV.get("overlay_settings") : null;
          return new Response(data || JSON.stringify({ mode: "manual", city: "" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
      }

      // POST /overlay: Update overlay settings from settings.html
      if (request.method === "POST") {
        try {
          const body = await request.text();
          if (env.OVERLAY_KV) {
            await env.OVERLAY_KV.put("overlay_settings", body);
          }
          return new Response(JSON.stringify({ status: "success" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
      }
    }

    // Pass all other requests to static assets (index.html, settings.html, etc.)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};
