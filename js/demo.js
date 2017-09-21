(function() {
StartAudioContext(Tone.context, '#pressMe').then(function(){
    var tempo = 120,
        measure = tempo / 60;

    var tracks = [
      {
        label: 'test Track',
        tempo: tempo,
        measure: measure,
        length: measure * 32,
        channels: [
          {
            label: 'kick',
            // Single measure sequence
            seq: [
              'C2', null, null, null,
              'C2', null, null, null,
              'C2', null, null, null,
              'C2', null, 'C2', null
            ],
            // Scheduling in the main composition
            sched: [
              0, 0, 1, 1,
              1, 1, 1, 0
            ],
            // Instrument init function
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
            // Channel volume
            vol: -15,
            // How long to strike a note
            timing: '8n',
            // How often to strike a note
            interval: '16n',
            // How long is the channel loop
            measure: measure
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
            // MetalSynth doesn't play notes, only pass timing.
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
            label: 'bass2',
            seq: [
              'C2', 'C1', 'C3', 'C1',
              'C2', 'C1', 'C2', null
            ],
            sched: [
              0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 1, 1,
              1, 1, 1, 1
            ],
            init: function() {
              var synth = new Tone.AMSynth();
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
            vol: -20,
            timing: '8n',
            interval: '4n',
            measure: measure * 2
          },
          {
            label: 'conga',
            seq: [
              'G3', 'C4', 'C4', 'C4',
              null, null, null, null,
              'G3', 'C4', 'C4', 'C4',
              null, null, null, null
            ],
            sched: [
              0, 1, 1, 1,
              1, 1, 0, 0
            ],
            init: function() {
              var synth =  new Tone.MembraneSynth({
                "pitchDecay" : 0.018,
                "octaves" : 10,
                "envelope" : {
                  "attack" : 0.016,
                  "decay" : 0.009,
                  "sustain" : 0.2
                }
              }).toMaster();
              var feedback = new Tone.StereoXFeedbackEffect(1);
              var phaser = new Tone.Phaser({
                'frequency' : 440,
                'octaves' : 5,
                'baseFrequency' : 2000
              });
              synth.chain(feedback, Tone.Master);
              synth.chain(phaser, Tone.Master);
              return synth;
            },
            vol: -10,
            timing: '16n',
            interval: '8n',
            measure: measure * 2
          },
          {
            label: 'guitar',
            seq: [
              'D3', null, 'G3', 'B3',
              null, null, null, null,
              'A4', null, null, null,
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null
            ],
            sched: [
              0, 0, 0, 0,
              1, 1, 1, 1,
              0, 0, 0, 0,
              1, 1, 1, 1
            ],
            init: function() {
              var synth = new Tone.PluckSynth({
                attackNoise: 35,
                dampening: 10000,
                resonance: 0.99
              });
              var dist = new Tone.Distortion({
                distortion: 1,
                oversample: '2x'
              });
              var wah = new Tone.AutoWah({
                baseFrequency: 440,
                octaves: 16,
                sensitivity: -50,
                Q: 5,
                gain: 12,
                follower:{
                  attack: 0.3,
                  release: 0.5
                }
              });
              var feedback = new Tone.FeedbackDelay('16n', 0.5);
              synth.toMaster();
              synth.chain(dist, Tone.Master);
              synth.chain(feedback, wah, Tone.Master);
              return synth;
            },
            vol: -55,
            timing: '16n',
            interval: '32n',
            measure: measure
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
        ]
      },
      {
        label: 'Freed',
        tempo: tempo,
        measure: measure,
        length: measure * 32,
        channels: [
          {
            label: 'kick',
            // Single measure sequence
            seq: [
              'C2', null, null, null,
              null, null, null, null,
              'C2', null, 'C2', null,
              null, null, null, null
            ],
            // Scheduling in the main composition
            sched: [
              0, 0, 0, 0,
              0, 0, 0, 0,
              1, 1, 1, 1,
              1, 1, 1, 1,

              1, 1, 1, 1,
              1, 1, 1, 1,
              1, 1, 1, 1,
              1, 1, 1, 1
            ],
            // Instrument init function
            init: function() {
              return new Tone.MembraneSynth({
                'octaves': 5,
                'envelope': {
                  'attack': 0.001,
                  'decay': 0.5,
                  'sustain': 0.1,
                  'release': 0.4
                }
              }).toMaster();
            },
            // Channel volume
            vol: -10,
            // How long to strike a note
            timing: '8n',
            // How often to strike a note
            interval: '16n',
            // How long is the channel loop
            measure: measure
          },
          {
            label: 'hihat',
            seq: [
              null, null, null, '32n',
              null, null, null, null,
              null, null, '32n', '64n',
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null
            ],
            sched: [
              1, 1, 1, 1,
              1, 1, 1, 1,
              1, 1, 1, 1,
              0, 0, 0, 0
            ],
            init: function() {
              var synth = new Tone.MetalSynth({
                frequency:200,
                envelope:{
                  attack:0.001,
                  decay:0.1,
                  release:0.2,
                },
                harmonicity:0.5,
                modulationIndex:16,
                resonance:2000,
                octaves:0.2,
              }).toMaster();
              return synth;
            },
            vol: -40,
            // MetalSynth doesn't play notes, only pass timing.
            noNote: true,
            interval: '16n',
            measure: measure * 2,
          },
          {
            label: 'synth',
            seq: [
              {note:'C3', timing: '8n'}, null, null, 'C3',
              {note: 'C3', timing: '32n'}, null, {note: 'C3', timing: '32n'}, null,
              {note: 'C3', timing: '32n'}, null, null, {note: 'C3', timing: '32n'},
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null
            ],
            sched: [
              1, 0, 1, 0,
              1, 0, 1, 0,
              1, 0, 1, 0,
              1, 0, 1, 0
            ],
            init: function() {
              var synth = new Tone.DuoSynth().toMaster();
              return synth;
            },
            vol: -5,
            timing: '16n',
            interval: '16n',
            measure: measure * 2
          },
          {
            label: 'atmo',
            seq: [
              'C1', null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null
            ],
            sched: [
              0, 0, 0, 0,
              1, 0, 0, 0,
              0, 0, 0, 0,
              1, 0, 0, 0
            ],
            init: function() {
              var synth = new Tone.Synth({
                oscillator: {
                  type: 'triangle'
                },
                envelope : {
                  attack : '1m * 4',
                  decay : '4n',
                  sustain: 1,
                  release: '4n'
                }
              });
              var dist = new Tone.Distortion(0.9);
              var crush = new Tone.BitCrusher(8);
              var chorus = new Tone.Chorus();
              var pan = new Tone.AutoPanner({
                frequency: '16n',
                type: 'sine',
                depth: 0.5
              }).start();
              var comb = new Tone.LowpassCombFilter();
              var filter = new Tone.Filter(2000, "highpass");
              var reverb = new Tone.Freeverb();
              //synth.chain(chorus, Tone.Master);
              //synth.chain(crush, Tone.Master);
              //synth.chain(crush, comb, pan, Tone.Master);
              //synth.chain(chorus, pan, Tone.Master);
              //synth.chain(dist, comb, pan, Tone.Master);
              //synth.chain(crush, dist, comb, pan, Tone.Master);
              //synth.chain(chorus, crush, dist, comb, pan, Tone.Master);
              synth.chain(dist, chorus, comb, reverb, filter, pan, Tone.Master);
              return synth;
            },
            vol: -15,
            timing: '1m * 2',
            interval: '16n',
            measure: measure * 4
          },
          {
            label: 'snare',
            seq: [
              null, null, null, 'A5',
              null, null, null, null,
              null, null, 'A5', 'A5',
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null
            ],
            sched: [
              0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0,

              1, 0, 1, 0,
              1, 0, 1, 0,
              1, 0, 1, 0,
              1, 0, 1, 0
            ],
            init: function(buffer) {
              var snare = new Tone.Sampler({
                'C4' : buffer
              }).toMaster();
              var reverb = new Tone.Freeverb({
                roomSize: 0.7,
                dampening: 9000
              });

              var crush = new Tone.BitCrusher(8);
              snare.chain(reverb, Tone.Master);
              snare.chain(crush, Tone.Master);
              return snare;
            },
            vol: -25,
            timing: '8n',
            interval: '16n',
            measure: measure * 2,
            buffer: new Tone.Buffer('samples/snare/cd_snare_80s.wav')
          },
          {
            label: 'melody',
            seq: [
              {note:'C3', timing: '8n'}, null, null, 'C3',
              {note: 'C3', timing: '32n'}, null, {note: 'C3', timing: '32n'}, null,
              {note: 'C3', timing: '32n'}, null, null, {note: 'C3', timing: '32n'},
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null
            ],
            sched: [
              0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0,

              0, 0, 0, 0,
              0, 0, 0, 0,
              1, 0, 1, 0,
              1, 0, 1, 0
            ],
            init: function() {
              var synth = new Tone.DuoSynth();
              var dist = new Tone.Distortion();
              var comb = new Tone.MultibandCompressor();
              var pan = new Tone.AutoPanner({
                frequency: '16n',
                type: 'sine',
                depth: 1
              }).start();
              var crush = new Tone.BitCrusher(8);
              var filter = new Tone.Filter(800, 'lowpass');
              synth.chain(dist, comb, filter, pan, Tone.Master);
              return synth;
            },
            vol: -20,
            timing: '16n',
            interval: '16n',
            measure: measure
          }
        ]
      },
      {
        label: 'Guitar test',
        tempo: tempo,
        measure: measure,
        length: measure * 32,
        channels: [
          {
            label: 'guitar',
            seq: [
              'D3', null, null, null,
              null, null, null, null,
              'D3', 'D4', null, null,
              null, null, null, null,

              'D3', null, null, null,
              null, null, null, null,
              'D3', 'D4', 'D5', null,
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null,

              'D3', null, null, null,
              null, null, null, null,
              null, 'D4', null, null,
              null, null, null, null,

              'D3', null, null, null,
              null, null, null, null,
              null, null, 'D5', null,
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null,

              null, null, null, null,
              null, null, null, null,
              null, null, null, null,
              null, null, null, null
            ],
            sched: [
              0, 0, 0, 0,
              1, 1, 1, 1,
              0, 0, 0, 0,
              1, 1, 1, 1
            ],
            init: function() {
              var synth = new Tone.PluckSynth({
                attackNoise: 35,
                dampening: 10000,
                resonance: 0.99
              });
              var dist = new Tone.Distortion({
                distortion: 1,
                oversample: '2x'
              });
              var wah = new Tone.AutoWah({
                baseFrequency: 440,
                octaves: 16,
                sensitivity: -50,
                Q: 5,
                gain: 12,
                follower:{
                  attack: 0.3,
                  release: 0.5
                }
              });
              var feedback = new Tone.FeedbackDelay('16n', 0.5);
              synth.toMaster();
              synth.chain(dist, feedback);
              synth.chain(wah, feedback);
              feedback.connect(Tone.Master);
              return synth;
            },
            vol: -55,
            timing: '16n',
            interval: '64n',
            measure: measure * 4
          }
        ]
      }
    ];


  var makePlayer = function(track) {

    // Player code

    var buttonWrapper = document.querySelector('.buttonWrapper');
    var volSlider = document.createElement('input');
    var allBtn = document.createElement('button');
    var channelsLabel = document.createElement('label');
    var channels = track.channels;
    var tempo = track.tempo;
    var measure = track.measure;
    var length = track.lenght;
    var player;
    var promises = [];
    var loop;

    // Set up main volume slider
    volSlider.setAttribute('type', 'range');
    volSlider.setAttribute('min', '0');
    volSlider.setAttribute('max', '5');
    volSlider.setAttribute('value', '1');
    volSlider.setAttribute('step', '0.01');

    volSlider.oninput = function(e) {
      vol.gain.value = this.value;
    };
    buttonWrapper.parentNode.appendChild(volSlider);

    channelsLabel.innerText = 'Channels:';
    buttonWrapper.innerHTML = '';
    buttonWrapper.appendChild(channelsLabel);

    // Set latencyHint to prioritize accurate playback over speed
    Tone.context.latencyHint = 'playback';

    // Loop over all our channels
    channels.forEach(function(chan) {
      // Set up individual buttons
      chan.button = document.createElement('button');
      chan.disabled = true;
      chan.button.innerText = 'Play ' + chan.label;
      // Handler to play/stop the channel's player
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

      // Channel player to be used in main composition
      chan.player = new Tone.Player().toMaster();

      // Prerencer channel and stuff in promises array
      promises.push(Tone.Offline(function(Transport) {
        // Initialize the instrument
        chan.instr = chan.init(chan.buffer || null);
        // Set the volume
        chan.instr.volume.value = chan.vol;
        // Make the sequence for this channel and start it.
        chan.loop = new Tone.Sequence(function(time, note) {
          // Only play if there's a note
          if (note){
            // Handler metalSynth not playing notes
            if (chan.noNote) {
              chan.instr.triggerAttackRelease(note);
            }
            // Allow for timing at the note level
            else if (note.timing) {
              chan.instr.triggerAttackRelease(note.note, note.timing);
            }
            // Fall back to timing at the channel level
            else {
              chan.instr.triggerAttackRelease(note, chan.timing);
            }
          }
        }, chan.seq, chan.interval).start();
        Tone.Transport.bpm.value = tempo;
        Tone.Transport.swing = 0.5;
        // Start the main transport
        Tone.Transport.start();
      // Pass channel measure or fallback to global measure time
      }, chan.measure || measure).then(function(buffer) {
        // Make a player for the channel
        chan.ownPlayer = new Tone.Player().connect(vol);
        chan.ownPlayer.loop = true;
        // Put the buffer in the player and on the channel
        chan.buffer = chan.ownPlayer.buffer = buffer;
        // Enable channel play button
        chan.button.removeAttribute('disabled');
      }));
    });

    // Once all our channels are preloaded
    Promise.all(promises).then(function(buffers) {
      // Preload main composition
      Tone.Offline(function(Transport) {
        // Loop over channels and make a player for each
        channels.forEach(function(chan) {
          chan.player = new Tone.Player().toMaster();
          // Put the channel buffer in the player
          chan.player.buffer = chan.buffer;
          // Start a new sequence based on the scheduling and start it
          loop = new Tone.Sequence(function(time, note) {
            if (note) {
              chan.player.start();
            }
          // Looptime set to 1 measure
          }, chan.sched, '1m').start();
          // Start the main transport
          Tone.Transport.start();
        });
      // Preload for length of the track
      }, track.length).then(function(buffer) {
        // Make a new player for the track
        player = new Tone.Player().connect(vol);
        player.loop = true;
        // Connect the buffer
        player.buffer = buffer;
        allBtn.disabled = false;
        allBtn.innerText = 'Play track';
      });
    });

    // Track player controls.
    allBtn.disabled = true;
    allBtn.innerText = 'Rendering...';
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
  };
  var canvas = document.querySelector('.myAnalyser');
  var myAnalyser = new MyAnalyser(canvas, Tone.Master, Tone.context);

  var vol = new Tone.Gain().toMaster();
  var trackList = document.querySelector('.trackList');
  var preLoadBtn = document.querySelector('.trackRender');

  Tone.loaded().then(function(){
    preLoadBtn.onmousedown = function(e) {
      e.preventDefault();
      var selected = trackList.value;
      var child = trackList.querySelector('[value="' + trackList.value + '"');
      var index = Array.prototype.indexOf.call(trackList.children, child);
      window.location.hash = '#track-' + index;
      makePlayer(tracks[selected]);
    };

    tracks.forEach(function(track, i) {
      var option = document.createElement('option');
      option.setAttribute('value', i);
      option.innerText = track.label;
      trackList.appendChild(option);
    });

    var hash = window.location.hash;
    var activeTrack = 0;
    if (hash.length && hash.indexOf('#track-') !== -1) {
      activeTrack = parseInt(hash.replace('#track-', ''), 10);
      if (!isNaN(activeTrack)) {
        trackList.value = trackList.querySelectorAll('option')[activeTrack].value;
        makePlayer(tracks[activeTrack]);
      }
    }
  });

});

})();
