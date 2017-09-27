(function(){

  "use strict";

  var FancyAnalyser = function(canvas, source, context) {
    var analyser = new Webvs.WebAudioAnalyser({
      context: context
    });
    var webvs = new Webvs.Main({
        canvas: canvas,
        analyser: analyser,
        showStat: false
    });

    //webvs.loadPreset(preset);
    //webvs.start();
    analyser.connectToNode(source);
    this.analyser = analyser;
    this.vis = webvs;
  };

  window.FancyAnalyser = FancyAnalyser;

})();