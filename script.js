scanButton.addEventListener("click", async () => {
  log("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    log("> Scan started");

    ndef.addEventListener("readingerror", () => {
      log("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      log(`> Serial Number: ${serialNumber}`);
      log(`> Records: (${message.records.length})`);
      // Get the div element
      const div = document.getElementById("myDiv");

      // Set the innerHTML property to replace the content of the div
      div.innerHTML = serialNumber;
    });
  } catch (error) {
    log("Argh! " + error);
  }
});
