/*
----- Coding Tutorial by Patt Vira -----
Name: Slime Molds (Physarum)

Audio-reactive version
*/

let mic;
let amplitude;

let molds = [];
let num = 1000;

let d;

// Audio
let volume = 0;

// Percentage of molds that react to audio
let hotChance = 0.03;


function setup() {

  createCanvas(windowWidth, windowHeight);

  background(0);

  angleMode(DEGREES);

  d = pixelDensity();
  mic = new p5.AudioIn();
  amplitude = new p5.Amplitude();

  userStartAudio();

  mic.start(() => {
    console.log("MIC STARTED");
    amplitude.setInput(mic);
  });

  for (let i = 0; i < num; i++) {
    molds[i] = new Mold();
  }
}


function draw() {

  // Keep the trail
  background(0, 8);

  // Physarum needs the pixels
  loadPixels();
  volume = amplitude.getLevel();

  for (let i = 0; i < num; i++) {
    molds[i].stop = false;
    molds[i].update();
    molds[i].display();
  }
}