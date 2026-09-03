# 🕒 TimeLocation Stream Overlay

A broadcast-grade, real-time OBS stream overlay displaying your **current local time**, **country flag**, **city/region**, **weather condition**, and **temperature**. 

Control it remotely from your phone while IRL streaming, or lock it to any city in seconds. Works out-of-the-box with **zero required API keys**, powered by free global weather services and optional Cloudflare Workers KV.

---

## ✨ Features

- 💎 **Frosted Glass HUD:** Broadcast-grade glassmorphism (`backdrop-filter: blur(16px)`) with drop shadows calibrated for legibility over any stream background (IRL camera feeds, video games, or desktop captures).
- 🕒 **Monospace Tabular Clock:** Google Fonts (`Outfit` & `JetBrains Mono`) ensuring numbers never jitter or jump as seconds tick.
- 🟢 **Live Pulse Indicator:** Animated radar dot signaling active connection and GPS/weather sync.
- 🌦 **Zero-Config Weather Engine:** Built-in free **Open-Meteo** integration with clean vector SVG weather icons. Works worldwide for any city with **NO API key needed**.
- 📡 **RealtimeIRL Support:** Connect your **RealtimeIRL** pull key to stream live GPS location directly from your phone while walking or driving.
- 📱 **Mobile Remote Control Center (`settings.html`):** A sleek, dark-mode dashboard with instant city search autocomplete, live overlay preview, and one-click OBS link copying.
- 🎨 **Layout & Theme Options:** Customize on the fly directly from the URL (`card`, `pill`, `minimal`, `glass`, `oled`, `neon`).
- ⚡ **Dual Sync Engine:** Real-time cross-tab sync locally via `BroadcastChannel` & `localStorage`, plus cloud sync across devices via Cloudflare Worker & KV.

---

## 🚀 Quick Start: 3 Ways to Use

### 1. Instant OBS Browser Source (Fastest — 10 Seconds)
Add a Browser Source in OBS and use query parameters directly:

- **New York, USA:**  
  `https://alphaking112.github.io/TimeLocation-Overlay/?city=New+York`
- **Tokyo, Japan:**  
  `https://alphaking112.github.io/TimeLocation-Overlay/?city=Tokyo`
- **Horizontal Pill Bar in Celsius:**  
  `https://alphaking112.github.io/TimeLocation-Overlay/?city=London&layout=pill&units=metric`

---

### 2. Use the Remote Control Dashboard (`settings.html`)
1. Open the [Settings Dashboard](https://alphaking112.github.io/TimeLocation-Overlay/settings.html) on your phone or PC.
2. Select your mode:
   - **📍 Manual City:** Search any city with instant autocomplete and click **Save City**.
   - **📡 RealtimeIRL Key:** Paste your pull key from [realtime.irl.com](https://realtime.irl.com/) and click **Save RTIRL Key**.
3. Click **Copy OBS Link** and paste the resulting link into OBS as a Browser Source.

---

### 3. Deploy Your Own Stack on Cloudflare (Free)
You can deploy your own private backend and frontend completely free on Cloudflare:

1. Fork or clone this repository to your GitHub.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **Workers & Pages** > **Create application** > **Connect to Git**.
3. Select your repository.
4. Add your **KV Namespace**:
   * Under **Storage & Databases** > **KV**, create a namespace named `OVERLAY_KV`.
   * Copy the **Namespace ID** and ensure it matches the `id` inside [`wrangler.jsonc`](wrangler.jsonc):
     ```jsonc
     "kv_namespaces": [
       { "binding": "OVERLAY_KV", "id": "YOUR_KV_NAMESPACE_ID" }
     ]
     ```
5. Click **Deploy**. Cloudflare will host both the frontend static assets and the `/overlay` sync API together!

---

## 🎨 Layouts, Themes & URL Parameters

Customize the overlay directly in your OBS Browser Source URL:

| Parameter | Options | Description | Example |
| :--- | :--- | :--- | :--- |
| `city` | *Any city name* | Sets static city & loads local time/weather | `?city=Miami` |
| `key` / `rtirl` | *Your RTIRL pull key* | Connects live GPS tracking | `?key=YOUR_PULL_KEY` |
| `layout` | `card` *(default)*, `pill`, `minimal` | `card` is a vertical HUD badge; `pill` is a compact single-line bar | `?layout=pill` |
| `theme` | `glass` *(default)*, `oled`, `neon` | `glass` = frosted glass; `oled` = pure black; `neon` = cyberpunk glow | `?theme=neon` |
| `units` | `imperial` *(default °F)*, `metric` *(°C)* | Temperature unit | `?units=metric` |

### URL Examples:
* **Compact Top-Bar Overlay:**  
  `https://alphaking112.github.io/TimeLocation-Overlay/?city=Paris&layout=pill&theme=glass`
* **Cyberpunk Neon Style in Celsius:**  
  `https://alphaking112.github.io/TimeLocation-Overlay/?city=Tokyo&theme=neon&units=metric`

---

## ⚙️ Optional Configuration (`config.js`)

While the overlay works with **zero API keys** out of the box using free Open-Meteo services, power users can supply custom API keys:

1. Copy `config.example.js` to `config.js`:
   ```sh
   cp config.example.js config.js
   ```
2. Insert your personal keys:
   ```javascript
   window.OVERLAY_CONFIG = {
     // Optional: OpenWeather API key (fallback uses Open-Meteo)
     openWeatherApiKey: "YOUR_OPENWEATHER_KEY",

     // Optional: Mapbox Public Token (fallback uses Open-Meteo search)
     mapboxApiKey: "YOUR_MAPBOX_KEY",

     // Optional: Custom Cloudflare Worker endpoint URL
     workerEndpoint: "https://your-worker.workers.dev/overlay",

     // Default preferences
     units: "imperial",
     layout: "card",
     theme: "glass"
   };
   ```

---

## 📺 Recommended OBS Browser Source Settings

- **Width:** `450` (or `600` for `layout=pill`)
- **Height:** `180` (or `60` for `layout=pill`)
- **FPS:** `30` or `60`
- **Shutdown source when not visible:** Checked ✅ (conserves background CPU and network bandwidth)

---

## 📄 License

MIT License — free for personal and commercial stream use.