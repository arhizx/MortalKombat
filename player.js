export class Player {
  constructor(name, hp, img, weapon, player) {
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.weapon = weapon;
    this.player = player;
  }

  changeHP(num) {
    if (this.hp - num > 0) this.hp -= num;
    else this.hp = 0;
  }

  elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }

  renderHP() {
    this.elHP().style.width = `${this.hp}%`;
  }
}

export const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
export const ATTACK = ["head", "body", "foot"];
