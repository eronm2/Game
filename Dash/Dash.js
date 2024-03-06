/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dash extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Dash/costumes/costume1.svg", {
        x: 520.5,
        y: 209.5
      }),
      new Costume("costume2", "./Dash/costumes/costume2.svg", {
        x: 520.5,
        y: 209.5
      }),
      new Costume("costume3", "./Dash/costumes/costume3.svg", {
        x: 520.5,
        y: 209.5
      }),
      new Costume("costume4", "./Dash/costumes/costume4.svg", {
        x: 520.5,
        y: 209.5
      })
    ];

    this.sounds = [new Sound("pop", "./Dash/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      ),
      new Trigger(Trigger.BROADCAST, { name: "Dash" }, this.whenIReceiveDash),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next stage" },
        this.whenIReceiveNextStage
      )
    ];
  }

  *whenIReceiveStartGame1() {
    this.moveAhead();
    this.costume = "costume1";
    this.visible = true;
    while (true) {
      this.goto(-183, -160);
      yield;
    }
  }

  *whenIReceiveDash() {
    this.costume = "costume4";
    yield* this.wait(0.5);
    this.costume = "costume3";
    yield* this.wait(0.5);
    this.costume = "costume2";
    yield* this.wait(0.5);
    this.costume = "costume1";
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }

  *whenIReceiveNextStage() {
    this.visible = false;
    yield* this.wait(5);
    this.visible = true;
  }
}
