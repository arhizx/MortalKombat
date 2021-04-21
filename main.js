import { Player } from "./player.js";
import { generateLogs } from "./logs.js";
import { enemyAttack, playerAttacks } from "./attacks.js";
import { arena, controlForm } from "./DOMaccess.js";
import { createElement } from "./DOMelems.js";
import { checkWin } from "./checkWin.js";

const createPlayer = (player) => {
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

const player1 = new Player(
  "Scorpion",
  100,
  "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  ["kunai", "fist"],
  1
);

const player2 = new Player(
  "Kitana",
  100,
  "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  ["blade"],
  2
);

arena.appendChild(createPlayer(player1));
arena.appendChild(createPlayer(player2));

document.onload = generateLogs("start", player1, player2);

controlForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const enemy = enemyAttack();
  const attacks = playerAttacks();
  const { hit: eHit, defence: eDefence, value: eValue } = enemy;
  const { hit: pHit, defence: pDefence, value: pValue } = attacks;
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
