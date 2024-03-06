/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shooting extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Shooting/costumes/costume1.svg", {
        x: 9.227188081936674,
        y: 8.557858376511149
      })
    ];

    this.sounds = [new Sound("pop", "./Shooting/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start wave" },
        this.whenIReceiveStartWave
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

  *whenIReceiveStartWave() {
    this.visible = false;
    while (true) {
      if (this.toNumber(this.stage.vars.shoot) === 1) {
        this.goto(
          this.sprites["EnemyShooter"].x,
          this.sprites["EnemyShooter"].y
        );
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(0.1);
        this.createClone();
        yield* this.wait(0.2);
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    for (let i = 0; i < 20; i++) {
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

  *whenIReceiveStartScreen() {
    this.visible = false;
  }
}
