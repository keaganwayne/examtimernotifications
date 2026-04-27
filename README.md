# Classroom Aid Live Admin Version

This version adds a live admin editor and removes the 60-second page refresh.

## Main URLs

Classroom / TV display:

```text
/
```

Admin editor:

```text
/admin.html
```

Live config API:

```text
/api/config
```

## What changed

The classroom page no longer refreshes every 60 seconds.

Instead, it polls `/api/config` in the background every 5 seconds. Because the page is not reloading, fullscreen mode stays active.

The admin page can change:

- subject
- exam title
- displayed exam time
- timer duration
- number of notifications
- notification message
- notification label
- notification type
- notification icon
- note colour
- default note width
- default note height
- default note font size

## Files

```text
index.html
admin.html
package.json
netlify.toml
netlify/functions/config.js
```

## GitHub / Netlify Setup

Replace your existing `index.html` with the included `index.html`.

Add the other files to the root of your GitHub repository.

Your repo should look like this:

```text
your-repo/
├── index.html
├── admin.html
├── package.json
├── netlify.toml
└── netlify/
    └── functions/
        └── config.js
```

Commit and push.

Netlify will redeploy.

## Required Netlify Environment Variable

In Netlify, add this environment variable:

```text
ADMIN_PASSWORD
```

Example value:

```text
31415
```

Then redeploy the site.

The admin page is visible at `/admin.html`, but saving changes requires this password.

## Fullscreen Fix

The old version refreshed the page every 60 seconds. Browser fullscreen mode exits whenever a page reloads.

This version does not reload the page.

It uses background `fetch()` polling instead, so fullscreen stays on.

## Timer Behavior

The timer is still teacher-controlled:

- Start
- Stop
- Reset

The timer does not wait for 8:00 AM.

Timer state is saved in the browser using `localStorage`, so live notification updates do not reset the timer.

## Sticky Notes

Sticky notes can still be resized on the display page.

Each note also has `A−` and `A+` controls for local font-size adjustment.

Admin changes set the default note size and font size. Local classroom display adjustments are stored per browser.
