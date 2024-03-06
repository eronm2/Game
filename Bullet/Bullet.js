/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bullet extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Bullet/costumes/costume1.svg", {
        x: 46.5,
        y: 12.5
      }),
      new Costume("costume2", "./Bullet/costumes/costume2.svg", {
        x: 20.252262443438923,
        y: 19.747285067873264
      })
    ];

    this.sounds = [new Sound("pop", "./Bullet/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];
  }

  *whenIReceiveStartScreen() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.move(20);
      /* TODO: Implement motion_ifonedgebounce */ null;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveStartGame1() {
    while (true) {
      this.visible = false;
      this.goto(this.sprites["Hero"].x, this.sprites["Hero"].y);
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      if (this.mouse.down) {
        this.createClone();
        yield* this.wait(0.01);
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      this.stage.vars.bulletPositionX = this.x;
      this.stage.vars.bulletPositionY = this.y;
      yield;
    }
  }
}
