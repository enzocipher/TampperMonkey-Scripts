# Block Visibility Tracking on Class

## Description

This Tampermonkey userscript prevents Class.com from detecting when you switch away from the meeting tab. It forces the browser to report that the page is always visible, even when you are on another tab or window.

## What It Does

The script intercepts visibility API calls and property access, making Class believe you are continuously viewing the page. This includes:

- Overrides `document.visibilityState` to always return "visible"
- Overrides `document.hidden` to always return false
- Overrides `window.visibilityState` to always return "visible"
- Overrides `window.hidden` to always return false
- Overrides `document.hasFocus()` to always return true
- Blocks visibility change event listeners (visibilitychange, pagehide, beforeunload, blur)
- Handles browser vendor prefixes (webkit, ms, moz variants)

## Installation

1. Install Tampermonkey extension for your browser:
   - Chrome: https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobp...
   - Firefox: https://addons.mozilla.org/firefox/addon/tampermonkey/

2. Create a new script in Tampermonkey

3. Copy the entire contents of `script` file and paste it into the editor

4. Save (Ctrl+S)

5. The script will activate automatically on Class.com pages

## How It Works

When you navigate away from the Class tab:

- Normally: Browser triggers `visibilitychange` event, and `document.visibilityState` becomes "hidden"
- With script: Visibility API is intercepted, Class still sees `visibilityState = "visible"`
- Result: Class continues to track your participation as active

## Scope

The script activates on:
- `*.upc.blackboard.com/*`
- `*.upc.class.com/*`

The match patterns use wildcards, which means the script will likely affect other Class.com subdomains and variants beyond those explicitly listed. If you have other Class instances running on different domains or subdomains, this script may interfere with their visibility detection as well.

It will not affect non-Class websites.

## Limitations

- Only blocks visibility state detection from the meeting application
- Does not block other tracking methods (browser fingerprinting, hardware telemetry, mouse/keyboard inactivity, etc.) Check My Other script if you want to hide ur browser as Chrome.
- Class may have server-side activity monitoring that this script cannot bypass
- Network logs and timestamps are still recorded by Class servers

## What It Does NOT Do

- Does not hide your actual IP address
- Does not prevent login logging or participation records
- Does not falsify attendance of other users
- Does not interfere with video/audio streaming
- Does not bypass any server-side validation

## Technical Details

The script uses Object.defineProperty to replace native browser APIs at the prototype level, intercepting all read operations. Event listeners that trigger on visibility changes are also intercepted and discarded.

All operations are wrapped in try-catch blocks to ensure the script does not break if Class makes API changes.

## Disclaimer

This script is provided for educational purposes. Use it responsibly and in accordance with your institution's policies regarding academic integrity.
