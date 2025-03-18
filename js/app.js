requirejs.config({});

// Start loading the main app file.
requirejs(['main']);

document.getElementById("infinite-loop").onclick = function() {
    setTimeout(function() {
        while (true) {
            var x = 1;
        }
    }, 1000);
}

/* jshint browser: true */

define(['draggableWindow', 'frozenBackground', 'sound', 'touchy'], function(draggableWindow, frozenBackground, sound, touchy){ 
    var windowsXPErrorSimulator = function(){
        var displayDelay = 1025;

        var init = function(){
            addEventListeners();
            displayDraggableWindow();
            addRefreshButtonListener(); // Add listener for the refresh button
            addInfiniteLoopListener(); // Add listener for the infinite loop div
        };

        var addEventListeners = function(){
            addMouseEventListeners();
            addViewportResizeEventListenerToTheWholePage();
            // Disable the scroll on touchscreen devices
            document.ontouchmove = function (event) {
                event.preventDefault();
            }
            // if the user begins to touch the screen, then we setup the app
            // to handle touch events
            window.addEventListener('touchstart', function () {
                addTouchEventListeners();
                addScreenRotationEventListener();
            });
        };
        
        var addPlayLoudButtonListener = function() {
            var playLoudButton = document.getElementById('play-loud');
            if (playLoudButton) {
                playLoudButton.addEventListener('click', function() {
                    sound.playLoudSound(); // Play the loud sound
                });
            }
        };
        
        var addMouseEventListeners = function(){
            addMouseDownEventListenerToTheWholePage();
            draggableWindow.addMouseDownEventListenerToTitleBar();
            addMouseUpEventListenerToTheWholePage();
            addMouseMoveEventListenerToTheWholePage();
        };

        var addMouseDownEventListenerToTheWholePage = function(){
            document.addEventListener('mousedown', function(event) {
                if(event.target.id != "draggable-window" && event.target.id != "draggable-window__title-bar-area")
                    playForcedFocusAnimation();
            }, true);
        };

        var addMouseUpEventListenerToTheWholePage = function(){
            document.addEventListener('mouseup', function() {
                draggableWindow.onMouseUpEvent();
            }, true);
        };

        var addMouseMoveEventListenerToTheWholePage = function(){
            document.addEventListener('mousemove', function(event) {
                event.preventDefault();
                var draggableWindowMoved = draggableWindow.onMouseMoveEvent(event);
                if(draggableWindowMoved){
                    var draggableWindowCoordinates = draggableWindow.getCoordinates();
                    frozenBackground.addFrozenErrorWindow(draggableWindowCoordinates.x, draggableWindowCoordinates.y);
                }
            }, true);
        };

        var addTouchEventListeners = function(){
            addTouchTapEventListenerToTheWholePage();
            draggableWindow.addTouchDragEventListenerToTitleBar();
            addTouchDragEventToTheWholePage();
        };

        var addTouchTapEventListenerToTheWholePage = function(){
            document.addEventListener('tap', function(event) {
                event.stopPropagation();
                if (event.target.id != "draggable-window" && event.target.id != "draggable-window__title-bar-area")
                    playForcedFocusAnimation();
            });
        };

        var addTouchDragEventToTheWholePage = function(){
            document.addEventListener('drag', function (event) {
                var draggableWindowCoordinates = draggableWindow.getCoordinates();
                frozenBackground.addFrozenErrorWindow(draggableWindowCoordinates.x, draggableWindowCoordinates.y);
            });
        };

        var addScreenRotationEventListener = function(){
            window.addEventListener("orientationchange", function () {
                frozenBackground.onViewportResizeEvent();
                draggableWindow.onViewportResizeEvent();
            });
        };

        var addViewportResizeEventListenerToTheWholePage = function(){
            window.onresize = function(){
                draggableWindow.onViewportResizeEvent();
            };
        };

        var displayDraggableWindow = function(){
            setTimeout(function(){
                sound.playErrorSound();
                draggableWindow.display();
            }, displayDelay);
        };

        var playForcedFocusAnimation = function(){
            sound.playDingSound();
            draggableWindow.playForcedFocusAnimation();
        };

        // New function to handle refresh button click
        var addRefreshButtonListener = function() {
            var refreshButton = document.getElementById('refresh-button');
            if (refreshButton) {
                refreshButton.addEventListener('click', function() {
                    location.reload(); // Refresh the page
                });
            }
        };
        
        var addPlayLoudButtonListener = function() {
            var playLoudButton = document.getElementById('play-loud');
            if (playLoudButton) {
                playLoudButton.addEventListener('click', function() {
                    var loudSound = document.getElementById('loud-sound');
                    loudSound.play(); // Play the loud sound
                });
            }
        };
        
        var init = function() {
            addPlayLoudButtonListener(); // Add listener for the play loud button
            addRefreshButtonListener(); // Add listener for the refresh button
        };

        init();
    }();
});
