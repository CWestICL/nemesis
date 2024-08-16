import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { getDieFaces, rollDie, rollAbility, aOrAn } from '../scripts/SharedFunctions';

function AbilityRoll({ mode, setStoryPassage, characterSheet, ability, target, success_pass, fail_pass }) {
  //console.log('ModeMenu Component Rendered');
  const [rolled, setRolled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rolledStats, setRolledStats] = useState(null);

  function handleRoll() {
    //console.log('CS:');
    //console.log(characterSheet);
    let fateRoll = rollDie(12);
    let fateHTML = (<p className='md-mimic roll-stat'>The <strong>Fate</strong> die rolls {aOrAn(fateRoll)} <em>{fateRoll}</em></p>);

    let abilityRoll = rollAbility(characterSheet.abilities[ability]);
    let abilityHTML = (<p className='md-mimic roll-stat'>Your <strong>{ability.toUpperCase()}</strong> die rolls {aOrAn(abilityRoll)} <em>{abilityRoll}</em></p>);

    let resultHTML = (<p className='md-mimic roll-stat-result'>Your result is <strong>{fateRoll + abilityRoll}</strong></p>);

    if (fateRoll > 11) {
      resultHTML = (<p className='md-mimic roll-stat-crit_succ'>You rolled a <strong>Critical Success</strong>!</p>);
    }
    if (fateRoll < 2) {
      resultHTML = (<p className='md-mimic roll-stat-crit_fail'>You rolled a <strong>Critical Fail</strong>!</p>);
    }

    let statsHTML = (<>
      {fateHTML}
      {abilityHTML}
      {resultHTML}
    </>);
    
    if ((fateRoll + abilityRoll >= target && fateRoll > 1) || fateRoll > 11) {
      setSuccess(true);
    }
    setRolledStats(statsHTML);
    setRolled(true);
  }

  const rollStr = 'Make a **' + ability.toUpperCase() + ' (' + target + ')** roll!';

  if (mode == 'Automated') { 
    if (!(rolled)) {
      return (<>
        <ReactMarkdown>{rollStr}</ReactMarkdown>
        <button onClick={() => handleRoll()}>Roll</button>
      </>);
    }
    if (success) {
      return (<>
        <ReactMarkdown>{rollStr}</ReactMarkdown>
        <button disabled>Roll</button>
        {rolledStats}
        <p className='md-mimic'>You succeeded! <a onClick={() => setStoryPassage(success_pass)}>Go here</a>.</p>
      </>);
    }
    return (<>
      <ReactMarkdown>{rollStr}</ReactMarkdown>
      <button disabled>Roll</button>
      {rolledStats}
      <p className='md-mimic'>You failed! <a onClick={() => setStoryPassage(fail_pass)}>Go here</a>.</p>
    </>);
  }

  return (
    <>
      <ReactMarkdown>{rollStr}</ReactMarkdown>
      <p className='md-mimic'>If you succeed, <a onClick={() => {setStoryPassage(success_pass)}}>go here</a>.</p>
      <p className='md-mimic'>If you fail, <a onClick={() => {setStoryPassage(fail_pass)}}>go here</a>.</p>
    </>
  );
}

export default AbilityRoll
