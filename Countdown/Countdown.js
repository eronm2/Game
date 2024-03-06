/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Countdown extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Countdown/costumes/costume1.svg", {
        x: 86.28525450683597,
        y: 47.1472445
      }),
      new Costume("costume2", "./Countdown/costumes/costume2.svg", {
        x: 44.06526725341794,
        y: 41.260326840195006
      }),
      new Costume("costume3", "./Countdown/costumes/costume3.svg", {
        x: 44.06526725341794,
        y: 47.1472445
      }),
      new Costume("costume4", "./Countdown/costumes/costume4.svg", {
        x: 44.06526725341794,
        y: 47.1472445
      }),
      new Costume("costume5", "./Countdown/costumes/costume5.svg", {
        x: 44.065267253418,
        y: 47.1472445
      }),
      new Costume("costume6", "./Countdown/costumes/costume6.svg", {
        x: 44.065267253418,
        y: 46.46501999999998
      }),
      new Costume("costume7", "./Countdown/costumes/costume7.svg", {
        x: 44.065267253418,
        y: 46.46501999999998
      }),
      new Costume("costume8", "./Countdown/costumes/costume8.svg", {
        x: 44.065267253418,
        y: 46.46501999999998
      }),
      new Costume("costume9", "./Countdown/costumes/costume9.svg", {
        x: 44.065267253418,
        y: 46.46501999999998
      }),
      new Costume("costume10", "./Countdown/costumes/costume10.svg", {
        x: 44.065267253418,
        y: 46.46501999999998
      }),
      new Costume("costume11", "./Countdown/costumes/costume11.svg", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("pop", "./Countdown/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod
      )
    ];

    this.audioEffects.volume = 90;
  }

  *whenIReceiveStartScreen() {
    this.goto(0, 0);
    this.effects.ghost += 50;
    this.visible = false;
  }

  *whenIReceiveBoss1Tod() {
    yield* this.wait(35);
    this.costume = "costume1";
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      yield* this.wait(1);
      this.costumeNumber++;
      yield;
    }
  }
}
