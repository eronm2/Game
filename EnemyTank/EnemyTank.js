/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class EnemyTank extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./EnemyTank/costumes/costume1.svg", {
        x: 19.452500000000015,
        y: 16.485170103323213
      }),
      new Costume(
        "survivor-move_flashlight_0",
        "./EnemyTank/costumes/survivor-move_flashlight_0.png",
        { x: 305, y: 231 }
      )
    ];

    this.sounds = [new Sound("pop", "./EnemyTank/sounds/pop.wav")];

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
        { name: "Next stage" },
        this.whenIReceiveNextStage
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Boss" },
        this.whenIReceiveStartBoss
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }

  *startAsClone() {
    this.visible = true;
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

  *whenIReceiveStartBoss() {
    while (true) {
      if (this.toNumber(this.stage.vars.moveTank) === 2) {
        this.createClone();
        yield* this.wait(0.5);
      }
      yield;
    }
  }

  *startAsClone3() {
    this.visible = true;
    this.stage.vars.enemySpawn = this.random(5, 6);
    if (this.toNumber(this.stage.vars.enemySpawn) === 5) {
      this.goto(200, 200);
    }
    if (this.toNumber(this.stage.vars.enemySpawn) === 6) {
      this.goto(-200, 200);
    }
  }
}
