/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Boss1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Boss1/costumes/costume1.svg", {
        x: 43.5,
        y: 38
      }),
      new Costume("doaOMh9", "./Boss1/costumes/doaOMh9.png", {
        x: 250,
        y: 213
      }),
      new Costume(
        "95caf2485c9e224a94a059377604c63f--sprites-removebg-preview",
        "./Boss1/costumes/95caf2485c9e224a94a059377604c63f--sprites-removebg-preview.png",
        { x: 313, y: 207 }
      ),
      new Costume(
        "Download-removebg-preview",
        "./Boss1/costumes/Download-removebg-preview.png",
        { x: 255, y: 198 }
      )
    ];

    this.sounds = [new Sound("pop", "./Boss1/sounds/pop.wav")];

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
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod
      )
    ];
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
    this.stage.vars.moveBoss1 = 0;
    this.stage.vars.moveBossSet = 0;
    while (true) {
      yield* this.wait(1);
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Hero"].y - this.y,
          this.sprites["Hero"].x - this.x
        )
      );
      yield;
    }
  }

  *whenIReceiveStartGame1() {
    this.visible = true;
    this.goto(0, 150);
  }

  *whenIReceiveStartGame2() {
    this.stage.vars.hpBoss1 = 500;
    while (true) {
      if (this.touching(this.sprites["Bullet"].andClones())) {
        this.stage.vars.hpBoss1 -= 1.333;
      }
      if (this.compare(this.stage.vars.hpBoss1, 1) < 0) {
        this.visible = false;
        this.stage.vars.moveBossSet = 0;
        this.stage.vars.life += 5;
        this.broadcast("Boss 1 tod");
        this.broadcast("Upgrade");
      }
      yield;
    }
  }

  *whenIReceiveStartGame3() {
    yield* this.wait(4);
    while (true) {
      this.effects.brightness += 10;
      yield* this.wait(0.02);
      this.effects.brightness -= 10;
      this.stage.vars.moveBoss1 = this.random(1, 7);
      if (this.toNumber(this.stage.vars.moveBoss1) === 1) {
        this.costume = "Download-removebg-preview";
        yield* this.wait(0.5);
        this.stage.vars.moveBossSet = 1;
        for (let i = 0; i < 80; i++) {
          this.direction = this.radToScratch(
            Math.atan2(
              this.sprites["Hero"].y - this.y,
              this.sprites["Hero"].x - this.x
            )
          );
          this.move(5);
          yield;
        }
        yield* this.wait(5);
        this.stage.vars.moveBossSet = 0;
      }
      if (this.toNumber(this.stage.vars.moveBoss1) === 2) {
        this.costume = "doaOMh9";
        yield* this.wait(0.5);
        this.stage.vars.moveBossSet = 2;
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(6.5);
        this.stage.vars.moveBossSet = 0;
      }
      if (this.toNumber(this.stage.vars.moveBoss1) === 3) {
        this.costume =
          "95caf2485c9e224a94a059377604c63f--sprites-removebg-preview";
        yield* this.wait(0.5);
        this.stage.vars.moveBossSet = 3;
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(7);
        this.stage.vars.moveBossSet = 0;
      }
      if (this.toNumber(this.stage.vars.moveBoss1) === 4) {
        this.costume =
          "95caf2485c9e224a94a059377604c63f--sprites-removebg-preview";
        yield* this.wait(0.5);
        this.stage.vars.moveBossSet = 4;
        yield* this.glide(0.7, 0, -150);
        yield* this.wait(10);
        this.stage.vars.moveBossSet = 0;
      }
      if (this.toNumber(this.stage.vars.moveBoss1) === 5) {
        this.costume = "Download-removebg-preview";
        yield* this.wait(0.5);
        this.stage.vars.moveBossSet = 5;
        yield* this.glide(0.5, 0, 150);
        yield* this.wait(0.5);
        for (let i = 0; i < 30; i++) {
          this.direction = this.radToScratch(
            Math.atan2(
              this.sprites["Hero"].y - this.y,
              this.sprites["Hero"].x - this.x
            )
          );
          this.move(10);
          yield;
        }
        yield* this.wait(4);
        this.stage.vars.moveBossSet = 0;
      }
      if (this.toNumber(this.stage.vars.moveBoss1) === 6) {
        this.costume = "Download-removebg-preview";
        yield* this.wait(0.5);
        this.stage.vars.moveBossSet = 6;
        yield* this.glide(1, 0, 150);
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(6);
        this.stage.vars.moveBossSet = 0;
      }
      if (this.toNumber(this.stage.vars.moveBoss1) === 7) {
        this.costume = "doaOMh9";
        yield* this.wait(0.5);
        this.stage.vars.moveBossSet = 7;
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(2);
        this.stage.vars.moveBossSet = 0;
      }
      yield;
    }
  }

  *whenIReceiveBoss1Tod() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
