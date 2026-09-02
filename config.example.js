// TimeLocation-Overlay Configuration
// Copy or rename this file to `config.js` and insert your API keys.

window.OVERLAY_CONFIG = {
  // OpenWeather API key: https://openweathermap.org/api
  // Used for current weather, condition description, and local timezone offset.
  openWeatherApiKey: "",

  // Mapbox Public Access Token: https://account.mapbox.com/
  // Used in settings.html for accurate city search and geocoding.
  mapboxApiKey: "",

  // Cloudflare Worker endpoint URL (e.g. "https://your-worker.workers.dev/overlay")
  // Connects the settings dashboard with the OBS overlay widget.
  workerEndpoint: "",

  // Optional display preferences:
  // units: "imperial" (°F) or "metric" (°C)
  units: "imperial",

  // layout: "card" (vertical card), "pill" (compact horizontal bar), or "minimal"
  layout: "card",

  // theme: "glass" (modern frosted glass), "oled" (deep black), or "neon" (cyan/purple glow)
  theme: "glass"
};