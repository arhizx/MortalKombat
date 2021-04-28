import random from "./utils.js";
import { controlForm } from "/DOMaccess.js";

export class Player {
  constructor(name, hp, img, player) {
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.player = player;
  }

  changeHP = (num) => {
    num = Number(num);
    if (this.hp - num > 0) this.hp -= num;
    else this.hp = 0;
  };

  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  };

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
  };

  attack = () => {
    const attacks = {};

    for (let item of controlForm) {
      if (item.checked && item.name === "hit") {
        attacks.value = random(HIT[item.value]);
        attacks.hit = item.value;
      }
      if (item.checked && item.name === "defence") {
        attacks.defence = item.value;
      }
      item.checked = false;
    }
    return attacks;
  };
}

export const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
export const ATTACK = ["head", "body", "foot"];

let playerLoc1 = JSON.parse(localStorage.getItem("player1"));
const { name, img, hp } = playerLoc1;
export const player1 = new Player(name, hp, img, 1);

let playerLoc2 = JSON.parse(localStorage.getItem("enemy"));

export const player2 = new Player(
  playerLoc2.name,
  playerLoc2.hp,
  playerLoc2.img,
  2
);

player2.attack = () => {
  const attacks = {};

  const hit = ATTACK[random(3) - 1];
  const defence = ATTACK[random(3) - 1];
  attacks.value = random(HIT[hit]);
  attacks.hit = hit;
  attacks.defence = defence;
  return attacks;
};
