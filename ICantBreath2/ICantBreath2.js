/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ICantBreath2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./ICantBreath2/costumes/costume1.svg", {
        x: 489.75,
        y: 83.75
      }),
      new Costume("costume2", "./ICantBreath2/costumes/costume2.svg", {
        x: 11.538089879656269,
        y: 9.09734009742121
      })
    ];

    this.sounds = [new Sound("pop", "./ICantBreath2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
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
        this.whenIReceiveStartScreen2
      )
    ];
  }

  *whenIReceiveStartScreen() {
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
        this.toNumber(this.stage.vars.moveBossSet) === 3 ||
        this.toNumber(this.stage.vars.moveBossSet) === 4
      ) {
        yield* this.wait(0.21);
        this.createClone();
        yield* this.wait(0.09);
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    for (let i = 0; i < 20; i++) {
      this.move(26);
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

  *whenIReceiveStartScreen2() {
    this.deleteThisClone();
  }
}
