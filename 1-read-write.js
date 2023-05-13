var nfc = {
  // (A) INIT
  hRead : null, // html read button
  init : () => {
    // (A1) GET HTML ELEMENTS
    nfc.hRead = document.getElementById("demoR"),

    // (A2) FEATURE CHECK + GET PERMISSION
    if ("NDEFReader" in window) {
      nfc.logger("Ready");
      nfc.hWrite.disabled = false;
      nfc.hRead.disabled = false;
      nfc.hReadOnly.disabled = false;
    } else { nfc.logger("Web NFC is not supported on this browser."); }
  },

  // (B) HELPER - DISPLAY LOG MESSAGE
  logger : msg => {
    let row = document.createElement("div");
    row.innerHTML = msg;
    nfc.hMsg.appendChild(row);
  },

  // (D) READ NFC TAG
  read : () => {
    nfc.logger("Approach NFC Tag");
    const ndef = new NDEFReader();
    ndef.scan()
    .then(() => {
      ndef.onreadingerror = err => nfc.logger("Read failed");
      ndef.onreading = evt => {
        const decoder = new TextDecoder();
        for (let record of evt.message.records) {
          //nfc.logger("Record type: " + record.recordType);
          //nfc.logger("Record encoding: " + record.encoding);
          nfc.logger("Record data: " + decoder.decode(record.data));
        }
      };
    })
    .catch(err => nfc.logger("Read error - " + err.message));
  }
};
window.onload = nfc.init;
