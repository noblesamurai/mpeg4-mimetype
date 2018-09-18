const MP4Box = require('mp4box');
const fs = require('fs');

module.exports = function (filePath) {
  return new Promise((resolve, reject) => {
    const mp4boxfile = new MP4Box.createFile(); /* eslint-disable-line new-cap */
    mp4boxfile.onReady = (info) => {
      console.log(info.mime);
      const codecs = [];
      console.log('is fragmented: ' + info.isFragmented);
      for (var t = 0; t < info.tracks.length; ++t) {
        console.log('track #' + t + ' codec string: ' + info.tracks[t].codec);
        codecs.push(info.tracks[t].codec);
      }
      const codecStr = 'video/mp4; codecs="' + codecs.join(', ') + '"';
      console.log(codecStr);
      resolve(codecStr);
    };

    var arrayBuffer = new Uint8Array(fs.readFileSync(filePath)).buffer;
    arrayBuffer.fileStart = 0;
    mp4boxfile.appendBuffer(arrayBuffer);
  });
};
