class Mold {

  constructor() {
    // POSITION
    this.x = random(width);
    this.y = random(height);

    this.r = 0.5;
    // MOVEMENT
    this.heading = random(360);

    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    this.rotAngle = 45;

    this.stop = false;

    // AUDIO-REACTIVE POINT
    // Only a small percentage
    // of molds react to sound

    this.hot = random() < hotChance;
    // SENSORS
    this.rSensorPos = createVector(0, 0);
    this.lSensorPos = createVector(0, 0);
    this.fSensorPos = createVector(0, 0);
    this.sensorAngle = 45;
    // higher speed higher sensor Dist, era 10
    this.sensorDist = 15;
  }


  update() {
    let speed;

    if (smoothVolume < 0.01) {
      speed = 0.05;
    } else {
      speed = map(smoothVolume, 0.01, 0.04, 0.1, 7);
      speed = constrain(speed, 0.1, 7)
    }
    // MOVEMENT
    if (this.stop) {
      this.vx = 0;
      this.vy = 0;
    } else {
      this.vx = cos(this.heading) * speed;
      this.vy = sin(this.heading) * speed;
    }

    // MOVE
    this.x =
      (this.x + this.vx + width) % width;

    this.y =
      (this.y + this.vy + height) % height;

    // SENSOR POSITIONS
    this.getSensorPos(
      this.rSensorPos,
      this.heading + this.sensorAngle
    );

    this.getSensorPos(
      this.lSensorPos,
      this.heading - this.sensorAngle
    );

    this.getSensorPos(
      this.fSensorPos,
      this.heading
    );

    // READ PIXELS
    let index;

    let l;
    let r;
    let f;


    // RIGHT SENSOR
    index =
      4 *
      (d * floor(this.rSensorPos.y)) *
      (d * width) +
      4 *
      (d * floor(this.rSensorPos.x));

    r = pixels[index];


    // LEFT SENSOR
    index =
      4 *
      (d * floor(this.lSensorPos.y)) *
      (d * width) +
      4 *
      (d * floor(this.lSensorPos.x));

    l = pixels[index];


    // FRONT SENSOR
    index =
      4 *
      (d * floor(this.fSensorPos.y)) *
      (d * width) +
      4 *
      (d * floor(this.fSensorPos.x));

    f = pixels[index];

    // TURNING
    if (f > l && f > r) {
      this.heading += 0;
    }

    else if (f < l && f < r) {
      if (random(1) < 0.5) {
        this.heading += this.rotAngle;
      } else {
        this.heading -= this.rotAngle;
      }
    }

    else if (l > r) {
      this.heading -= this.rotAngle;
    }
    else if (r > l) {
      this.heading += this.rotAngle;
    }
  }


  display() {

    noStroke();
    // NORMAL PHYSARUM
    fill(
      210,
      10,
      100,
      25 // alpha, menor valor es mas transparente
    );

    ellipse(
      this.x,
      this.y,
      6,
      6
    );

    // AUDIO REACTIVE POINT
    if (this.hot) {

      let brightness = map(
        volume,
        0,
        0.03,
        20,
        255
      );

      brightness =
        constrain(
          brightness,
          20,
          255
        );

      // SOFT GLOW
      fill(
        180,
        220,
        255,
        brightness * 0.15
      );

      ellipse(
        this.x,
        this.y,
        7,
        7
      );

      // BRIGHT CORE
      fill(
        200,
        230,
        255,
        brightness
      );

      ellipse(
        this.x,
        this.y,
        2.5,
        2.5
      );
    }
  }


  getSensorPos(sensor, angle) {

    sensor.x =
      (
        this.x +
        this.sensorDist *
        cos(angle) +
        width
      ) % width;

    sensor.y =
      (
        this.y +
        this.sensorDist *
        sin(angle) +
        height
      ) % height;
  }
}