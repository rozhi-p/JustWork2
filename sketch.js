// Roll control example
// Demonstrates using device rotation (rotationX) to control GIF playback speed
// Tilt phone forward/backward to speed up or slow down the animation

// Global variables


let agitatedGif;
let decisionGif;
let playbackSpeed = 1.0; // Speed multiplier for GIF playback
let backgroundColor;

// Mapping variables - easy to adjust
let speedMultiplier = 3.0; // How much speed per degree of tilt (1° = 3x speed)
let maxSpeed = 270.0; // Maximum playback speed
let minSpeedToPlay = 0.1; // Minimum speed before pausing

let showdecisionGif= false; 

function preload() 
{
    // Load the pencil making GIF
      agitatedGif = loadImage('gifs/agitated.gif');
       decisionGif = loadImage('gifs/decision.gif');
}

function setup() 
{
   createCanvas(windowWidth, windowHeight);
    backgroundColor = color(200, 255, 200);

     textAlign(CENTER, CENTER);
    
    // Request permission for motion sensors on iOS
    enableGyroTap();

    // Add a touch event listener (for more advanced control)
    document.addEventListener('touchmove', function(event) {
        let touch = event.touches[0];
        console.log('Touch X: ' + touch.clientX + ' Touch Y: ' + touch.clientY);
        event.preventDefault();
    });
}

function draw() 
{
    background(backgroundColor);
    
    // Check if motion sensors are available
    if (window.sensorsEnabled) 
    {
        // Map absolute value of rotationX to playback speed
        // When flat (rotationX = 0), speed is 0 (paused)
        let tiltAmount = abs(rotationX);
        playbackSpeed = tiltAmount * speedMultiplier;
        
        // Constrain to max speed
        playbackSpeed = constrain(playbackSpeed, 0.0, maxSpeed);
        
        // Set the GIF playback speed (pause if speed is very low)
        if (playbackSpeed < minSpeedToPlay) 
        {
            agitatedGif.pause();
        } 
        else 
        {
            agitatedGif.play();
            agitatedGif.delay(int(100 / playbackSpeed));
        }
        
        // Display GIF rotated 90 degrees for portrait mode, filling the canvas
        push();
        translate(width/2, height/2);
        rotate(HALF_PI); // Rotate 90 degrees
        imageMode(CENTER);
        // After rotation, width becomes height and height becomes width
        image(agitatedGif, 0, 0, height, width);
        pop();
        
        // Display rotation and speed information
        // fill(50);
        // textSize(24);
        // text("Device Tilt (X): " + nf(rotationX, 1, 1) + "°", width/2, height/6);
        // text("Playback Speed: " + nf(playbackSpeed, 1, 2) + "x", width/2, height/6 + 40);
        
        // Visual speed indicator bar
        // let barWidth = map(playbackSpeed, 0, 3, 0, width - 80);
        // fill(100, 200, 255);
        // noStroke();
        // rect(40, height - 100, barWidth, 30);
        
        // Bar outline
        // noFill();
        // stroke(50);
        // strokeWeight(2);
        // rect(40, height - 100, width - 80, 30);
        
        // Instructions
        // textSize(18);
        // fill(100);
        // noStroke();
        // text("Tilt phone to make pencils roll", width/2, height - 50);
        // text("Flat = paused, more tilt = faster", width/2, height - 25);
    }
    if (showdecisionGif) {

        imageMode(CENTER);
        image(decisionGif, width / 2, height / 2, decisionGif.width / 2, decisionGif.height / 2);
    }
    else 
    {
        // Motion sensors not available or permission not granted
        fill(255, 100, 100);
        text("Motion sensors not available", width/2, height/2);
        text("On iOS: Tap to request motion permission", width/2, height/2 + 30);
        text("Check device compatibility", width/2, height/2 + 60);
    }
}

// ==============================================
// TOUCH EVENT FUNCTIONS
// ==============================================

// This function runs when a new touch begins
function touchStarted() 
{
    showdecisionGif = true;  // Show the second GIF
    decisionGif.play();   // Start it looping
    // Touch positions will be updated in draw() function
    return false;
}


function touchEnded() {
    showdecisionGif = false;  // Hide the second GIF
    decisionGif.pause();   // Stop it from looping when hidden
    return false;
}