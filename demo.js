var player = new sf2player.SMF.Player()

function initPlayer() {
  player.enableLoop = false //  (document.getElementById('playerloop').checked)
  player.enableCC111Loop = false // (document.getElementById('cc111loop').checked)
  player.enableFalcomLoop = false //  (document.getElementById('falcomloop').checked)
  player.enableMFiLoop = false // (document.getElementById('mfiloop').checked)
  player.tempoRate  = 1.0 // (document.getElementById('tempo').valueAsNumber)
}

initPlayer()

function loadMidi(url) {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)
  xhr.responseType = 'arraybuffer'

  xhr.addEventListener('load', () => {
    handleInput(url, new Uint8Array(xhr.response))
  })

  xhr.send()
}

document.getElementById('file').addEventListener('change', onFileSelected, false)
function onFileSelected(e) {
  var file = document.getElementById("file").files[0]

  handleFile(file)

  e.preventDefault()
}

function handleFile(file) {
  var reader = new FileReader()

  reader.onload = function(e) {
    var input = new Uint8Array(e.target.result)
    handleInput(file.name, input)
  }
  reader.readAsArrayBuffer(file)
}


function handleInput(filename, buffer) {
  switch (filename.slice(filename.lastIndexOf('.')).toLowerCase()) {
    case '.mld':
      // console.time('smf load')
      player.loadMldFile(buffer)
      // console.timeEnd('smf load')
      // console.log(player)
      player.play()
      document.getElementById('title').innerHTML = player.sequenceName
      document.getElementById('copyright').innerHTML = player.copyright.join('<br>')
      break
    case '.mid':
      // console.time('smf load')
      player.loadMidiFile(buffer)
      // console.timeEnd('smf load')
      player.play()
      document.getElementById('title').innerHTML = player.sequenceName
      document.getElementById('copyright').innerHTML = player.copyright.join('<br>')
      break
  }
}

// var sf2 = '1mgm.sf2'
var sf2 = '2gmgsmt.sf2'
// var sf2 = 'A320U.sf2'
// var sf2 = 'GeneralUser GS MuseScore v1.44.sf2'
// var sf2 = 'FluidR3 GM2-2.sf2'
document.getElementById('sf2').innerHTML = sf2

var loader = new sf2player.SoundFont.Loader()
loader.load('./' + sf2).then(synth => {
  synth.ready.then(() => {
    // player.setMasterVolume(0.1 * 16383) // document.getElementById('volume').valueAsNumber * 16383)

    // document.getElementById('footer').style.display = 'block'

    // player.to(synth)
    synth.from(player)
    var volinput = document.getElementById('volume')
    volinput.addEventListener('input', function() {
       synth.setMasterVolume(volinput.valueAsNumber * 16383);
       document.getElementById('volume_value').textContent = volinput.value;
    })
    synth.setMasterVolume(volinput.valueAsNumber * 16383)

    // loadMidi('../../pal_08.mid')
    // loadMidi('../../Palhero.net-pal-dos-midi/Music_01.mid')

    var listnames = ['maoudamashii', 'th08', 'pal', 'pal98']
    function initList() {
      var select = document.createElement('select')
      for (var i = 0; i < listnames.length; ++i) {
        var option = document.createElement('option')
        option.innerHTML = listnames[i]
        option.value = listnames[i]
        select.append(option)
      }
      select.addEventListener('change', function() {
        loadSongList(select.value)
      })
      document.getElementById('song-book').appendChild(select)
    }
    initList()

    var songListScriptTag = null

    function loadSongList(name) {
      if (songListScriptTag !== null) {
        if (name === songListScriptTag.getAttribute('data-name')) {
          return
        }
        songListScriptTag.parentNode.removeChild(songListScriptTag)
      }
      player.stop()
      document.getElementById('song-list').innerHTML = ''

      songListScriptTag = document.createElement('script')
      songListScriptTag.setAttribute('data-name', name)

      songListScriptTag.onload = function() {
        var select = document.createElement('select')
        for (var i = 0; i < song_list.length ; ++i) {
          var option = document.createElement('option')
          option.innerHTML = song_list[i]
          option.value = i
          select.appendChild(option)
        }
        select.addEventListener('change', function() {
          // console.log(select.value)
          // player.stop()
          play()
        })
        document.getElementById('song-list').appendChild(select)

        function play() {
          // var id = document.getElementById('filename').value
          var id = select.value
          player.stop()
          // loadMidi('../../Palhero.net-pal-dos-midi/Music_' + id + '.mid')
          var path = '../../' + song_path + song_list[id]
          loadMidi(path)
        }

        document.getElementById('play').addEventListener('click', function() {
          play()
        })
        document.getElementById('stop').addEventListener('click', function() {
          player.stop()
        })
        var prev = document.createElement('button')
        prev.innerHTML = 'Prev'
        prev.addEventListener('click', function() {
          var cur = parseInt(select.value, 10)
          if (cur === 0) {
            return
          }
          var val = cur - 1
          select.value = val
          play()
        })

        var next = document.createElement('button')
        next.innerHTML = 'Next'
        next.addEventListener('click', function() {
          var cur = parseInt(select.value, 10)
          if (cur === song_list.length - 1) {
            return
          }
          var val = cur + 1
          select.value = val
          play()
        })

        document.getElementById('song-list').appendChild(prev)
        document.getElementById('song-list').appendChild(next)
      }

      songListScriptTag.src = './list_' + name + '.js'
      document.body.appendChild(songListScriptTag)
    }

    loadSongList(listnames[0])
  })
})
