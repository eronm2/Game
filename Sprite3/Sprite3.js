/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite3 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite3/costumes/costume1.svg", {
        x: 250.50000000000003,
        y: 13
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite3/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Boss" },
        this.whenIReceiveStartBoss
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      )
    ];
  }

  *whenIReceiveStartBoss() {
    while (true) {
      if (this.toNumber(this.stage.vars.moveTankSet) === 3) {
        this.goto(0, -70);
        this.direction = 90;
        this.effects.ghost = 50;
        this.visible = true;
        yield* this.wait(1.5);
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }
}
