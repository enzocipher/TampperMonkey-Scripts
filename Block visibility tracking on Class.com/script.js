// ==UserScript==
// @name         Block visibility tracking on Class
// @namespace    https://upc.blackboard.com
// @author       enzocipher
// @license      MIT
// @version      1.2
// @description  Blocks page visibility / unload tracking on the target page only
// @match        *://*.upc.blackboard.com/*
// @match        *://*.upc.class.com/*
// @run-at       document-start
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/572113/Block%20visibility%20tracking%20on%20Class.user.js
// @updateURL https://update.greasyfork.org/scripts/572113/Block%20visibility%20tracking%20on%20Class.meta.js
// ==/UserScript==

(() => {
  'use strict';

  const targetHost = location.hostname.endsWith('class.com');

  if (!targetHost) return;

  const forceVisible = () => 'visible';
  const forceFalse = () => false;

  try {
    Object.defineProperty(Document.prototype, 'visibilityState', {
      get: forceVisible,
      configurable: true,
    });
  } catch {}

  try {
    Object.defineProperty(Document.prototype, 'hidden', {
      get: forceFalse,
      configurable: true,
    });
  } catch {}

  try {
    Object.defineProperty(document, 'visibilityState', {
      get: forceVisible,
      configurable: true,
    });
  } catch {}

  try {
    Object.defineProperty(document, 'hidden', {
      get: forceFalse,
      configurable: true,
    });
  } catch {}

  try {
    Object.defineProperty(window, 'visibilityState', {
      get: forceVisible,
      configurable: true,
    });
  } catch {}

  try {
    Object.defineProperty(window, 'hidden', {
      get: forceFalse,
      configurable: true,
    });
  } catch {}

  try {
    Object.defineProperty(Document.prototype, 'hasFocus', {
      value: () => true,
      configurable: true,
    });
  } catch {}

  const originalAddEventListener = EventTarget.prototype.addEventListener;
  const blockedEvents = new Set(['visibilitychange', 'pagehide', 'beforeunload', 'blur']);

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const isTargetDocument = this === document;
    const isTargetWindow = this === window;

    if ((isTargetDocument && blockedEvents.has(type)) || (isTargetWindow && blockedEvents.has(type))) {
      return;
    }

    return originalAddEventListener.call(this, type, listener, options);
  };
})();
