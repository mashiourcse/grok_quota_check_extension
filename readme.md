# Grok Imagine Quota Checker

A Chrome sidebar extension that displays your Grok Imagine image/video quotas directly inside Chrome.

---

# Features

* Native Chrome Sidebar
* Auto refresh every 30 seconds
* Shows:

  * Image (Speed)
  * Image (Quality)
  * Video (Speed)
  * Video (Quality)
* Locked rows show 🔒
* Uses your existing logged-in Grok session

---

# Installation Guide

## 1. Download the Extension

Download and extract the extension ZIP file.

You should see files like:

```txt id="y6fj8e"
manifest.json
background.js
sidepanel.html
sidepanel.css
sidepanel.js
```

---

## 2. Open Chrome Extensions

Open:

```txt id="3ce7n8"
chrome://extensions
```

---

## 3. Enable Developer Mode

Turn on:

```txt id="9j0l2w"
Developer mode
```

(top-right corner)

---

## 4. Load the Extension

Click:

```txt id="u4sk29"
Load unpacked
```

Then select the extracted extension folder.

---

## 5. Open the Sidebar

Click the extension icon in Chrome.

Chrome will automatically open the sidebar.

---

# Requirements

You must already be logged into Grok:

[Grok](https://grok.com?utm_source=chatgpt.com)

The extension uses your browser session cookies to fetch quota information.

---

# How It Works

The extension calls this internal Grok API:

```txt id="t6z4mp"
https://grok.com/rest/media/imagine/quota_info
```

and displays:

* remaining image generations
* remaining video generations
* locked/unlocked states

---

# Notes

* This uses an undocumented/private Grok API
* Grok may change the API anytime
* If the sidebar stops working, inspect the console for updated response fields

---

# Refresh Behavior

The extension automatically refreshes every:

```txt id="5x1qnb"
30 seconds
```

You can also manually refresh using the button in the sidebar.

---

# Troubleshooting

## Sidebar shows HTTP 401

You are not logged into Grok.

Log in here:

[Grok Login](https://grok.com?utm_source=chatgpt.com)

---

## Sidebar shows 0 values

Grok probably changed the API response structure.

Open:

* Chrome DevTools
* Console

Then inspect:

```javascript id="h0u7vc"
console.log(data)
```

inside `sidepanel.js`

---

## Extension not loading

Make sure:

* Developer Mode is enabled
* You selected the correct folder
* `manifest.json` exists in the root folder

---

# License

Opensource, not a commercial product.
