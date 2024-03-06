/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class StartButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./StartButton/costumes/costume1.svg", {
        x: 134,
        y: 37.159789634792276
      }),
      new Costume("costume2", "./StartButton/costumes/costume2.svg", {
        x: 134,
        y: 40.15978463479229
      }),
      new Costume("costume3", "./StartButton/costumes/costume3.svg", {
        x: 134,
        y: 40.15985963479227
      })
    ];

    this.sounds = [new Sound("pop", "./StartButton/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      )
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.y += 10;
      yield* this.wait(0.5);
      this.y -= 10;
      yield* this.wait(0.5);
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = true;
    this.goto(0, -35);
    while (true) {
      if (
        this.keyPressed("space") ||
        (this.touching("mouse") && this.mouse.down)
      ) {
        this.broadcast("Start Game 1");
        return;
      }
      yield;
    }
  }

  *whenIReceiveStartGame1() {
    this.visible = false;
  }
}
