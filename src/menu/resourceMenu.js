import pong from "./../images/pong.jpg";
import snake from "./../images/snake.png";
import memory from "./../images/memory.jpg";
import field from "./../images/field.png";
import pacmanImage from "./../images/Pac-Man.png";
import circle from "./../images/circle.jpg";
import pokemon from "./../images/pokemons.png";
export const arrayTest = {
  pong: {
    flex: "row-reverse",
    animation: "fade-left",
    animationText: "fade-right",
    title: "Pong",
    description: `Il gioco consiste nel mandare la pallina sul campo dell'avversario in modo 
    che questi non riesca più a respingerla. Per respingere la pallina si usa una racchetta (paletta), generalmente in legno ricoperto di sughero o di gomma,`,
  },
  pacman: {
    animation: "fade-right",
    animationText: "fade-left",
    flex: "row",
    title: "Pacman",
    description: `Risultati immagini per pacman descrizione Il giocatore deve guidare una creatura sferica di colore giallo, chiamata Pac-Man, facendole mangiare tutti i numerosi puntini disseminati ordinatamente all'interno del labirinto`,
  },
  snake: {
    flex: "row-reverse",
    animation: "fade-left",
    animationText: "fade-right",
    title: "snake",
    description:
      "Snake è un serpente che mangiando quello che appare sul display si allunga, e il giocatore guadagna dei punti.",
  },
  memory: {
    flex: "row",
    animation: "fade-right",
    animationText: "fade-left",
    title: "Memory",
    description:
      "L'obiettivo del Memory è formare coppie di carte uguali. Per giocare serve quindi un po' di memoria. Non esiste un criterio univoco per decidere chi comincia il gioco...",
  },
  field: {
    flex: "row-reverse",
    animation: "fade-left",
    animationText: "fade-right",
    title: "Prato fiorito",
    description:
      "Prato fiorito è oltretutto un videogioco di Windows, dove non serve alcuna connessione a internet, il cui scopo consiste nello scoprire...",
  },

  P5: {
    flex: "row",
    animation: "fade-right",
    animationText: "fade-left",
    title: "Palle",
    description:
      "Divertiti a trascinare le palline rinbalzanti e goditi lo spettacolo...",
  },

  pokemon: {
    flex: "row-reverse",
    animation: "fade-left",
    animationText: "fade-right",
    title: "Pokemon",
    description:
      "Scopri oltre 200 pokemon completo di caratteristiche e abilità...",
  },
};

export const array = [
  "pong",
  "pacman",
  "snake",
  "memory",
  "field",
  "P5",
  "pokemon",
];

export const images = {
  pong: pong,
  pacman: pacmanImage,
  snake: snake,
  memory: memory,
  field: field,
  P5: circle,
  pokemon: pokemon,
};
