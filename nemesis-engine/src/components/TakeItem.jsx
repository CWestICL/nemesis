import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { getDieFaces, rollDie, rollAbility, aOrAn } from '../scripts/SharedFunctions';

function TakeItem({ mode, characterSheet, setCharacterSheet, name, auto, bonus }) {
  //console.log('TakeItem Component Rendered');
  const [taken, setTaken] = useState(false);

  function handleTake() {
    let itemBonus;
    if (bonus) {
      itemBonus = bonus;
    }
    else {
      itemBonus = null;
    }
    setCharacterSheet({
      ...characterSheet,
      items: [
        ...characterSheet.items,
        {
          name: name,
          bonus: itemBonus,
        },
      ]
    });
    setTaken(true);
  }

  let itemStr;
  let goldButton = null;

  if (mode == 'Automated') {
    if (auto) {
      if (!(taken)) {
        handleTake()
        return (null);
      }
      return (null);
    }
    else {
      itemStr = "You may take the **" + name + "** if you wish.";
      let buttonStr = "Take " + name;
      if (!(taken)) {
        goldButton = (<button onClick={() => handleTake()}>{buttonStr}</button>);
      }
      else {
        goldButton = (<button disabled>{buttonStr}</button>);
      }
      return (
        <>
          <ReactMarkdown>{itemStr}</ReactMarkdown>
          {goldButton}
        </>
      );
    }
  }

  itemStr = "If you'd like to take the **" + name + "**, add it to the ***'Items'*** field on your character sheet.";

  return (
    <>
      <ReactMarkdown>{itemStr}</ReactMarkdown>
    </>
  );
}

export default TakeItem
