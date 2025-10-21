// Roll control example
// Demonstrates using device rotation (rotationX) to control GIF playback speed
// Tilt phone forward/backward to speed up or slow down the animation

// Global variables


let agitatedGif;
let popupGif;
let isPressed = false;
let playbackSpeed = 1.0; // Speed multiplier for GIF playback
let backgroundColor;

// Mapping variables - easy to adjust
let speedMultiplier = 3.0; // How much speed per degree of tilt (1° = 3x speed)
let maxSpeed = 270.0; // Maximum playback speed
let minSpeedToPlay = 0.1; // Minimum speed before pausing

function preload() 
{
    // Load the pencil making GIF
      agitatedGif = loadImage('gifs/agitated.gif');
      popupGif = loadImage('gifs/popup.gif');

}

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    backgroundColor = color(200, 255, 200);
    
    // Lock mobile gestures to prevent browser interference
    lockGestures();
    
    textAlign(CENTER, CENTER);
    
    // Request permission for motion sensors on iOS
    enableGyroTap();
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
        if (isPressed){
            image(popupGif, 0, 0, height, width);
            return;
        }
        else{
            image(agitatedGif, 0, 0, height, width);
        }
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
    // Touch positions will be updated in draw() function
    console.log("mf works");
    isPressed = true;
    return false;
}

// This function runs when a touch ends
function touchEnded() 
{
    // Touch positions will be updated in draw() function
    console.log("mf ended working");
    isPressed = false;
    return false;
}



// // MINIMAL VERSION - Touch Basic
// // No visual feedback - data displayed in debug panel only
// // Demonstrates: Basic touch detection, duration tracking, and touch counting

// // Global variables for touch state
// let isCurrentlyTouching = false;  // Track if screen is being touched
// let touchCounter = 0;             // Count total number of touches
// let touchStartTime = 0;           // When current touch started (milliseconds)
// let touchDuration = 0;            // How long current touch has been active (seconds)

// function setup() 
// {
//     createCanvas(windowWidth, windowHeight);
    
//     // Show debug panel FIRST to display all touch data
//     showDebug();
    
//     // Lock mobile gestures to prevent browser interference
//     lockGestures();
    
//     debug("Touch Basic - Minimal Version");
//     debug("Touch the screen to see data in this panel");
// }

// function draw() 
// { 
//     // Update touch duration while touching
//     if (isCurrentlyTouching) 
//     {
//         touchDuration = (millis() - touchStartTime) / 1000;  // Convert to seconds
//     }
// }

// // Prevent default touch behavior and unwanted gestures
// function touchStarted() 
// {
//     isCurrentlyTouching = true;
//     touchCounter = touchCounter + 1;
//     touchStartTime = millis();
    
//     // Output touch data to debug panel
//     debug("--- Touch Started ---");
//     debug("Touch Count: " + touchCounter);
    
//     return false;  // Prevents default behavior
// }

// // Prevent default touch behavior and unwanted gestures
// function touchEnded() 
// {
//     isCurrentlyTouching = false;
    
//     // Output final touch duration to debug panel
//     debug("Touch Duration: " + touchDuration.toFixed(2) + " seconds");
//     debug("--- Touch Ended ---");
    
//     return false;  // Prevents default behavior
// }