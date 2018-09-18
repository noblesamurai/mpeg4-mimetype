# mpeg4-mimetype
Get the RFC 6381 mimetype string for mediasource usage

## Usage

``` bash
$ node test /Users/eugene/Downloads/rendering-artefacts.mp4
video/mp4; codecs="mp4a.40.2,avc1.4d0028"; profiles="isom,iso2,avc1,mp41"
is fragmented: false
track #0 codec string: mp4a.40.2
track #1 codec string: avc1.4d0028
video/mp4; codecs="mp4a.40.2, avc1.4d0028"

$ node test /Users/eugene/Downloads/GMT20180912-000144_Daily-Hang_1600x800.mp4
video/mp4; codecs="mp4a.40.2,avc1.64001f,text"; profiles="isom,mp42"
is fragmented: false
track #0 codec string: mp4a.40.2
track #1 codec string: avc1.64001f
track #2 codec string: text
video/mp4; codecs="mp4a.40.2, avc1.64001f, text"
```

## Notes

The version of mp4box that's in npm is out of date. I downloaded and built the 
[latest version](https://github.com/gpac/mp4box.js) and built it using grunt.

The file just uses the `./mp4box.js/dist/mp4box.all.js` file in the build.
