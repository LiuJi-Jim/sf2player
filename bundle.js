(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.sf2player = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Event = function Event(subtype, deltaTime, time) {
  classCallCheck(this, Event);

  this.subtype = subtype;
  this.deltaTime = deltaTime;
  this.time = time;
};

var ChannelEvent = function (_Event) {
  inherits(ChannelEvent, _Event);

  function ChannelEvent(subtype, deltaTime, time, channel, parameter1, parameter2) {
    classCallCheck(this, ChannelEvent);

    var _this = possibleConstructorReturn(this, (ChannelEvent.__proto__ || Object.getPrototypeOf(ChannelEvent)).call(this, subtype, deltaTime, time));

    _this.channel = channel;
    _this.parameter1 = parameter1;
    _this.parameter2 = parameter2;
    return _this;
  }

  return ChannelEvent;
}(Event);

var SystemExclusiveEvent = function (_Event2) {
  inherits(SystemExclusiveEvent, _Event2);

  function SystemExclusiveEvent(subtype, deltaTime, time, data) {
    classCallCheck(this, SystemExclusiveEvent);

    var _this2 = possibleConstructorReturn(this, (SystemExclusiveEvent.__proto__ || Object.getPrototypeOf(SystemExclusiveEvent)).call(this, subtype, deltaTime, time));

    _this2.data = data;
    return _this2;
  }

  return SystemExclusiveEvent;
}(Event);

var MetaEvent = function (_Event3) {
  inherits(MetaEvent, _Event3);

  function MetaEvent(subtype, deltaTime, time, data) {
    classCallCheck(this, MetaEvent);

    var _this3 = possibleConstructorReturn(this, (MetaEvent.__proto__ || Object.getPrototypeOf(MetaEvent)).call(this, subtype, deltaTime, time));

    _this3.data = data;
    return _this3;
  }

  return MetaEvent;
}(Event);

var Midi = {
  Event: Event,
  ChannelEvent: ChannelEvent,
  SystemExclusiveEvent: SystemExclusiveEvent,
  MetaEvent: MetaEvent
};

function hrtime() {
  if (typeof window.performance !== 'undefined' && typeof performance.now !== 'undefined') {
    // support hrt
    return performance.now();
  } else {
    // oh no..
    return new Date().getTime();
  }
}

function range(val, min, max) {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

function extend(target) {
  for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objs[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < objs.length; ++i) {
    var obj = objs[i];
    for (var key in obj) {
      target[key] = obj[key];
    }
  }
  return target;
}

function stringToArray(str) {
  var arr = new Array(str.length);
  for (var i = 0; i < str.length; ++i) {
    arr[i] = str.charCodeAt(i);
  }
  return arr;
}

function readString(input, offset, length) {
  var codes = input.subarray(offset, offset + length);
  return String.fromCharCode.apply(String, toConsumableArray(codes));
}

function readUint32(input, offset) {
  var be = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return be ? (input[offset++] << 24 | input[offset++] << 16 | input[offset++] << 8 | input[offset++]) >>> 0 : (input[offset++] | input[offset++] << 8 | input[offset++] << 16 | input[offset++] << 24) >>> 0;
}

function readInt16(input, offset) {
  var be = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return be ? input[offset++] << 8 | input[offset++] : input[offset++] | input[offset++] << 8;
}

var Parser = function () {
  function Parser(input, params) {
    classCallCheck(this, Parser);

    params = extend({
      index: 0
    }, params);
    this.input = input;
    this.ip = params.index;

    this.header = null;
    this.dataInformation = null;
    this.tracks = null;
  }

  createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      this.parseHeader();
      this.parseDataInformation();
      this.parseTracks();
    }
  }, {
    key: 'parseHeader',
    value: function parseHeader() {
      var input = this.input;
      var header = {};
      var ip = this.ip;
      var signature = readString(input, ip, 4);
      ip += 4;

      if (signature !== 'melo') {
        throw new Error('invalid MFi signature: ' + signature);
      }

      header.fileLength = readUint32(input, ip, true);
      ip += 4;
      header.trackOffset = (input[ip++] << 16 | input[ip++]) + ip;
      header.dataMajorType = input[ip++];
      header.dataMinorType = input[ip++];
      header.numberOfTracks = input[ip++];

      this.header = header;
      this.ip = ip;
    }
  }, {
    key: 'parseDataInformation',
    value: function parseDataInformation() {
      var input = this.input;
      var ip = this.ip;
      var dataInformation = {};

      while (ip < this.header.trackOffset) {
        var type = readString(input, ip, 4);
        ip += 4;
        var size = readInt16(input, ip, true);
        ip += 2;

        switch (type) {
          case 'titl': /* FALLTHROUGH */
          case 'copy': /* FALLTHROUGH */
          case 'vers': /* FALLTHROUGH */
          case 'date': /* FALLTHROUGH */
          case 'prot':
            dataInformation[type] = readString(input, ip, size);
            ip += size;
            break;
          case 'sorc':
            dataInformation[type] = input[ip++];
            break;
          case 'note':
            dataInformation[type] = readInt16(input, ip, true);
            ip += 2;
            break;
          case 'exst': /* FALLTHROUGH */
          default:
            dataInformation[type] = input.subarray(ip, ip += size);
            break;
        }
      }

      this.dataInformation = dataInformation;
      this.ip = ip;
    }
  }, {
    key: 'parseTracks',
    value: function parseTracks() {
      var input = this.input;
      var tracks = [];
      var ip = this.ip;

      // 変換しにくい形式を平坦化する
      for (var i = 0; i < this.header.numberOfTracks; ++i) {
        var signature = readString(input, ip, 4);
        ip += 4;
        if (signature !== 'trac') {
          throw new Error('invalid track signature: ' + signature);
        }

        var size = readUint32(input, ip, true);
        ip += 4;

        var limit = ip + size;
        var track = [];
        tracks.push(track);

        while (ip < limit) {
          var message = {};

          // delta time
          var deltaTime = input[ip++];
          message.deltaTime = deltaTime;

          // status
          var status = input[ip++];
          if (status !== 0xff) {
            message.type = 'note';
            message.subType = 'Note';
            message.voice = status >> 6;
            message.key = status && 0x3f;

            // note length
            var noteLength = input[ip++];
            message.length = noteLength;

            // extend status
            if (this.dataInformation['note'] === 1) {
              var extendStatus = input[ip++];
              message.velocity = extendStatus >> 2;
              message.octaveShift = extendStatus & 0x3;
            }
          } else {
            message['type'] = 'meta';

            // status
            status = input[ip++];
            switch (status >> 4) {
              // system message
              case 0xb:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'MasterVolume';
                    message.value = input[ip++];
                    break;
                  case 0xa:
                    message.subType = 'DrumScale';
                    message.value = {
                      'channel': input[ip] >> 3 & 0x7,
                      'drum': input[ip++] & 0x1
                    };
                    break;
                  default:
                    throw new Error('unknown message type: ' + status.toString(16));
                }
                break;
              // tempo message
              case 0xc:
                message.subType = 'SetTempo';
                message.value = {
                  'timeBase': (status & 0x7) === 7 ? NaN : Math.pow(2, status & 0x7) * ((status & 0x8) === 0 ? 6 : 15),
                  'tempo': input[ip++]
                };
                break;
              // control message
              case 0xd:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'Point';
                    message.value = input[ip++];
                    break;
                  case 0xd:
                    message.subType = 'Loop';
                    message.value = {
                      'id': input[ip] >> 6,
                      'count': input[ip] >> 2 & 0xf,
                      'point': input[ip++] & 0x3
                    };
                    break;
                  case 0xe:
                    message.subType = 'Nop';
                    message.value = input[ip++];
                    break;
                  case 0xf:
                    message.subType = 'EndOfTrack';
                    message.value = input[ip++];
                    break;
                  default:
                    throw new Error('unkwnon message type: ' + status.toString(16));
                }
                break;
              // instrument
              case 0xe:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'InstrumentLowPart';
                    message.value = {
                      'part': input[ip] >> 6,
                      'instrument': input[ip++] & 0x3f
                    };
                    break;
                  case 0x1:
                    message.subType = 'InstrumentHighPart';
                    message.value = {
                      'part': input[ip] >> 6,
                      'instrument': input[ip++] & 0x1
                    };
                    break;
                  case 0x2:
                    message.subType = 'Volume';
                    message.value = {
                      'part': input[ip] >> 6,
                      'volume': input[ip++] & 0x3f
                    };
                    break;
                  case 0x3:
                    message.subType = 'Valance';
                    message.value = {
                      'part': input[ip] >> 6,
                      'valance': input[ip++] & 0x3f
                    };
                    break;
                  case 0x4:
                    message.subType = 'PitchBend';
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': input[ip++] & 0x3f
                    };
                    break;
                  case 0x5:
                    message.subType = 'ChannelAssign';
                    message.value = {
                      'part': input[ip] >> 6,
                      'channel': input[ip++] & 0x3f
                    };
                    break;
                  case 0x6:
                    message.subType = 'VolumeChange';
                    message.value = {
                      'part': input[ip] >> 6,
                      'volume': (input[ip++] & 0x3f) << 26 >> 26
                    };
                    break;
                  case 0x7:
                    message.subType = 'PitchBendRange';
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': input[ip++] & 0x3f
                    };
                    break;
                  // TODO: 未遭遇
                  /*
                  case 0x8:
                    message.subType = 'MasterFineTuning'
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': (input[ip++] & 0x3f)
                    }
                    break
                  */
                  // TODO: あってるか自信ない
                  case 0x9:
                    message.subType = 'MasterCoarseTuning';
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': input[ip++] & 0x3f
                    };
                    break;
                  case 0xA:
                    message.subType = 'Modulation';
                    message.value = {
                      'part': input[ip] >> 6,
                      'depth': input[ip++] & 0x3f
                    };
                    break;
                  default:
                    throw new Error('unkwnon message type: ' + status.toString(16));
                }
                break;
              // extended information
              case 0xf:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'EditInstrument';
                    message.value = parseEditInstrument();
                    break;
                  case 0x1:
                    message.subType = 'Vibrato';
                    message.value = parseVibrato();
                    break;
                  case 0xf:
                    message.subType = 'DeviceSpecific';
                    message.value = parseDeviceSpecific();
                    break;
                  default:
                    throw new Error('unkwnon message type: ' + status.toString(16));
                }
                break;
              default:
                throw new Error('unkwnon message type: ' + status.toString(16));
            }
          }

          track.push(message);
        }
        ip = limit;
      }

      function parseEditInstrument() {
        var length = readInt16(input, ip, true);
        ip += 2;
        var limit = ip + length;
        var result = [];

        if (input[ip++] !== 1) {
          throw new Error('invalid EditInstrument const value: ' + input[ip - 1]);
        }

        while (ip < limit) {
          var info = {};

          info.part = input[ip++] >> 4 & 0x3;
          info.modulator = {
            'ML': input[ip] >> 5,
            'VIV': input[ip] >> 4 & 0x1,
            'EG': input[ip] >> 3 & 0x1,
            'SUS': input[ip] >> 2 & 0x1,
            'RR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'DR': input[ip] >> 4 & 0xf,
            'AR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'SL': input[ip] >> 4 & 0xf,
            'TL': (input[ip++] & 0x3) << 4 | input[ip] >> 4,
            'WF': input[ip] >> 3 & 0x1,
            'FB': input[ip++] & 0x7
          };
          info.carrier = {
            'ML': input[ip] >> 5,
            'VIV': input[ip] >> 4 & 0x1,
            'EG': input[ip] >> 3 & 0x1,
            'SUS': input[ip] >> 2 & 0x1,
            'RR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'DR': input[ip] >> 4 & 0xf,
            'AR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'SL': input[ip] >> 4 & 0xf,
            'TL': (input[ip++] & 0x3) << 4 | input[ip] >> 4,
            'WF': input[ip] >> 3 & 0x1,
            'FB': input[ip++] & 0x7
          };
          info.octaveSelect = input[ip++] & 0x3;

          result.push(info);
        }

        return result;
      }

      function parseVibrato() {
        readInt16(input, ip, true);
        ip += 2;

        if (input[ip++] !== 1) {
          throw new Error('invalid Vibrato const value: ' + input[ip - 1]);
        }

        return {
          'part': input[ip++] >> 5 & 0x3,
          'switch': input[ip++] >> 6
        };
      }

      function parseDeviceSpecific() {
        var length = readInt16(input, ip, true);
        ip += 2;
        var limit = ip + length;

        if (input[ip++] !== 0x11) {
          throw new Error('invalid DeviceSpecific const value: ' + input[ip - 1]);
        }

        return {
          'data': input.subarray(ip, ip += limit - ip)
        };
      }

      this.tracks = tracks;
      this.ip = ip;
    }
  }, {
    key: 'convertToMidiTracks',
    value: function convertToMidiTracks() {
      var tracks = [];
      var plainTracks = [];
      // const result = {
      //   timeDivision: 48,
      //   tracks,
      //   plainTracks
      // }
      var mfiTracks = this.tracks;
      var channelTime = [];

      for (var i = 0; i < 16; ++i) {
        plainTracks.push([]);
        channelTime.push(0);
      }

      // 変換しにくい形式を平坦化する
      for (var _i = 0; _i < mfiTracks.length; ++_i) {
        var mfiTrack = mfiTracks[_i];
        var tmpTrack = [];

        // note の処理
        for (var time = 0, pos = 0, j = 0; j < mfiTrack.length; ++j) {
          var mfiEvent = mfiTrack[j];
          time += mfiEvent['deltaTime'];
          mfiEvent.id = pos;
          mfiEvent.time = time;

          switch (mfiEvent.subType) {
            case 'Nop':
              break;
            case 'Note':
              tmpTrack[pos++] = mfiEvent;
              // TODO: value: ... 形式になおす
              tmpTrack[pos] = {
                id: pos,
                type: 'internal',
                subType: 'NoteOff',
                time: time + mfiEvent.length,
                key: mfiEvent.key,
                voice: mfiEvent.voice,
                velocity: mfiEvent.velocity,
                octaveShift: mfiEvent.octaveShift
              };
              pos++;
              break;
            case 'InstrumentHighPart':
              var prevEvent = mfiEvent;
              mfiEvent = mfiTrack[++j];
              if (mfiEvent.subType !== 'InstrumentLowPart') {
                throw new Error('broken instrument');
              }
              // TODO: value: ... 形式になおす
              tmpTrack[pos] = {
                id: pos,
                type: 'internal',
                subType: 'ProgramChange',
                time: time,
                part: mfiEvent.value.part,
                instrument: prevEvent.value.instrument << 6 | mfiEvent.value.instrument
              };
              pos++;
              break;
            default:
              tmpTrack[pos++] = mfiEvent;
              break;
          }
        }
        tmpTrack.sort(function (a, b) {
          return a.time > b.time ? 1 : a.time < b.time ? -1 : a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
        });

        // MIDI トラックに作成
        tracks[_i] = [];
        for (var _time = 0, _j = 0; _j < tmpTrack.length; ++_j) {
          var _mfiEvent = tmpTrack[_j];
          _time = _mfiEvent.time;

          var channel = void 0;
          var key = void 0;
          var tmp = void 0;
          switch (_mfiEvent.subType) {
            case 'Note':
              // NoteOn: 9n kk vv
              key = this.applyOctaveShift(_mfiEvent.key + 45, _mfiEvent.octaveShift);
              channel = _i * 4 + _mfiEvent.voice;

              // TODO: リズムトラックの時は Key が -10 されているような気がする
              if (channel === 9) {
                key -= 10;
              }
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0x90 | channel, key, _mfiEvent.velocity * 2));
              break;
            case 'NoteOff':
              // NoteOff: 8n kk vv
              key = this.applyOctaveShift(_mfiEvent.key + 45, _mfiEvent.octaveShift);
              channel = _i * 4 + _mfiEvent.voice;

              // TODO: リズムトラックの時は Key が -10 されているような気がする
              if (channel === 9) {
                key -= 10;
              }
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0x80 | channel, key, _mfiEvent.velocity * 2));
              break;
            case 'ProgramChange':
              // Program Change: Cn pp
              channel = _i * 4 + _mfiEvent.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xC0 | channel, _mfiEvent.instrument));
              break;
            case 'SetTempo':
              // SetTempo: FF 51 03 tt tt tt
              tmp = 2880000000 / (_mfiEvent.value.tempo * _mfiEvent.value.timeBase);
              channel = 0; // SetTempo は必ず先頭のトラックに配置する
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xFF, 0x51, 0x03, tmp >> 16 & 0xff, tmp >> 8 & 0xff, tmp & 0xff));
              break;
            case 'Loop':
              // Marker: FF 06 ll ss ss ss ...
              tmp = _mfiEvent.value.count;
              var str = 'LOOP_' + (_mfiEvent.value.point === 0 ? 'START' : 'END') + '=ID:' + _mfiEvent.value.id + ',COUNT:' + (tmp === 0 ? -1 : tmp);
              channel = 0;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat([0xFF, 0x06, str.length], str.split('').map(function (a) {
                return a.charCodeAt(0);
              })));
              break;
            case 'MasterVolume':
              // Master Volume: F0 7F ee 04 01 dl dm F7
              tmp = _mfiEvent.value;
              channel = 0;

              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xF0, 0x07, // length
              0x7F, 0x7F, 0x04, 0x01, tmp, tmp, 0xF7));
              break;
            case 'Modulation':
              // CC#1 Modulation: Bn 01 dd
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x01, _mfiEvent.value.depth * 2));
              break;
            case 'Volume':
              // CC#7 Volume: Bn 07 dd
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x07, _mfiEvent.value.volume * 2));
              break;
            case 'Valance':
              // CC#10 Panpot: Bn 0A dd
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x0A, (_mfiEvent.value.valance - 32) * 2 + 64));
              break;
            case 'PitchBend':
              // Pitch Bend: En dl dm
              // TODO: LSB = MSB で良いか不明
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xE0 | channel, _mfiEvent.value.value * 2, _mfiEvent.value.value * 2));
              break;
            case 'PitchBendRange':
              // Pitch Bend: CC#100=0 CC#101=0 CC#6
              // Bn 64 00 Bn 65 00 Bn 06 vv
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x64, 0x00), [0x00, 0xB0 | channel, 0x65, 0x00], [0x00, 0xB0 | channel, 0x06, _mfiEvent.value.value * 2]);
              break;
            case 'MasterCoarseTuning':
              // MasterCoarseTuning: CC#100=0 CC#101=2 CC#6
              // Bn 64 01 Bn 65 02 Bn 06 vv
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x64, 0x00), [0x00, 0xB0 | channel, 0x65, 0x02], [0x00, 0xB0 | channel, 0x06, _mfiEvent.value.value * 2]);
              break;
            default:
              continue;
          }

          channelTime[channel] = _mfiEvent.time;
        }
      }

      return this.toSMF(plainTracks);
    }
  }, {
    key: 'applyOctaveShift',
    value: function applyOctaveShift(key, octaveShift) {
      var table = [0, 12, -24, -12];

      if (table[octaveShift] !== undefined) {
        return key + table[octaveShift];
      }

      throw new Error('invalid OctaveShift value: ' + octaveShift);
    }
  }, {
    key: 'toSMF',
    value: function toSMF(plainTracks) {
      var TimeDivision = 48;
      var result = [0x4D, 0x54, 0x68, 0x64, // "MThd"
      0x00, 0x00, 0x00, 0x06, // Size
      0x00, 0x01, // Format
      0x00, 0x10, // number of track
      TimeDivision >> 8 & 0xff, TimeDivision & 0xff // Data
      ];

      if (this.dataInformation.copy !== undefined) {
        var copy = stringToArray(this.dataInformation.copy);
        copy = [0x00, 0xff, 0x02].concat(this.deltaTimeToByteArray(copy.length), copy);
        plainTracks[0].unshift(copy);
      }

      /*
      if (this.dataInformation.titl !== void 0) {
        let title = stringToArray(this.dataInformation.titl)
        title = [0x00, 0xff, 0x03].concat(
          this.deltaTimeToByteArray(title.length),
          title
        )
        plainTracks[0].unshift(title)
      }
      */

      for (var i = 0; i < plainTracks.length; ++i) {
        var track = plainTracks[i];
        var trackData = [];
        for (var j = 0; j < track.length; ++j) {
          trackData.push.apply(trackData, toConsumableArray(track[j]));
        }

        var jl = trackData.length;
        var trackHeader = [0x4D, 0x54, 0x72, 0x6B, // "MTrk"
        jl >> 24 & 0xff, jl >> 16 & 0xff, jl >> 8 & 0xff, jl & 0xff];
        result = result.concat(trackHeader, trackData);
      }

      result = new Uint8Array(result);

      return result;
    }
  }, {
    key: 'deltaTimeToByteArray',
    value: function deltaTimeToByteArray(deltaTime) {
      var array = [];

      while (deltaTime > 0x80) {
        array.unshift(deltaTime & 0x7f | (array.length === 0 ? 0 : 0x80));
        deltaTime >>>= 7;
      }
      array.unshift(deltaTime | (array.length === 0 ? 0 : 0x80));

      return array;
    }
  }]);
  return Parser;
}();

var Mld = {
  Parser: Parser
};

var Chunk = function Chunk(type, size, offset) {
  classCallCheck(this, Chunk);

  this.type = type;
  this.size = size;
  this.offset = offset;
};

var Parser$1 = function () {
  function Parser(input, params) {
    classCallCheck(this, Parser);

    params = extend({
      index: 0,
      padding: true,
      bigEndian: false
    }, params);
    this.input = input;
    this.ip = params.index;
    this.length = params.length || input.length - this.ip;
    this.offset = this.ip;
    this.padding = params.padding;
    this.bigEndian = params.bigEndian;

    this.chunkList = null;
  }

  createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      var length = this.length + this.offset;
      this.chunkList = [];
      while (this.ip < length) {
        this.parseChunk();
      }
    }
  }, {
    key: 'parseChunk',
    value: function parseChunk() {
      var input = this.input;
      var ip = this.ip;
      var signature = readString(input, ip, 4);
      ip += 4;
      var size = readUint32(input, ip, this.bigEndian);
      ip += 4;

      var chunk = new Chunk(signature, size, ip);
      this.chunkList.push(chunk);
      ip += size;
      if (this.padding && (ip - this.offset & 1) === 1) {
        ip++;
      }
      this.ip = ip;
    }
  }, {
    key: 'getChunk',
    value: function getChunk(index) {
      var chunk = this.chunkList[index];
      if (chunk === undefined) {
        return null;
      }
      return chunk;
    }
  }, {
    key: 'getNumberOfChunks',
    value: function getNumberOfChunks() {
      return this.chunkList.length;
    }
  }]);
  return Parser;
}();

var Riff = {
  Parser: Parser$1
};

var SMFParser = function () {
  function SMFParser(input, params) {
    classCallCheck(this, SMFParser);

    params = extend({
      index: 0
    }, params);
    params.padding = false;
    params.bigEndian = true;

    this.input = input;
    this.ip = params.index;
    this.chunkIndex = 0;

    this.riffParser = new Riff.Parser(input, params);

    this.formatType = null;
    this.numberOfTracks = null;
    this.timeDivision = null;
    this.tracks = [];
    this.plainTracks = [];
  }

  createClass(SMFParser, [{
    key: 'parse',
    value: function parse() {
      this.riffParser.parse();
      this.parseHeaderChunk();

      for (var i = 0; i < this.numberOfTracks; ++i) {
        this.parseTrackChunk();
      }
    }
  }, {
    key: 'parseHeaderChunk',
    value: function parseHeaderChunk() {
      var chunk = this.riffParser.getChunk(this.chunkIndex++);

      if (!chunk || chunk.type !== 'MThd') {
        throw new Error('invalid header signature');
      }

      var input = this.input;
      var ip = chunk.offset;

      this.formatType = input[ip++] << 8 | input[ip++];
      this.numberOfTracks = input[ip++] << 8 | input[ip++];
      this.timeDivision = input[ip++] << 8 | input[ip++];
    }
  }, {
    key: 'parseTrackChunk',
    value: function parseTrackChunk() {
      var chunk = this.riffParser.getChunk(this.chunkIndex++);

      if (!chunk || chunk.type !== 'MTrk') {
        throw new Error('invalid header signature');
      }

      var input = this.input;
      var ip = chunk.offset;

      var size = chunk.offset + chunk.size;
      var eventQueue = [];
      var plainQueue = [];
      var totalTime = 0;
      var prevEventType = -1;
      var prevChannel = -1;

      while (ip < size) {
        // delta time
        var deltaTime = readNumber();
        totalTime += deltaTime;

        // offset
        var offset = ip;

        // event type value, midi channel
        var status = input[ip++];
        var eventType = status >> 4 & 0xf;
        var channel = status & 0xf;

        // run status rule
        if (eventType < 8) {
          eventType = prevEventType;
          channel = prevChannel;
          status = prevEventType << 4 | prevChannel;
          ip--;
          offset--;
        } else {
          prevEventType = eventType;
          prevChannel = channel;
        }

        // TODO
        var table = [,,,,,,,, 'NoteOff', 'NoteOn', 'NoteAftertouch', 'ControlChange', 'ProgramChange', 'ChannelAftertouch', 'PitchBend'];

        var event = void 0;
        switch (eventType) {
          // channel events
          case 0x8: /* FALLTHROUGH */
          case 0x9: /* FALLTHROUGH */
          case 0xA: /* FALLTHROUGH */
          case 0xB: /* FALLTHROUGH */
          case 0xD: /* FALLTHROUGH */
          case 0xE:
            event = new Midi.ChannelEvent(table[eventType], deltaTime, totalTime, channel, input[ip++], input[ip++]);
            break;
          case 0xC:
            event = new Midi.ChannelEvent(table[eventType], deltaTime, totalTime, channel, input[ip++]);
            break;
          // meta events, system exclusive event
          case 0xF:
            var tmp = void 0;
            switch (channel) {
              // SysEx event
              case 0x0:
                tmp = readNumber();
                if (input[ip + tmp - 1] !== 0xf7) {
                  throw new Error('invalid SysEx event');
                }
                event = new Midi.SystemExclusiveEvent('SystemExclusive', deltaTime, totalTime, input.subarray(ip, (ip += tmp) - 1));
                break;
              case 0x7:
                tmp = readNumber();
                event = new Midi.SystemExclusiveEvent('SystemExclusive(F7)', deltaTime, totalTime, input.subarray(ip, ip += tmp));
                break;
              // meta event
              case 0xF:
                eventType = input[ip++];
                tmp = readNumber();
                switch (eventType) {
                  case 0x00:
                    // sequence number
                    event = new Midi.MetaEvent('SequenceNumber', deltaTime, totalTime, [input[ip++], input[ip++]]);
                    break;
                  case 0x01:
                    // text event
                    event = new Midi.MetaEvent('TextEvent', deltaTime, totalTime, readString(input, ip, tmp));
                    ip += tmp;
                    break;
                  case 0x02:
                    // copyright notice
                    event = new Midi.MetaEvent('CopyrightNotice', deltaTime, totalTime, readString(input, ip, tmp));
                    ip += tmp;
                    break;
                  case 0x03:
                    // sequence/track name
                    event = new Midi.MetaEvent('SequenceTrackName', deltaTime, totalTime, readString(input, ip, tmp));
                    ip += tmp;
                    break;
                  case 0x04:
                    // instrument name
                    event = new Midi.MetaEvent('InstrumentName', deltaTime, totalTime, readString(input, ip, tmp));
                    ip += tmp;
                    break;
                  case 0x05:
                    // lyrics
                    event = new Midi.MetaEvent('Lyrics', deltaTime, totalTime, readString(input, ip, tmp));
                    ip += tmp;
                    break;
                  case 0x06:
                    // marker
                    event = new Midi.MetaEvent('Marker', deltaTime, totalTime, readString(input, ip, tmp));
                    ip += tmp;
                    break;
                  case 0x07:
                    // cue point
                    event = new Midi.MetaEvent('CuePoint', deltaTime, totalTime, readString(input, ip, tmp));
                    ip += tmp;
                    break;
                  case 0x20:
                    // midi channel prefix
                    event = new Midi.MetaEvent('MidiChannelPrefix', deltaTime, totalTime, [input[ip++]]);
                    break;
                  case 0x2f:
                    // end of track
                    event = new Midi.MetaEvent('EndOfTrack', deltaTime, totalTime, []);
                    break;
                  case 0x51:
                    // set tempo
                    event = new Midi.MetaEvent('SetTempo', deltaTime, totalTime, [input[ip++] << 16 | input[ip++] << 8 | input[ip++]]);
                    break;
                  case 0x54:
                    // smpte offset
                    event = new Midi.MetaEvent('SmpteOffset', deltaTime, totalTime, [input[ip++], input[ip++], input[ip++], input[ip++], input[ip++]]);
                    break;
                  case 0x58:
                    // time signature
                    event = new Midi.MetaEvent('TimeSignature', deltaTime, totalTime, [input[ip++], input[ip++], input[ip++], input[ip++]]);
                    break;
                  case 0x59:
                    // key signature
                    event = new Midi.MetaEvent('KeySignature', deltaTime, totalTime, [input[ip++], input[ip++]]);
                    break;
                  case 0x7f:
                    // sequencer specific
                    event = new Midi.MetaEvent('SequencerSpecific', deltaTime, totalTime, [input.subarray(ip, ip += tmp)]);
                    break;
                  default:
                    // unknown
                    event = new Midi.MetaEvent('Unknown', deltaTime, totalTime, [input.subarray(ip, ip += tmp)]);
                }
                break;
              default:
                console.log('unknown message: ' + status.toString(16));
            }
            break;
          // error
          default:
            throw new Error('invalid status');
        }

        // plain queue
        var length = ip - offset;
        var plainBytes = input.subarray(offset, offset + length);
        plainBytes[0] = status;
        if (event instanceof Midi.ChannelEvent && event.subtype === 'NoteOn' && event.parameter2 === 0) {
          event.subtype = table[8];
          plainBytes = [0x80 | event.channel, event.parameter1, event.parameter2];
          plainBytes = new Uint8Array(plainBytes);
        }
        plainQueue.push(plainBytes);

        // event queue
        eventQueue.push(event);
      }

      this.tracks.push(eventQueue);
      this.plainTracks.push(plainQueue);

      function readNumber() {
        var result = 0;
        var tmp = void 0;

        do {
          tmp = input[ip++];
          result = result << 7 | tmp & 0x7f;
        } while ((tmp & 0x80) !== 0);

        return result;
      }
    }
  }]);
  return SMFParser;
}();

var Event$1 = function Event$1(type, target, data) {
  classCallCheck(this, Event$1);

  this.type = type;
  this.target = target;
  this.data = data;
};

var EventEmitter = function () {
  function EventEmitter() {
    classCallCheck(this, EventEmitter);

    this._events = {};
  }

  createClass(EventEmitter, [{
    key: 'on',
    value: function on(event, handler) {
      var arr = this._events[event] || (this._events[event] = []);
      arr.push(handler);
      return this;
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      var arr = this._events[event] || (this._events[event] = []);
      for (;;) {
        var index = arr.indexOf(handler);
        if (index >= 0) {
          arr.splice(index, 1);
        } else {
          break;
        }
      }
      return this;
    }
  }, {
    key: 'one',
    value: function one(event, handler) {
      var arr = this._events[event] || (this._events[event] = []);
      var me = this;
      arr.push(function once(e) {
        handler(e);
        me.off(event, once);
      });
    }
  }, {
    key: 'emit',
    value: function emit(event, data) {
      // console.log('emit', event, data.join(','))
      this._emit(event, data, event);
      if (event !== '*') {
        this._emit('*', data, event);
      }
    }
  }, {
    key: '_emit',
    value: function _emit(event, data, realEvent) {
      var e = new Event$1(realEvent, this, data);
      var arr = this._events[event] || (this._events[event] = []);
      for (var i = 0; i < arr.length; ++i) {
        arr[i](e);
      }
    }
  }]);
  return EventEmitter;
}();

var Connectable = function (_EventEmitter) {
  inherits(Connectable, _EventEmitter);

  function Connectable() {
    classCallCheck(this, Connectable);

    var _this = possibleConstructorReturn(this, (Connectable.__proto__ || Object.getPrototypeOf(Connectable)).call(this));

    _this.inputs = [];
    _this.outputs = [];
    _this._inputEvents = new EventEmitter();
    _this._outputEvents = new EventEmitter();

    _this.inputs.on = function (event, handler) {
      _this._inputEvents.on(event, handler);
    };
    _this.outputs.on = function (event, handler) {
      _this._outputEvents.on(event, handler);
    };
    _this.ready = new Promise(function (resolve) {
      return _this.onready = resolve;
    });
    return _this;
  }

  createClass(Connectable, [{
    key: 'to',
    value: function to(dest) {
      var _this2 = this;

      dest.on('*', function (e) {
        return _this2._outputEvents.emit(e.type, e.data);
      });
      this.outputs.push(dest);
    }
  }, {
    key: 'from',
    value: function from(src) {
      var _this3 = this;

      src.on('*', function (e) {
        return _this3._inputEvents.emit(e.type, e.data);
      });
      this.inputs.push(src);
    }
  }], [{
    key: 'connect',
    value: function connect(from, to) {
      from.to(to);
      to.from(from);
    }
  }]);
  return Connectable;
}(EventEmitter);

var Parser$2 = function () {
  function Parser(input, params) {
    classCallCheck(this, Parser);

    params = extend({
      index: 0
    }, params);
    this.input = input;
    this.ip = params.index;

    this.header = null;
    this.dataInformation = null;
    this.tracks = null;
  }

  createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      this.parseHeader();
      this.parseDataInformation();
      this.parseTracks();
    }
  }, {
    key: 'parseHeader',
    value: function parseHeader() {
      var input = this.input;
      var header = {};
      var ip = this.ip;
      var signature = readString(input, ip, 4);
      ip += 4;

      if (signature !== 'melo') {
        throw new Error('invalid MFi signature: ' + signature);
      }

      header.fileLength = readUint32(input, ip, true);
      ip += 4;
      header.trackOffset = (input[ip++] << 16 | input[ip++]) + ip;
      header.dataMajorType = input[ip++];
      header.dataMinorType = input[ip++];
      header.numberOfTracks = input[ip++];

      this.header = header;
      this.ip = ip;
    }
  }, {
    key: 'parseDataInformation',
    value: function parseDataInformation() {
      var input = this.input;
      var ip = this.ip;
      var dataInformation = {};

      while (ip < this.header.trackOffset) {
        var type = readString(input, ip, 4);
        ip += 4;
        var size = readInt16(input, ip, true);
        ip += 2;

        switch (type) {
          case 'titl': /* FALLTHROUGH */
          case 'copy': /* FALLTHROUGH */
          case 'vers': /* FALLTHROUGH */
          case 'date': /* FALLTHROUGH */
          case 'prot':
            dataInformation[type] = readString(input, ip, size);
            ip += size;
            break;
          case 'sorc':
            dataInformation[type] = input[ip++];
            break;
          case 'note':
            dataInformation[type] = readInt16(input, ip, true);
            ip += 2;
            break;
          case 'exst': /* FALLTHROUGH */
          default:
            dataInformation[type] = input.subarray(ip, ip += size);
            break;
        }
      }

      this.dataInformation = dataInformation;
      this.ip = ip;
    }
  }, {
    key: 'parseTracks',
    value: function parseTracks() {
      var input = this.input;
      var tracks = [];
      var ip = this.ip;

      // 変換しにくい形式を平坦化する
      for (var i = 0; i < this.header.numberOfTracks; ++i) {
        var signature = readString(input, ip, 4);
        ip += 4;
        if (signature !== 'trac') {
          throw new Error('invalid track signature: ' + signature);
        }

        var size = readUint32(input, ip, true);
        ip += 4;

        var limit = ip + size;
        var track = [];
        tracks.push(track);

        while (ip < limit) {
          var message = {};

          // delta time
          var deltaTime = input[ip++];
          message.deltaTime = deltaTime;

          // status
          var status = input[ip++];
          if (status !== 0xff) {
            message.type = 'note';
            message.subType = 'Note';
            message.voice = status >> 6;
            message.key = status && 0x3f;

            // note length
            var noteLength = input[ip++];
            message.length = noteLength;

            // extend status
            if (this.dataInformation['note'] === 1) {
              var extendStatus = input[ip++];
              message.velocity = extendStatus >> 2;
              message.octaveShift = extendStatus & 0x3;
            }
          } else {
            message['type'] = 'meta';

            // status
            status = input[ip++];
            switch (status >> 4) {
              // system message
              case 0xb:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'MasterVolume';
                    message.value = input[ip++];
                    break;
                  case 0xa:
                    message.subType = 'DrumScale';
                    message.value = {
                      'channel': input[ip] >> 3 & 0x7,
                      'drum': input[ip++] & 0x1
                    };
                    break;
                  default:
                    throw new Error('unknown message type: ' + status.toString(16));
                }
                break;
              // tempo message
              case 0xc:
                message.subType = 'SetTempo';
                message.value = {
                  'timeBase': (status & 0x7) === 7 ? NaN : Math.pow(2, status & 0x7) * ((status & 0x8) === 0 ? 6 : 15),
                  'tempo': input[ip++]
                };
                break;
              // control message
              case 0xd:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'Point';
                    message.value = input[ip++];
                    break;
                  case 0xd:
                    message.subType = 'Loop';
                    message.value = {
                      'id': input[ip] >> 6,
                      'count': input[ip] >> 2 & 0xf,
                      'point': input[ip++] & 0x3
                    };
                    break;
                  case 0xe:
                    message.subType = 'Nop';
                    message.value = input[ip++];
                    break;
                  case 0xf:
                    message.subType = 'EndOfTrack';
                    message.value = input[ip++];
                    break;
                  default:
                    throw new Error('unkwnon message type: ' + status.toString(16));
                }
                break;
              // instrument
              case 0xe:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'InstrumentLowPart';
                    message.value = {
                      'part': input[ip] >> 6,
                      'instrument': input[ip++] & 0x3f
                    };
                    break;
                  case 0x1:
                    message.subType = 'InstrumentHighPart';
                    message.value = {
                      'part': input[ip] >> 6,
                      'instrument': input[ip++] & 0x1
                    };
                    break;
                  case 0x2:
                    message.subType = 'Volume';
                    message.value = {
                      'part': input[ip] >> 6,
                      'volume': input[ip++] & 0x3f
                    };
                    break;
                  case 0x3:
                    message.subType = 'Valance';
                    message.value = {
                      'part': input[ip] >> 6,
                      'valance': input[ip++] & 0x3f
                    };
                    break;
                  case 0x4:
                    message.subType = 'PitchBend';
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': input[ip++] & 0x3f
                    };
                    break;
                  case 0x5:
                    message.subType = 'ChannelAssign';
                    message.value = {
                      'part': input[ip] >> 6,
                      'channel': input[ip++] & 0x3f
                    };
                    break;
                  case 0x6:
                    message.subType = 'VolumeChange';
                    message.value = {
                      'part': input[ip] >> 6,
                      'volume': (input[ip++] & 0x3f) << 26 >> 26
                    };
                    break;
                  case 0x7:
                    message.subType = 'PitchBendRange';
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': input[ip++] & 0x3f
                    };
                    break;
                  // TODO: 未遭遇
                  /*
                  case 0x8:
                    message.subType = 'MasterFineTuning'
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': (input[ip++] & 0x3f)
                    }
                    break
                  */
                  // TODO: あってるか自信ない
                  case 0x9:
                    message.subType = 'MasterCoarseTuning';
                    message.value = {
                      'part': input[ip] >> 6,
                      'value': input[ip++] & 0x3f
                    };
                    break;
                  case 0xA:
                    message.subType = 'Modulation';
                    message.value = {
                      'part': input[ip] >> 6,
                      'depth': input[ip++] & 0x3f
                    };
                    break;
                  default:
                    throw new Error('unkwnon message type: ' + status.toString(16));
                }
                break;
              // extended information
              case 0xf:
                switch (status & 0xf) {
                  case 0x0:
                    message.subType = 'EditInstrument';
                    message.value = parseEditInstrument();
                    break;
                  case 0x1:
                    message.subType = 'Vibrato';
                    message.value = parseVibrato();
                    break;
                  case 0xf:
                    message.subType = 'DeviceSpecific';
                    message.value = parseDeviceSpecific();
                    break;
                  default:
                    throw new Error('unkwnon message type: ' + status.toString(16));
                }
                break;
              default:
                throw new Error('unkwnon message type: ' + status.toString(16));
            }
          }

          track.push(message);
        }
        ip = limit;
      }

      function parseEditInstrument() {
        var length = readInt16(input, ip, true);
        ip += 2;
        var limit = ip + length;
        var result = [];

        if (input[ip++] !== 1) {
          throw new Error('invalid EditInstrument const value: ' + input[ip - 1]);
        }

        while (ip < limit) {
          var info = {};

          info.part = input[ip++] >> 4 & 0x3;
          info.modulator = {
            'ML': input[ip] >> 5,
            'VIV': input[ip] >> 4 & 0x1,
            'EG': input[ip] >> 3 & 0x1,
            'SUS': input[ip] >> 2 & 0x1,
            'RR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'DR': input[ip] >> 4 & 0xf,
            'AR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'SL': input[ip] >> 4 & 0xf,
            'TL': (input[ip++] & 0x3) << 4 | input[ip] >> 4,
            'WF': input[ip] >> 3 & 0x1,
            'FB': input[ip++] & 0x7
          };
          info.carrier = {
            'ML': input[ip] >> 5,
            'VIV': input[ip] >> 4 & 0x1,
            'EG': input[ip] >> 3 & 0x1,
            'SUS': input[ip] >> 2 & 0x1,
            'RR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'DR': input[ip] >> 4 & 0xf,
            'AR': (input[ip++] & 0x3) << 2 | input[ip] >> 6,
            'SL': input[ip] >> 4 & 0xf,
            'TL': (input[ip++] & 0x3) << 4 | input[ip] >> 4,
            'WF': input[ip] >> 3 & 0x1,
            'FB': input[ip++] & 0x7
          };
          info.octaveSelect = input[ip++] & 0x3;

          result.push(info);
        }

        return result;
      }

      function parseVibrato() {
        readInt16(input, ip, true);
        ip += 2;

        if (input[ip++] !== 1) {
          throw new Error('invalid Vibrato const value: ' + input[ip - 1]);
        }

        return {
          'part': input[ip++] >> 5 & 0x3,
          'switch': input[ip++] >> 6
        };
      }

      function parseDeviceSpecific() {
        var length = readInt16(input, ip, true);
        ip += 2;
        var limit = ip + length;

        if (input[ip++] !== 0x11) {
          throw new Error('invalid DeviceSpecific const value: ' + input[ip - 1]);
        }

        return {
          'data': input.subarray(ip, ip += limit - ip)
        };
      }

      this.tracks = tracks;
      this.ip = ip;
    }
  }, {
    key: 'convertToMidiTracks',
    value: function convertToMidiTracks() {
      var tracks = [];
      var plainTracks = [];
      // const result = {
      //   timeDivision: 48,
      //   tracks,
      //   plainTracks
      // }
      var mfiTracks = this.tracks;
      var channelTime = [];

      for (var i = 0; i < 16; ++i) {
        plainTracks.push([]);
        channelTime.push(0);
      }

      // 変換しにくい形式を平坦化する
      for (var _i = 0; _i < mfiTracks.length; ++_i) {
        var mfiTrack = mfiTracks[_i];
        var tmpTrack = [];

        // note の処理
        for (var time = 0, pos = 0, j = 0; j < mfiTrack.length; ++j) {
          var mfiEvent = mfiTrack[j];
          time += mfiEvent['deltaTime'];
          mfiEvent.id = pos;
          mfiEvent.time = time;

          switch (mfiEvent.subType) {
            case 'Nop':
              break;
            case 'Note':
              tmpTrack[pos++] = mfiEvent;
              // TODO: value: ... 形式になおす
              tmpTrack[pos] = {
                id: pos,
                type: 'internal',
                subType: 'NoteOff',
                time: time + mfiEvent.length,
                key: mfiEvent.key,
                voice: mfiEvent.voice,
                velocity: mfiEvent.velocity,
                octaveShift: mfiEvent.octaveShift
              };
              pos++;
              break;
            case 'InstrumentHighPart':
              var prevEvent = mfiEvent;
              mfiEvent = mfiTrack[++j];
              if (mfiEvent.subType !== 'InstrumentLowPart') {
                throw new Error('broken instrument');
              }
              // TODO: value: ... 形式になおす
              tmpTrack[pos] = {
                id: pos,
                type: 'internal',
                subType: 'ProgramChange',
                time: time,
                part: mfiEvent.value.part,
                instrument: prevEvent.value.instrument << 6 | mfiEvent.value.instrument
              };
              pos++;
              break;
            default:
              tmpTrack[pos++] = mfiEvent;
              break;
          }
        }
        tmpTrack.sort(function (a, b) {
          return a.time > b.time ? 1 : a.time < b.time ? -1 : a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
        });

        // MIDI トラックに作成
        tracks[_i] = [];
        for (var _time = 0, _j = 0; _j < tmpTrack.length; ++_j) {
          var _mfiEvent = tmpTrack[_j];
          _time = _mfiEvent.time;

          var channel = void 0;
          var key = void 0;
          var tmp = void 0;
          switch (_mfiEvent.subType) {
            case 'Note':
              // NoteOn: 9n kk vv
              key = this.applyOctaveShift(_mfiEvent.key + 45, _mfiEvent.octaveShift);
              channel = _i * 4 + _mfiEvent.voice;

              // TODO: リズムトラックの時は Key が -10 されているような気がする
              if (channel === 9) {
                key -= 10;
              }
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0x90 | channel, key, _mfiEvent.velocity * 2));
              break;
            case 'NoteOff':
              // NoteOff: 8n kk vv
              key = this.applyOctaveShift(_mfiEvent.key + 45, _mfiEvent.octaveShift);
              channel = _i * 4 + _mfiEvent.voice;

              // TODO: リズムトラックの時は Key が -10 されているような気がする
              if (channel === 9) {
                key -= 10;
              }
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0x80 | channel, key, _mfiEvent.velocity * 2));
              break;
            case 'ProgramChange':
              // Program Change: Cn pp
              channel = _i * 4 + _mfiEvent.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xC0 | channel, _mfiEvent.instrument));
              break;
            case 'SetTempo':
              // SetTempo: FF 51 03 tt tt tt
              tmp = 2880000000 / (_mfiEvent.value.tempo * _mfiEvent.value.timeBase);
              channel = 0; // SetTempo は必ず先頭のトラックに配置する
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xFF, 0x51, 0x03, tmp >> 16 & 0xff, tmp >> 8 & 0xff, tmp & 0xff));
              break;
            case 'Loop':
              // Marker: FF 06 ll ss ss ss ...
              tmp = _mfiEvent.value.count;
              var str = 'LOOP_' + (_mfiEvent.value.point === 0 ? 'START' : 'END') + '=ID:' + _mfiEvent.value.id + ',COUNT:' + (tmp === 0 ? -1 : tmp);
              channel = 0;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat([0xFF, 0x06, str.length], str.split('').map(function (a) {
                return a.charCodeAt(0);
              })));
              break;
            case 'MasterVolume':
              // Master Volume: F0 7F ee 04 01 dl dm F7
              tmp = _mfiEvent.value;
              channel = 0;

              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xF0, 0x07, // length
              0x7F, 0x7F, 0x04, 0x01, tmp, tmp, 0xF7));
              break;
            case 'Modulation':
              // CC#1 Modulation: Bn 01 dd
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x01, _mfiEvent.value.depth * 2));
              break;
            case 'Volume':
              // CC#7 Volume: Bn 07 dd
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x07, _mfiEvent.value.volume * 2));
              break;
            case 'Valance':
              // CC#10 Panpot: Bn 0A dd
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x0A, (_mfiEvent.value.valance - 32) * 2 + 64));
              break;
            case 'PitchBend':
              // Pitch Bend: En dl dm
              // TODO: LSB = MSB で良いか不明
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xE0 | channel, _mfiEvent.value.value * 2, _mfiEvent.value.value * 2));
              break;
            case 'PitchBendRange':
              // Pitch Bend: CC#100=0 CC#101=0 CC#6
              // Bn 64 00 Bn 65 00 Bn 06 vv
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x64, 0x00), [0x00, 0xB0 | channel, 0x65, 0x00], [0x00, 0xB0 | channel, 0x06, _mfiEvent.value.value * 2]);
              break;
            case 'MasterCoarseTuning':
              // MasterCoarseTuning: CC#100=0 CC#101=2 CC#6
              // Bn 64 01 Bn 65 02 Bn 06 vv
              channel = _i * 4 + _mfiEvent.value.part;
              plainTracks[channel].push(this.deltaTimeToByteArray(_time - channelTime[channel]).concat(0xB0 | channel, 0x64, 0x00), [0x00, 0xB0 | channel, 0x65, 0x02], [0x00, 0xB0 | channel, 0x06, _mfiEvent.value.value * 2]);
              break;
            default:
              continue;
          }

          channelTime[channel] = _mfiEvent.time;
        }
      }

      return this.toSMF(plainTracks);
    }
  }, {
    key: 'applyOctaveShift',
    value: function applyOctaveShift(key, octaveShift) {
      var table = [0, 12, -24, -12];

      if (table[octaveShift] !== undefined) {
        return key + table[octaveShift];
      }

      throw new Error('invalid OctaveShift value: ' + octaveShift);
    }
  }, {
    key: 'toSMF',
    value: function toSMF(plainTracks) {
      var TimeDivision = 48;
      var result = [0x4D, 0x54, 0x68, 0x64, // "MThd"
      0x00, 0x00, 0x00, 0x06, // Size
      0x00, 0x01, // Format
      0x00, 0x10, // number of track
      TimeDivision >> 8 & 0xff, TimeDivision & 0xff // Data
      ];

      if (this.dataInformation.copy !== undefined) {
        var copy = stringToArray(this.dataInformation.copy);
        copy = [0x00, 0xff, 0x02].concat(this.deltaTimeToByteArray(copy.length), copy);
        plainTracks[0].unshift(copy);
      }

      /*
      if (this.dataInformation.titl !== void 0) {
        let title = stringToArray(this.dataInformation.titl)
        title = [0x00, 0xff, 0x03].concat(
          this.deltaTimeToByteArray(title.length),
          title
        )
        plainTracks[0].unshift(title)
      }
      */

      for (var i = 0; i < plainTracks.length; ++i) {
        var track = plainTracks[i];
        var trackData = [];
        for (var j = 0; j < track.length; ++j) {
          trackData.push.apply(trackData, toConsumableArray(track[j]));
        }

        var jl = trackData.length;
        var trackHeader = [0x4D, 0x54, 0x72, 0x6B, // "MTrk"
        jl >> 24 & 0xff, jl >> 16 & 0xff, jl >> 8 & 0xff, jl & 0xff];
        result = result.concat(trackHeader, trackData);
      }

      result = new Uint8Array(result);

      return result;
    }
  }, {
    key: 'deltaTimeToByteArray',
    value: function deltaTimeToByteArray(deltaTime) {
      var array = [];

      while (deltaTime > 0x80) {
        array.unshift(deltaTime & 0x7f | (array.length === 0 ? 0 : 0x80));
        deltaTime >>>= 7;
      }
      array.unshift(deltaTime | (array.length === 0 ? 0 : 0x80));

      return array;
    }
  }]);
  return Parser;
}();

var Mld$1 = {
  Parser: Parser$2
};

var DEFAULT_TEMPO = 500000;

var SMFPlayer = function (_Connectable) {
  inherits(SMFPlayer, _Connectable);

  function SMFPlayer() {
    classCallCheck(this, SMFPlayer);

    var _this = possibleConstructorReturn(this, (SMFPlayer.__proto__ || Object.getPrototypeOf(SMFPlayer)).call(this));

    _this.tempo = DEFAULT_TEMPO;
    // this.webMidiLink = null
    _this.resume = null;
    _this.pause = false;
    // this.ready = false
    _this.position = 0;
    _this.track = null;
    _this.timer = null;
    _this.sequence = null;
    _this.enableCC111Loop = false;
    _this.enableFalcomLoop = false;
    _this.enableMFiLoop = false;
    _this.enableLoop = false;
    _this.tempoRate = 1;
    _this.masterVolume = 16383;
    _this.sequenceName = null;
    _this.copyright = null;

    // window.addEventListener('message', e => {
    //   const params = e.data.split(',')
    //   const event = params.shift()
    //   this.emit(event, { params })
    //   console.log('message', event, params)
    //   // if (e.data === LINK_READY) {
    //   //   this.sendInitMessage()
    //   // }
    // }, false)
    return _this;
  }

  createClass(SMFPlayer, [{
    key: 'stop',
    value: function stop() {
      this.pause = true;
      this.resume = hrtime();

      // if (this.webMidiLink) {
      //   const win = this.webMidiLink.contentWindow
      //   for (let i = 0; i < 16; ++i) {
      //     win.postMessage(`midi,b${i.toString(16)},78,0`, '*')
      //   }
      // }

      for (var i = 0; i < 16; ++i) {
        this.emit('midi', ['b' + i.toString(16), '78', '0']);
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.stop();
      this.initSequence();
      this.pause = false;
      this.track = null;
      this.resume = -1;
      this.sequence = null;
      this.sequenceName = null;
      this.copyright = null;
      clearTimeout(this.timer);
      this.onready();
      this.ready.then(function () {
        _this2.sendInitMessage();
      });
      // if (this.ready) {
      //   this.sendInitMessage()
      // } else {
      //   this.outputs.on('link', e => {
      //     if (e.data.params[0] === 'ready') {
      //       this.sendInitMessage()
      //     }
      //   })
      // }
    }
  }, {
    key: 'initSequence',
    value: function initSequence() {
      this.tempo = DEFAULT_TEMPO;
      this.position = 0;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      // if (!this.webMidiLink) {
      //   throw new Error('WebMidiLink not found')
      // }
      this.ready.then(function () {
        if (_this3.track instanceof Array && _this3.position >= _this3.track.length) {
          _this3.position = 0;
        }
        _this3.playSequence();
      });
      // if (this.ready) {
      //   if (this.track instanceof Array && this.position >= this.track.length) {
      //     this.position = 0
      //   }
      //   this.playSequence()
      // } else {
      //   // window.addEventListener('message', e => {
      //   //   if (e.data === LINK_READY) {
      //   //     this.ready = true
      //   //     this.playSequence()
      //   //   }
      //   // }, false)
      //   this.outputs.on('link', e => {
      //     if (e.data[0] === 'ready') {
      //       this.ready = true
      //       this.playSequence()
      //     }
      //   })
      // }
    }
  }, {
    key: 'sendInitMessage',
    value: function sendInitMessage() {
      // const win = this.webMidiLink.contentWindow

      for (var i = 0; i < 16; ++i) {
        var hex = i.toString(16);
        // // volume
        // win.postMessage(`midi,b${hex},07,64`, '*')
        // // panpot
        // win.postMessage(`midi,b${hex},0a,40`, '*')
        // // pitch bend
        // win.postMessage(`midi,e${hex},00,40`, '*')
        // // pitch bend range
        // win.postMessage(`midi,b${hex},64,00`, '*')
        // win.postMessage(`midi,b${hex},65,00`, '*')
        // win.postMessage(`midi,b${hex},06,02`, '*')
        // win.postMessage(`midi,b${hex},26,00`, '*')

        // volume
        this.emit('midi', ['b' + hex, '07', '64']);
        // panpot
        this.emit('midi', ['b' + hex, '0a', '40']);
        // pitch bend
        this.emit('midi', ['e' + hex, '00', '40']);
        // pitch bend range
        this.emit('midi', ['b' + hex, '64', '00']);
        this.emit('midi', ['b' + hex, '65', '00']);
        this.emit('midi', ['b' + hex, '06', '02']);
        this.emit('midi', ['b' + hex, '26', '00']);
      }
    }

    // setWebMidiLink(url) {
    //   if (this.webMidiLink) {
    //     document.body.removeChild(this.webMidiLink)
    //     this.webMidiLink = null
    //   }

    //   const iframe = document.createElement('iframe')
    //   this.webMidiLink = iframe
    //   iframe.src = url

    //   document.body.appendChild(iframe)

    //   this.on('link', e => {
    //     if (e.data[0] === 'ready') {
    //       this.ready = true
    //       this.setMasterVolume(this.masterVolume)
    //     }
    //   })
    // }

  }, {
    key: 'setMasterVolume',
    value: function setMasterVolume(volume) {
      volume = Math.floor(volume);
      this.masterVolume = volume;
      // if (this.webMidiLink) {
      //   this.webMidiLink.contentWindow.postMessage(
      //     'midi,f0,7f,7f,04,01,' +
      //     [
      //       ('0' + ((volume     ) & 0x7f).toString(16)).substr(-2),
      //       ('0' + ((volume >> 7) & 0x7f).toString(16)).substr(-2),
      //       '7f'
      //     ].join(','),
      //     '*'
      //   )
      // }
      var data = ['f0', '7f', '7f', '04', '01'].concat([('0' + (volume & 0x7f).toString(16)).substr(-2), ('0' + (volume >> 7 & 0x7f).toString(16)).substr(-2), '7f']);
      this.emit('midi', data);
    }
  }, {
    key: 'playSequence',
    value: function playSequence() {
      var timeDivision = this.sequence.timeDivision;
      var mergedTrack = this.track;
      // const webMidiLink = this.webMidiLink.contentWindow
      var mark = [];
      var pos = this.position || 0;

      if (!this.pause) {
        this.timer = setTimeout(update, this.tempo / 1000 * timeDivision * this.track[0].time);
      } else {
        this.timer = setTimeout(update, this.resume);
        this.pause = false;
        this.resume = -1;
      }

      var player = this;

      function update() {
        var time = mergedTrack[pos].time;
        var length = mergedTrack.length;
        var procTime = hrtime();

        if (player.pause) {
          player.resume = hrtime() - player.resume;
          return;
        }

        do {
          var event = mergedTrack[pos].event;

          // set tempo
          if (event.subtype === 'SetTempo') {
            player.tempo = event.data[0];
          }

          // CC#111 Loop
          if (event.subtype === 'ControlChange' && event.parameter1 === 111) {
            mark[0] = { pos: pos };
          }

          // Ys Eternal 2 Loop
          if (event.subtype === 'Marker') {
            // mark
            if (event.data[0] === 'A') {
              mark[0] = { pos: pos };
            }
            // jump
            if (event.data[0] === 'B' && player.enableFalcomLoop && mark[0] && typeof mark[0].pos === 'number') {
              pos = mark[0].pos;
              player.timer = setTimeout(update, 0);
              player.position = pos;
              return;
            }
          }

          // MFi Loop
          if (event.subtype === 'Marker') {
            // mark
            var match = event.data[0].match(/^LOOP_(START|END)=ID:(\d+),COUNT:(-?\d+)$/);
            if (match) {
              if (match[1] === 'START') {
                mark[match[2] | 0] = mark[match[2]] || {
                  'pos': pos,
                  'count': match[3] | 0
                };
              } else if (match[1] === 'END' && player.enableMFiLoop) {
                var tmp = mark[match[2] | 0];
                if (tmp['count'] !== 0) {
                  // loop jump
                  if (tmp['count'] > 0) {
                    tmp['count']--;
                  }
                  pos = tmp['pos'];
                  player.timer = setTimeout(update, 0);
                  player.position = pos;
                  return;
                } else {
                  // loop end
                  mark[match[2] | 0] = null;
                }
              }
            }
          }

          // send message
          // webMidiLink.postMessage(mergedTrack[pos++].webMidiLink, '*')
          player.emit('midi', mergedTrack[pos++].message);
        } while (pos < length && mergedTrack[pos].time === time);

        if (pos < length) {
          procTime = hrtime() - procTime;
          player.timer = setTimeout(update, player.tempo / (1000 * timeDivision) * (mergedTrack[pos].time - time - procTime) * (1 / player.tempoRate));
        } else {
          // loop
          if (player.enableCC111Loop && mark[0] && typeof mark[0].pos === 'number') {
            pos = mark[0].pos;
            player.timer = setTimeout(update, 0);
          } else if (player.enableLoop) {
            player.initSequence();
            player.playSequence();
          }
        }

        player.position = pos;
      }
    }
  }, {
    key: 'loadMidiFile',
    value: function loadMidiFile(buffer) {
      var parser = new SMFParser(buffer);

      this.init();
      parser.parse();

      this.mergeMidiTracks(parser);
    }
  }, {
    key: 'loadMldFile',
    value: function loadMldFile(buffer) {
      var parser = new Mld$1.Parser(buffer);
      this.init();
      parser.parse();

      this.loadMidiFile(parser.convertToMidiTracks());
    }
  }, {
    key: 'mergeMidiTracks',
    value: function mergeMidiTracks(midi) {
      this.track = [];
      var mergedTrack = this.track;
      this.copyright = [];
      var tracks = midi.tracks;
      var trackPosition = new Array(tracks.length);
      var plainTracks = midi.plainTracks;

      // initialize
      for (var i = 0; i < tracks.length; ++i) {
        trackPosition[i] = 0;
      }

      // merge
      for (var _i = 0; _i < tracks.length; ++_i) {
        var track = tracks[_i];
        for (var j = 0; j < track.length; ++j) {
          if (midi.formatType === 0 && track[j].subtype === 'SequenceTrackName') {
            this.sequenceName = track[j].data[0];
          }

          if (track[j].subtype === 'CopyrightNotice') {
            this.copyright.push(track[j].data[0]);
          }

          mergedTrack.push({
            track: _i,
            eventId: j,
            time: track[j].time,
            event: track[j],
            // webMidiLink: 'midi,' + Array.prototype.map.call(plainTracks[i][j], a => a.toString(16)).join(',')
            message: Array.prototype.map.call(plainTracks[_i][j], function (a) {
              return a.toString(16);
            })
          });
        }
      }

      mergedTrack.sort(function (a, b) {
        return a['time'] > b['time'] ? 1 : a['time'] < b['time'] ? -1 : a['track'] > b['track'] ? 1 : a['track'] < b['track'] ? -1 : a['eventId'] > b['eventId'] ? 1 : a['eventId'] < b['eventId'] ? -1 : 0;
      });

      this.sequence = midi;
    }
  }]);
  return SMFPlayer;
}(Connectable);

var SMF = {
  Midi: Midi,
  Mld: Mld,
  Parser: SMFParser,
  Player: SMFPlayer
};

function amountToFreq(val) {
  return Math.pow(2, (val - 6900) / 1200) * 440;
}

var SynthesizerNote = function () {
  function SynthesizerNote(ctx, destination, instrument) {
    classCallCheck(this, SynthesizerNote);

    this.ctx = ctx;
    this.destination = destination;

    this.instrument = instrument;
    this.channel = instrument.channel;
    this.key = instrument.key;
    this.velocity = instrument.velocity;
    this.buffer = instrument.sample;
    this.playbackRate = instrument.basePlaybackRate;
    this.sampleRate = instrument.sampleRate;
    this.volume = instrument.volume;
    this.panpot = instrument.panpot;
    this.pitchBend = instrument.pitchBend;
    this.pitchBendSensitivity = instrument.pitchBendSensitivity;
    this.modEnvToPitch = instrument.modEnvToPitch;

    // state
    this.startTime = ctx.currentTime;
    this.computedPlaybackRate = this.playbackRate;

    // audio node
    this.audioBuffer = null;
    this.bufferSource = null;
    this.panner = null;
    this.gainOutput = null;
  }

  createClass(SynthesizerNote, [{
    key: 'noteOn',
    value: function noteOn() {
      var ctx = this.ctx;
      var instrument = this.instrument;
      var sample = this.buffer;

      var now = this.ctx.currentTime;
      var volAttack = now + instrument.volAttack;
      var modAttack = now + instrument.modAttack;
      var volDecay = volAttack + instrument.volDecay;
      var modDecay = modAttack + instrument.modDecay;
      var loopStart = instrument.loopStart / this.sampleRate;
      var loopEnd = instrument.loopEnd / this.sampleRate;
      var startTime = instrument.start / this.sampleRate;

      sample = sample.subarray(0, sample.length + instrument.end);
      var buffer = this.audioBuffer = ctx.createBuffer(1, sample.length, this.sampleRate);
      var channelData = buffer.getChannelData(0);
      channelData.set(sample);

      // buffer source
      var bufferSource = this.bufferSource = ctx.createBufferSource();
      bufferSource.buffer = buffer;
      bufferSource.loop = this.channel !== 9;
      bufferSource.loopStart = loopStart;
      bufferSource.loopEnd = loopEnd;
      this.updatePitchBend(this.pitchBend);

      // audio node
      var panner = this.panner = ctx.createPanner();
      var output = this.gainOutput = ctx.createGainNode();
      var outputGain = output.gain;

      // filter
      var filter = this.filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';

      // panpot
      panner.panningModel = 'equalpower'; // HRTF
      panner.setPosition(Math.sin(this.panpot * Math.PI / 2), 0, Math.cos(this.panpot * Math.PI / 2));

      // Attack, Decay, Sustain
      outputGain.setValueAtTime(0, now);
      outputGain.linearRampToValueAtTime(this.volume * (this.velocity / 127), volAttack);
      outputGain.linearRampToValueAtTime(this.volume * (1 - instrument.volSustain), volDecay);

      // filter.Q.setValueAtTime(range(instrument.initialFilterQ * Math.pow(10, 200), filter.Q.minValue, filter.Q.maxValue), now)
      // filter.Q.setValueAtTime(instrument.initialFilterQ * Math.pow(10, 200), now)
      // const q = instrument.initialFilterQ
      // filter.Q.setValueAtTime(range(q, filter.Q.minValue, filter.Q.maxValue), now)
      var baseFreq = amountToFreq(instrument.initialFilterFc);
      var peekFreq = amountToFreq(instrument.initialFilterFc + instrument.modEnvToFilterFc);
      var sustainFreq = baseFreq + (peekFreq - baseFreq) * (1 - instrument.modSustain);
      // console.log(baseFreq, peekFreq, sustainFreq, q)
      var min = filter.frequency.minValue;
      var max = filter.frequency.maxValue;
      filter.frequency.setValueAtTime(range(baseFreq, min, max), now);
      filter.frequency.linearRampToValueAtTime(range(peekFreq, min, max), modAttack);
      filter.frequency.linearRampToValueAtTime(range(sustainFreq, min, max), modDecay);

      // connect
      bufferSource.connect(filter);
      filter.connect(panner);
      panner.connect(output);
      output.connect(this.destination);

      // fire
      bufferSource.start(0, startTime);
    }
  }, {
    key: 'noteOff',
    value: function noteOff() {
      var _this = this;

      var instrument = this.instrument;
      var bufferSource = this.bufferSource;
      var output = this.gainOutput;
      var now = this.ctx.currentTime;
      var volEndTime = now + instrument.volRelease;
      var modEndTime = now + instrument.modRelease;

      if (!this.audioBuffer) {
        return;
      }

      // Release
      output.gain.cancelScheduledValues(0);
      output.gain.linearRampToValueAtTime(0, volEndTime);
      bufferSource.playbackRate.cancelScheduledValues(0);
      bufferSource.playbackRate.linearRampToValueAtTime(this.computedPlaybackRate, modEndTime);

      bufferSource.loop = false;
      bufferSource.stop(volEndTime);

      // disconnect
      setTimeout(function () {
        _this.bufferSource.disconnect(0);
        _this.panner.disconnect(0);
        _this.gainOutput.disconnect(0);
      }, instrument.volRelease * 1000);
    }
  }, {
    key: 'schedulePlaybackRate',
    value: function schedulePlaybackRate() {
      var playbackRate = this.bufferSource.playbackRate;
      var computed = this.computedPlaybackRate;
      var start = this.startTime;
      var instrument = this.instrument;
      var modAttack = start + instrument.modAttack;
      var modDecay = modAttack + instrument.modDecay;
      var peekPitch = computed * Math.pow(Math.pow(2, 1 / 12), this.modEnvToPitch * instrument.scaleTuning);
      var endPitch = computed + (peekPitch - computed) * (1 - instrument.modSustain);

      playbackRate.cancelScheduledValues(0);
      playbackRate.setValueAtTime(computed, start);
      playbackRate.linearRampToValueAtTime(peekPitch, modAttack);
      playbackRate.linearRampToValueAtTime(endPitch, modDecay);
      // playbackRate.linearRampToValueAtTime(computed + (peekPitch - computed) * (1 - instrument.modSustain), modDecay)
    }
  }, {
    key: 'updatePitchBend',
    value: function updatePitchBend(pitchBend) {
      this.computedPlaybackRate = this.playbackRate * Math.pow(Math.pow(2, 1 / 12), this.pitchBendSensitivity * (pitchBend / (pitchBend < 0 ? 8192 : 8191)) * this.instrument.scaleTuning);

      this.schedulePlaybackRate();
    }
  }]);
  return SynthesizerNote;
}();

var Parser$3 = function () {
  function Parser(input, params) {
    classCallCheck(this, Parser);

    params = extend({}, params);
    this.input = input;
    this.parserOption = params.parserOption;

    this.presetHeader = null;
    this.presetZone = null;
    this.presetZoneModulator = null;
    this.presetZoneGenerator = null;
    this.instrument = null;
    this.instrumentZone = null;
    this.instrumentZoneModulator = null;
    this.instrumentZoneGenerator = null;
    this.sampleHeader = null;
  }

  createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      var parser = new Riff.Parser(this.input, this.parserOption);

      // parse RIFF chunk
      parser.parse();
      if (parser.chunkList.length !== 1) {
        throw new Error('wrong chunk length');
      }

      var chunk = parser.getChunk(0);
      if (chunk === null) {
        throw new Error('chunk not found');
      }

      this.parseRiffChunk(chunk);
      // this.input = null
    }
  }, {
    key: 'parseRiffChunk',
    value: function parseRiffChunk(chunk) {
      // check parse target
      if (chunk.type !== 'RIFF') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var ip = chunk.offset;

      // check signature
      var signature = readString(input, ip, 4);
      ip += 4;
      if (signature !== 'sfbk') {
        throw new Error('invalid signature: ' + signature);
      }

      // read structure
      var parser = new Riff.Parser(input, { index: ip, length: chunk.size - 4 });
      parser.parse();
      if (parser.getNumberOfChunks() !== 3) {
        throw new Error('invalid sfbk structure');
      }

      // INFO-list
      this.parseInfoList(parser.getChunk(0));
      // sdta-list
      this.parseSdtaList(parser.getChunk(1));
      // pdta-list
      this.parsePdtaList(parser.getChunk(2));
    }
  }, {
    key: 'parseInfoList',
    value: function parseInfoList(chunk) {
      // check parse target
      if (chunk.type !== 'LIST') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var ip = chunk.offset;

      // check signature
      var signature = readString(input, ip, 4);
      ip += 4;
      if (signature !== 'INFO') {
        throw new Error('invalid signature: ' + signature);
      }

      // read structure
      var parser = new Riff.Parser(input, { index: ip, length: chunk.size - 4 });
      parser.parse();
    }
  }, {
    key: 'parseSdtaList',
    value: function parseSdtaList(chunk) {
      // check parse target
      if (chunk.type !== 'LIST') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var ip = chunk.offset;

      // check signature
      var signature = readString(input, ip, 4);
      ip += 4;
      if (signature !== 'sdta') {
        throw new Error('invalid signature: ' + signature);
      }

      // read structure
      var parser = new Riff.Parser(input, { index: ip, length: chunk.size - 4 });
      parser.parse();
      if (parser.chunkList.length !== 1) {
        throw new Error('TODO');
      }
      this.samplingData = parser.getChunk(0);
    }
  }, {
    key: 'parsePdtaList',
    value: function parsePdtaList(chunk) {
      // check parse target
      if (chunk.type !== 'LIST') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var ip = chunk.offset;

      // check signature
      var signature = readString(input, ip, 4);
      ip += 4;
      if (signature !== 'pdta') {
        throw new Error('invalid signature: ' + signature);
      }

      // read structure
      var parser = new Riff.Parser(input, { index: ip, length: chunk.size - 4 });
      parser.parse();

      // check number of chunks
      if (parser.getNumberOfChunks() !== 9) {
        throw new Error('invalid pdta chunk');
      }

      this.parsePhdr(parser.getChunk(0));
      this.parsePbag(parser.getChunk(1));
      this.parsePmod(parser.getChunk(2));
      this.parsePgen(parser.getChunk(3));
      this.parseInst(parser.getChunk(4));
      this.parseIbag(parser.getChunk(5));
      this.parseImod(parser.getChunk(6));
      this.parseIgen(parser.getChunk(7));
      this.parseShdr(parser.getChunk(8));
    }
  }, {
    key: 'parsePhdr',
    value: function parsePhdr(chunk) {
      // check parse target
      if (chunk.type !== 'phdr') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var size = chunk.offset + chunk.size;
      var ip = chunk.offset;

      this.presetHeader = [];

      while (ip < size) {
        this.presetHeader.push({
          presetName: String.fromCharCode.apply(null, input.subarray(ip, ip += 20)),
          preset: input[ip++] | input[ip++] << 8,
          bank: input[ip++] | input[ip++] << 8,
          presetBagIndex: input[ip++] | input[ip++] << 8,
          library: (input[ip++] | input[ip++] << 8 | input[ip++] << 16 | input[ip++] << 24) >>> 0,
          genre: (input[ip++] | input[ip++] << 8 | input[ip++] << 16 | input[ip++] << 24) >>> 0,
          morphology: (input[ip++] | input[ip++] << 8 | input[ip++] << 16 | input[ip++] << 24) >>> 0
        });
      }
    }
  }, {
    key: 'parsePbag',
    value: function parsePbag(chunk) {
      // check parse target
      if (chunk.type !== 'pbag') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var size = chunk.offset + chunk.size;
      var ip = chunk.offset;

      this.presetZone = [];

      while (ip < size) {
        this.presetZone.push({
          presetGeneratorIndex: input[ip++] | input[ip++] << 8,
          presetModulatorIndex: input[ip++] | input[ip++] << 8
        });
      }
    }
  }, {
    key: 'parsePmod',
    value: function parsePmod(chunk) {
      // check parse target
      if (chunk.type !== 'pmod') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      this.presetZoneModulator = this.parseModulator(chunk);
    }
  }, {
    key: 'parsePgen',
    value: function parsePgen(chunk) {
      // check parse target
      if (chunk.type !== 'pgen') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      this.presetZoneGenerator = this.parseGenerator(chunk);
    }
  }, {
    key: 'parseInst',
    value: function parseInst(chunk) {
      // check parse target
      if (chunk.type !== 'inst') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var size = chunk.offset + chunk.size;
      var ip = chunk.offset;

      this.instrument = [];

      while (ip < size) {
        this.instrument.push({
          instrumentName: String.fromCharCode.apply(null, input.subarray(ip, ip += 20)),
          instrumentBagIndex: input[ip++] | input[ip++] << 8
        });
      }
    }
  }, {
    key: 'parseIbag',
    value: function parseIbag(chunk) {
      // check parse target
      if (chunk.type !== 'ibag') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var size = chunk.offset + chunk.size;
      var ip = chunk.offset;

      this.instrumentZone = [];

      while (ip < size) {
        this.instrumentZone.push({
          instrumentGeneratorIndex: input[ip++] | input[ip++] << 8,
          instrumentModulatorIndex: input[ip++] | input[ip++] << 8
        });
      }
    }
  }, {
    key: 'parseImod',
    value: function parseImod(chunk) {
      // check parse target
      if (chunk.type !== 'imod') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      this.instrumentZoneModulator = this.parseModulator(chunk);
    }
  }, {
    key: 'parseIgen',
    value: function parseIgen(chunk) {
      // check parse target
      if (chunk.type !== 'igen') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      this.instrumentZoneGenerator = this.parseGenerator(chunk);
    }
  }, {
    key: 'parseShdr',
    value: function parseShdr(chunk) {
      // check parse target
      if (chunk.type !== 'shdr') {
        throw new Error('invalid chunk type: ' + chunk.type);
      }

      var input = this.input;
      var size = chunk.offset + chunk.size;
      var ip = chunk.offset;

      this.sampleHeader = [];
      var samples = this.sample = [];

      while (ip < size) {
        var sampleName = readString(input, ip, 20);
        ip += 20;
        var start = readUint32(input, ip, false);
        ip += 4;
        var end = readUint32(input, ip, false);
        ip += 4;
        var startLoop = readUint32(input, ip, false);
        ip += 4;
        var endLoop = readUint32(input, ip, false);
        ip += 4;
        var sampleRate = readUint32(input, ip, false);
        ip += 4;
        var originalPitch = input[ip++];
        var pitchCorrection = input[ip++] << 24 >> 24;
        var sampleLink = readInt16(input, ip, false);
        ip += 2;
        var sampleType = readInt16(input, ip, false);
        ip += 2;

        var sample = new Int16Array(new Uint8Array(input.subarray(this.samplingData.offset + start * 2, this.samplingData.offset + end * 2)).buffer);

        startLoop -= start;
        endLoop -= start;

        if (sampleRate > 0) {
          var adjust = this.adjustSampleData(sample, sampleRate);
          sample = adjust.sample;
          sampleRate *= adjust.multiply;
          startLoop *= adjust.multiply;
          endLoop *= adjust.multiply;
        }

        samples.push(sample);

        this.sampleHeader.push({
          sampleName: sampleName,
          /*
          start: start,
          end: end,
          */
          startLoop: startLoop,
          endLoop: endLoop,
          sampleRate: sampleRate,
          originalPitch: originalPitch,
          pitchCorrection: pitchCorrection,
          sampleLink: sampleLink,
          sampleType: sampleType
        });
      }
    }
  }, {
    key: 'adjustSampleData',
    value: function adjustSampleData(sample, sampleRate) {
      var newSample = void 0;
      var multiply = 1;
      while (sampleRate < 22050) {
        newSample = new Int16Array(sample.length * 2);
        for (var i = 0, j = 0; i < sample.length; ++i) {
          newSample[j++] = sample[i];
          newSample[j++] = sample[i];
        }
        sample = newSample;
        multiply *= 2;
        sampleRate *= 2;
      }

      return {
        sample: sample, multiply: multiply
      };
    }
  }, {
    key: 'parseModulator',
    value: function parseModulator(chunk) {
      var input = this.input;
      var size = chunk.offset + chunk.size;
      var ip = chunk.offset;
      var output = [];

      while (ip < size) {
        // Src Oper
        // TODO
        ip += 2;

        // Dest Oper
        var code = readInt16(input, ip, false);
        ip += 2;
        var key = GeneratorEnumeratorTable[code];
        if (key === undefined) {
          // Amount
          output.push({
            type: key,
            value: {
              code: code,
              amount: input[ip] | input[ip + 1] << 8 << 16 >> 16,
              lo: input[ip++],
              hi: input[ip++]
            }
          });
        } else {
          // Amount
          switch (key) {
            case 'keyRange': /* FALLTHROUGH */
            case 'velRange': /* FALLTHROUGH */
            case 'keynum': /* FALLTHROUGH */
            case 'velocity':
              output.push({
                type: key,
                value: {
                  lo: input[ip++],
                  hi: input[ip++]
                }
              });
              break;
            default:
              output.push({
                type: key,
                value: {
                  amount: input[ip++] | input[ip++] << 8 << 16 >> 16
                }
              });
              break;
          }
        }

        // AmtSrcOper
        // TODO
        ip += 2;

        // Trans Oper
        // TODO
        ip += 2;
      }

      return output;
    }
  }, {
    key: 'parseGenerator',
    value: function parseGenerator(chunk) {
      var input = this.input;
      var size = chunk.offset + chunk.size;
      var ip = chunk.offset;
      var output = [];

      while (ip < size) {
        var code = readInt16(input, ip, false);
        ip += 2;
        var key = GeneratorEnumeratorTable[code];
        if (key === void 0) {
          output.push({
            type: key,
            value: {
              code: code,
              amount: input[ip] | input[ip + 1] << 8 << 16 >> 16,
              lo: input[ip++],
              hi: input[ip++]
            }
          });
          continue;
        }

        switch (key) {
          case 'keynum': /* FALLTHROUGH */
          case 'keyRange': /* FALLTHROUGH */
          case 'velRange': /* FALLTHROUGH */
          case 'velocity':
            output.push({
              type: key,
              value: {
                lo: input[ip++],
                hi: input[ip++]
              }
            });
            break;
          default:
            output.push({
              type: key,
              value: {
                amount: input[ip++] | input[ip++] << 8 << 16 >> 16
              }
            });
            break;
        }
      }

      return output;
    }
  }, {
    key: 'createInstrument',
    value: function createInstrument() {
      var instrument = this.instrument;
      var zone = this.instrumentZone;
      var output = [];

      // instrument -> instrument bag -> generator / modulator
      for (var i = 0; i < instrument.length; ++i) {
        var bagIndex = instrument[i].instrumentBagIndex;
        var bagIndexEnd = instrument[i + 1] ? instrument[i + 1].instrumentBagIndex : zone.length;
        var zoneInfo = [];

        // instrument bag
        for (var j = bagIndex; j < bagIndexEnd; ++j) {
          var instrumentGenerator = this.createInstrumentGenerator(zone, j);
          var instrumentModulator = this.createInstrumentModulator(zone, j);

          zoneInfo.push({
            generator: instrumentGenerator.generator,
            generatorSequence: instrumentGenerator.generatorInfo,
            modulator: instrumentModulator.modulator,
            modulatorSequence: instrumentModulator.modulatorInfo
          });
        }

        output.push({
          name: instrument[i].instrumentName,
          info: zoneInfo
        });
      }

      return output;
    }
  }, {
    key: 'createPreset',
    value: function createPreset() {
      var preset = this.presetHeader;
      var zone = this.presetZone;
      var output = [];

      // preset -> preset bag -> generator / modulator
      for (var i = 0; i < preset.length; ++i) {
        var bagIndex = preset[i].presetBagIndex;
        var bagIndexEnd = preset[i + 1] ? preset[i + 1].presetBagIndex : zone.length;
        var zoneInfo = [];
        var instrument = void 0;

        // preset bag
        for (var j = bagIndex; j < bagIndexEnd; ++j) {
          var presetGenerator = this.createPresetGenerator(zone, j);
          var presetModulator = this.createPresetModulator(zone, j);

          zoneInfo.push({
            generator: presetGenerator.generator,
            generatorSequence: presetGenerator.generatorInfo,
            modulator: presetModulator.modulator,
            modulatorSequence: presetModulator.modulatorInfo
          });

          instrument = presetGenerator.generator.instrument !== undefined ? presetGenerator.generator.instrument.amount : presetModulator.modulator.instrument !== undefined ? presetModulator.modulator.instrument.amount : null;
        }

        output.push({
          name: preset[i].presetName,
          info: zoneInfo,
          header: preset[i],
          instrument: instrument
        });
      }

      return output;
    }
  }, {
    key: 'createInstrumentGenerator',
    value: function createInstrumentGenerator(zone, index) {
      var modgen = this.createBagModGen(zone, zone[index].instrumentGeneratorIndex, zone[index + 1] ? zone[index + 1].instrumentGeneratorIndex : this.instrumentZoneGenerator.length, this.instrumentZoneGenerator);

      return {
        generator: modgen.modgen,
        generatorInfo: modgen.modgenInfo
      };
    }
  }, {
    key: 'createInstrumentModulator',
    value: function createInstrumentModulator(zone, index) {
      var modgen = this.createBagModGen(zone, zone[index].presetModulatorIndex, zone[index + 1] ? zone[index + 1].instrumentModulatorIndex : this.instrumentZoneModulator.length, this.instrumentZoneModulator);

      return {
        modulator: modgen.modgen,
        modulatorInfo: modgen.modgenInfo
      };
    }
  }, {
    key: 'createPresetGenerator',
    value: function createPresetGenerator(zone, index) {
      var modgen = this.createBagModGen(zone, zone[index].presetGeneratorIndex, zone[index + 1] ? zone[index + 1].presetGeneratorIndex : this.presetZoneGenerator.length, this.presetZoneGenerator);

      return {
        generator: modgen.modgen,
        generatorInfo: modgen.modgenInfo
      };
    }
  }, {
    key: 'createPresetModulator',
    value: function createPresetModulator(zone, index) {
      var modgen = this.createBagModGen(zone, zone[index].presetModulatorIndex, zone[index + 1] ? zone[index + 1].presetModulatorIndex : this.presetZoneModulator.length, this.presetZoneModulator);

      return {
        modulator: modgen.modgen,
        modulatorInfo: modgen.modgenInfo
      };
    }
  }, {
    key: 'createBagModGen',
    value: function createBagModGen(zone, indexStart, indexEnd, zoneModGen) {
      var modgenInfo = [];
      var modgen = {
        unknown: [],
        keyRange: {
          hi: 127,
          lo: 0
        }
        // TODO
      };
      for (var i = indexStart; i < indexEnd; ++i) {
        var info = zoneModGen[i];
        modgenInfo.push(info);

        if (info.type === 'unknown') {
          modgen.unknown.push(info.value);
        } else {
          modgen[info.type] = info.value;
        }
      }

      return {
        modgen: modgen, modgenInfo: modgenInfo
      };
    }
  }]);
  return Parser;
}();

var GeneratorEnumeratorTable = ['startAddrsOffset', 'endAddrsOffset', 'startloopAddrsOffset', 'endloopAddrsOffset', 'startAddrsCoarseOffset', 'modLfoToPitch', 'vibLfoToPitch', 'modEnvToPitch', 'initialFilterFc', 'initialFilterQ', 'modLfoToFilterFc', 'modEnvToFilterFc', 'endAddrsCoarseOffset', 'modLfoToVolume',, // 14
'chorusEffectsSend', 'reverbEffectsSend', 'pan',,,, // 18,19,20
'delayModLFO', 'freqModLFO', 'delayVibLFO', 'freqVibLFO', 'delayModEnv', 'attackModEnv', 'holdModEnv', 'decayModEnv', 'sustainModEnv', 'releaseModEnv', 'keynumToModEnvHold', 'keynumToModEnvDecay', 'delayVolEnv', 'attackVolEnv', 'holdVolEnv', 'decayVolEnv', 'sustainVolEnv', 'releaseVolEnv', 'keynumToVolEnvHold', 'keynumToVolEnvDecay', 'instrument',, // 42
'keyRange', 'velRange', 'startloopAddrsCoarseOffset', 'keynum', 'velocity', 'initialAttenuation',, // 49
'endloopAddrsCoarseOffset', 'coarseTune', 'fineTune', 'sampleID', 'sampleModes',, // 55
'scaleTuning', 'exclusiveClass', 'overridingRootKey'];

var Synthesizer = function (_Connectable) {
  inherits(Synthesizer, _Connectable);

  function Synthesizer(input) {
    classCallCheck(this, Synthesizer);

    var _this = possibleConstructorReturn(this, (Synthesizer.__proto__ || Object.getPrototypeOf(Synthesizer)).call(this));

    _this.input = input;
    _this.parser = null;
    _this.bank = 0;
    _this.bankSet = null;
    _this.bufferSize = 1024;
    _this.RpnMsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _this.RpnLsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _this.ctx = _this.getAudioContext();
    _this.gainMaster = _this.ctx.createGainNode();
    _this.compressor = _this.ctx.createDynamicsCompressor();
    _this.bufSrc = _this.ctx.createBufferSource();
    _this.channelInstrument = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 10, 11, 12, 13, 14, 15];
    _this.channelVolume = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    _this.channelPanpot = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _this.channelPitchBend = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _this.channelPitchBendSensitivity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _this.currentNoteOn = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    _this.baseVolume = 1 / 0x8000;
    _this.masterVolume = 16384;

    _this.table = null;

    _this.ready.then(function () {
      _this.inputs.on('midi', _this.onmessage.bind(_this));
    });
    return _this;
  }

  createClass(Synthesizer, [{
    key: 'onmessage',
    value: function onmessage(e) {
      var type = e.type;
      var data = e.data;

      switch (type) {
        case 'midi':
          this.processMidiMessage(data.map(function (hex) {
            return parseInt(hex, 16);
          }));
          break;
        case 'link':
          var command = data.shift();
          switch (command) {
            case 'reqpatch':
              // TODO: dummy data
              // const win = window.opener ? window.opener : window.parent
              // win.postMessage('link,patch', '*')
              this.emit('link', ['patch']);
              break;
            case 'setpatch':
              // TODO: NOP
              break;
            default:
              console.error('unknown link message: ' + command);
          }
          break;
        default:
          console.error('unknown message type: ' + type);
      }
    }
  }, {
    key: 'processMidiMessage',
    value: function processMidiMessage(message) {
      var channel = message[0] & 0x0f;
      var command = message[0] & 0xf0;
      // console.log('processMidiMessage', message, message.map(s => s.toString(16)).join(','), channel, command.toString(16))

      switch (message[0] & 0xf0) {
        case 0x80:
          // NoteOff: 8n kk vv
          this.noteOff(channel, message[1], message[2]);
          break;
        case 0x90:
          // NoteOn: 9n kk vv
          if (message[2] > 0) {
            this.noteOn(channel, message[1], message[2]);
          } else {
            this.noteOff(channel, message[1], 0);
          }
          break;
        case 0xB0:
          // Control Change: Bn cc dd
          switch (message[1]) {
            case 0x06:
              // Data Entry: Bn 06 dd
              switch (this.RpnMsb[channel]) {
                case 0:
                  switch (this.RpnLsb[channel]) {
                    case 0:
                      // Pitch Bend Sensitivity
                      this.pitchBendSensitivity(channel, message[2]);
                      break;
                  }
                  break;
              }
              break;
            case 0x07:
              // Volume Change: Bn 07 dd
              this.volumeChange(channel, message[2]);
              break;
            case 0x0A:
              // Panpot Change: Bn 0A dd
              this.panpotChange(channel, message[2]);
              break;
            case 0x78:
              // All Sound Off: Bn 78 00
              this.allSoundOff(channel);
              break;
            case 0x79:
              // Reset All Control: Bn 79 00
              this.resetAllControl(channel);
              break;
            case 0x20:
              // TODO: BankSelect
              //console.log("bankselect:", channel, message[2])
              break;
            case 0x64:
              // RPN MSB
              this.RpnMsb[channel] = message[2];
              break;
            case 0x65:
              // RPN LSB
              this.RpnLsb[channel] = message[2];
              break;
            default:
            // not supported
          }
          break;
        case 0xC0:
          // Program Change: Cn pp
          this.programChange(channel, message[1]);
          break;
        case 0xE0:
          // Pitch Bend
          this.pitchBend(channel, message[1], message[2]);
          break;
        case 0xf0:
          // System Exclusive Message
          // ID number
          switch (message[1]) {
            case 0x7e:
              // non-realtime
              // TODO
              break;
            case 0x7f:
              // realtime
              // var device = message[2]
              // sub ID 1
              switch (message[3]) {
                case 0x04:
                  // device control
                  // sub ID 2
                  switch (message[4]) {
                    case 0x01:
                      // master volume
                      this.setMasterVolume(message[5] + (message[6] << 7));
                      break;
                  }
                  break;
              }
              break;
          }
          break;
        default:
          // not supported
          break;
      }
    }
  }, {
    key: 'getAudioContext',
    value: function getAudioContext() {
      var ctx = void 0;

      if (window.AudioContext !== undefined) {
        ctx = new AudioContext();
      } else if (window.webkitAudioContext !== undefined) {
        ctx = new webkitAudioContext();
      } else if (window.mozAudioContext !== undefined) {
        ctx = new mozAudioContext();
      } else {
        throw new Error('Web Audio not supported');
      }

      if (ctx.createGainNode === void 0) {
        ctx.createGainNode = ctx.createGain;
      }

      return ctx;
    }
  }, {
    key: 'init',
    value: function init() {
      this.parser = new Parser$3(this.input);
      this.bankSet = this.createAllInstruments();

      for (var i = 0; i < 16; ++i) {
        this.programChange(i, i);
        this.volumeChange(i, 0x64);
        this.panpotChange(i, 0x40);
        this.pitchBend(i, 0x00, 0x40); // 8192
        this.pitchBendSensitivity(i, 2);
      }
    }
  }, {
    key: 'refreshInstruments',
    value: function refreshInstruments(input) {
      this.input = input;
      this.parser = new Parser$3(input);
      this.bankSet = this.createAllInstruments();
    }
  }, {
    key: 'createAllInstruments',
    value: function createAllInstruments() {
      var parser = this.parser;
      parser.parse();
      var presets = parser.createPreset();
      var instruments = parser.createInstrument();
      var banks = [];

      for (var i = 0; i < presets.length; ++i) {
        var preset = presets[i];
        var presetNumber = preset.header.preset;

        if (typeof preset.instrument !== 'number') {
          continue;
        }

        var instrument = instruments[preset.instrument];
        if (instrument.name.replace(/\0*$/, '') === 'EOI') {
          continue;
        }

        // select bank
        if (banks[preset.header.bank] === undefined) {
          banks[preset.header.bank] = [];
        }
        var bank = banks[preset.header.bank];
        bank[presetNumber] = [];
        bank[presetNumber].name = preset.name;

        for (var j = 0; j < instrument.info.length; ++j) {
          this.createNoteInfo(parser, instrument.info[j], bank[presetNumber]);
        }
      }

      return banks;
    }
  }, {
    key: 'createNoteInfo',
    value: function createNoteInfo(parser, info, preset) {
      var generator = info.generator;

      if (generator.keyRange === undefined || generator.sampleID === undefined) {
        return;
      }

      var volAttack = this.getModGenAmount(generator, 'attackVolEnv', -12000);
      var volDecay = this.getModGenAmount(generator, 'decayVolEnv', -12000);
      var volSustain = this.getModGenAmount(generator, 'sustainVolEnv');
      var volRelease = this.getModGenAmount(generator, 'releaseVolEnv', -12000);
      var modAttack = this.getModGenAmount(generator, 'attackModEnv', -12000);
      var modDecay = this.getModGenAmount(generator, 'decayModEnv', -12000);
      var modSustain = this.getModGenAmount(generator, 'sustainModEnv');
      var modRelease = this.getModGenAmount(generator, 'releaseModEnv', -12000);

      var tune = this.getModGenAmount(generator, 'coarseTune') + this.getModGenAmount(generator, 'fineTune') / 100;
      var scale = this.getModGenAmount(generator, 'scaleTuning', 100) / 100;
      var freqVibLFO = this.getModGenAmount(generator, 'freqVibLFO');

      for (var i = generator.keyRange.lo; i <= generator.keyRange.hi; ++i) {
        if (preset[i]) {
          continue;
        }

        var sampleId = this.getModGenAmount(generator, 'sampleID');
        var sampleHeader = parser.sampleHeader[sampleId];
        preset[i] = {
          sample: parser.sample[sampleId],
          sampleRate: sampleHeader.sampleRate,
          basePlaybackRate: Math.pow(Math.pow(2, 1 / 12), (i - this.getModGenAmount(generator, 'overridingRootKey', sampleHeader.originalPitch) + tune + sampleHeader.pitchCorrection / 100) * scale),
          modEnvToPitch: this.getModGenAmount(generator, 'modEnvToPitch') / 100,
          scaleTuning: scale,
          start: this.getModGenAmount(generator, 'startAddrsCoarseOffset') * 32768 + this.getModGenAmount(generator, 'startAddrsOffset'),
          end: this.getModGenAmount(generator, 'endAddrsCoarseOffset') * 32768 + this.getModGenAmount(generator, 'endAddrsOffset'),
          loopStart:
          //(sampleHeader.startLoop - sampleHeader.start) +
          sampleHeader.startLoop + this.getModGenAmount(generator, 'startloopAddrsCoarseOffset') * 32768 + this.getModGenAmount(generator, 'startloopAddrsOffset'),
          loopEnd:
          //(sampleHeader.endLoop - sampleHeader.start) +
          sampleHeader.endLoop + this.getModGenAmount(generator, 'endloopAddrsCoarseOffset') * 32768 + this.getModGenAmount(generator, 'endloopAddrsOffset'),
          volAttack: Math.pow(2, volAttack / 1200),
          volDecay: Math.pow(2, volDecay / 1200),
          volSustain: volSustain / 1000,
          volRelease: Math.pow(2, volRelease / 1200),
          modAttack: Math.pow(2, modAttack / 1200),
          modDecay: Math.pow(2, modDecay / 1200),
          modSustain: modSustain / 1000,
          modRelease: Math.pow(2, modRelease / 1200),
          initialFilterFc: this.getModGenAmount(generator, 'initialFilterFc', 13500),
          modEnvToFilterFc: this.getModGenAmount(generator, 'modEnvToFilterFc'),
          initialFilterQ: this.getModGenAmount(generator, 'initialFilterQ'),
          freqVibLFO: freqVibLFO ? Math.pow(2, freqVibLFO / 1200) * 8.176 : void 0
        };
      }
    }
  }, {
    key: 'getModGenAmount',
    value: function getModGenAmount(generator, enumeratorType) {
      var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      return generator[enumeratorType] ? generator[enumeratorType].amount : defaults$$1;
    }
  }, {
    key: 'start',
    value: function start() {
      this.bufSrc.connect(this.gainMaster);
      this.gainMaster.connect(this.ctx.destination);
      this.bufSrc.start(0);

      this.setMasterVolume(16383);

      this.onready();
    }
  }, {
    key: 'setMasterVolume',
    value: function setMasterVolume(volume) {
      this.masterVolume = volume;
      this.gainMaster.gain.value = this.baseVolume * (volume / 16384);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.bufSrc.disconnect(0);
      this.gainMaster.disconnect(0);
      this.compressor.disconnect(0);
    }
  }, {
    key: 'drawSynth',
    value: function drawSynth() {
      var _this2 = this;

      var table = this.table = document.createElement('table');
      var head = document.createElement('thead');
      var body = document.createElement('tbody');

      head.appendChild(this.createTableLine(TableHeader, true));

      for (var i = 0; i < 16; ++i) {
        var tableLine = this.createTableLine(TableHeader.length + 128, false);
        body.appendChild(tableLine);

        if (i !== 9) {
          var select = document.createElement('select');
          var option;
          for (var j = 0; j < ProgramNames.length; ++j) {
            option = document.createElement('option');
            option.textContent = ProgramNames[j];
            select.appendChild(option);
          }
          tableLine.querySelector('td:nth-child(1)').appendChild(select);
          select.addEventListener('change', function (channel) {
            return function (e) {
              _this2.programChange(channel, e.target.selectedIndex);
            };
          }(i), false);
          select.selectedIndex = this.channelInstrument[i];
        } else {
          tableLine.querySelector('td:first-child').textContent = '[ RHYTHM TRACK ]';
        }

        var notes = tableLine.querySelectorAll('td:nth-last-child(-n+128)');
        for (var _j = 0; _j < ProgramNames.length; ++_j) {
          notes[_j].addEventListener('mousedown', function (channel) {
            return function (key) {
              return function (e) {
                e.preventDefault();
                _this2.drag = true;
                _this2.noteOn(channel, key, 127);
              };
            };
          }(i, _j), false);
          notes[_j].addEventListener('mouseover', function (channel) {
            return function (key) {
              return function (e) {
                e.preventDefault();
                if (_this2.drag) {
                  _this2.noteOn(channel, key, 127);
                }
              };
            };
          }(i, _j), false);
          notes[_j].addEventListener('mouseout', function (channel) {
            return function (key) {
              return function (e) {
                e.preventDefault();
                _this2.noteOff(channel, key, 0);
              };
            };
          }(i, _j), false);
          notes[_j].addEventListener('mouseup', function (channel) {
            return function (key) {
              return function (e) {
                e.preventDefault();
                _this2.drag = false;
                _this2.noteOff(channel, key, 0);
              };
            };
          }(i, _j), false);
        }
      }

      table.appendChild(head);
      table.appendChild(body);

      return table;
    }
  }, {
    key: 'removeSynth',
    value: function removeSynth() {
      var table = this.table;

      if (table && table.parentNode) {
        table.parentNode.removeChild(table);
        this.table = null;
      }
    }
  }, {
    key: 'createTableLine',
    value: function createTableLine(array, isTitleLine) {
      var tr = document.createElement('tr');
      var isArray = array instanceof Array;
      var n = isArray ? array.length : array;

      for (var i = 0; i < n; ++i) {
        var cell = document.createElement(isTitleLine ? 'th' : 'td');
        cell.textContent = isArray && array[i] !== undefined ? array[i] : '';
        tr.appendChild(cell);
      }

      return tr;
    }
  }, {
    key: 'noteOn',
    value: function noteOn(channel, key, velocity) {
      var bank = this.bankSet[channel === 9 ? 128 : this.bank];
      var instrument = bank[this.channelInstrument[channel]];

      if (this.table) {
        this.table.querySelector('tbody > ' + ('tr:nth-child(' + (channel + 1) + ') > ') + ('td:nth-child(' + (TableHeader.length + key + 1) + ')')).classList.add('note-on');
      }

      if (!instrument) {
        // TODO
        console.warn('instrument not found: bank=%s instrument=%s channel=%s', channel === 9 ? 128 : this.bank, this.channelInstrument[channel], channel);
        return;
      }

      var instrumentKey = instrument[key];

      if (!instrumentKey) {
        // TODO
        console.warn('instrument not found: bank=%s instrument=%s channel=%s key=%s', channel === 9 ? 128 : this.bank, this.channelInstrument[channel], channel, key);
        return;
      }

      var panpot = this.channelPanpot[channel] - 64;
      panpot /= panpot < 0 ? 64 : 63;

      // create note information
      instrumentKey['channel'] = channel;
      instrumentKey['key'] = key;
      instrumentKey['velocity'] = velocity;
      instrumentKey['panpot'] = panpot;
      instrumentKey['volume'] = this.channelVolume[channel] / 127;
      instrumentKey['pitchBend'] = this.channelPitchBend[channel] - 8192;
      instrumentKey['pitchBendSensitivity'] = this.channelPitchBendSensitivity[channel];

      // note on
      var note = new SynthesizerNote(this.ctx, this.gainMaster, instrumentKey);
      note.noteOn();
      this.currentNoteOn[channel].push(note);
    }
  }, {
    key: 'noteOff',
    value: function noteOff(channel, key, velocity) {
      var bank = this.bankSet[channel === 9 ? 128 : this.bank];
      var instrument = bank[this.channelInstrument[channel]];
      var currentNoteOn = this.currentNoteOn[channel];

      if (this.table) {
        this.table.querySelector('tbody > ' + ('tr:nth-child(' + (channel + 1) + ') > ') + ('td:nth-child(' + (TableHeader.length + key + 1) + ')')).classList.remove('note-on');
      }

      if (!instrument) {
        return;
      }

      for (var i = 0; i < currentNoteOn.length; ++i) {
        var note = currentNoteOn[i];
        if (note.key === key) {
          note.noteOff();
          currentNoteOn.splice(i, 1);
          --i;
        }
      }
    }
  }, {
    key: 'programChange',
    value: function programChange(channel, instrument) {
      if (channel === 9) {
        return;
      }
      if (this.table) {
        this.table.querySelector('tbody > tr:nth-child(' + (channel + 1) + ') > td:first-child > select').selectedIndex = instrument;
      }
      this.channelInstrument[channel] = instrument;
    }
  }, {
    key: 'volumeChange',
    value: function volumeChange(channel, volume) {
      if (this.table) {
        this.table.querySelector('tbody > tr:nth-child(' + (channel + 1) + ') > td:nth-child(2)').textContent = volume;
      }

      this.channelVolume[channel] = volume;
    }
  }, {
    key: 'panpotChange',
    value: function panpotChange(channel, panpot) {
      if (this.table) {
        this.table.querySelector('tbody > tr:nth-child(' + (channel + 1) + ') > td:nth-child(3)').textContent = panpot;
      }

      this.channelPanpot[channel] = panpot;
    }
  }, {
    key: 'pitchBend',
    value: function pitchBend(channel, lowerByte, higherByte) {
      var bend = lowerByte & 0x7f | (higherByte & 0x7f) << 7;
      var currentNoteOn = this.currentNoteOn[channel];
      var calculated = bend - 8192;

      if (this.table) {
        this.table.querySelector('tbody > tr:nth-child(' + (channel + 1) + ') > td:nth-child(4)').textContent = calculated;
      }

      for (var i = 0; i < currentNoteOn.length; ++i) {
        currentNoteOn[i].updatePitchBend(calculated);
      }

      this.channelPitchBend[channel] = bend;
    }
  }, {
    key: 'pitchBendSensitivity',
    value: function pitchBendSensitivity(channel, sensitivity) {
      if (this.table) {
        this.table.querySelector('tbody > tr:nth-child(' + (channel + 1) + ') > td:nth-child(5)').textContent = sensitivity;
      }

      this.channelPitchBendSensitivity[channel] = sensitivity;
    }
  }, {
    key: 'allSoundOff',
    value: function allSoundOff(channel) {
      var currentNoteOn = this.currentNoteOn[channel];

      while (currentNoteOn.length > 0) {
        this.noteOff(channel, currentNoteOn[0].key, 0);
      }
    }
  }, {
    key: 'resetAllControl',
    value: function resetAllControl(channel) {
      this.pitchBend(channel, 0x00, 0x40); // 8192
    }
  }]);
  return Synthesizer;
}(Connectable);

var ProgramNames = ['Acoustic Piano', 'Bright Piano', 'Electric Grand Piano', 'Honky-tonk Piano', 'Electric Piano', 'Electric Piano 2', 'Harpsichord', 'Clavi', 'Celesta', 'Glockenspiel', 'Musical box', 'Vibraphone', 'Marimba', 'Xylophone', 'Tubular Bell', 'Dulcimer', 'Drawbar Organ', 'Percussive Organ', 'Rock Organ', 'Church organ', 'Reed organ', 'Accordion', 'Harmonica', 'Tango Accordion', 'Acoustic Guitar (nylon)', 'Acoustic Guitar (steel)', 'Electric Guitar (jazz)', 'Electric Guitar (clean)', 'Electric Guitar (muted)', 'Overdriven Guitar', 'Distortion Guitar', 'Guitar harmonics', 'Acoustic Bass', 'Electric Bass (finger)', 'Electric Bass (pick)', 'Fretless Bass', 'Slap Bass 1', 'Slap Bass 2', 'Synth Bass 1', 'Synth Bass 2', 'Violin', 'Viola', 'Cello', 'Double bass', 'Tremolo Strings', 'Pizzicato Strings', 'Orchestral Harp', 'Timpani', 'String Ensemble 1', 'String Ensemble 2', 'Synth Strings 1', 'Synth Strings 2', 'Voice Aahs', 'Voice Oohs', 'Synth Voice', 'Orchestra Hit', 'Trumpet', 'Trombone', 'Tuba', 'Muted Trumpet', 'French horn', 'Brass Section', 'Synth Brass 1', 'Synth Brass 2', 'Soprano Sax', 'Alto Sax', 'Tenor Sax', 'Baritone Sax', 'Oboe', 'English Horn', 'Bassoon', 'Clarinet', 'Piccolo', 'Flute', 'Recorder', 'Pan Flute', 'Blown Bottle', 'Shakuhachi', 'Whistle', 'Ocarina', 'Lead 1 (square)', 'Lead 2 (sawtooth)', 'Lead 3 (calliope)', 'Lead 4 (chiff)', 'Lead 5 (charang)', 'Lead 6 (voice)', 'Lead 7 (fifths)', 'Lead 8 (bass + lead)', 'Pad 1 (Fantasia)', 'Pad 2 (warm)', 'Pad 3 (polysynth)', 'Pad 4 (choir)', 'Pad 5 (bowed)', 'Pad 6 (metallic)', 'Pad 7 (halo)', 'Pad 8 (sweep)', 'FX 1 (rain)', 'FX 2 (soundtrack)', 'FX 3 (crystal)', 'FX 4 (atmosphere)', 'FX 5 (brightness)', 'FX 6 (goblins)', 'FX 7 (echoes)', 'FX 8 (sci-fi)', 'Sitar', 'Banjo', 'Shamisen', 'Koto', 'Kalimba', 'Bagpipe', 'Fiddle', 'Shanai', 'Tinkle Bell', 'Agogo', 'Steel Drums', 'Woodblock', 'Taiko Drum', 'Melodic Tom', 'Synth Drum', 'Reverse Cymbal', 'Guitar Fret Noise', 'Breath Noise', 'Seashore', 'Bird Tweet', 'Telephone Ring', 'Helicopter', 'Applause', 'Gunshot'];

var TableHeader = ['Instrument', 'Vol', 'Pan', 'Bend', 'Range'];

// import { EventEmitter } from '../events'
var SF2Loader = function () {
  function SF2Loader() {
    classCallCheck(this, SF2Loader);

    // super()
    // this.RpnMsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // this.RpnLsb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // this.ready = false
    this.synth = null;
    // this.messageHandler = this.onmessage.bind(this)
  }

  createClass(SF2Loader, [{
    key: 'load',
    value: function load(url) {
      var _this = this;

      return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.addEventListener('load', function () {
          _this.onload(xhr.response);
          resolve(_this.synth);
        });

        xhr.send();
      });
    }
  }, {
    key: 'onload',
    value: function onload(response) {
      var input = new Uint8Array(response);

      this.loadSoundFont(input);
    }
  }, {
    key: 'loadSoundFont',
    value: function loadSoundFont(input) {
      if (!this.synth) {
        this.synth = new Synthesizer(input);
        document.body.appendChild(this.synth.drawSynth());
        this.synth.init();
        this.synth.start();
        // window.addEventListener('message', this.messageHandler, false)
      } else {
        this.synth.refreshInstruments(input);
      }

      // const win = window.opener ? window.opener : window.parent
      // win.postMessage('link,ready', '*')
      // this.emit('load')
    }
  }]);
  return SF2Loader;
}();

var SoundFont = {
  Synthesizer: Synthesizer,
  SynthesizerNote: SynthesizerNote,
  Parser: Parser$3,
  Loader: SF2Loader
  // WebMidiLink
};

var index = {
  SMF: SMF,
  SoundFont: SoundFont
};

return index;

})));
//# sourceMappingURL=bundle.js.map
