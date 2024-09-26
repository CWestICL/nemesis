import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css';
import { rollDie, rollAbility, aOrAn, promoteDie, demoteDie } from '../scripts/SharedFunctions';

function TemptFate({ mode, setStoryPassage, characterSheet, setCharacterSheet, lucky_pass, unlucky_pass }) {
  //console.log('AbilityRoll Component Rendered');
  const [rolled, setRolled] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pushedSuccess, setPushedSuccess] = useState(false);
  const [rolledStats, setRolledStats] = useState(null);
  const [pushedStats, setPushedStats] = useState(null);
  const [rollSum, setRollSum] = useState(0);

  function handleLuckRoll() {
    //console.log('CS:');
    //console.log(characterSheet);
    let luckRoll = rollDie(8);
    let luckStr = 'The **Luck** die rolls ' + aOrAn(luckRoll) + ' *' + luckRoll + '*';
    let luckHTML = (<div className='roll-stat'><ReactMarkdown>{luckStr}</ReactMarkdown></div>);

    let flukeRoll = rollAbility(characterSheet.abilities.fluke);
    let flukeStr = 'Your **FLUKE** die rolls ' + aOrAn(flukeRoll) + ' *' + flukeRoll + '*';
    let flukeHTML = (<div className='roll-stat'><ReactMarkdown>{flukeStr}</ReactMarkdown></div>);
;
    let msg = 'equal to';
    if (flukeRoll > luckRoll) {
      msg = 'higher than';
    }

    if (flukeRoll < luckRoll) {
      msg = 'lower than';
      demoteDie('fluke', characterSheet, setCharacterSheet);
    }
    else {
      setSuccess(true);
    }
    let resultStr = 'Your **FLUKE** roll was ' + msg + ' the **Luck** die result.';
    let resultHTML = (<div className='roll-stat-result'><ReactMarkdown>{resultStr}</ReactMarkdown></div>);

    let statsHTML = (<>
      {luckHTML}
      {flukeHTML}
      {resultHTML}
    </>);
    
    setRolledStats(statsHTML);
    setRollSum(flukeRoll + luckRoll);
    setRolled(true);
  }

  function handlePushRoll() {
    //console.log('CS:');
    //console.log(characterSheet);
    let targetStr = 'The result to beat is *' + rollSum + '*';
    let targetHTML = (<div className='roll-stat'><ReactMarkdown>{targetStr}</ReactMarkdown></div>);

    let riskRoll = rollDie(20);
    let riskStr = 'The **Risk** die rolls ' + aOrAn(riskRoll) + ' *' + riskRoll + '*';
    let riskHTML = (<div className='roll-stat'><ReactMarkdown>{riskStr}</ReactMarkdown></div>);

    let msg = 'equal to';
    let endMsg = 'too far!';
    if (riskRoll < rollSum) {
      msg = 'lower than';
    }
    if (riskRoll > rollSum) {
      msg = 'higher than';
    }
    else {
      endMsg = 'well! Your **FLUKE** die has been promoted by one die type.'
      setPushedSuccess(true);
      promoteDie('fluke', characterSheet, setCharacterSheet);
    }
    let resultStr = 'The **Risk** roll was ' + msg + 'the combined **Tempt Fate** result. You have **Pushed Your Luck** ' + endMsg;
    let resultHTML = (<div className='roll-stat-result'><ReactMarkdown>{resultStr}</ReactMarkdown></div>);

    let statsHTML = (<>
      {targetHTML}
      {riskHTML}
      {resultHTML}
    </>);
    
    setPushedStats(statsHTML);
    setPushed(true);
  }

  const fateStr = '**Tempt Fate!**';

  if (mode == 'Automated') {
    if (!(rolled)) {
      return (<>
        <ReactMarkdown>{fateStr}</ReactMarkdown>
        <button onClick={() => handleLuckRoll()}>Roll</button>
      </>);
    }
    if (success) {
      let pushLuckHTML = null;
      if (!(pushed)) {
        let linkStr = 'Continue on ';
        if (characterSheet.abilities.fluke < characterSheet.abilities.init_fluke) {
          pushLuckHTML = (<>
            <ReactMarkdown>You may **Push Your Luck** if you dare...</ReactMarkdown>
            <button onClick={() => handlePushRoll()}>Roll</button>
          </>)
          linkStr = 'Or, continue on ';
        }
        return (<>
          <ReactMarkdown>{fateStr}</ReactMarkdown>
          <button disabled>Roll</button>
          {rolledStats}
          <ReactMarkdown>You are **Lucky**!</ReactMarkdown>
          {pushLuckHTML}
          <p className='md-mimic'>{linkStr}<a onClick={() => setStoryPassage(lucky_pass)}>here</a>.</p>
        </>);
      }
      pushLuckHTML = (<>
        <ReactMarkdown>You may **Push Your Luck** if you dare...</ReactMarkdown>
        <button disabled>Roll</button>
      </>)
      if (pushedSuccess) {
        return (<>
          <ReactMarkdown>{fateStr}</ReactMarkdown>
          <button disabled>Roll</button>
          {rolledStats}
          <ReactMarkdown>You are **Lucky**!</ReactMarkdown>
          {pushLuckHTML}
          {pushedStats}
          <p className='md-mimic'>Continue on <a onClick={() => setStoryPassage(lucky_pass)}>here</a>.</p>
        </>);
      }
      else {
        return (<>
          <ReactMarkdown>{fateStr}</ReactMarkdown>
          <button disabled>Roll</button>
          {rolledStats}
          {pushLuckHTML}
          {pushedStats}
          <ReactMarkdown>Your luck has changed and you are now **Unlucky**!</ReactMarkdown>
          <p className='md-mimic'>Continue on <a onClick={() => setStoryPassage(unlucky_pass)}>here</a>.</p>
        </>);
      }
      
    }
    let luckStr = 'You are **Unlucky**!'; 
    if (characterSheet.abilities.fluke > 1) {
      luckStr += 'Your **FLUKE** die has been demoted by one die type.';
    }
    return (<>
      <ReactMarkdown>{fateStr}</ReactMarkdown>
      <button disabled>Roll</button>
      {rolledStats}
      <ReactMarkdown>{luckStr}</ReactMarkdown>
      <p className='md-mimic'>Continue on <a onClick={() => setStoryPassage(unlucky_pass)}>here</a>.</p>
    </>);
  }

  return (
    <>
      <ReactMarkdown>{fateStr}</ReactMarkdown>
      <p className='md-mimic'>If you are <strong>Lucky</strong>, <a onClick={() => {setStoryPassage(lucky_pass)}}>go here</a>.</p>
      <p className='md-mimic'>If you are <strong>Unlucky</strong>, demote your <strong>FLUKE</strong> die by one die type and <a onClick={() => {setStoryPassage(unlucky_pass)}}>go here</a>.</p>
    </>
  );
}

export default TemptFate
