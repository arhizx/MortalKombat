import random from "./utils.js";
import { HIT, ATTACK } from "./player.js";
import { controlForm } from "./DOMaccess.js";

export const enemyAttack = () => {
  const hit = ATTACK[random(3) - 1];
  const defence = ATTACK[random(3) - 1];

  return {
    value: random(HIT[hit]),
    hit,
    defence,
  };
};

export const playerAttacks = () => {
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
