if ('NDEFReader' in window) {
  scanButton.addEventListener("click", async () => {
      console.log("User clicked scan button");
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        console.log("> Scan started");

        ndef.addEventListener("readingerror", () => {
          console.log("Argh! Cannot read data from the NFC tag. Try another one?");
        });

        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          console.log(`> Serial Number: ${serialNumber}`);
          console.log(`> Records: (${message.records.length})`);
          console.log(`> Record: (${message.records[0]})`);
        });
      } catch (error) {
        console.log("Argh! " + error);
      }
    });
} else {
    document.getElementById("scanButton").style.visibility='hidden';
    console.log("no nfc");
}
