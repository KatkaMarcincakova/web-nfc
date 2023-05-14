if ('NDEFReader' in window) {

    navigator.permissions.query({ name: "nfc" }).then((nfcStatus) => {

        if (nfcStatus.state === "granted") {
            startScanning();
        } else {

          document.querySelector("#scanButton").onclick = event => {
            startScanning();
          };

        }

    });

    function startScanning(){
        const ndef = new NDEFReader();
        var hMsg = document.getElementById("demoMSG");
        ndef.scan().then(() => {

          ndef.onreadingerror = () => {
             let row = document.createElement("div");
              row.innerHTML = "reading error";
              hMsg.appendChild(row);
          };

          ndef.onreading = event => {
              if (event.recordType === "text") {
                  const textDecoder = new TextDecoder(event.encoding);
                  console.log(`Text Record: ${textDecoder.decode(event.data)} ${record.lang}`);
                  let row = document.createElement("div");
                  row.innerHTML = "text record: " + textDecoder.decode(event.data) + " " + record.lang;
                  hMsg.appendChild(row);
              }
          }

        }).catch(error => {
          let row = document.createElement("div");
              row.innerHTML = "something wrong with hw";
              hMsg.appendChild(row);
        });
    }

}
