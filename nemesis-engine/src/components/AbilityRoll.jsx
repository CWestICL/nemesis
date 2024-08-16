import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { getAbilityScore, rollDie, rollAbility, aOrAn } from '../scripts/SharedFunctions';

function AbilityRoll({ mode, setStoryPassage, characterSheet, ability, target, success_pass, fail_pass }) {
  //console.log('ModeMenu Component Rendered');
  const [rolled, setRolled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rolledStats, setRolledStats] = useState(null);

  function handleRoll() {
    //console.log('CS:');
    //console.log(characterSheet);
    let skillRoll = rollDie(20);
    let skillHTML = (<p className='md-mimic roll-stat'>Your <strong>Skill</strong> die rolls {aOrAn(skillRoll)} <em>{skillRoll}</em></p>);
    let abilityRoll = 0;
    let abilityHTML = null;

    if (characterSheet.abilities[ability] > 0) {
      abilityRoll = rollAbility(characterSheet.abilities[ability]);
      abilityHTML = (<p className='md-mimic roll-stat'>Your <strong>{ability.toUpperCase()}</strong> die rolls {aOrAn(abilityRoll)} <em>{abilityRoll}</em></p>);
    }

    let resultHTML = (<p className='md-mimic roll-stat-result'>Your result is <strong>{skillRoll + abilityRoll}</strong></p>);
    if (skillRoll > 19) {
      resultHTML = (<p className='md-mimic roll-stat-crit_succ'>The <strong>Skill</strong> die rolled a <strong>Critical Success</strong>!</p>);
    }
    if (skillRoll < 2) {
      resultHTML = (<p className='md-mimic roll-stat-crit_fail'>The <strong>Skill</strong> die rolled a <strong>Critical Fail</strong>!</p>);
    }

    let statsHTML = (<>
      {skillHTML}
      {abilityHTML}
      {resultHTML}
    </>);
    
    if ((skillRoll + abilityRoll >= target && skillRoll > 1) || skillRoll > 19) {
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
