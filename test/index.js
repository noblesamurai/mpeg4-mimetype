const path = require('path');
const expect = require('chai').expect;

describe('index', function () {
  it('gives a mine type string', async function () {
    const mpeg4MimeType = require('..');
    const details = await mpeg4MimeType(path.join(__dirname, 'fixtures', 'SampleVideo.mp4'));
    expect(details).to.be.a('string');
    expect(details).to.match(/video\/mp4; codecs="[a-z0-9.]+, [a-z0-9.]+"/);
  });
});
