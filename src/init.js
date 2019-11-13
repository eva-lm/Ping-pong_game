import Bootloader from "./bootloader.js";
import Scene_play from "./scenes/Scene_play.js";

const config = {
  width: 640,
  height: 400,
  parent: "container",
  type: Phaser.CANVAS,
  backgroundColor: "#392542",
  scene: [Bootloader, Scene_play],
  // preload: preload,
  // create: create,
  // update: update
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        //y: 500
      }
    }
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("bird", "./assets/bird.png");
}

function create() {
  //console.log(Phaser.Input.Keyboard.KeyCodes) //Para ver las posibilidades a la hora de asignar teclas.
  this.bird = this.physics.add.image(100, 50, "bird");
  //   this.input.keyboard.on("keydown_RIGHT", () => {
  //     this.bird.setAcceleration(100, 0);
  //   }); //para añadir velocidad al pulsar

  //   this.input.keyboard.on("keyup_RIGHT", () => {
  //     this.bird.setAcceleration(0, 0);
  //     this.bird.setVelocity(0);  //para pararlo al soltar la tecla
  //   });

  this.cursor = this.input.keyboard.createCursorKeys();
  console.log(this.cursor);
}

function update(time, delta) {
  if (this.cursor.right.isDown) {
    this.bird.x++; //esto devuelve un true y el pájaro se moverá
  } else if (this.cursor.left.isDown) {
    this.bird.x--;
  }
}
