/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class EnemyShooter extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./EnemyShooter/costumes/costume1.svg", {
        x: 27,
        y: 21.548076923076934
      }),
      new Costume(
        "Shooter_enemy-removebg-preview",
        "./EnemyShooter/costumes/Shooter_enemy-removebg-preview.png",
        { x: 245, y: 150 }
      )
    ];

    this.sounds = [new Sound("pop", "./EnemyShooter/sounds/pop.wav")];

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
      new Trigger(
        Trigger.BROADCAST,
        { name: "Shooter dead" },
        this.whenIReceiveShooterDead
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod2
      )
    ];
  }

  *whenIReceiveBoss1Tod() {
    this.goto(200, 200);
    yield* this.wait(45);
    this.visible = true;
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Hero"].y - this.y,
          this.sprites["Hero"].x - this.x
        )
      );
      this.move(2.5);
      if (
        this.compare(
          Math.hypot(
            this.sprites["Hero"].x - this.x,
            this.sprites["Hero"].y - this.y
          ),
          240
        ) < 0
      ) {
        this.stage.vars.shoot++;
        while (
          !(
            this.compare(
              250,
              Math.hypot(
                this.sprites["Hero"].x - this.x,
                this.sprites["Hero"].y - this.y
              )
            ) < 0
          )
        ) {
          yield;
        }
        this.stage.vars.shoot--;
      }
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.stage.vars.shooterLives = 0;
    this.stage.vars.shoot = 0;
    this.visible = false;
  }

  *whenIReceiveShooterDead() {
    this.stage.vars.shooterLives++;
    this.goto(this.random(200, -200), -200);
    while (true) {
      if (this.toNumber(this.stage.vars.shooterLives) === 3) {
        this.visible = false;
        this.stage.vars.shoot = -1;
        yield* this.wait(7.5);
        this.broadcast("Next stage");
        while (!null) {
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveBoss1Tod2() {
    while (true) {
      if (this.touching(this.sprites["Bullet"].andClones())) {
        this.broadcast("Shooter dead");
      }
      yield;
    }
  }
}
