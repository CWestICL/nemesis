import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import $ from 'jquery';
import '../Game.css'
import TextField from '@mui/material/TextField';

const initialAbilities = {
  might: 0,
  magic: 0,
  sneak: 0,
  charm: 0,
  fluke: 0,
}

const initialStats = {
  health: 0,
  crit: 0,
  gold: 0,
  potions: 0,
}

function CreateCharacter({ characterSheet, setCharacterSheet, setStoryPassage, exit_pass }) {
  //console.log('CreateCharacter Component Rendered');
  const [stage, setStage] = useState(1);
  const [nameInput, setNameInput] = useState('');
  const [abilityInput, setAbilityInput] = useState(initialAbilities);
  const [statsInput, setStatsInput] = useState(initialStats);
  const [rolled, setRolled] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (nameInput.length > 0) {
      const currentCharacter = structuredClone(characterSheet);
      currentCharacter.name = nameInput;
      setCharacterSheet({
        ...characterSheet,
        name: nameInput,
      });
      setStage(stage + 1);
    }
  }

  function handleAbility(event) {
    event.preventDefault();
    //console.log("Ability: " + event.target.innerHTML);
    setAbilityInput({
      ...abilityInput,
      [event.target.innerHTML.toLowerCase()]: 6 - stage,
    });
    setStage(stage + 1);
  }

  useEffect(() => {
    console.log('Update CS Use Effect triggered');
		setCharacterSheet({
      ...characterSheet,
      abilities: {
        ...characterSheet.abilities,
        ...abilityInput,
        init_might: abilityInput.might,
        init_magic: abilityInput.magic,
        init_sneak: abilityInput.sneak,
        init_charm: abilityInput.charm,
        init_fluke: abilityInput.fluke,
      },
      stats: {
        ...characterSheet.stats,
        ...statsInput,
        init_health: statsInput.health,
        init_crit: statsInput.crit,
      },
    });
	}, [abilityInput, statsInput]);

  const abilityOptions = []
  for (let ability in abilityInput) {
    if (abilityInput[ability] === 0) {
      abilityOptions.push(ability)
    }
  }
  const abilityRender = abilityOptions.map((ability) =>
    <div className='md-mimic'>
      <a onClick={handleAbility}>{ability.toUpperCase()}</a>
    </div>
  );

  if (stage == 1) {
    return (
      <>
        <div>
          <ReactMarkdown>Enter a name for your adventurer</ReactMarkdown>
          <form onSubmit={handleSubmit}>
            <div className='md-mimic form-field'>
              <label>Name:</label>
              <TextField hiddenLabel id="name-input" value={nameInput} variant="outlined" size="small" InputProps={{ className: 'input-mui' }} onInput={ e => setNameInput(e.target.value)} />
            </div>
            <div className='md-mimic'>
              <button type="submit">Next</button>
            </div>
          </form>
        </div>
      </>
    )
  }

  else if (stage == 2) {
    return (
      <>
        <div>
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D10**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Mastered** ability.</ReactMarkdown>
          {abilityRender}
        </div>
      </>
    )
  }

  else if (stage == 3) {
    return (
      <>
        <div>
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D8**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Skilled** ability.</ReactMarkdown>
          {abilityRender}
        </div>
      </>
    )
  }

  else if (stage == 4) {
    return (
      <>
        <div>
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D6**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Adequate** ability.</ReactMarkdown>
          {abilityRender}
        </div>
      </>
    )
  }

  else if (stage == 5) {
    return (
      <>
        <div>
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D4**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Lacklustre** ability.</ReactMarkdown>
          {abilityRender}
          <ReactMarkdown>*The remaining ability will get an **Ability Score** of **0**!*</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Calamitous** ability.</ReactMarkdown>
        </div>
      </>
    )
  }

  else if (stage == 6) {
    function rollDice(value){
      console.log('Roll value: ' + value);
      let faces = (4 + (2 * (value - 1)));
      return Math.floor((Math.random() * faces) + 1)
    }

    const check = {};
    for (let key in characterSheet.abilities) {
      if (!(key.startsWith('init_'))) {
        check[key] = characterSheet.abilities[key];
      }
    }

    let count = 0;
    for (let key in check) {
      if (check[key] == 0) {
        count ++;
      } 
    }

    let health = 'Your **Health** is **12**';
    let crit = 'Your **Crit** is **2**';
    let potions = 'You have **3 Potions**';

    if (!(rolled) && count < 2) {
      const stats = {
        health: 12,
        crit: 2,
        potions: 3,
      }

      if (characterSheet.abilities.might > 0) {
        let roll = rollDice(characterSheet.abilities.might);
        console.log('Health roll: ' + roll);
        stats.health = roll + 12;
      }
      if (characterSheet.abilities.charm > 0) {
        let roll = rollDice(characterSheet.abilities.charm);
        console.log('Crit roll: ' + roll);
        stats.crit = roll + 2;
      }
      if (characterSheet.abilities.magic > 0) {
        let roll = rollDice(characterSheet.abilities.magic);
        console.log('Potion roll: ' + roll);
        stats.potions = roll +3;
      }

      console.log('Stats:');
      console.log(stats);
      
      setStatsInput(stats);

      setRolled(true);
    }

    if (characterSheet.abilities.might > 0) {
      health = 'Your **MIGHT** rolls a ***' + (characterSheet.stats.health - 12) + '***! Your **Health** is **' + characterSheet.stats.health + '**';
    }
    if (characterSheet.abilities.charm > 0) {
      crit = 'Your **CHARM** rolls a ***' + (characterSheet.stats.crit - 2) + '***! Your **Crit** is **' + characterSheet.stats.crit + '**';
    }
    if (characterSheet.abilities.magic > 0) {
      potions = 'Your **MAGIC** rolls a ***' + (characterSheet.stats.potions - 3) + '***! You have **' + characterSheet.stats.potions + ' Potions**';
    }

    console.log('sheet');
    console.log(characterSheet);

    if (rolled) {
      return (
        <>
          <div>
            <ReactMarkdown>{health}</ReactMarkdown>
            <ReactMarkdown>{crit}</ReactMarkdown>
            <ReactMarkdown>{potions}</ReactMarkdown>
            <div className='md-mimic'>
              <p>You're ready to go! <a onClick={() => setStoryPassage(exit_pass)}>Start your adventure here</a>!</p>
            </div>
          </div>
        </>
      );
    }
    return (null);
  }

  return (null);
}

export default CreateCharacter
