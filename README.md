# Classroom Aid Exam Display

A single-file HTML classroom display for exam sessions. It shows a large countdown timer and clear sticky-note style correction notices for students.

This version was built for a Grade 6 Pre-Algebra 2nd Semester Mid-Term display, but the text, timer duration, and correction notes can be edited directly in the HTML file.

## Main Features

- Retro classroom sticky-note design
- Large TV-friendly countdown timer
- Teacher-controlled timer:
  - Start
  - Stop
  - Reset
- Sticky notes for exam corrections and reminders
- Sticky notes can be resized by dragging the bottom-right corner
- Sticky note font size can be changed with `A−` and `A+`
- Sticky note layout is saved in the browser
- Timer state is saved in the browser
- Auto-refresh support for live HTML updates
- No sound at the end of the timer
- Works as a static HTML file

## Current Exam Setup

Subject:

```text
Pre-Algebra
```

Exam:

```text
2nd Semester Mid-Terms
```

Exam time shown:

```text
8:00 → 9:00
```

Timer duration:

```text
1 hour
```

Displayed correction notes:

```text
Q22 → slope is 2
Q36 → 22 changes to 60
Q36 is multiple choice A, B, C, D — not E, F, G, H
```

## How to Use

1. Open `pre_algebra_midterm_classroom_display_v3.html` in a browser.
2. Click the settings icon in the top-right if you need to edit the subject, title, displayed exam time, or timer duration.
3. Press **Start** when the exam begins.
4. Press **Stop** to pause the timer.
5. Press **Reset** to return the timer to the full duration.
6. Drag the bottom-right corner of a sticky note to resize it.
7. Use `A−` or `A+` on each sticky note to adjust that note's font size.

## Static Website / GitHub Pages Use

This project can be hosted directly on GitHub Pages because it is only HTML, CSS, and JavaScript.

Recommended structure:

```text
your-repository/
│
├── index.html
└── README.md
```

Rename the HTML file to:

```text
index.html
```

Then enable GitHub Pages:

1. Go to the GitHub repository.
2. Open **Settings**.
3. Go to **Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save.
6. Open the GitHub Pages link on each classroom TV.

## Live Update Method

The page auto-refreshes every 60 seconds.

This means:

1. Edit the correction messages in the HTML.
2. Push the updated file to GitHub.
3. GitHub Pages updates the page.
4. Each classroom TV refreshes and gets the new version automatically.

The teacher does not need to manually update each TV.

## Important Timer Behavior

The timer does **not** wait until 8:00 AM.

The teacher controls the timer manually.

The timer starts only when the teacher presses:

```text
Start
```

The timer state is saved in the browser using `localStorage`, so if the page refreshes every 60 seconds, the timer continues correctly.

## Editing the Exam Information

Open the HTML file and find this block near the top:

```js
const EXAM_CONFIG = {
  subject: "Pre-Algebra",
  title: "2nd Semester Mid-Terms",
  examTimeText: "8:00 → 9:00",
  durationHours: 1,
  durationMinutes: 0,
  autoRefreshSeconds: 60,
  ...
};
```

Change the text values as needed.

Example:

```js
subject: "Geometry",
title: "Semester 2 Final Exam",
examTimeText: "10:00 → 11:30",
durationHours: 1,
durationMinutes: 30,
```

## Editing Sticky Notes

In the same `EXAM_CONFIG` block, edit the `notes` section:

```js
notes: [
  {
    id: "q22-slope",
    label: "QUESTION 22",
    type: "Correction",
    text: "Q22 → slope is 2",
    icon: "trending_up",
    colourClass: "sticky-note-sky",
    width: 420,
    height: 190,
    fontSize: 46
  }
]
```

Useful fields:

| Field | Purpose |
|---|---|
| `id` | Unique note ID. Do not reuse the same ID for two notes. |
| `label` | Small heading on the note. |
| `type` | Category label, such as Correction, Reminder, or Format. |
| `text` | Main student-facing message. |
| `icon` | Google Material Symbol icon name. |
| `colourClass` | Sticky note colour. |
| `width` | Default note width in pixels. |
| `height` | Default note height in pixels. |
| `fontSize` | Default note text size in pixels. |

## Available Sticky Note Colours

Use one of these values:

```text
sticky-note-sky
sticky-note-peach
sticky-note-mint
sticky-note-yellow
sticky-note-lilac
sticky-note-cream
```

## Resetting Sticky Note Layout

Sticky note size and font changes are saved in the browser.

To force all screens to reset to the default note sizes, change this line in the HTML:

```js
notesStorageKey: "pre-algebra-midterm-sticky-layout-v3",
```

Change `v3` to a new version number, for example:

```js
notesStorageKey: "pre-algebra-midterm-sticky-layout-v4",
```

Then push the updated file to GitHub.

## Resetting Timer Data

Timer progress is saved in the browser.

To force the browser to treat the timer as new, change this line:

```js
timerStorageKey: "pre-algebra-midterm-timer-v3",
```

Change `v3` to a new version number, for example:

```js
timerStorageKey: "pre-algebra-midterm-timer-v4",
```

## Browser Notes

Recommended browsers:

- Chrome
- Edge
- Firefox

For classroom TVs, use fullscreen mode:

- Click the fullscreen icon in the top-right of the page, or
- Press `F11` on Windows

## Limitations

This is a static HTML page.

It can auto-refresh and pick up new GitHub Pages updates, but it does not include a real admin backend.

For instant live editing from one control panel without redeploying HTML, this project would need a small backend such as:

- Supabase
- Firebase
- Google Sheets API
- Raspberry Pi local server

## File

Main file:

```text
pre_algebra_midterm_classroom_display_v3.html
```

Recommended GitHub Pages filename:

```text
index.html
```
