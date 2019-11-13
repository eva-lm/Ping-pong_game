import Palas from "../gameObjects/palas.js";

class Scene_play extends Phaser.Scene {
  constructor() {
    super({ key: "Scene_play" });
  }
  create() {
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    //Separador
    this.add.image(center_width, center_height, "separador");
    //Palas
    // this.izquierda = this.add.image(30, center_height, "izquierda");
    this.izquierda = new Palas(this, 30, center_height, "izquierda");

    // this.derecha = this.add.image( center_width * 2 - 30, center_height, "derecha");
    this.derecha = new Palas(
      this,
      center_width * 2 - 30,
      center_height,
      "derecha"
    );
    //Ball
    this.physics.world.setBoundsCollision(false, false, true, true); //que esten habilidadas ciertas partes para chocar, arriba y abajo. (Iz, der, arriba y abajo).
    this.ball = this.physics.add.image(center_width, center_height, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

    this.ball.setVelocityX(-180);

    // Físicas
    this.physics.add.collider(
      this.ball,
      this.izquierda,
      this.chocaPala,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.derecha,
      this.chocaPala,
      null,
      this
    );

    // Controles
    //pala derecha:
    this.cursor = this.input.keyboard.createCursorKeys();
    //pala izquierda:
    this.cursor_W = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.cursor_S = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }
  update() {
    //funcion para que si se sale la bola fuera de la pantalla por los laterales vuelva al centro.

    if (this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
      this.ball.setPosition(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2
      );
    }

    //Control de las palas
    //derecha:
    if (this.cursor.down.isDown) {
      this.derecha.body.setVelocityY(300);
    } else if (this.cursor.up.isDown) {
      this.derecha.body.setVelocityY(-300);
    } else {
      this.derecha.body.setVelocityY(0);
    }

    //Control de las palas
    //Izquierda:
    if (this.cursor_S.isDown) {
      this.izquierda.body.setVelocityY(300);
    } else if (this.cursor_W.isDown) {
      this.izquierda.body.setVelocityY(-300);
    } else {
      this.izquierda.body.setVelocityY(0);
    }
  }

  chocaPala() {
    this.ball.setVelocityY(Phaser.Math.Between(-120, 120)); //cambiar la velocidad del eje y de manera random.
  }
}
export default Scene_play;
