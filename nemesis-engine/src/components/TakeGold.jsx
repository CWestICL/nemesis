import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { getDieFaces, rollDie, rollAbility, aOrAn } from '../scripts/SharedFunctions';

function TakeGold({ mode, characterSheet, setCharacterSheet, gold }) {
  //console.log('TakeGold Component Rendered');
  const [taken, setTaken] = useState(false);

  function handleTake() {
    setCharacterSheet({
      ...characterSheet,
      stats: {
        ...characterSheet.stats,
        gold: characterSheet.stats.gold + gold,
      }
    });
    setTaken(true);
  }

  let goldButton = null;

  if (mode == 'Automated') { 
    if (!(taken)) {
      goldButton = (<button onClick={() => handleTake()}>Take Gold</button>);
    }
    else {
      goldButton = (<button disabled>Take Gold</button>);
    }
    return (
      <>
        <ReactMarkdown>You may take this gold if you wish.</ReactMarkdown>
        {goldButton}
      </>
    );
  }

  return (
    <>
      <ReactMarkdown>If you wish, add this to the ***'Gold'*** field on your character sheet.</ReactMarkdown>
    </>
  );
}

export default TakeGold
