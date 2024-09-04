import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { getDieFaces, rollDie, rollAbility, aOrAn } from '../scripts/SharedFunctions';

function TakeWeapon({ mode, characterSheet, setCharacterSheet, name, bonus }) {
  //console.log('TakeGold Component Rendered');
  const [taken, setTaken] = useState(false);

  function handleTake() {
    setCharacterSheet({
      ...characterSheet,
      weapon: {
        name: name,
        bonus: bonus,
      }
    });
    setTaken(true);
  }

  let weaponButton = null;

  if (mode == 'Automated') { 
    if (!(taken)) {
      weaponButton = (<button onClick={() => handleTake()}>Take Weapon</button>);
    }
    else {
      weaponButton = (<button disabled>Take Weapon</button>);
    }
    return (
      <>
        <ReactMarkdown>You may take this weapon if you wish.</ReactMarkdown>
        {weaponButton}
      </>
    );
  }

  return (
    <>
      <ReactMarkdown>If you wish to take this weapon, replace the current weapon in the ***'Weapon'*** field on your character sheet.</ReactMarkdown>
    </>
  );
}

export default TakeWeapon
