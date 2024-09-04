import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { getDieFaces, rollDie, rollAbility, aOrAn } from '../scripts/SharedFunctions';

function TakeTreasure({ mode, characterSheet, setCharacterSheet, name, gold }) {
  //console.log('TakeTreasure Component Rendered');
  const [taken, setTaken] = useState(false);

  function handleTake() {
    setCharacterSheet({
      ...characterSheet,
      treasure: [
        ...characterSheet.treasure,
        {
          name: name,
          value: gold,
        },
      ]
    });
    setTaken(true);
  }

  let treasureStr = "You have found a **" + name + " worth " + gold + "g**. ";
  let goldButton = null;

  if (mode == 'Automated') {
    treasureStr = treasureStr + "You may take this treasure if you wish.";
    if (!(taken)) {
      goldButton = (<button onClick={() => handleTake()}>Take Treasure</button>);
    }
    else {
      goldButton = (<button disabled>Take Treasure</button>);
    }
    return (
      <>
        <ReactMarkdown>{treasureStr}</ReactMarkdown>
        {goldButton}
      </>
    );
  }

  treasureStr = treasureStr + "If you wish, add this to the ***'Treasure'*** field on your character sheet.";

  return (
    <>
      <ReactMarkdown>{treasureStr}</ReactMarkdown>
    </>
  );
}

export default TakeTreasure
