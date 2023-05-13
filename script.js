// Check if the browser supports the Web NFC API
if ("NDEFReader" in window) {
  // Define the function to read the NFC tag
  async function readNfc() {
    try {
      // Request permission to access the NFC reader
      const reader = new NDEFReader();
      await reader.scan();

      // Wait for the NFC tag to be read
      const { records } = await reader.read();

      // Display the tag data on the webpage
      const tagDataDiv = document.getElementById("tagData");
      tagDataDiv.innerHTML = records[0].data;
    } catch (error) {
      console.error("Error reading NFC tag:", error);
    }
  }
} else {
  console.error("Web NFC API not supported.");
}
