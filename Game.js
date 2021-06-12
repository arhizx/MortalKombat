import { generateLogs } from "./logs.js";
import { player1, player2 } from "/Player.js";
import { arena, controlForm } from "./DOMaccess.js";
import { createElement } from "./DOMelems.js";
import { checkWin } from "./checkWin.js";
import random from "./utils.js";

export default class Game {
  constructor() {}

  fetchAttack = (hit, defence) => {
    fetch("http://reactmarathon-api.herokuapp.com/api/mk/player/fight", {
      method: "POST",
      body: JSON.stringify({
        hit,
        defence,
      }),
    })
      .then((res) => res.json())
      .then((attacks) => {
        let {
          player1: { hit: pHit, defence: pDefence, value: pValue },
          player2: { hit: eHit, defence: eDefence, value: eValue },
        } = attacks;

        if (pDefence !== eHit) {
          player1.changeHP(eValue);
          generateLogs("hit", player2, player1);
        }
        if (eDefence !== pHit) {
          player2.changeHP(pValue);
          generateLogs("hit", player1, player2);
        }
        if (pHit === eDefence) {
          generateLogs("defence", player1, player2);
        }
        if (eHit === pDefence) {
          generateLogs("defence", player2, player1);
        }
        player1.renderHP();
        player2.renderHP();
        checkWin(player1, player2);
      });
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

  gameWatcher = (e) => {
    e.preventDefault();

    const enemy = player2.attack();
    const attacks = player1.attack();
    const { hit: eHit, defence: eDefence } = enemy;
    const { hit: pHit, defence: pDefence } = attacks;
    this.fetchAttack(eHit, pDefence);
    this.fetchAttack(pHit, eDefence);
  };

  start = () => {
    this.createArena();
    arena.appendChild(this.createPlayer(player1));
    arena.appendChild(this.createPlayer(player2));
    document.onload = generateLogs("start", player1, player2);
    controlForm.addEventListener("submit", this.gameWatcher);
  };
}
