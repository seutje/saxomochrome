(function() {
  var player = new Tone.Player().toMaster();
  var button = document.querySelector('button');

  button.onclick = function(e) {
    e.preventDefault();
    player.start();
  };

  Tone.Offline(function(Transport) {

    var channels = [
      {
        label: 'kick',
        seq: [
          'G2', null, null, null,
          'G2', null, null, null,
          'G2', null, null, null,
          'G2', null, null, null
        ],
        init: function() {
          return new Tone.MembraneSynth().toMaster();
        },
        vol: 30
      }
    ];

    channels.forEach(function(chan) {
      chan.instr = chan.init();
      chan.instr.volume.value = chan.vol;
      chan.loop = new Tone.Sequence(function(note, time) {
        if (note){
          chan.instr.triggerAttackRelease(note, '8n');
        }
      }, chan.seq, '8n').start();
    });
    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();

  }, 10).then(function(buffer) {
    player.buffer = buffer;
    button.removeAttribute('disabled');
  });

})();
