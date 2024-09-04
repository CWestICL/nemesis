import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import $ from 'jquery';
import '../Game.css'
import TextField from '@mui/material/TextField';
import { rollAbility, aOrAn } from '../scripts/SharedFunctions';

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
    //console.log("Ability: " + event.target.innerHTML);
    if (stage == 5) {
      for (let ability in abilityInput) {
        if (abilityInput[ability] == 0) {
          abilityInput[ability] = 1;
        }
      }
      
    }
    setAbilityInput({
      ...abilityInput,
      [event.target.innerHTML.toLowerCase()]: 7 - stage,
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
        max_health: statsInput.health,
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
      <li><a onClick={handleAbility}>{ability.toUpperCase()}</a></li>
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
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D12**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Mastered** ability.</ReactMarkdown>
          <ul>
            {abilityRender}
          </ul>
        </div>
      </>
    )
  }

  else if (stage == 3) {
    return (
      <>
        <div>
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D10**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Skilled** ability.</ReactMarkdown>
          <ul>
            {abilityRender}
          </ul>
        </div>
      </>
    )
  }

  else if (stage == 4) {
    return (
      <>
        <div>
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D8**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Adequate** ability.</ReactMarkdown>
          <ul>
            {abilityRender}
          </ul>
        </div>
      </>
    )
  }

  else if (stage == 5) {
    return (
      <>
        <div>
          <ReactMarkdown>Which ability would you like to assign an **Ability Score** of **D6**?</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Lacklustre** ability.</ReactMarkdown>
          <ul>
            {abilityRender}
          </ul>
          <ReactMarkdown>*The remaining ability will get an **Ability Score** of **D4**!*</ReactMarkdown>
          <ReactMarkdown>This will be your adventurer's **Calamitous** ability.</ReactMarkdown>
        </div>
      </>
    )
  }

  else if (stage == 6) {
    let check = false;
    for (let key in characterSheet.abilities) {
      if (characterSheet.abilities[key] < 1) {
        check = true;
      }
    }

    if (!(rolled) && !(check)) {
      const stats = {
        health: 12,
        crit: 2,
        potions: 3,
      }

      let mightRoll = rollAbility(characterSheet.abilities.might);
      console.log('Health roll: ' + mightRoll);
      stats.health = mightRoll + 12;
      

      let charmRoll = rollAbility(characterSheet.abilities.charm);
      console.log('Crit roll: ' + charmRoll);
      stats.crit = charmRoll + 2;


      let magicRoll = rollAbility(characterSheet.abilities.magic);
      console.log('Potion roll: ' + magicRoll);
      stats.potions = magicRoll + 3;

      //console.log('Stats:');
      //console.log(stats);
      
      setStatsInput(stats);

      setRolled(true);
    }

    if (rolled) {
      let healthRoll = characterSheet.stats.health - 12;
      let healthRollStr = 'Your **MIGHT** die rolls ' + aOrAn(healthRoll) + ' *' + healthRoll + '*';
      let healthStr = 'Your **Health** is **' + characterSheet.stats.health + '**!';

      let critRoll = characterSheet.stats.crit - 2;
      let critRollStr = 'Your **CHARM** die rolls ' + aOrAn(critRoll) + ' *' + critRoll + '*';
      let critStr = 'Your **Crit** is **' + characterSheet.stats.crit + '**!';

      let potionsRoll = characterSheet.stats.potions - 3;
      let potionsRollStr = 'Your **MAGIC** die rolls ' + aOrAn(potionsRoll) + ' *' + (potionsRoll) + '*';
      let potionsStr = 'You have **' + characterSheet.stats.potions + ' Potions**';
  
      //console.log('sheet');
      //console.log(characterSheet);
      return (
        <>
          <div>
            <div className='roll-stat'><ReactMarkdown>{healthRollStr}</ReactMarkdown></div>
            <ReactMarkdown>{healthStr}</ReactMarkdown>
            <div className='roll-stat'><ReactMarkdown>{critRollStr}</ReactMarkdown></div>
            <ReactMarkdown>{critStr}</ReactMarkdown>
            <div className='roll-stat'><ReactMarkdown>{potionsRollStr}</ReactMarkdown></div>
            <ReactMarkdown>{potionsStr}</ReactMarkdown>
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
