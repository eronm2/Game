/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BulletBoss3 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./BulletBoss3/costumes/costume1.svg", {
        x: 489.75,
        y: 83.75
      })
    ];

    this.sounds = [new Sound("pop", "./BulletBoss3/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      )
    ];
  }

  *whenIReceiveStartGame1() {
    this.effects.ghost = 50;
    this.visible = false;
    while (true) {
      if (this.toNumber(this.stage.vars.moveBoss1) === 4) {
        this.visible = true;
        this.direction = 180;
        this.goto(-150, 0);
        this.createClone();
        while (!!(this.toNumber(this.stage.vars.moveBoss1) === 4)) {
          yield;
        }
      }
      if (!(this.toNumber(this.stage.vars.moveBoss1) === 4 || 0)) {
        yield* this.wait(3);
        this.visible = false;
        this.deleteThisClone();
      }
      yield;
    }
  }

  *startAsClone() {
    while (true) {
      if (this.toNumber(this.stage.vars.moveBoss1) === 4) {
        this.goto(150, 0);
      }
      if (!(this.toNumber(this.stage.vars.moveBoss1) === 4 || 0)) {
        yield* this.wait(3);
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

  *whenIReceiveStartScreen() {
    this.visible = false;
    this.deleteThisClone();
  }
}
