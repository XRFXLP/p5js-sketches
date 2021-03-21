
let mic, fft;

function setup() {
  createCanvas(1000, 600);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  background(0);
  translate(500, 300);
  let spectrum = fft.analyze();
  for (i = 100; i < 500; i++) {
    let r = map(spectrum[i], 0, 255, 0, 800);
    let angle = TWO_PI * (i - 100) / 400;
    stroke(150,  r * Math.cos(angle), r * Math.sin(angle))
    line(0, 0, r * Math.cos(angle), r * Math.sin(angle));
  }
}
