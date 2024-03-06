/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BossFinal extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./BossFinal/costumes/costume1.svg", {
        x: 66.66957,
        y: 62.09162999999997
      }),
      new Costume("costume2", "./BossFinal/costumes/costume2.svg", {
        x: 66.66957,
        y: 72.07518999999992
      })
    ];

    this.sounds = [new Sound("pop", "./BossFinal/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Final Boss" },
        this.whenIReceiveFinalBoss
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Boss" },
        this.whenIReceiveStartBoss
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Boss" },
        this.whenIReceiveStartBoss2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Final Boss" },
        this.whenIReceiveFinalBoss2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      )
    ];
  }

  *whenIReceiveFinalBoss() {
    this.visible = true;
    this.direction = -90;
    yield* this.glide(3, 0, 130);
    for (let i = 0; i < 72; i++) {
      this.direction -= 1.25;
      yield;
    }
    this.broadcast("Fire");
  }

  *whenIReceiveStartBoss() {
    while (true) {
      this.costume = "costume1";
      yield* this.wait(1);
      this.stage.vars.moveTank = this.random(1, 5);
      if (this.toNumber(this.stage.vars.moveTank) === 1) {
        this.stage.vars.moveTankSet = 1;
        yield* this.wait(10);
        this.stage.vars.moveTankSet = 0;
      }
      if (this.toNumber(this.stage.vars.moveTank) === 2) {
        this.stage.vars.moveTankSet = 2;
        yield* this.wait(7);
        this.stage.vars.moveTankSet = 1;
      }
      if (this.toNumber(this.stage.vars.moveTank) === 3) {
        this.stage.vars.moveTankSet = 3;
        yield* this.wait(2.5);
        this.stage.vars.moveTankSet = 1;
      }
      if (this.toNumber(this.stage.vars.moveTank) === 4) {
        this.costume = "costume2";
        this.stage.vars.moveTankSet = 4;
        yield* this.wait(10);
        this.costume = "costume1";
        this.stage.vars.moveTank = this.random(2, 3);
      }
      if (this.toNumber(this.stage.vars.moveTank) === 5) {
        this.costume = "costume2";
        this.stage.vars.moveTankSet = 5;
        yield* this.wait(10);
        this.costume = "costume1";
        this.stage.vars.moveTank = this.random(2, 3);
      }
      yield;
    }
  }

  *whenIReceiveStartBoss2() {
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Hero"].y - this.y,
          this.sprites["Hero"].x - this.x
        )
      );
      yield;
    }
  }

  *whenIReceiveFinalBoss2() {
    this.stage.vars.finalBossHp = 1000;
    while (true) {
      if (this.touching(this.sprites["Bullet"].andClones())) {
        this.stage.vars.finalBossHp -= 1.333;
      }
      if (this.compare(1, this.stage.vars.finalBossHp) > 0) {
        this.stage.vars.moveTank = 0;
        this.stage.vars.moveTankSet = 0;
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
    this.goto(200, 130);
  }
}
