(function() {
  // Track code

  var tempo = 120;
  var measure = tempo / 60;
  var length = measure * 8;

  var channels = [
    {
      label: 'kick',
      seq: [
        'C2', null, null, null,
        'C2', null, null, null,
        'C2', null, null, null,
        'C2', null, 'C2', null
      ],
      sched: [
        0, 0, 1, 1,
        1, 1, 1, 0
      ],
      init: function() {
        return new Tone.MembraneSynth({
          'octaves': 10,
          'envelope': {
            'attack': 0.001,
            'decay': 0.1,
            'sustain': 1.1,
            'release': 0.4
          }
        }).toMaster();
      },
      vol: -15,
      timing: '8n',
      interval: '16n'
    },
    {
      label: 'hihat',
      seq: [
        '32n', null, '16n', null,
        null, null, null, null,
        '32n', '16n', '8n', null,
        '32n', null, '16n', null,
      ],
      sched: [
        0, 0, 1, 1,
        1, 1, 1, 1
      ],
      init: function() {
        return new Tone.MetalSynth().toMaster();
      },
      vol: -20,
      noNote: true,
      interval: '16n'
    },
    {
      label: 'synth',
      seq: [
        'G3', 'C4', 'C4', 'C4',
        null, null, null, null,
        'G3', 'C4', 'C4', 'C4',
        null, null, null, null,
      ],
      sched: [
        1, 1, 1, 1,
        1, 1, 1, 1
      ],
      init: function() {
        return new Tone.DuoSynth().toMaster();
      },
      vol: -10,
      timing: '16n',
      interval: '8n'
    },
    {
      label: 'bass',
      seq: [
        'C2', 'C1', 'C3', 'C1',
        'C2', 'C1', 'C2', null
      ],
      sched: [
        0, 0, 0, 0,
        1, 1, 1, 1
      ],
      init: function() {
        var synth = new Tone.FMSynth();
        var dist = new Tone.Distortion(2.5);
        var reverb = new Tone.Freeverb();
        var phaser = new Tone.Phaser({
          'frequency' : 15,
          'octaves' : 15,
          'baseFrequency' : 3000
        });
        synth.chain(dist, Tone.Master);
        synth.chain(reverb, Tone.Master);
        synth.chain(phaser, Tone.Master);
        return synth;
      },
      vol: -30,
      timing: '4n',
      interval: '4n',
      measure: measure * 2
    }
  ];

  // Player code

  var player;
  var buttonWrapper = document.querySelector('.buttonWrapper');
  var promises = [];
  var loop;

  channels.forEach(function(chan) {
    chan.button = document.createElement('button');
    chan.disabled = true;
    chan.button.innerText = 'Play ' + chan.label;
    chan.button.onmousedown = function(e) {
      e.preventDefault();
      chan.ownPlayer.start();
    };
    buttonWrapper.appendChild(chan.button);

    chan.player = new Tone.Player().toMaster();

    promises.push(Tone.Offline(function(Transport) {
      chan.instr = chan.init();
      chan.instr.volume.value = chan.vol;
      chan.loop = new Tone.Sequence(function(time, note) {
        if (note){
          if (chan.noNote) {
            chan.instr.triggerAttackRelease(note);
          }
          else if (note.timing) {
            chan.instr.triggerAttackRelease(note.note, note.timing);
          }
          else {
            chan.instr.triggerAttackRelease(note, chan.timing);
          }
        }
      }, chan.seq, chan.interval).start();
      Tone.Transport.bpm.value = tempo;
      Tone.Transport.swing = 0.5;
      Tone.Transport.start();

    }, chan.measure || measure).then(function(buffer) {
      chan.ownPlayer = new Tone.Player().toMaster();
      chan.buffer = chan.ownPlayer.buffer = buffer;
      chan.button.removeAttribute('disabled');
    }));
  });

  Promise.all(promises).then(function(buffers) {

    Tone.Offline(function(Transport) {
      channels.forEach(function(chan) {
        chan.player = new Tone.Player().toMaster();
        chan.player.buffer = chan.buffer;
        loop = new Tone.Sequence(function(time, note) {
          if (note) {
            chan.player.start();
          }
        }, chan.sched, '1m').start();
        Tone.Transport.start();
      });
    }, length).then(function(buffer) {
      player = new Tone.Player().toMaster();
      player.buffer = buffer;
      allBtn.disabled = false;
    });

  });

  var allBtn = document.createElement('button');
  allBtn.disabled = true;
  allBtn.innerText = 'Play all';
  allBtn.onmousedown = function(e) {
    e.preventDefault();
    player.start();
  };
  buttonWrapper.appendChild(allBtn);

})();
