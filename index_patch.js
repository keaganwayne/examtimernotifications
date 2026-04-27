/*
DROP-IN DISPLAY PATCH FOR YOUR EXISTING index.html

Purpose:
- Let index.html fetch live notifications/settings from Netlify Function /api/config.
- Poll every few seconds so admin.html changes appear on the classroom TVs.

Where to use:
1. Keep your current EXAM_CONFIG as fallback data.
2. Paste this INSIDE the existing main <script> block, just before the final `})();`. In the v3 file I gave you, the variables are inside an IIFE, so this must be inside that same closure, not after it.
3. Your page needs functions named or equivalent to:
   - loadNoteState()
   - renderStaticText()
   - renderNotes()
   - renderTimer()
   - resetTimer()
4. If your code names are different, rename the calls inside adoptLiveConfig().
*/

const LIVE_CONFIG_API = "/api/config";
let lastLiveConfigUpdate = null;

function normalizeLiveConfig(incoming) {
  return {
    ...EXAM_CONFIG,
    ...(incoming || {}),
    notes: Array.isArray(incoming?.notes) ? incoming.notes : EXAM_CONFIG.notes
  };
}

function adoptLiveConfig(incoming) {
  const oldDurationMs = ((config.durationHours * 60) + config.durationMinutes) * 60 * 1000;
  config = normalizeLiveConfig(incoming);
  const newDurationMs = ((config.durationHours * 60) + config.durationMinutes) * 60 * 1000;

  timerKey = config.timerStorageKey || timerKey;
  notesKey = config.notesStorageKey || notesKey;

  loadNoteState();
  renderStaticText();
  renderNotes();

  if (oldDurationMs !== newDurationMs) resetTimer();
  else renderTimer();
}

async function fetchLiveConfig() {
  try {
    const response = await fetch(`${LIVE_CONFIG_API}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload?.config) return;

    const marker = payload.config.updatedAt || JSON.stringify(payload.config);
    if (marker === lastLiveConfigUpdate) return;

    lastLiveConfigUpdate = marker;
    adoptLiveConfig(payload.config);
  } catch (error) {
    // Quiet fallback: keep hard-coded EXAM_CONFIG if backend is not available.
  }
}

// Put these two lines near your existing startup calls, before the closing `})();`.
fetchLiveConfig();
setInterval(fetchLiveConfig, 5000);
