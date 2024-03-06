/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Sprite2/costumes/costume2.svg", {
        x: 251.65476333333342,
        y: 13.600319999999982
      }),
      new Costume("costume3", "./Sprite2/costumes/costume3.svg", {
        x: 251.654765,
        y: 10.630979999999994
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite2/sounds/pop.wav")];

    this.triggers = [
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
        { name: "Start Boss" },
        this.whenIReceiveStartBoss3
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
        yield* this.wait(1);
        this.visible = true;
        yield* this.wait(11);
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveStartBoss2() {
    while (true) {
      if (this.touching(this.sprites["Hero"].andClones())) {
        this.stage.vars.life--;
      }
      yield;
    }
  }

  *whenIReceiveStartBoss3() {
    while (true) {
      if (this.toNumber(this.stage.vars.moveTankSet) === 3) {
        this.costumeNumber++;
        yield* this.wait(0.5);
      }
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }
}
