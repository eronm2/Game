/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BossBar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./BossBar/costumes/costume1.svg", {
        x: 508.5,
        y: 194.5
      }),
      new Costume("costume2", "./BossBar/costumes/costume2.svg", {
        x: 508.5,
        y: 194.5
      }),
      new Costume("costume3", "./BossBar/costumes/costume3.svg", {
        x: 508.5,
        y: 194.5
      }),
      new Costume("costume4", "./BossBar/costumes/costume4.svg", {
        x: 508.5,
        y: 194.5
      }),
      new Costume("costume6", "./BossBar/costumes/costume6.svg", {
        x: 508.5,
        y: 194.5
      }),
      new Costume("costume5", "./BossBar/costumes/costume5.svg", {
        x: 508.5,
        y: 194.5
      })
    ];

    this.sounds = [new Sound("pop", "./BossBar/sounds/pop.wav")];

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
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      )
    ];
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }

  *whenIReceiveBoss1Tod() {
    this.visible = false;
  }

  *whenIReceiveStartGame1() {
    this.visible = true;
    this.moveAhead();
    while (true) {
      this.goto(this.sprites["Boss1"].x, this.sprites["Boss1"].y);
      this.y += 30;
      if (this.toNumber(this.stage.vars.hpBoss1) === 500) {
        this.costume = "costume1";
      }
      if (this.compare(425, this.stage.vars.hpBoss1) > 0) {
        this.costume = "costume2";
      }
      if (this.compare(325, this.stage.vars.hpBoss1) > 0) {
        this.costume = "costume3";
      }
      if (this.compare(250, this.stage.vars.hpBoss1) > 0) {
        this.costume = "costume4";
      }
      if (this.compare(125, this.stage.vars.hpBoss1) > 0) {
        this.costume = "costume6";
      }
      if (this.compare(1, this.stage.vars.hpBoss1) > 0) {
        this.costume = "costume5";
      }
      yield;
    }
  }
}
