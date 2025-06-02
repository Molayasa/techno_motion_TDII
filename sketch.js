let frames = [];
let totalFrames = 43;
let currentFrame = 0;
let frameRateSpeed = 35;
let strokeColor = "#ff00aa";
let technoSong;
let freeBritneyPoints;
let fft;
let wave;
let currentPerson = "pau";

const framesVictoria = [];
const framesMiguel = [];
const framesSarai = [];
const framesKevin = [];
const framesMoises = [];
const framesJulian = [];
const framesMiguelAngel = [];
const framesEverybody = [];

const framesPorPersona = {
  pau: frames,
  victoria: framesVictoria,
  miguel: framesMiguel,
  sarai: framesSarai,
  kevin: framesKevin,
  moises: framesMoises,
  julian: framesJulian,
  miguelAngel: framesMiguelAngel,
  everybody: framesEverybody,
};

function preload() {
  for (let i = 1; i <= totalFrames; i++) {
    let filename = nf(i, 4);
    frames.push(loadImage(`images/paulina/frame_${filename}.jpg`));
  }

  for (let i = 1; i <= 128; i++) {
    let filename = nf(i, 4);
    framesVictoria.push(loadImage(`images/victoria/frame_${filename}.jpg`));
  }

  for (let i = 1; i <= 442; i++) {
    let filename = nf(i, 4);
    framesMiguel.push(loadImage(`images/miguel/frame_${filename}.jpg`));
  }
  for (let i = 1; i <= 223; i++) {
    let filename = nf(i, 4);
    framesSarai.push(loadImage(`images/sarai/frame_${filename}.jpg`));
  }
  for (let i = 1; i <= 401; i++) {
    let filename = nf(i, 4);
    framesKevin.push(loadImage(`images/kevin/frame_${filename}.jpg`));
  }
  for (let i = 1; i <= 392; i++) {
    let filename = nf(i, 4);
    framesMoises.push(loadImage(`images/moises/frame_${filename}.jpg`));
  }
  for (let i = 1; i <= 102; i++) {
    let filename = nf(i, 4);
    framesJulian.push(loadImage(`images/julian/frame_${filename}.jpg`));
  }
  for (let i = 1; i <= 79; i++) {
    let filename = nf(i, 4);
    framesMiguelAngel.push(
      loadImage(`images/miguel_angel/frame_${filename}.jpg`)
    );
  }
  for (let i = 1; i <= 98; i++) {
    let filename = nf(i, 4);
    framesEverybody.push(loadImage(`images/everybody/frame_${filename}.jpg`));
  }
  
  technoSong = loadSound("assets/techno-motion.mp3");
  songLoaded = true;

  font = loadFont("assets/EximaGeometric.ttf");
}

function setup() {
  createCanvas(1800, 1000);
  frameRate(frameRateSpeed);
  freeBritneyPoints = font.textToPoints("Free Britney", 0, 100, 100, {
    sampleFactor: 1,
  });
  fft = new p5.FFT(1);
}

function draw() {
  image(framesPorPersona[currentPerson][currentFrame], 0, 0, width, height);
  currentPerson === "everybody" && filter(INVERT);

  technoSong.isLooping() && currentFrame++;

  if (currentFrame >= framesPorPersona[currentPerson].length - 1) {
    currentFrame = 0;
  }

  fft.analyze();
  wave = fft.waveform();

  freeBritneyWave(200, 200, wave);

  freeBritney(0, 0, wave, 0.3);

  freeBritney(width / 2, 0, wave, 0.2);

  freeBritney(200, height - 100, wave, 0.2);

  freeBritney(300, height - 200, wave, 0.4);

  freeBritney(300, 50, wave, 0.6);

  blendMode(BLEND);
  if (keyIsPressed) {
    switch (key) {
      case "a":
        strokeColor = " #af3dff";
        currentFrame = 0;
        currentPerson = "pau";
        break;
      case "s":
        strokeColor = " #7EFF05 ";
        currentFrame = 0;
        currentPerson = "victoria";
        break;
      case "d":
        strokeColor = " #FF991C";
        currentFrame = 0;
        currentPerson = "miguel";
        break;
      case "f":
        strokeColor = " #00ffbc";
        currentFrame = 0;
        currentPerson = "sarai";
        break;
      case "q":
        strokeColor = " #3600ff ";
        currentFrame = 0;
        currentPerson = "kevin";
        break;
      case "w":
        strokeColor = " #008000 ";
        currentFrame = 0;
        currentPerson = "moises";
        break;
      case "e":
        strokeColor = " #000000 ";
        currentFrame = 0;
        currentPerson = "julian";
        break;
      case "r":
        strokeColor = " #ff0000 ";
        currentFrame = 0;
        currentPerson = "miguelAngel";
        break;
      case "t":
        strokeColor = " #000000";
        currentFrame = 0;
        currentPerson = "everybody";
        break;

      case "i":
        blendMode(EXCLUSION);
        break;

      case "o":
        blendMode(OVERLAY);
        break;

      case "p":
        blendMode(DIFFERENCE);
        break;

      case "k":
        blendMode(SCREEN);
        break;

      case "l":
        blendMode(HARD_LIGHT);
        break;

      case "j":
        blendMode(MULTIPLY);
        break;

      default:
        strokeColor = " #ff00aa";
        break;
    }
  }
}

function mousePressed() {
  if (!technoSong.isLooping()) {
    technoSong.loop();
  } else {
    technoSong.pause();
  }
}
function keyPressed() {
  if (key === "b") {
    saveCanvas("techno-motion.png");
  }
}

function freeBritneyWave(x, y, w, s = 1) {
  push();

  translate(x, y);
  scale(s);

  for (let i = 0; i < freeBritneyPoints.length; i++) {
    const index = floor(
      map(i, 0, freeBritneyPoints.length - 1, 0, wave.length)
    );

    const r = map(w[index], -1, 1, 0, 200);

    stroke(strokeColor);
    strokeWeight(5);

    point(freeBritneyPoints[i].x + r, freeBritneyPoints[i].y + r);
  }

  pop();
}

function freeBritney(x, y, w, s = 1) {
  push();

  translate(x, y);

  scale(s);

  for (let i = 0; i < freeBritneyPoints.length; i++) {
    const index = floor(
      map(i, 0, freeBritneyPoints.length - 1, 0, wave.length)
    );

    const r = w[index] * 100;

    stroke(strokeColor);

    strokeWeight(5);

    point(freeBritneyPoints[i].x * r, freeBritneyPoints[i].y * r);
  }

  pop();
}
