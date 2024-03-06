/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 35.25797679754692,
        y: 12.25
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Fire" }, this.whenIReceiveFire),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      )
    ];
  }

  *whenIReceiveFire() {
    this.stage.vars.fireTest++;
    this.visible = true;
    this.direction = 180;
    for (let i = 0; i < 10; i++) {
      this.move(30);
      yield;
    }
    this.visible = false;
    this.stage.vars.fireTest--;
    this.broadcast("Start Boss");
    while (true) {
      if (this.toNumber(this.stage.vars.moveTankSet) === 1) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(0.2);
        this.createClone();
        yield* this.wait(0.5);
      }
      if (this.toNumber(this.stage.vars.moveTankSet) === 2) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(0.2);
        this.createClone();
        yield* this.wait(1);
      }
      if (this.toNumber(this.stage.vars.moveTankSet) === 4) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(0.2);
        this.createClone();
        yield* this.wait(2);
      }
      if (this.toNumber(this.stage.vars.moveTankSet) === 5) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Hero"].y - this.y,
            this.sprites["Hero"].x - this.x
          )
        );
        yield* this.wait(0.2);
        this.createClone();
        yield* this.wait(2);
      }
      yield;
    }
  }

  *startAsClone() {
    if (this.toNumber(this.stage.vars.moveTankSet) === 1) {
      this.visible = true;
      this.costume = "costume1";
      for (let i = 0; i < 10; i++) {
        this.move(40);
        yield;
      }
      this.deleteThisClone();
    }
    if (this.toNumber(this.stage.vars.moveTankSet) === 2) {
      this.visible = true;
      this.costume = "costume1";
      for (let i = 0; i < 10; i++) {
        this.move(40);
        yield;
      }
      this.deleteThisClone();
    }
    if (this.toNumber(this.stage.vars.moveTankSet) === 4) {
      this.visible = true;
      this.costume = "costume1";
      for (let i = 0; i < 10; i++) {
        this.move(60);
        yield;
      }
      this.deleteThisClone();
    }
    if (this.toNumber(this.stage.vars.moveTankSet) === 5) {
      this.visible = true;
      this.costume = "costume1";
      for (let i = 0; i < 10; i++) {
        this.move(60);
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
    while (true) {
      if (this.toNumber(this.stage.vars.fireTest) === 0) {
        this.goto(this.sprites["BossFinal"].x, this.sprites["BossFinal"].y);
      }
      yield;
    }
  }
}
