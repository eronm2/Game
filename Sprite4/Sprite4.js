/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite4 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite4/costumes/costume1.svg", {
        x: 10.003985398130453,
        y: 10
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite4/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Boss" },
        this.whenIReceiveStartBoss
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      )
    ];
  }

  *whenIReceiveStartBoss() {
    while (true) {
      if (this.toNumber(this.stage.vars.moveTankSet) === 4) {
        this.goto(this.sprites["BossFinal"].x, this.sprites["BossFinal"].y);
        this.x += 60;
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(0.2);
        this.createClone();
        yield* this.wait(0.05);
      }
      if (this.toNumber(this.stage.vars.moveTankSet) === 5) {
        this.goto(this.sprites["BossFinal"].x, this.sprites["BossFinal"].y);
        this.x -= 60;
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(0.2);
        this.createClone();
        yield* this.wait(0.05);
      }
      yield;
    }
  }

  *startAsClone() {
    if (this.toNumber(this.stage.vars.moveTankSet) === 4) {
      this.visible = true;
      for (let i = 0; i < 20; i++) {
        this.move(25);
        yield;
      }
      this.deleteThisClone();
    }
    if (this.toNumber(this.stage.vars.moveTankSet) === 5) {
      this.visible = true;
      for (let i = 0; i < 20; i++) {
        this.move(25);
        yield;
      }
      this.deleteThisClone();
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Hero"].andClones())) {
        this.stage.vars.life--;
      }
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }
}
