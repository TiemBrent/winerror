define([], function(){ 
    var sound = (function(){
        var errorSound = document.getElementById("error-sound");
        var dingSound = document.getElementById("ding-sound");
        var loudSound = document.getElementById("loud-sound");
        var currentlyPlaying = null;

        var playErrorSound = function(){
            stopCurrentSound();
            currentlyPlaying = errorSound;
            currentlyPlaying.play();
        };

        var playDingSound = function(){
            stopCurrentSound();
            currentlyPlaying = dingSound;
            currentlyPlaying.play();
        };

        var playLoudSound = function(){
            stopCurrentSound();
            currentlyPlaying = loudSound;
            currentlyPlaying.play();
        };

        var stopCurrentSound = function() {
            if (currentlyPlaying) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0; // Reset to the start
            }
        };

        return {
            playErrorSound: playErrorSound,
            playDingSound: playDingSound,
            playLoudSound: playLoudSound
        };
    }());
    
    return sound;
});