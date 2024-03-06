/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BulletBoss extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./BulletBoss/costumes/costume1.svg", {
        x: 489.75,
        y: 83.75
      }),
      new Costume("costume2", "./BulletBoss/costumes/costume2.svg", {
        x: 18.936759511218014,
        y: 19.08748868778281
      })
    ];

    this.sounds = [new Sound("pop", "./BulletBoss/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
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
    this.visible = false;
    while (true) {
      this.goto(this.sprites["Boss1"].x, this.sprites["Boss1"].y);
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Hero"].y - this.y,
          this.sprites["Hero"].x - this.x
        )
      );
      if (
        this.toNumber(this.stage.vars.moveBossSet) === 2 ||
        this.toNumber(this.stage.vars.moveBossSet) === 7
      ) {
        yield* this.wait(0.1);
        this.createClone();
        yield* this.wait(0.25);
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    for (let i = 0; i < 25; i++) {
      this.move(20);
      yield;
    }
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Hero"].andClones())) {
        this.stage.vars.life--;
      }
      yield;
    }
  }

  *whenIReceiveBoss1Tod() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.deleteThisClone();
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
    this.deleteThisClone();
  }
}
