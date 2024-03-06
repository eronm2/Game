/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 492,
        y: 209
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 251.04052999999988,
        y: 187.56883
      }),
      new Costume("backdrop4", "./Stage/costumes/backdrop4.svg", {
        x: 246.93131302806498,
        y: 180.23876346381087
      }),
      new Costume("backdrop3", "./Stage/costumes/backdrop3.svg", {
        x: 254.32249220452016,
        y: 189.94950582642844
      }),
      new Costume("backdrop5", "./Stage/costumes/backdrop5.svg", {
        x: 260.8962859511952,
        y: 187.7556515438247
      }),
      new Costume("backdrop6", "./Stage/costumes/backdrop6.svg", {
        x: 438.81362,
        y: 276.103315
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Screen" },
        this.whenIReceiveStartScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game 1" },
        this.whenIReceiveStartGame1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boss 1 tod" },
        this.whenIReceiveBoss1Tod
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next stage" },
        this.whenIReceiveNextStage
      )
    ];

    this.vars.hpBoss1 = 500;
    this.vars.moveBoss1 = 0;
    this.vars.life = 100;
    this.vars.enemySpawn = 1;
    this.vars.bulletPositionX = 41.20209620996837;
    this.vars.bulletPositionY = 15.709956997349764;
    this.vars.shoot = 0;
    this.vars.shooterLives = 0;
    this.vars.fireTest = 0;
    this.vars.moveTank = 0;
    this.vars.moveTankSet = 0;
    this.vars.finalBossHp = 1000;
    this.vars.moveBossSet = 0;

    this.watchers.life = new Watcher({
      label: "Life",
      style: "large",
      visible: true,
      value: () => this.vars.life,
      x: 242,
      y: 180
    });
  }

  *whenIReceiveStartScreen() {
    this.costume = "backdrop1";
  }

  *whenIReceiveStartGame1() {
    this.costume = "backdrop2";
  }

  *whenIReceiveBoss1Tod() {
    this.costume = "backdrop4";
    yield* this.wait(1.5);
    this.costume = "backdrop3";
  }

  *whenIReceiveNextStage() {
    this.costume = "backdrop5";
    yield* this.wait(5);
    this.costume = "backdrop6";
    this.broadcast("Final Boss");
  }
}
