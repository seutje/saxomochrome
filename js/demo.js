(function() {
StartAudioContext(Tone.context, '#pressMe').then(function(){

  // Track code

  var tempo = 120;
  var measure = tempo / 60;
  var length = measure * 32;

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
        var synth = new Tone.MetalSynth().toMaster();
        var reverb = new Tone.Freeverb(0.9, 5000);
        synth.chain(reverb, Tone.Master);
        return synth;
      },
      vol: -40,
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
        1, 0, 1, 0,
        1, 0, 1, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
      ],
      init: function() {
        return new Tone.DuoSynth().toMaster();
      },
      vol: -10,
      timing: '16n',
      interval: '8n',
      measure: measure * 2
    },
    {
      label: 'synth2',
      seq: [
        'C1', null, 'E4', null,
        'F2', null, 'F3', null,
        'A1', null, 'G3', null,
        'D2', null, 'C3', null
      ],
      sched: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        1, 0, 1, 0,
        1, 0, 1, 0
      ],
      init: function() {
        return new Tone.FMSynth({
          'harmonicity': 5,
          'modulationIndex': 15,
          'detune': 0,
          'oscillator': {
            'type': 'sine'
          },
          'envelope': {
            'attack': 0.02,
            'decay': 0.5,
            'sustain': 1,
            'release': 0.5
          },
          "modulation": {
            'type': 'sine'
          },
          'modulationEnvelope': {
            'attack': 0.9,
            'decay': 0.02,
            'sustain': 1,
            'release': 0.5
          }
        }).toMaster();
      },
      vol: -5,
      timing: '8n',
      interval: '8n',
      measure: measure * 2
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
      vol: -40,
      timing: '4n',
      interval: '4n',
      measure: measure * 2
    },
    {
      label: 'conga',
      seq: [
        null, null, null, null,
        'G3', 'C4', 'C4', 'C4',
        null, null, null, null,
        'G3', 'C4', 'C4', 'C4'
      ],
      sched: [
        0, 0, 1, 1,
        1, 1, 1, 0
      ],
      init: function() {
        var synth =  new Tone.MembraneSynth({
          "pitchDecay" : 0.008,
          "octaves" : 2,
          "envelope" : {
            "attack" : 0.006,
            "decay" : 0.009,
            "sustain" : 0.2
          }
        }).toMaster();
        var feedback = new Tone.StereoXFeedbackEffect(1);
        synth.chain(feedback, Tone.Master);
        return synth;
      },
      vol: 5,
      timing: '16n',
      interval: '8n',
      measure: measure * 2
    },
    {
      label: 'clap',
      seq: [
        null, null, 'C1', null,
        null, null, 'E1', null
      ],
      sched: [
        0, 0, 0, 0,
        1, 1, 1, 1,
        0, 0, 0, 0,
        1, 1, 1, 1
      ],
      init: function() {
        var synth = new Tone.PluckSynth({
          attackNoise: 3,
          dampening: 500,
          resonance: 0.5
        });
        var dist = new Tone.Distortion(2.5);
        synth.chain(dist, Tone.Master);
        return synth;
      },
      vol: -30,
      timing: '16n',
      interval: '8n',
      measure: measure
    },
    {
      label: 'clap2',
      seq: [
        null, 'C1', 'C1', null,
        null, 'C1', null, null
      ],
      sched: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 1, 1,
        1, 1, 1, 1
      ],
      init: function() {
        var synth = new Tone.PluckSynth({
          attackNoise: 3,
          dampening: 500,
          resonance: 0.3
        });
        var vib = new Tone.Vibrato();
        var phaser = new Tone.Phaser();
        var reverb = new Tone.JCReverb(0.5);
        var dist = new Tone.Distortion(2.5);
        synth.chain(vib, Tone.Master);
        synth.chain(phaser, Tone.Master);
        synth.chain(reverb, Tone.Master);
        synth.chain(dist, Tone.Master);
        return synth;
      },
      vol: -30,
      timing: '16n',
      interval: '8n',
      measure: measure
    }

  ];

  // Player code

  var buttonWrapper = document.querySelector('.buttonWrapper');
  var vol = new Tone.Gain().toMaster();
  var volSlider = document.createElement('input');
  var allBtn = document.createElement('button');
  var player;
  var promises = [];
  var loop;

  volSlider.setAttribute('type', 'range');
  volSlider.setAttribute('min', '0');
  volSlider.setAttribute('max', '5');
  volSlider.setAttribute('value', '1');
  volSlider.setAttribute('step', '0.01');

  volSlider.oninput = function(e) {
    vol.gain.value = this.value;
  };
  buttonWrapper.parentNode.appendChild(volSlider);

  Tone.context.latencyHint = 'playback';

  channels.forEach(function(chan) {
    chan.button = document.createElement('button');
    chan.disabled = true;
    chan.button.innerText = 'Play ' + chan.label;
    chan.button.onmousedown = function(e) {
      e.preventDefault();
      if (this.classList.contains('active')) {
        chan.ownPlayer.stop();
        this.classList.remove('active');
        this.innerText = 'Play ' + chan.label;
      }
      else {
        chan.ownPlayer.start();
        this.classList.add('active');
        this.innerText = 'Stop ' + chan.label;
      }
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
      chan.ownPlayer = new Tone.Player().connect(vol);
      chan.ownPlayer.loop = true;
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
      player = new Tone.Player().connect(vol);
      player.loop = true;
      player.buffer = buffer;
      allBtn.disabled = false;
    });

  });

  allBtn.disabled = true;
  allBtn.innerText = 'Play track';
  allBtn.onmousedown = function(e) {
    e.preventDefault();
    if (this.classList.contains('active')) {
      player.stop();
      this.classList.remove('active');
      this.innerText = 'Play track';
    }
    else {
      player.start();
      this.classList.add('active');
      this.innerText = 'Stop track';
    }
  };
  buttonWrapper.parentNode.appendChild(allBtn);


});

})();
