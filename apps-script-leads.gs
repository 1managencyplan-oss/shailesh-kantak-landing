function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var p = e.parameter;
  sheet.appendRow([
    new Date(),
    p.name || '',
    p.phone || '',
    p.email || '',
    p.business || '',
    p.plan || '',
    p.status || 'Clicked to Pay',
    p.source_url || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({status: 'ok'})).setMimeType(ContentService.MimeType.JSON);
}

// Stub for later: if TagMango can send a webhook on confirmed payment,
// point it at this same deployed URL (POST) and we'll fill in the exact
// field names once we see TagMango's real payload — then this will
// find the matching row by email/phone and flip Status to "Paid".
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    return ContentService.createTextOutput(JSON.stringify({status: 'received', data: data})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
