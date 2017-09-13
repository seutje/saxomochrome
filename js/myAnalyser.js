(function(w) {

  "use strict";

  var MyAnalyser = function(canvas, source, context) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.HEIGHT = canvas.height;
    this.WIDTH = canvas.width;
    this.source = source;
    this.context = context;
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.analyser);
    this.bufferLength = this.analyser.fftSize = 2048 * 2;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.minDecibels = -100;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.55;
    this.draw();
  };

  MyAnalyser.prototype.draw = function() {
    var sliceWidth, x, v, y;
    this.HEIGHT = this.canvas.height;
    this.WIDTH = this.canvas.width;
    x = 0;
    sliceWidth = this.WIDTH / this.bufferLength;
    this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.drawVisual = w.requestAnimationFrame(this.draw.bind(this));
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    this.canvasCtx.beginPath();

    for (var i = 0; i < this.bufferLength; i++) {
      v = this.dataArray[i] / 128;
      y = v * this.HEIGHT / 2;

      if (i === 0) {
        this.canvasCtx.moveTo(x, y);
      }
      else {
        this.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasCtx.lineTo(this.WIDTH, this.HEIGHT / 2);
    this.canvasCtx.stroke();
  };

  w.MyAnalyser = MyAnalyser;
})(this);