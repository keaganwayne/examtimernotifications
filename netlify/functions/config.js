import { getStore } from "@netlify/blobs";

const STORE_NAME = "classroom-aid";
const CONFIG_KEY = "exam-config";

const DEFAULT_CONFIG = {
  subject: "Pre-Algebra",
  title: "2nd Semester Mid-Terms",
  examTimeText: "8:00 → 9:00",
  durationHours: 1,
  durationMinutes: 0,
  livePollSeconds: 5,
  timerStorageKey: "classroom-aid-live-timer-v1",
  notesStorageKey: "classroom-aid-live-sticky-layout-v1",
  stickyGap: 24,
  noteMinWidth: 260,
  noteMaxWidth: 560,
  noteMinHeight: 140,
  noteMaxHeight: 420,
  notes: [
    { id: "q22-slope", label: "QUESTION 22", type: "Correction", text: "Q22 → slope is 2", icon: "trending_up", colourClass: "sticky-note-sky", width: 420, height: 190, fontSize: 46 },
    { id: "q36-number-change", label: "QUESTION 36", type: "Correction", text: "Q36 → 22 changes to 60", icon: "edit_note", colourClass: "sticky-note-peach", width: 420, height: 190, fontSize: 40 },
    { id: "q36-choice-format", label: "QUESTION 36", type: "Format", text: "Q36 is multiple choice A, B, C, D — not E, F, G, H", icon: "format_list_bulleted", colourClass: "sticky-note-mint", width: 420, height: 210, fontSize: 34 }
  ],
  updatedAt: null
};

const jsonHeaders = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

function responseJson(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

function clampNumber(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function text(value, fallback = "") { return String(value ?? fallback); }

function normalizeNote(note, index) {
  return {
    id: text(note.id, `note-${index + 1}`).slice(0, 80),
    label: text(note.label, `NOTE ${index + 1}`).slice(0, 80),
    type: text(note.type, "Notice").slice(0, 40),
    text: text(note.text, "").slice(0, 500),
    icon: text(note.icon, "campaign").slice(0, 60),
    colourClass: text(note.colourClass, "sticky-note-sky").slice(0, 40),
    width: clampNumber(note.width, 420, 260, 560),
    height: clampNumber(note.height, 190, 140, 420),
    fontSize: clampNumber(note.fontSize, 40, 18, 80)
  };
}

function normalizeConfig(config) {
  const incoming = config && typeof config === "object" ? config : {};
  const notes = Array.isArray(incoming.notes) ? incoming.notes.slice(0, 12) : DEFAULT_CONFIG.notes;

  return {
    ...DEFAULT_CONFIG,
    subject: text(incoming.subject, DEFAULT_CONFIG.subject).slice(0, 80),
    title: text(incoming.title, DEFAULT_CONFIG.title).slice(0, 120),
    examTimeText: text(incoming.examTimeText, DEFAULT_CONFIG.examTimeText).slice(0, 80),
    durationHours: clampNumber(incoming.durationHours, DEFAULT_CONFIG.durationHours, 0, 12),
    durationMinutes: clampNumber(incoming.durationMinutes, DEFAULT_CONFIG.durationMinutes, 0, 59),
    livePollSeconds: clampNumber(incoming.livePollSeconds, DEFAULT_CONFIG.livePollSeconds, 2, 60),
    timerStorageKey: text(incoming.timerStorageKey, DEFAULT_CONFIG.timerStorageKey).slice(0, 120),
    notesStorageKey: text(incoming.notesStorageKey, DEFAULT_CONFIG.notesStorageKey).slice(0, 120),
    stickyGap: clampNumber(incoming.stickyGap, DEFAULT_CONFIG.stickyGap, 0, 80),
    noteMinWidth: clampNumber(incoming.noteMinWidth, DEFAULT_CONFIG.noteMinWidth, 180, 700),
    noteMaxWidth: clampNumber(incoming.noteMaxWidth, DEFAULT_CONFIG.noteMaxWidth, 220, 900),
    noteMinHeight: clampNumber(incoming.noteMinHeight, DEFAULT_CONFIG.noteMinHeight, 100, 500),
    noteMaxHeight: clampNumber(incoming.noteMaxHeight, DEFAULT_CONFIG.noteMaxHeight, 150, 700),
    notes: notes.map(normalizeNote),
    updatedAt: text(incoming.updatedAt, new Date().toISOString())
  };
}

async function readConfig(store) {
  const saved = await store.get(CONFIG_KEY, { type: "json", consistency: "strong" });
  return normalizeConfig(saved || DEFAULT_CONFIG);
}

export default async (request) => {
  if (request.method === "OPTIONS") return new Response("", { status: 204, headers: jsonHeaders });

  const store = getStore({ name: STORE_NAME, consistency: "strong" });

  if (request.method === "GET") {
    const config = await readConfig(store);
    return responseJson({ config });
  }

  if (request.method === "POST") {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return responseJson({ error: "ADMIN_PASSWORD environment variable is missing in Netlify." }, 500);

    const suppliedPassword = request.headers.get("x-admin-password") || "";
    if (suppliedPassword !== adminPassword) return responseJson({ error: "Wrong admin password." }, 401);

    let body;
    try { body = await request.json(); }
    catch { return responseJson({ error: "Invalid JSON body." }, 400); }

    const config = normalizeConfig({ ...(body.config || {}), updatedAt: new Date().toISOString() });
    await store.setJSON(CONFIG_KEY, config);
    return responseJson({ ok: true, config });
  }

  return responseJson({ error: "Method not allowed." }, 405);
};
