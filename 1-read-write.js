var nfc = {
  // (A) INIT
  hTxt : null,
  hRead : null, // html read button
  hMsg : null, // html "console messages"
  init : () => {
    // (A1) GET HTML ELEMENTS
    nfc.hRead = document.getElementById("demoR"),
    nfc.hMsg = document.getElementById("demoMSG");

    // (A2) FEATURE CHECK + GET PERMISSION
    if ("NDEFReader" in window) {
      nfc.logger("Ready");
      nfc.hRead.disabled = false;
    } else { nfc.logger("Web NFC is not supported on this browser."); }
  },

  // (B) HELPER - DISPLAY LOG MESSAGE
  logger : msg => {
    nfc.hMsg.innerHTML = msg;
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
          nfc.logger("Record data: " + decoder.decode(record.data));
        }
      };
    })
    .catch(err => nfc.logger("Read error - " + err.message));
  }
};
window.onload = nfc.init;
