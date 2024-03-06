/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hero extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Hero/costumes/costume1.svg", {
        x: 55.5,
        y: 43
      }),
      new Costume("Normal", "./Hero/costumes/Normal.png", { x: 270, y: 160 }),
      new Costume("Dash01", "./Hero/costumes/Dash01.png", { x: 344, y: 171 })
    ];

    this.sounds = [new Sound("pop", "./Hero/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame4
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next stage" },
        this.whenIReceiveNextStage
      )
    ];
  }

  *whenIReceiveStartScreen() {
    this.stage.vars.life = 100;
    this.visible = false;
  }

  *whenIReceiveStartGame1() {
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      if (this.keyPressed("w") || this.keyPressed("up arrow")) {
        this.y += 10;
      }
      if (this.keyPressed("a") || this.keyPressed("left arrow")) {
        this.x -= 10;
      }
      if (this.keyPressed("d") || this.keyPressed("right arrow")) {
        this.x += 10;
      }
      if (this.keyPressed("s") || this.keyPressed("down arrow")) {
        this.y -= 10;
      }
      yield;
    }
  }

  *whenIReceiveStartGame2() {
    this.visible = true;
    this.goto(0, -200);
    /* TODO: Implement sensing_setdragmode */ null;
  }

  *whenIReceiveStartGame3() {
    while (true) {
      if (
        this.touching(this.sprites["Boss1"].andClones()) ||
        this.touching(this.sprites["Enemy"].andClones()) ||
        this.touching(this.sprites["BossFinal"].andClones())
      ) {
        this.stage.vars.life--;
      }
      if (
        this.compare(this.stage.vars.life, 1) < 0 ||
        this.toNumber(this.stage.vars.life) === 0
      ) {
        this.stage.vars.life = 0;
        this.broadcast("Start Screen");
      }
      yield;
    }
  }

  *whenIReceiveStartGame4() {
    while (true) {
      if (
        this.keyPressed("space") &&
        (this.keyPressed("w") || this.keyPressed("up arrow"))
      ) {
        this.costume = "Dash01";
        this.y += 100;
        this.broadcast("Dash");
        yield* this.wait(0.05);
        this.costume = "Normal";
        yield* this.wait(2);
      }
      if (
        this.keyPressed("space") &&
        (this.keyPressed("a") || this.keyPressed("left arrow"))
      ) {
        this.costume = "Dash01";
        this.x -= 100;
        this.broadcast("Dash");
        yield* this.wait(0.05);
        this.costume = "Normal";
        yield* this.wait(2);
      }
      if (
        this.keyPressed("space") &&
        (this.keyPressed("d") || this.keyPressed("right arrow"))
      ) {
        this.costume = "Dash01";
        this.x += 100;
        this.broadcast("Dash");
        yield* this.wait(0.05);
        this.costume = "Normal";
        yield* this.wait(2);
      }
      if (
        this.keyPressed("space") &&
        (this.keyPressed("s") || this.keyPressed("down arrow"))
      ) {
        this.costume = "Dash01";
        this.y -= 100;
        this.broadcast("Dash");
        yield* this.wait(0.05);
        this.costume = "Normal";
        yield* this.wait(2);
      }
      yield;
    }
  }

  *whenIReceiveBoss1Tod() {
    this.goto(0, -200);
  }

  *whenIReceiveNextStage() {
    this.visible = false;
    yield* this.wait(10);
    this.visible = true;
    this.goto(0, -200);
  }
}
