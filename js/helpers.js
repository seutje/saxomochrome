(function(){
  var buttons = ['audio-source-osc'],
      context = new AudioContext(),
      osc;
  var handler = function(e) {
    var active = this.classList.contains('active'),
        state = context.state;

    if (state === 'suspended') {
      context.resume();
    }

    if (!active) {
      osc = context.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 440;
      osc.connect(context.destination);
      osc.start();
      this.innerText = 'Stop';
      this.classList.add('active');
    }
    else {
      osc.stop();
      osc.disconnect(0);
      context.suspend();
      this.innerText = 'Start';
      this.classList.remove('active');
    }
  };
  buttons.forEach(function(el) {
    document.getElementById(el).addEventListener('mousedown', handler);
  });
})();