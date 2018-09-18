const path = require('path');
const expect = require('chai').expect;
const mpeg4MimeType = require('..');

describe('index', function () {
  it('gives a mime type string', async function () {
    const details = await mpeg4MimeType(path.join(__dirname, 'fixtures', 'SampleVideo.mp4'));
    expect(details).to.be.a('string');
    expect(details).to.match(/video\/mp4; codecs="[a-z0-9.]+, [a-z0-9.]+"/);
  });
  it('rejects the promise if the file is not interpretable', async function () {
    this.timeout(10000);
    return mpeg4MimeType(path.join(__dirname, 'fixtures', '1289472.opus')).catch((err) => {
      expect(err).to.be.ok();
      return Promise.resolve('ok');
    }).then((result) => {
      expect(result).to.equal('ok');
    });
  });
});
