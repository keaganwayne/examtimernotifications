# Classroom Aid Admin Layer

This adds a live admin editor to the classroom exam display.

## Files

```text
admin.html
package.json
netlify.toml
netlify/functions/config.js
index_patch.js
```

## What this does

Your current `index.html` has notifications locked inside the HTML. This layer moves those editable values into a small live config endpoint:

```text
/api/config
```

The admin page edits that config here:

```text
/admin.html
```

The classroom display polls `/api/config` every 5 seconds, so the TVs update without redeploying the site.

## Install

Copy these files into the root of your GitHub repository:

```text
admin.html
package.json
netlify.toml
netlify/functions/config.js
```

Then paste the logic from:

```text
index_patch.js
```

inside your current `index.html` main script, just before the final closing `})();`. Do not paste it after the closing script tag if you are using the v3 file, because the timer/config variables live inside that script closure.

## Netlify environment variable

In Netlify, add this environment variable:

```text
ADMIN_PASSWORD
```

Example value:

```text
31415
```

Then redeploy.

## URLs

Classroom display:

```text
https://your-site.netlify.app/
```

Admin editor:

```text
https://your-site.netlify.app/admin.html
```

## Admin editor can change

- subject
- exam title
- displayed exam time
- timer duration
- number of notifications
- notification labels
- notification messages
- sticky note colours
- default note width
- default note height
- default font size

## Security note

The admin page URL is public if someone knows it, but saving requires the server-side password stored as `ADMIN_PASSWORD` in Netlify. For a classroom display this is usually enough. For stronger control, add Netlify Identity or Supabase Auth later.
