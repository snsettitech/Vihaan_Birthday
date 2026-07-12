/**
 * Vihaan 1st Birthday — RSVP receiver
 * Bound to sheet: 1moXzqhfec2xYSzrRsBPTYld89hQNv6f2JZxvtXn56qY
 *
 * Paste this whole file into script.new (Google Apps Script),
 * then Deploy > New deployment > Web app > Who has access: Anyone.
 * It auto-creates the header row on first run and emails an
 * alert to the host on every RSVP.
 */
var SHEET_ID = "1moXzqhfec2xYSzrRsBPTYld89hQNv6f2JZxvtXn56qY";
var ALERT_EMAIL = "saiandchay@gmail.com";

function doPost(e) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheets()[0];

  // Add headers automatically if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Name", "Email", "Phone",
      "Attending", "Adults", "Kids", "Message"
    ]);
  }

  var p = (e && e.parameter) ? e.parameter : {};
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

  // Email the host on every RSVP (never let a mail error break the save)
  try {
    MailApp.sendEmail({
      to: ALERT_EMAIL,
      subject: "🏎️ New RSVP: " + (p.name || "(no name)") + " — " + (p.attending || ""),
      body:
        "New RSVP for Vihaan's 1st Birthday!\n\n" +
        "Name: " + (p.name || "") + "\n" +
        "Email: " + (p.email || "") + "\n" +
        "Phone: " + (p.phone || "") + "\n" +
        "Attending: " + (p.attending || "") + "\n" +
        "Adults: " + (p.adults || "") + "\n" +
        "Kids: " + (p.kids || "") + "\n" +
        "Message: " + (p.message || "") + "\n\n" +
        "View all RSVPs:\n" +
        "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/edit"
    });
  } catch (err) {
    console.error("RSVP email alert failed: " + err);
  }

  return ContentService.createTextOutput("OK");
}

// Lets you confirm the URL works by opening it in a browser
function doGet() {
  return ContentService.createTextOutput("Vihaan RSVP endpoint is live");
}
