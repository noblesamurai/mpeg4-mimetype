const fs = require('fs');
const MP4Box = require('./mp4box.js/dist/mp4box.all.js');

function getVideoInfo (fileName) {
  return new Promise(async (resolve, reject) => {
    const mp4boxfile = new MP4Box.createFile();
    const rs = fs.createReadStream(fileName, null);

    mp4boxfile.onReady = (info) => {
      rs.destroy();
      return resolve(info);
    };
    mp4boxfile.onError = (err) => {
      rs.destroy();
      return reject(err);
    };

    let offset = 0;
    for await (const chunk of rs) {
      const arrayBuffer = new Uint8Array(chunk).buffer;
      arrayBuffer.fileStart = offset;
      offset += chunk.byteLength;
      mp4boxfile.appendBuffer(arrayBuffer);
    }
  });
}

async function main () {
  const info = await getVideoInfo(process.argv[2])
  console.log(info.mime);
  const codecs = [];
  console.log("is fragmented: " + info.isFragmented);
  for (var t = 0; t < info.tracks.length; ++t) {
    console.log("track #" + t + " codec string: " + info.tracks[t].codec);
    codecs.push(info.tracks[t].codec);
  }
  const codecStr = 'video/mp4; codecs="' + codecs.join(', ') + '"';
  console.log(codecStr);
}

main().catch(console.error);

