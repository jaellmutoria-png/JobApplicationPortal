# Job Application Portal

Static website (HTML, CSS, JavaScript) plus a PostgreSQL schema.

## Run it
**Visual Studio Code:** File > Open Folder, choose this folder, install the "Live Server" extension, right-click `index.html` > Open with Live Server.

**Visual Studio:** File > Open > Folder, choose this folder, right-click `index.html` > View in Browser (or Open With > Browser).

You can also double-click `index.html` to open it in any browser.

## Files
- `index.html`     page structure
- `css/styles.css` all styling (light and dark themes)
- `js/app.js`      jobs data, search, filters, apply form, tracker
- `database/schema.sql` PostgreSQL tables and the 13 sample jobs

Applications and saved jobs are stored in the browser (localStorage) until a server and database are connected.
