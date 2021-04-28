import random from "./utils.js";
import { controlForm } from "/DOMaccess.js";

export class Player {
  constructor(name, hp, img, weapon, player) {
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.weapon = weapon;
    this.player = player;
  }

  static fighterIcon = () => {
    const chars = [
      {
        name: "scorpion",
        img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
      },
      {
        name: "kitana",
        img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
      },
      {
        name: "liukang",
        img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
      },
      {
        name: "sonya",
        img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
      },
      {
        name: "subzero",
        img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
      },
    ];
    return chars[random(chars.length - 1)];
  };

  changeHP = (num) => {
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

let fighterIcon1 = Player.fighterIcon();
let fighterIcon2 = Player.fighterIcon();
export const player1 = new Player(
  fighterIcon1.name,
  100,
  fighterIcon1.img,
  [],
  1
);

export const player2 = new Player(
  fighterIcon2.name,
  100,
  fighterIcon2.img,
  [],
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
