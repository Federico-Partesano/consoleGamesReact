import cavallo from "./../../../images/memory/cavallo.jpg";
import re from "./../../../images/memory/re.jpg";
import jolly from "./../../../images/memory/jolly.jpg";
import asso from "./../../../images/memory/asso.jpg";
import cinque from "./../../../images/memory/cinque.jpg";
import bastoni from "./../../../images/memory/bastoni.jpeg";
import gallina from "./../../../images/memory/gallina.jpg";
import gandalf from "./../../../images/memory/gandalf.jpg";


export const statusRotation = {
    ROTATED: "rotateY(0deg)",
    SHOWED: "rotateY(180deg)",
  };


 const cardsFirstLevel = [
    { id: 1, trasform: statusRotation.ROTATED, img: cavallo },
    { id: 2, trasform: statusRotation.ROTATED, img: cavallo },
    { id: 3, trasform: statusRotation.ROTATED, img: re },
    { id: 4, trasform: statusRotation.ROTATED, img: re },
    { id: 5, trasform: statusRotation.ROTATED, img: jolly },
    { id: 6, trasform: statusRotation.ROTATED, img: jolly },
    { id: 7, trasform: statusRotation.ROTATED, img: asso },
    { id: 8, trasform: statusRotation.ROTATED, img: asso },
  ];


   const cardsSecondLevel = [...cardsFirstLevel,

    { id: 9, trasform: statusRotation.ROTATED, img: cinque },
    { id: 10, trasform: statusRotation.ROTATED, img: cinque },
    { id: 11, trasform: statusRotation.ROTATED, img: bastoni },
    { id: 12, trasform: statusRotation.ROTATED, img: bastoni },
    
  ];

  const cardsThirdLevel = [...cardsSecondLevel,
    
    { id: 13, trasform: statusRotation.ROTATED, img: gallina },
    { id: 14, trasform: statusRotation.ROTATED, img: gallina },
    { id: 15, trasform: statusRotation.ROTATED, img: gandalf },
    { id: 16, trasform: statusRotation.ROTATED, img: gandalf },
    
  ];

  export const settingLevels = { 
    easy : {attempt: 5, widthCard: 300, heightCard: 400, cards: cardsFirstLevel, layoutGrid: "auto auto auto auto"},
    medium : {attempt: 10, widthCard: 200, heightCard: 300, cards: cardsSecondLevel, layoutGrid: "auto auto auto auto auto auto"},
    hard : {attempt: 15, widthCard: 180, heightCard: 280, cards: cardsThirdLevel, layoutGrid: "auto auto auto auto auto auto auto auto"}
  }