const MP4Box = require('mp4box');
const fs = require('fs');

module.exports = function (filePath) {
  return new Promise((resolve, reject) => {
    const mp4boxfile = new MP4Box.createFile(); /* eslint-disable-line new-cap */
    const stream = fs.createReadStream(filePath);

    mp4boxfile.onReady = (info) => {
      stream.destroy();
      const codecs = info.tracks.map(t => t.codec);
      resolve('video/mp4; codecs="' + codecs.join(', ') + '"');
    };

    mp4boxfile.onError = (err) => {
      stream.destroy();
      reject(err);
    };

    let offset = 0;
    stream.on('data', function (chunk) {
      var arrayBuffer = new Uint8Array(chunk).buffer;
      arrayBuffer.fileStart = offset;
      offset += chunk.byteLength;
      mp4boxfile.appendBuffer(arrayBuffer);
    });
    stream.on('error', reject);
    stream.on('end', () => reject(new Error('Invalid file type.')));
  });
};
