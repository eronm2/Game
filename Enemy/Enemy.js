/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Enemy/costumes/costume1.svg", {
        x: 19.452500000000015,
        y: 16.485170103323213
      }),
      new Costume(
        "survivor-move_flashlight_0",
        "./Enemy/costumes/survivor-move_flashlight_0.png",
        { x: 305, y: 231 }
      )
    ];

    this.sounds = [new Sound("pop", "./Enemy/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next stage" },
        this.whenIReceiveNextStage
      )
    ];
  }

  *whenIReceiveBoss1Tod() {
    yield* this.wait(2);
    this.broadcast("Start wave");
    for (let i = 0; i < this.random(50, 70); i++) {
      this.createClone();
      yield* this.wait(this.random(10, 1) / 5);
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }

  *startAsClone() {
    this.visible = true;
    this.stage.vars.enemySpawn = this.random(1, 4);
    if (this.toNumber(this.stage.vars.enemySpawn) === 1) {
      this.goto(216, 172);
    }
    if (this.toNumber(this.stage.vars.enemySpawn) === 2) {
      this.goto(-229, 181);
    }
    if (this.toNumber(this.stage.vars.enemySpawn) === 3) {
      this.goto(-234, -184);
    }
    if (this.toNumber(this.stage.vars.enemySpawn) === 4) {
      this.goto(230, -185);
    }
  }

  *startAsClone2() {
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Hero"].y - this.y,
          this.sprites["Hero"].x - this.x
        )
      );
      this.move(2);
      if (this.touching(this.sprites["Hero"].andClones())) {
        this.stage.vars.life--;
      }
      if (this.touching(this.sprites["Bullet"].andClones())) {
        this.stage.vars.life += 0.5;
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveNextStage() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.deleteThisClone();
  }
}
