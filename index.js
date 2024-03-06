import {
  Project,
  Sprite
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Gamesceen from "./Gamesceen/Gamesceen.js";
import StartButton from "./StartButton/StartButton.js";
import Dash from "./Dash/Dash.js";
import TankHp from "./TankHp/TankHp.js";
import BossBar from "./BossBar/BossBar.js";
import Countdown from "./Countdown/Countdown.js";
import BossFinal from "./BossFinal/BossFinal.js";
import Boss1 from "./Boss1/Boss1.js";
import EnemyShooter from "./EnemyShooter/EnemyShooter.js";
import Enemy from "./Enemy/Enemy.js";
import EnemyTank from "./EnemyTank/EnemyTank.js";
import Hero from "./Hero/Hero.js";
import Bullet from "./Bullet/Bullet.js";
import ICantBreath2 from "./ICantBreath2/ICantBreath2.js";
import BulletBoss from "./BulletBoss/BulletBoss.js";
import Shooting from "./Shooting/Shooting.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Sprite4 from "./Sprite4/Sprite4.js";
import BulletBoss2 from "./BulletBoss2/BulletBoss2.js";
import BulletBoss3 from "./BulletBoss3/BulletBoss3.js";
import BulletBoss4 from "./BulletBoss4/BulletBoss4.js";
import BulletBoss5 from "./BulletBoss5/BulletBoss5.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Sprite3 from "./Sprite3/Sprite3.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Gamesceen: new Gamesceen({
    x: 0,
    y: 120,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  StartButton: new StartButton({
    x: 0,
    y: -45,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Dash: new Dash({
    x: -183,
    y: -160,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 60,
    visible: false,
    layerOrder: 24
  }),
  TankHp: new TankHp({
    x: 0,
    y: 165,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 12,
    size: 30,
    visible: false,
    layerOrder: 21
  }),
  BossBar: new BossBar({
    x: 0,
    y: 171,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 23
  }),
  Countdown: new Countdown({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 11,
    size: 100,
    visible: false,
    layerOrder: 14
  }),
  BossFinal: new BossFinal({
    x: 200,
    y: 130,
    direction: -90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 20
  }),
  Boss1: new Boss1({
    x: 0,
    y: 150,
    direction: 180,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 50,
    visible: false,
    layerOrder: 22
  }),
  EnemyShooter: new EnemyShooter({
    x: 15.374883963407793,
    y: -82.92020990332044,
    direction: 45.12293002282312,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 50,
    visible: false,
    layerOrder: 13
  }),
  Enemy: new Enemy({
    x: -23,
    y: -21,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 25,
    visible: false,
    layerOrder: 11
  }),
  EnemyTank: new EnemyTank({
    x: 0.17773664694122493,
    y: -146.3074843992083,
    direction: 149.97059823848434,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 25,
    visible: false,
    layerOrder: 10
  }),
  Hero: new Hero({
    x: 0,
    y: -200,
    direction: -25.222903591022472,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 30,
    visible: false,
    layerOrder: 18
  }),
  Bullet: new Bullet({
    x: 0,
    y: -180,
    direction: -26.437585804465343,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 20,
    visible: false,
    layerOrder: 3
  }),
  ICantBreath2: new ICantBreath2({
    x: 0,
    y: 150,
    direction: 180,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 60,
    visible: false,
    layerOrder: 5
  }),
  BulletBoss: new BulletBoss({
    x: 0,
    y: 150,
    direction: 180,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 30,
    visible: false,
    layerOrder: 4
  }),
  Shooting: new Shooting({
    x: 32,
    y: -180,
    direction: 102.76556578105863,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 12
  }),
  Sprite1: new Sprite1({
    x: 200,
    y: 130,
    direction: 165.96375653207355,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 16
  }),
  Sprite4: new Sprite4({
    x: -60,
    y: 130,
    direction: 164.47588900324575,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 15
  }),
  BulletBoss2: new BulletBoss2({
    x: -150,
    y: 0,
    direction: 180,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 97.26600154798034,
    visible: false,
    layerOrder: 9
  }),
  BulletBoss3: new BulletBoss3({
    x: -150,
    y: 0,
    direction: 180,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 84.74900415350929,
    visible: false,
    layerOrder: 7
  }),
  BulletBoss4: new BulletBoss4({
    x: 0,
    y: -100,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 97.26600154798034,
    visible: false,
    layerOrder: 8
  }),
  BulletBoss5: new BulletBoss5({
    x: 0,
    y: -100,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 84.74900415350929,
    visible: false,
    layerOrder: 6
  }),
  Sprite2: new Sprite2({
    x: 0,
    y: -70,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 19
  }),
  Sprite3: new Sprite3({
    x: 0,
    y: -70,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 17
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
