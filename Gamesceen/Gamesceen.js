/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Gamesceen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Gamesceen/costumes/costume1.svg", {
        x: 0,
        y: 0
      }),
      new Costume("costume2", "./Gamesceen/costumes/costume2.svg", {
        x: 172.890615,
        y: 52.08201117187495
      })
    ];

    this.sounds = [new Sound("pop", "./Gamesceen/sounds/pop.wav")];

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
    this.broadcast("Start Screen");
  }

  *whenIReceiveStartScreen() {
    this.visible = true;
  }

  *whenIReceiveStartGame1() {
    this.visible = false;
    this.goto(0, 120);
  }
}
