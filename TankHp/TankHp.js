/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TankHp extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./TankHp/costumes/costume1.svg", {
        x: 242.7499999999999,
        y: 33.75
      }),
      new Costume("costume2", "./TankHp/costumes/costume2.svg", {
        x: 242.7499999999999,
        y: 33.75
      }),
      new Costume("costume3", "./TankHp/costumes/costume3.svg", {
        x: 242.7499999999999,
        y: 33.75
      }),
      new Costume("costume4", "./TankHp/costumes/costume4.svg", {
        x: 242.7499999999999,
        y: 33.75
      }),
      new Costume("costume5", "./TankHp/costumes/costume5.svg", {
        x: 242.75,
        y: 33.75
      }),
      new Costume("costume6", "./TankHp/costumes/costume6.svg", {
        x: 242.75,
        y: 33.75
      }),
      new Costume("costume7", "./TankHp/costumes/costume7.svg", {
        x: 242.75,
        y: 33.75
      }),
      new Costume("costume8", "./TankHp/costumes/costume8.svg", {
        x: 242.75,
        y: 33.75
      }),
      new Costume("costume9", "./TankHp/costumes/costume9.svg", {
        x: 242.75,
        y: 33.75
      }),
      new Costume("costume10", "./TankHp/costumes/costume10.svg", {
        x: 242.75,
        y: 33.75
      }),
      new Costume("costume11", "./TankHp/costumes/costume11.svg", {
        x: 242.75,
        y: 33.75
      }),
      new Costume("costume12", "./TankHp/costumes/costume12.svg", {
        x: 242.75,
        y: 33.75
      })
    ];

    this.sounds = [new Sound("pop", "./TankHp/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Boss" },
        this.whenIReceiveStartBoss
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      )
    ];
  }

  *whenIReceiveStartBoss() {
    this.visible = true;
    this.moveAhead();
    this.size = 30;
    this.goto(0, 165);
    while (true) {
      if (this.toNumber(this.stage.vars.finalBossHp) === 1000) {
        this.costume = "costume1";
      }
      if (this.compare(this.stage.vars.finalBossHp, 1000) < 0) {
        this.costume = "costume2";
      }
      if (this.compare(this.stage.vars.finalBossHp, 900) < 0) {
        this.costume = "costume3";
      }
      if (this.compare(this.stage.vars.finalBossHp, 800) < 0) {
        this.costume = "costume4";
      }
      if (this.compare(this.stage.vars.finalBossHp, 700) < 0) {
        this.costume = "costume5";
      }
      if (this.compare(this.stage.vars.finalBossHp, 600) < 0) {
        this.costume = "costume6";
      }
      if (this.compare(this.stage.vars.finalBossHp, 500) < 0) {
        this.costume = "costume7";
      }
      if (this.compare(this.stage.vars.finalBossHp, 400) < 0) {
        this.costume = "costume8";
      }
      if (this.compare(this.stage.vars.finalBossHp, 300) < 0) {
        this.costume = "costume9";
      }
      if (this.compare(this.stage.vars.finalBossHp, 200) < 0) {
        this.costume = "costume10";
      }
      if (this.compare(this.stage.vars.finalBossHp, 100) < 0) {
        this.costume = "costume11";
      }
      if (this.compare(this.stage.vars.finalBossHp, 10) < 0) {
        this.costume = "costume12";
      }
      yield;
    }
  }

  *whenIReceiveStartScreen() {
    this.visible = false;
  }
}
