import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { rollDie, rollAbility, aOrAn } from '../scripts/SharedFunctions';

function AbilityRoll({ mode, setStoryPassage, characterSheet, ability, target, success_pass, fail_pass }) {
  //console.log('AbilityRoll Component Rendered');
  const [rolled, setRolled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rolledStats, setRolledStats] = useState(null);

  function handleRoll() {
    //console.log('CS:');
    //console.log(characterSheet);
    let fateRoll = rollDie(12);
    let fateStr = 'The **Fate** die rolls ' + aOrAn(fateRoll) + ' *' + fateRoll + '*';
    let fateHTML = (<div className='roll-stat'><ReactMarkdown>{fateStr}</ReactMarkdown></div>);

    let abilityRoll = rollAbility(characterSheet.abilities[ability]);
    let abilityStr = 'Your **' + ability.toUpperCase() + '** die rolls ' + aOrAn(abilityRoll) + ' *' + abilityRoll + '*';
    let abilityHTML = (<div className='roll-stat'><ReactMarkdown>{abilityStr}</ReactMarkdown></div>);

    let resultStr = 'Your result is **' + (fateRoll + abilityRoll) + '**';
    let resultHTML = (<div className='roll-stat-result'><ReactMarkdown>{resultStr}</ReactMarkdown></div>);

    if (fateRoll > 11) {
      resultStr = 'You rolled a **Critical Success**!';
      resultHTML = (<div className='roll-stat-crit_succ'><ReactMarkdown>{resultStr}</ReactMarkdown></div>);
    }
    if (fateRoll < 2) {
      resultStr = 'You rolled a **Critical Fail**!';
      resultHTML = (<div className='roll-stat-crit_fail'><ReactMarkdown>{resultStr}</ReactMarkdown></div>);
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
