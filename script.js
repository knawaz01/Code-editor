// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to various elements
  const copyButton = document.getElementById("copyButton");
  const lockButton = document.getElementById("lockButton");
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const jsCode = document.getElementById("js-code");
  const output = document.getElementById("output");

  // Initial unlock state
  let isLocked = false;

  // Add an event listener for the Copy button
  copyButton.addEventListener("click", function () {
    // Copy the content of the textareas to the clipboard
    const combinedCode = `${cssCode.value}\n${jsCode.value}\n${htmlCode.value}`;
    copyTextToClipboard(combinedCode);

    alert("Code copied to clipboard");
  });
  // function to save the code to a file
  function saveFile() {
    const filetype = document.getElementById("fileType").value;
    let content = "";

    if (filetype === "javascript") {
      content = document.getElementById("js-code").value;
    } else if (filetype === "html") {
      content = document.getElementById("html-code").value;
    } else if (filetype === "css") {
      content = document.getElementById("css-code").value;
    }

    const blob = new Blob([content], { type: "text/plain" });

    const blobuURL = window.URL.createObjectURL(blob);

    let fileExtention = "";
    if (filetype === "javascript") {
      fileExtention = "js";
    } else if (filetype === "html") {
      fileExtention = "html";
    } else if (filetype === "css") {
      fileExtention = "css";
    }

    const a = document.createElement("a");
    a.href = blobuURL;
    a.download = `myfile.${fileExtention}`;
    a.click();
    window.URL.revokeObjectURL(blobuURL);
  }
  // Add Event listner for the save button
  document.getElementById("saveButton").addEventListener("click", saveFile);

  // Add an event listener for the Lock/Unlock button
  lockButton.addEventListener("click", function () {
    isLocked = !isLocked;
    setLockState(isLocked);
  });

  // Synchronize code and update the output
  function synchronizeCode() {
    const combinedCode = `${cssCode.value}\n${jsCode.value}\n${htmlCode.value}`;
    output.srcdoc = `<html><head><style>${cssCode.value}</style><script>${jsCode.value}</script></head><body>${htmlCode.value}</body></html>`;
  }

  // Add event listeners to the textareas to synchronize code
  htmlCode.addEventListener("input", synchronizeCode);
  cssCode.addEventListener("input", synchronizeCode);
  jsCode.addEventListener("input", synchronizeCode);

  // Function to copy text to clipboard
  function copyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
  // Function to lock/unlock textareas
  function setLockState(locked) {
    htmlCode.disabled = locked;
    cssCode.disabled = locked;
    jsCode.disabled = locked;

    if (locked) {
      lockButton.textContent = "Unlock";
    } else {
      lockButton.textContent = "Lock";
    }
  }
});
