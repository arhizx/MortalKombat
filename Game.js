import { generateLogs } from "./logs.js";
import { player1, player2 } from "/Player.js";
import { arena, controlForm } from "./DOMaccess.js";
import { createElement } from "./DOMelems.js";
import { checkWin } from "./checkWin.js";
import random from "./utils.js";

export default class Game {
  constructor() {}

  fetchAttack = async (hit, defence) => {
    let data = await fetch(
      "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
      {
        method: "POST",
        body: JSON.stringify({
          hit,
          defence,
        }),
      }
    );
    let res = await data.json();
    return res;
  };

  compareAttacks = (attacks) => {
    let {
      player1: { hit: pHit, defence: pDefence, value: pValue },
      player2: { hit: eHit, defence: eDefence, value: eValue },
    } = attacks;

    switch (true) {
      case pDefence !== eHit:
        player1.changeHP(eValue);
        player1.renderHP();
        generateLogs("hit", player2, player1);
        break;
      case eDefence !== pHit:
        player2.changeHP(pValue);
        player2.renderHP();
        generateLogs("hit", player1, player2);
        break;
      case pHit === eDefence:
        generateLogs("defence", player1, player2);
        break;
      case eHit === pDefence:
        generateLogs("defence", player2, player1);
        break;
    }
  };

  createArena = () => {
    const arenas = ["arena1", "arena2", "arena3", "arena4", "arena5"];
    arena.classList.add(arenas[random(arenas.length - 1)]);
  };

  createPlayer = (player) => {
    const playerDiv = createElement("div", `player${player.player}`);
    const progressBar = createElement("div", "progressbar");
    const character = createElement("div", "character");
    const life = createElement("div", "life");
    const name = createElement("div", "name");
    const img = createElement("img");

    life.style.width = `${player.hp}%`;

    progressBar.appendChild(life);
    progressBar.appendChild(name);
    character.appendChild(img);
    playerDiv.appendChild(progressBar);
    playerDiv.appendChild(character);

    name.innerText = player.name;
    img.src = player.img;

    return playerDiv;
  };

  gameWatcher = async (e) => {
    e.preventDefault();

    const enemy = player2.attack();
    const attacks = player1.attack();
    const { hit: eHit, defence: eDefence } = enemy;
    const { hit: pHit, defence: pDefence } = attacks;
    this.compareAttacks(await this.fetchAttack(eHit, pDefence));
    this.compareAttacks(await this.fetchAttack(pHit, eDefence));
    checkWin(player1, player2);
  };

  start = () => {
    this.createArena();
    arena.appendChild(this.createPlayer(player1));
    arena.appendChild(this.createPlayer(player2));
    document.onload = generateLogs("start", player1, player2);
    controlForm.addEventListener("submit", this.gameWatcher);
  };
}
