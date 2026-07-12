# Connect the Evite RSVP Form to Google Sheets (≈2 minutes)

## Step 1 — Create the Sheet
1. Go to [sheets.new](https://sheets.new)
2. Name it **Vihaan 1st Birthday RSVPs**
3. In row 1, add headers: `Timestamp | Name | Email | Phone | Attending | Adults | Kids | Message`

## Step 2 — Add the Apps Script
1. In the sheet: **Extensions → Apps Script**
2. Delete any code there and paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const p = e.parameter;
  sheet.appendRow([
    new Date(),
    p.name || "",
    p.email || "",
    p.phone || "",
    p.attending || "",
    p.adults || "",
    p.kids || "",
    p.message || ""
  ]);
  return ContentService.createTextOutput("OK");
}
```

3. Click the **Save** (disk) icon.

## Step 3 — Deploy as Web App
1. Click **Deploy → New deployment**
2. Click the gear icon → select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, authorize when prompted (choose your account → Advanced → Go to project → Allow)
5. **Copy the Web app URL** (ends in `/exec`)

## Step 4 — Paste the URL into the evite
1. Open `vihaan-evite.html` in any text editor (Notepad works)
2. Find this line near the bottom:
   ```
   const SCRIPT_URL = "PASTE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `PASTE_APPS_SCRIPT_URL_HERE` with your copied URL. Save.

## Step 5 — Test & share
- Open the HTML file in a browser, submit a test RSVP, and check the Sheet — a new row should appear within seconds.
- To share as a link, host the file free on [Netlify Drop](https://app.netlify.com/drop) (drag & drop the HTML file) or GitHub Pages, then send the URL to guests.

**Shortcut:** paste the `/exec` URL back to me in chat and I'll insert it into the file for you.
