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
              var chorus = new Tone.Chorus();
              var pan = new Tone.AutoPanner({
                frequency: '8n',
                type: 'sine',
                depth: 0.5
              }).start();
              var filter = new Tone.Filter(2000, "highpass");
              var reverb = new Tone.Freeverb(0.9, 2000);
              synth.chain(dist, chorus, reverb, filter, pan, Tone.Master);
              return synth;
            },
            vol: 0,
            timing: '1m * 2',
            interval: '16n',
            measure: measure * 4
          },
          {
            label: 'snare',
            seq: [
              null, null, null, 'A5',
              null, null, null, null,
              null, null, 'F4', 'A5',
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
        allBtn.onmousedown({preventDefault: function(){}});
      });
    });

    // Track player controls.
    allBtn.disabled = true;
    allBtn.innerText = 'Rendering...';
    allBtn.onmousedown = function(e) {
      e.preventDefault();
      if (this.classList.contains('active')) {
        player.stop();
        fancyAnalyser.vis.stop();
        this.classList.remove('active');
        this.innerText = 'Play track';
      }
      else {
        player.start();
        fancyAnalyser.vis.start();
        this.classList.add('active');
        this.innerText = 'Stop track';
      }
    };
    buttonWrapper.parentNode.appendChild(allBtn);
  };
  var canvas = document.querySelector('.myAnalyser');

  var vol = new Tone.Gain().toMaster();
  var trackList = document.querySelector('.trackList');
  var preLoadBtn = document.querySelector('.trackRender');
  //var myAnalyser = new MyAnalyser(canvas, Tone.Master, Tone.context);
  var fancyAnalyser = new FancyAnalyser(canvas, vol.output, Tone.context);

  var presets = [
    {"name":"Jello Cube","author":"Steven Wittens / UnConeD (http://acko.net)","clearFrame":false,"components":[{"type":"EffectList","enabled":true,"components":[{"type":"DynamicMovement","noGrid":true,"compat":true,"code":{"perPixel":"d=sin(d*(1+d*sin(r*150)*.15))*.5+d*.5;r=r+.01;"}},{"type":"EffectList","enableOnBeat":true,"enableOnBeatFor":1,"output":"MAXIMUM","components":[{"type":"BufferSave","action":"RESTORE"},{"type":"ColorClip","enabled":false,"mode":"ABOVE","color":"#9F9F9F","outColor":"#9F9F9F"}]}]},{"type":"ColorMap","output":"REPLACE","key":"RED","maps":[[{"color":"#FFFFFF","index":52},{"color":"#0FA7F0","index":130},{"color":"#000000","index":255}]]},{"type":"EffectList","clearFrame":true,"input":"IGNORE","output":"SUBTRACTIVE1","components":[{"type":"SuperScope","clone":12,"blendMode":"ADDITIVE","code":{"init":"dx=8;n=sqr(dx);id=2/dx;id1=1/(dx-1);","onBeat":"rxt=(abs((getosc(.55,0,0)+getosc(.91,0,0))*2000)%628)*.01;\nryt=(abs((getosc(.12,0,0)+getosc(.41,0,0))*2000)%628)*.01;\nrzt=(abs((getosc(.55,0,0)+getosc(.91,0,0))*2000)%628)*.01;","perFrame":"t=t-.05;\ndt=sin(t)*sin(t*.411+1)*cos(sin(t*.117))*.5+3;\ngx=-1;\ngy=0;\nrx=rx*.95+rxt*.05;\nry=ry*.95+ryt*.05;\nrz=rz*.95+rzt*.05;\ncx=cos(rx);\nsx=sin(rx);\ncy=cos(ry);\nsy=sin(ry);\ncz=cos(rz);\nsz=sin(rz);\naf=w/h;\np00=getosc(select(cid,0.41,0.41,0.49,0.49,0.36,0.36,0.41,0.41,0.41,0.41,0.67,0.67),0,0)*.35+p00*.65;\np10=getosc(select(cid,0.00,0.00,0.15,0.15,0.24,0.24,0.60,0.60,0.00,0.00,0.76,0.76),0,0)*.35+p10*.65;\np20=getosc(select(cid,0.92,0.92,0.84,0.84,0.20,0.20,0.74,0.74,0.92,0.92,0.37,0.37),0,0)*.35+p20*.65;\np30=getosc(select(cid,0.36,0.36,0.38,0.38,0.17,0.17,0.67,0.67,0.36,0.36,0.17,0.17),0,0)*.35+p30*.65;\np01=getosc(select(cid,0.60,0.60,0.26,0.26,0.19,0.19,0.06,0.06,0.06,0.06,0.97,0.97),0,0)*.35+p01*.65;\np11=getosc(select(cid,0.59,0.59,0.48,0.48,0.54,0.54,0.42,0.42,0.85,0.85,0.23,0.23),0,0)*.55+p11*.65;\np21=getosc(select(cid,0.77,0.77,0.11,0.11,0.41,0.41,0.56,0.56,0.39,0.39,0.30,0.30),0,0)*.55+p21*.65;\np31=getosc(select(cid,0.84,0.84,0.25,0.25,0.01,0.01,0.97,0.97,0.19,0.19,0.01,0.01),0,0)*.35+p31*.65;\np02=getosc(select(cid,0.74,0.74,0.19,0.19,0.33,0.33,0.49,0.49,0.49,0.49,0.70,0.70),0,0)*.35+p02*.65;\np12=getosc(select(cid,0.52,0.52,1.00,1.00,0.07,0.07,0.75,0.75,0.61,0.61,0.61,0.61),0,0)*.55+p12*.65;\np22=getosc(select(cid,0.13,0.13,0.75,0.75,0.27,0.27,0.83,0.83,0.73,0.73,0.43,0.43),0,0)*.55+p22*.65;\np32=getosc(select(cid,0.20,0.20,0.74,0.74,0.93,0.93,0.70,0.70,0.33,0.33,0.93,0.93),0,0)*.35+p32*.65;\np03=getosc(select(cid,0.67,0.67,0.20,0.20,0.38,0.38,0.49,0.49,0.49,0.49,0.20,0.20),0,0)*.35+p03*.65;\np13=getosc(select(cid,0.76,0.76,0.94,0.94,0.25,0.25,0.26,0.26,0.15,0.15,0.94,0.94),0,0)*.35+p13*.65;\np23=getosc(select(cid,0.37,0.37,0.35,0.35,0.74,0.74,0.19,0.19,0.84,0.84,0.35,0.35),0,0)*.35+p23*.65;\np33=getosc(select(cid,0.17,0.17,0.93,0.93,0.93,0.93,0.20,0.20,0.38,0.38,0.93,0.93),0,0)*.35+p33*.65;\ncr=sin(hu)*.5+.9;\ncg=sin(hu+2.09)*.5+.9;\ncb=sin(hu+4.18)*.5+.9;\nxo=sin(t*.741)*sin(t*.114)*cos(sin(t*.41));\nyo=sin(t*.574)*sin(t*.319)*cos(sin(t*.33));","perPoint":"gy=if(equal(gx,dx-1),gy+1,gy);\ngx=if(below(gx,dx-1),gx+1,0);\nx1=select(cid%2, gx, gy)*id1;\ny2=select(cid%2, gy, gx)*id1;\nred=1-x1;\ngreen=1-y2;\nc1=sqr(red)*red*p00 + 3*sqr(red)*x1*p10 + 3*red*sqr(x1)*p20 + sqr(x1)*x1*p30;\nc2=sqr(red)*red*p01 + 3*sqr(red)*x1*p11 + 3*red*sqr(x1)*p21 + sqr(x1)*x1*p31;\nc3=sqr(red)*red*p02 + 3*sqr(red)*x1*p12 + 3*red*sqr(x1)*p22 + sqr(x1)*x1*p32;\nc4=sqr(red)*red*p03 + 3*sqr(red)*x1*p13 + 3*red*sqr(x1)*p23 + sqr(x1)*x1*p33;\nc1=3*(sqr(green)*green*c1 + 3*sqr(green)*y2*c2 + 3*green*sqr(y2)*c3 + sqr(y2)*y2*c4) + 1;\npx=select(cid, x1*2-1, x1*2-1, x1*2-1, x1*2-1, 1,      1,     -1,     -1,      x1*2-1, x1*2-1, x1*2-1, x1*2-1);\npy=select(cid, y2*2-1, y2*2-1, y2*2-1, y2*2-1, x1*2-1, x1*2-1, x1*2-1, x1*2-1, -1,     -1,     1,      1);\npz=select(cid, -1,     -1,     1,      1,      y2*2-1, y2*2-1, y2*2-1, y2*2-1, y2*2-1, y2*2-1, y2*2-1, y2*2-1);\npx=px*c1;\npy=py*c1;\npz=pz*c1;\nx1=px*cz+py*sz;\npy=px*sz-py*cz;\ny2=py*cx+pz*sx+yo;\nz2=py*sx-pz*cx;\nx3=x1*cy+z2*sy+xo;\nz2=x1*sy-z2*cy+dt;\nx1=if(above(z2,.1),1/z2,0);\nx=x3*x1;\ny=y2*x1*af;\nx1=bnot(equal(gx,0))*x1*2;\nred=x1*.5;\ngreen=x1*2;\nblue=x1*2;"}},{"type":"Convolution","scale":8,"kernel":[0,0,1,0,0,0,2,4,2,0,1,4,2,4,1,0,2,4,2,0,0,0,1,0,0]},{"type":"BufferSave","action":"SAVE"}]}]},
    {"meta":{"name":"Science of Superscope","author": "Marco", "description":"Original Author: Marco"},"clearFrame":false,"resources":{"uris":{}},"components":[{"type":"EffectList","code":{"init":"","perFrame":""},"output":"ADDITIVE","input":"IGNORE","clearFrame":false,"enableOnBeat":false,"enableOnBeatFor":1,"id":"EffectList_509","enabled":true,"components":[{"type":"FadeOut","speed":0.4,"color":"#000000","id":"FadeOut_493","enabled":true},{"type":"SuperScope","code":{"init":"n=800","perFrame":"t=t-v*0.5","onBeat":"t=t+0.3;n=100+rand(900);","perPoint":"d=D/n;r=(i-(t*3)); x=(atan(r+d-t)*cos(r+d-t+i)); y=((i+cos(d+v*1.2))-1.5)*1.7;z=-(cos(t+i)+log(v)*cos(r*3))*3;red=cos(r)+1;blue=sin(r);green=sin(i)/2"},"blendMode":"REPLACE","channel":"CENTER","source":"WAVEFORM","drawMode":"LINES","thickness":1,"clone":1,"colors":["#ffffff"],"cycleSpeed":0.01,"id":"SuperScope_409","enabled":true}]},{"type":"Convolution","edgeMode":"EXTEND","autoScale":true,"scale":0,"kernel":[0,1,0,1,1,1,0,1,0],"bias":0,"id":"Blur1","enabled":true},{"type":"ClearScreen","beatCount":1,"color":"#000000","blendMode":"REPLACE","id":"ClearScreen_543","enabled":true},{"type":"Convolution","edgeMode":"EXTEND","autoScale":true,"scale":0,"kernel":[0,1,0,1,1,1,0,1,0],"bias":0,"id":"Blur2","enabled":true}]},
    {"name":"dynamic duo - random anja", "author": "skupers", "description":"    // comment \\\\\r\n          \r\n          random anja\r\n                by sander kupers / skupers\r\n                www: skupers.deviantart.com\r\n                email: skupers@softhome.net\r\n                original preset \"anja rand (tm)\" by jan t. sott / yathosho","clearFrame":true,"components":[{"type":"EffectList","clearFrame":false,"input":"IGNORE","output":"REPLACE","enableOnBeat":false,"enableOnBeatFor":1,"components":[{"type":"EffectList","clearFrame":true,"input":"IGNORE","output":"REPLACE","enableOnBeat":true,"enableOnBeatFor":1,"components":[{"type":"SuperScope","clone":41,"code":{"init":"n=2","perFrame":"t=t-0.05","onBeat":"","perPoint":["y=i*2-1;x=-1+0.05*cid;","red  =select(cid, 1, 1, 1, 1, 0.75, 0.75, 0.75,   0,   0, 0.75, 1, 0.49, 0.49,    0,    0,    0,    0,    0,    0,    0,    0,   0,   0,   0,   0,   0,   0,     0,    0,    0, 1, 1, 1, 1, 1, 0.75, 0.75, 0.75,   0,   0,   0);","green=select(cid, 1, 1, 1, 1,  0.9,  0.9,  0.9, 0.5, 0.5,  0.9, 1, 0.54, 0.54,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,    0,    0, 0.5, 0.5, 0.5, 0.5, 0.5,   0,     0,    0,    0, 1, 1, 1, 1, 1,  0.9,  0.9,  0.9, 0.5, 0.5, 0.5);","blue =select(cid, 1, 1, 1, 1, 0.12, 0.12, 0.12,   0,   0, 0.12, 1,  0.2,  0.2, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.62, 0.62,   0,   0,   0,   0,   0, 0.62, 0.62, 0.62, 0.62, 1, 1, 1, 1, 1, 0.12, 0.12, 0.12,   0,   0,   0);"]},"thickness":50,"channel":"CENTER","source":"WAVEFORM","drawMode":"LINES"}]}]},{"type":"DynamicMovement","code":{"init":"","perFrame":"x1=x1+x1r;x1r=x1r*0.9;\r\nxm=sin(x1)*0.3;","onBeat":"x1r=rand(50)/100-0.25;","perPixel":"x=x+xm;"},"noGrid":true,"bFilter":true,"coord":"RECT","gridW":0,"gridH":0,"blend":false},{"type":"DynamicMovement","code":{"init":"pi=acos(-1);","perFrame":"x1=if(equal(x1,x1c),x1,x1+x1r);\r\nx2=x2+x2r;x2r=x2r*0.95;\r\ny1=if(equal(y1,y1c),y1,y1+y1r);\r\ny2=y2+y2r;y2r=y2r*0.94;","onBeat":"x1c=rand(314)*0.01;x1r=(x1c-x1)/30;\r\nx2r=rand(60)/100-0.3;\r\ny1c=rand(314)*0.01;y1r=(y1c-y1)/30;\r\ny2r=rand(60)/100-0.3;","perPixel":"dm=(1-sin(x*x1+x2)*cos(y*y1+y2)/2);\r\nd=d*dm;\r\nalpha=4-dm*3;"},"bFilter":true,"coord":"POLAR","gridW":30,"gridH":30,"blend":true},{"type":"DynamicMovement","code":{"init":"","perFrame":"x1=x1+x1r;y1=y1+y1r;x1r=x1r*0.9;y1r=y1r*0.9;\r\nxm=sin(x1)/3;ym=sin(y1)/3;","onBeat":"x1r=rand(50)/100-0.25;y1r=rand(50)/100-0.25;","perPoint":"x=x+xm;y=y+ym;"},"bFilter":true,"coord":"RECT","gridW":0,"gridH":0,"blend":false},{"type":"DynamicMovement","code":{"init":"pi=acos(-1);","perFrame":"x1=if(equal(x1,x1c),x1,x1+x1r);\r\nx2=x2+x2r;x2r=x2r*0.95;\r\ny1=if(equal(y1,y1c),y1,y1+y1r);\r\ny2=y2+y2r;y2r=y2r*0.94;","onBeat":"x1c=rand(314)*0.01;x1r=(x1c-x1)/30;\r\nx2r=rand(60)/100-0.3;\r\ny1c=rand(314)*0.01;y1r=(y1c-y1)/30;\r\ny2r=rand(60)/100-0.3;","perPoint":"dm=(1-sin(x*x1+x2)*cos(y*y1+y2)/2);\r\nd=d*dm;\r\nalpha=4-dm*3;"},"bFilter":true,"coord":"POLAR","gridW":30,"gridH":30,"blend":true},{"type":"DynamicMovement","code":{"init":"","perFrame":"x1=x1+x1r;y1=y1+y1r;x1r=x1r*0.9;y1r=y1r*0.9;\r\nxm=sin(x1)*0.2;ym=sin(y1)*0.2;","onBeat":"x1r=rand(50)/100-0.25;y1r=rand(50)/100-0.25;","perPoint":"x=x+xm;y=y+ym;"},"bFilter":true,"coord":"RECT","gridW":0,"gridH":0,"blend":false}]},
    {"name":"Silk Strings","author":"Steven Wittens / UnConeD (http://acko.net)","clearFrame":true,"components":[{"type":"GlobalVar","code":{"init":["n=0; /*global*/","off=.015;sweep=.75;","zm=1;zmt=1;","oxt=rand(200)*.01-1;oyt=rand(200)*.01-1;ozt=rand(200)*.01-1;","ox=oxt;oy=oyt;oz=ozt;vx=ox;vy=oy;vz=oz;","t=0;"],"perFrame":["tm=gettime(0);","dec=dec*.7+(1-pow(.9,(27*(tm-lt))))*.3;","reg90=dec;","lt=tm;","zm=zm*.8+zmt*.2;","ox=ox+(oxt-ox)*dec;oy=oy+(oyt-oy)*dec;oz=oz+(ozt-oz)*dec;","ot=.1+zm*invsqrt(sqr(ox)+sqr(oy)+sqr(oz));","ox=ox*ot;oy=oy*ot;oz=oz*ot;","vx=vx+(ox-vx)*dec;vy=vy+(oy-vy)*dec;vz=vz+(oz-vz)*dec;","rz=0;","rry=atan2(-vx,vz);","rrx=-atan2(vy,sqrt(sqr(vx)+sqr(vz)));","ry=if(t,ry+sin(rry-ry)*dec,rry);rx=if(t,rx+sin(rrx-rx)*dec,rrx);","cx=cos(rx);sx=sin(rx);cy=cos(ry);sy=sin(ry);cz=cos(rz);sz=sin(rz);","reg41=off;","reg01=ry;reg02=cos(ry);reg03=sin(ry);","reg04=rx;reg05=cos(rx);reg06=sin(rx);","reg10=vx;reg11=vy;reg12=vz;","reg40=reg40+off;","reg80=reg80+(reg79-reg80)*sweep;","reg79=reg79+(reg78-reg79)*sweep;","reg78=reg78+(reg77-reg78)*sweep;","reg77=reg77+(reg76-reg77)*sweep;","reg76=reg76+(reg75-reg76)*sweep;","reg75=reg75+(reg74-reg75)*sweep;","reg74=reg74+(reg73-reg74)*sweep;","reg73=reg73+(reg72-reg73)*sweep;","reg72=reg72+(reg71-reg72)*sweep;","reg71=reg71+(reg70-reg71)*sweep;","reg70=reg70+(b*3-reg70)*sweep;","t=1;"],"onBeat":["zmt=rand(100)*.01+.2;","oxt=rand(200)*.01-1;oyt=rand(200)*.01-1;ozt=rand(200)*.01-1;"]}},{"type":"SuperScope","clone":18,"code":{"init":["n=90;","md1=rand(100)*.1;md2=rand(100)*.1;"],"perFrame":["ox=reg10;oy=reg11;oz=reg12;","ry=reg01;cy=reg02;sy=reg03;","rx=reg04;cx=reg05;sx=reg06;","off=reg41;","asp=w/h;","t=reg40;","pt=t;","cx=cos(rx);sx=-sin(rx);cy=cos(ry);sy=-sin(ry);cz=cos(rz);sz=-sin(rz);","j=0;","dt=1;"],"perPoint":["lj=j;","j=i*10;j=j-floor(j);j=(3-2*j)*sqr(j);","cv=if(below(i,.1),reg70+(reg71-reg70)*j,if(below(i,.2),reg71+(reg72-reg71)*j,if(below(i,.3),reg72+(reg73-reg72)*j,if(below(i,.4),reg73+(reg74-reg73)*j,if(below(i,.5),reg74+(reg75-reg74)*j,if(below(i,.6),reg75+(reg76-reg75)*j,if(below(i,.7),reg76+(reg77-reg76)*j,if(below(i,.8),reg77+(reg78-reg77)*j,if(below(i,.9),reg78+(reg79-reg78)*j,reg79+(reg80-reg79)*j)))))))));","rd=sqrt(i);","tth=sin(pt)*cos(pt*1.123+md1)+cos(pt*4.411+md2)+pt*4+sin(pt*.31);","tph=2*(cos(pt*1.66)+sin(pt*2.32+md2)*cos(pt*3.217-md1))-pt*.081-cos(pt*9.167)*cos(tth);","ss=sin(tth)*rd;","px=cos(tph)*ss;py=sin(tph)*ss;pz=cos(tth)*rd;","pt=pt-off;","px=px+ox;py=py+oy;pz=pz+oz;","x1=px*cy-pz*sy;z1=px*sy+pz*cy;","y2=py*cx-z1*sx;z2=py*sx+z1*cx;","x3=x1*cz-y2*sz;y3=x1*sz+y2*cz;","ldt=dt;","dt=if(above(z2,.01),1/z2,0);","x=if(dt,x3*dt,x);y=if(dt,y3*dt*asp,y);","cv=band(dt,ldt)*(.5+cv*5);","red=(1-sqr(i))*cv;","green=if(above(cid, 15), red, red*.5);","blue=if(above(cid, 15), red, red*.3);"]}},{"type":"EffectList","input":"REPLACE","output":"ADDITIVE","components":[{"type":"Convolution","scale":8,"kernel":[0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0]},{"type":"Convolution","scale":4,"kernel":[0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,1,0,1,1,0,1,0,0,0,0,0,1,0,1,1,0,1,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0]}]},{"type":"ColorMap","output":"ADDITIVE","maps":[[{"color":"rgb(82,18,55)","index":43}]]}]}
  ];

  var visList = document.querySelector('.visList');
  var visRender = document.querySelector('.visRender');

  visRender.onmousedown = function(e) {
    e.preventDefault();
    fancyAnalyser.vis.loadPreset(presets[parseInt(visList.value, 10)]);
  };

  for (var i = 0;i < presets.length;i++) {
    let option = document.createElement('option');
    option.setAttribute('value', i);
    if (presets[i].meta) {
      option.innerText = presets[i].meta.name + (presets[i].meta.author ? ' By ' + presets[i].meta.author : '');
    }
    else {
      option.innerText = presets[i].name+ (presets[i].author ? ' By ' + presets[i].author : '');
    }
    visList.appendChild(option);
  }

  fancyAnalyser.vis.loadPreset(presets[parseInt(visList.value, 10)]);


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
