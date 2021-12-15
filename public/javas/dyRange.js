// credit to:https://jeromewu.github.io/ffmpeg-wasm-a-pure-webassembly-javascript-port-of-ffmpeg/ for FFmpeg wasm

// instances the ffmpeg
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({
  corePath: "/scripts/core/dist/ffmpeg-core.js",
  log: true,
});

// shows ffmpeg progress in console
ffmpeg.setLogging(true);

// gets file from user and initiates ubuffer array
const myFile = document.getElementById("myFile");
myFile.onchange = async () => {
  var ubuffer = [];
  const fileData = myFile.files[0];
  // file error if statesments here?

  // converts fileData to arrayBuffer, then uses an asynchronous function to turn it into a Uint8Array ubuffer
  await fileData.arrayBuffer().then((buffer) => {
    ubuffer = new Uint8Array(buffer, 0, buffer.byteLength);
  });

  (async () => {
    try {
      await ffmpeg.load();
      // writes inputted movie file to memory in a Uint8Array
      await ffmpeg.FS("writeFile", `${fileData.name}`, ubuffer);
      await ffmpeg.run(
        "-i",
        `${fileData.name}`,
        "-vcodec",
        "copy",
        "-af",
        "compand=0|0:1|1:-90/-900|-70/-70|-30/-9|0/-3:6:0:0:0",
        `out_${fileData.name}`
      );
    } catch (err) {
      alert(
        "Browser may not support SharedArrayBuffer at this time, try using chrome or firefox"
      );
      location.reload();
    }

    try {
      // reads file to const output (still in array form), and then converted to blob
      const output = await ffmpeg.FS("readFile", `out_${fileData.name}`);
      const outputBlob = new Blob([output]);

      // Create object URL to get movie blob from memory, and make available for download
      const objUrl = await URL.createObjectURL(outputBlob);
      var a = window.document.createElement("a");
      a.href = objUrl;
      a.download = `out_${fileData.name}`;

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();

      // Remove anchor from body
      document.body.removeChild(a);
    } catch (err) {
      alert(
        "Problem with outputting file. Make sure file is a movie file! Page will reload upon closing this box"
      );
      location.reload();
    }
  })();
};
