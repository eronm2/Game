/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BulletBoss4 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./BulletBoss4/costumes/costume2.svg", {
        x: 489.75,
        y: 83.75
      }),
      new Costume("costume3", "./BulletBoss4/costumes/costume3.svg", {
        x: 489.75,
        y: 83.75
      })
    ];

    this.sounds = [new Sound("pop", "./BulletBoss4/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen2
      )
    ];
  }

  *startAsClone() {
    while (true) {
      if (this.touching(this.sprites["Hero"].andClones())) {
        this.stage.vars.life--;
      }
      if (this.toNumber(this.stage.vars.moveBoss1) === 6) {
        this.goto(0, 100);
      }
      if (!(0 || this.toNumber(this.stage.vars.moveBoss1) === 6)) {
        yield* this.wait(5);
        this.visible = false;
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveStartGame1() {
    while (true) {
      if (this.touching(this.sprites["Hero"].andClones())) {
        this.stage.vars.life--;
      }
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
    while (true) {
      if (this.toNumber(this.stage.vars.moveBoss1) === 6) {
        yield* this.wait(1.5);
        this.visible = true;
        this.direction = 90;
        this.goto(0, -100);
        this.createClone();
        while (!!(this.toNumber(this.stage.vars.moveBoss1) === 6)) {
          yield;
        }
      }
      if (!(0 || this.toNumber(this.stage.vars.moveBoss1) === 6)) {
        yield* this.wait(5);
        this.visible = false;
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveBoss1Tod() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.deleteThisClone();
  }

  *whenIReceiveBoss1Tod2() {
    this.visible = false;
  }

  *whenIReceiveStartGame2() {
    while (true) {
      this.costumeNumber++;
      yield* this.wait(0.5);
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      this.costumeNumber++;
      yield* this.wait(0.5);
      yield;
    }
  }

  *whenIReceiveStartScreen2() {
    this.visible = false;
    this.deleteThisClone();
  }
}
