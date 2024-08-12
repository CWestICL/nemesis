import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import $ from 'jquery';
import '../Game.css'

function CharacterSheet({ characterSheet, setCharacterSheet, mode }) {
  //console.log('CharacterSheet Component Rendered');

  function handleInput(event) {
    event.preventDefault();
    console.log(characterSheet);
    console.log(event.target.id.slice(6));
    console.log(event.target.value);
    let value = event.target.value;
    let id = event.target.id.slice(6).split('-');
    if (id.length > 1) {
      if (id[0] == 'abilities') {
        value = Number(value);
      }
      setCharacterSheet({
        ...characterSheet,
        [id[0]]: {
          ...characterSheet[id[0]],
          [id[1]]: value,
        }
      });
    }
    else {
      setCharacterSheet({
        ...characterSheet,
        [id[0]]: value,
      });
    }
  }

  function handlePotion() {
    let newHealth = characterSheet.stats.health + 4;
    if (newHealth > characterSheet.stats.max_health) {
      newHealth = characterSheet.stats.max_health;
    }
    setCharacterSheet({
      ...characterSheet,
      stats: {
        ...characterSheet.stats,
        health: newHealth,
        potions: characterSheet.stats.potions - 1,
      }
    })
  }

  function getAbilityScore(value) {
    if (value > 0) {
      return 'D' + (4 + (2 * (value - 1)));
    }
    return '0';
  }

  if (mode != 'Pen and Paper') {
    let nameHTML = (<input type="text" id="input-name" className='cs-name-input' value={characterSheet.name} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      nameHTML = (<div className='cs-name-input'>{characterSheet.name}</div>);
    }

    let healthHTML = (<input type="number" id="input-stats-health" className='cs-health-input' min='0' max={characterSheet.stats.max_health} value={characterSheet.stats.health} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      healthHTML = (<div className='cs-health-stat'>{characterSheet.stats.health}</div>);
    } 

    let maxHealthHTML = (<input type="number" id="input-stats-max_health" className='cs-max-health-input' min='0' max='22' value={characterSheet.stats.max_health} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      maxHealthHTML = (<div className='cs-max-health-stat'>{characterSheet.stats.max_health}</div>);
    }

    let healthBarHTML;
    if (characterSheet.stats.health < Math.ceil(characterSheet.stats.max_health * 0.33)) {
      healthBarHTML = (<progress className='cs-health-bar cs-health-bar-low' value={characterSheet.stats.health} max={characterSheet.stats.max_health}>{characterSheet.stats.max_health}</progress>);
    }
    else if (characterSheet.stats.health < Math.ceil(characterSheet.stats.max_health * 0.66)) {
      healthBarHTML = (<progress className='cs-health-bar cs-health-bar-med' value={characterSheet.stats.health} max={characterSheet.stats.max_health}>{characterSheet.stats.max_health}</progress>);
    }
    else {
      healthBarHTML = (<progress className='cs-health-bar cs-health-bar-high' value={characterSheet.stats.health} max={characterSheet.stats.max_health}>{characterSheet.stats.max_health}</progress>);
    }

    let initMightHTML = (<select id="input-abilities-init_might" className='cs-init-select' value={characterSheet.abilities.init_might} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      initMightHTML = (<div>{getAbilityScore(characterSheet.abilities.init_might)}</div>);
    }

    let mightHTML = (<select id="input-abilities-might" className='cs-ability-select' value={characterSheet.abilities.might} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      mightHTML = (<div className='cs-ability-score'>{getAbilityScore(characterSheet.abilities.might)}</div>);
    }

    let initMagicHTML = (<select id="input-abilities-init_magic" className='cs-init-select' value={characterSheet.abilities.init_magic} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      initMagicHTML = (<div>{getAbilityScore(characterSheet.abilities.init_magic)}</div>);
    }

    let magicHTML = (<select id="input-abilities-magic" className='cs-ability-select' value={characterSheet.abilities.magic} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      magicHTML = (<div className='cs-ability-score'>{getAbilityScore(characterSheet.abilities.magic)}</div>);
    }

    let initSneakHTML = (<select id="input-abilities-init_sneak" className='cs-init-select' value={characterSheet.abilities.init_sneak} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      initSneakHTML = (<div>{getAbilityScore(characterSheet.abilities.init_sneak)}</div>);
    }

    let sneakHTML = (<select id="input-abilities-sneak" className='cs-ability-select' value={characterSheet.abilities.sneak} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      sneakHTML = (<div className='cs-ability-score'>{getAbilityScore(characterSheet.abilities.sneak)}</div>);
    }

    let initCharmHTML = (<select id="input-abilities-init_charm" className='cs-init-select' value={characterSheet.abilities.init_charm} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      initCharmHTML = (<div>{getAbilityScore(characterSheet.abilities.init_charm)}</div>);
    }

    let charmHTML = (<select id="input-abilities-charm" className='cs-ability-select' value={characterSheet.abilities.charm} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      charmHTML = (<div className='cs-ability-score'>{getAbilityScore(characterSheet.abilities.charm)}</div>);
    }

    let initFlukeHTML = (<select id="input-abilities-init_fluke" className='cs-init-select' value={characterSheet.abilities.init_fluke} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      initFlukeHTML = (<div>{getAbilityScore(characterSheet.abilities.init_fluke)}</div>);
    }

    let flukeHTML = (<select id="input-abilities-fluke" className='cs-ability-select' value={characterSheet.abilities.fluke} onChange={(e) => handleInput(e)}>
      <option value='0'>0</option>
      <option value='1'>D4</option>
      <option value='2'>D6</option>
      <option value='3'>D8</option>
      <option value='4'>D10</option>
    </select>);
    if (mode == 'Automated') {
      flukeHTML = (<div className='cs-ability-score'>{getAbilityScore(characterSheet.abilities.fluke)}</div>);
    }
    
    let critHTML = (<input type="number" id="input-stats-crit" className='cs-stats-input' min='0' max='16' value={characterSheet.stats.crit} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      critHTML = (<div className='cs-stat'>{characterSheet.stats.crit}</div>);
    }

    let goldHTML = (<input type="number" id="input-stats-gold" className='cs-stats-input' min='0' max='99' value={characterSheet.stats.gold} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      goldHTML = (<div className='cs-stat'>{characterSheet.stats.gold}</div>);
    }

    let potionsHTML = (<input type="number" id="input-stats-potions" className='cs-stats-input' min='0' max='16' value={characterSheet.stats.potions} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      if (characterSheet.stats.health < characterSheet.stats.max_health && characterSheet.stats.potions > 0) {
        console.log('Button active');
        potionsHTML = (<>
          <div className='cs-ability-score'>{characterSheet.stats.potions}</div>
          <button className='cs-potions-button' onClick={() => handlePotion()}>Use</button>
        </>);
      }
      else {
        console.log('Button disabled');
        potionsHTML = (<>
          <div className='cs-ability-score'>{characterSheet.stats.potions}</div>
          <button disabled className='cs-potions-button'>Use</button>
        </>);
      }
    }

    let weaponNameHTML = (<input type="text" id="input-weapon-name" className='cs-weapon-name' value={characterSheet.weapon.name} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      weaponNameHTML = (<div className='cs-weapon-name'>{characterSheet.weapon.name}</div>);
    }

    let weaponBonusHTML = (<input type="text" id="input-weapon-bonus" className='cs-weapon-bonus-input' value={characterSheet.weapon.bonus} onChange={(e) => handleInput(e)} />);
    if (mode == 'Automated') {
      weaponBonusHTML = (<div className='cs-weapon-bonus'>{characterSheet.weapon.bonus}</div>);
    }

    let treasureHTML = (<textarea id="input-treasure" className='cs-items' value={characterSheet.treasure} onChange={(e) => handleInput(e)}></textarea>);
    if (mode == 'Automated') {
      let treasureList = '';
      if (characterSheet.treasure.length > 0) {
        for (let i = 0; i < characterSheet.treasure.length; i++) {
          treasureList = treasureList + '* ' + characterSheet.treasure[i].name + ' (' + characterSheet.treasure[i].value + 'g)\n';
        }
      }
      treasureHTML = (<textarea disabled className='cs-items'>{treasureList}</textarea>);
    }

    let itemsHTML = (<textarea id="input-items" className='cs-items' value={characterSheet.items} onChange={(e) => handleInput(e)}></textarea>);
    if (mode == 'Automated') {
      let itemsList = '';
      if (characterSheet.items.length > 0) {
        for (let i = 0; i < characterSheet.items.length; i++) {
          itemsList = itemsList + '* ' + characterSheet.items[i].name;
          if (characterSheet.items[i].bonus) {
            itemsList = itemsList + ' (' + characterSheet.items[i].bonus + ')';
          }
          itemsList = itemsList + '\n';
        }
      }
      
      itemsHTML = (<textarea disabled className='cs-items'>{itemsList}</textarea>);
    }

    const notesHTML = (<textarea id="input-notes" className='cs-notes'></textarea>);

    return (
      <>
        <div className='character-sheet'>

          <div className='cs-top'>

            <div className='cs-name'>
              <div className='cs-title'>NAME:</div>
              {nameHTML}
            </div>

            <div className='cs-health'>
              <div className='cs-title'>HEALTH</div>
              <div className='cs-health-content'>
                {healthHTML}
                <div>/</div>
                {maxHealthHTML}
                {healthBarHTML}
              </div>
            </div>

          </div>

          <div className='cs-abilities'>

            <div className='cs-ability-container'>
              <div className='cs-title'>MIGHT</div>
              <div className='cs-ability-init'>
                <div>Init.</div>
                {initMightHTML}
              </div>
              {mightHTML}
            </div>

            <div className='cs-ability-container'>
              <div className='cs-title'>MAGIC</div>
              <div className='cs-ability-init'>
                <div>Init.</div>
                {initMagicHTML}
              </div>
              {magicHTML}
            </div>

            <div className='cs-ability-container'>
              <div className='cs-title'>SNEAK</div>
              <div className='cs-ability-init'>
                <div>Init.</div>
                {initSneakHTML}
              </div>
              {sneakHTML}
            </div>

            <div className='cs-ability-container'>
              <div className='cs-title'>CHARM</div>
              <div className='cs-ability-init'>
                <div>Init.</div>
                {initCharmHTML}
              </div>
              {charmHTML}
            </div>

          </div>

          <div className='cs-stats'>

            <div className='cs-ability-container'>
              <div className='cs-title'>FLUKE</div>
              <div className='cs-ability-init'>
                <div>Init.</div>
                {initFlukeHTML}
              </div>
              {flukeHTML}
            </div>

            <div className='cs-stats-container'>
              <div className='cs-title'>CRIT</div>
              {critHTML}
            </div>

            <div className='cs-stats-container'>
              <div className='cs-title'>GOLD</div>
              {goldHTML}
            </div>

            <div className='cs-stats-container'>
              <div className='cs-title'>POTIONS</div>
              {potionsHTML}
            </div>

          </div>

          <div className='cs-weapon'>
            <div className='cs-title'>WEAPON</div>
            <div className='cs-weapon-content'>
              {weaponNameHTML}
              {weaponBonusHTML}
            </div>
          </div>

          <div className='cs-inventory'>

            <div className='cs-treasure-items'>

              <div className='cs-treasure-container'>
                <div className='cs-title'>TREASURE</div>
                {treasureHTML}
              </div>
              
              <div className='cs-items-container'>
                <div className='cs-title'>ITEMS</div>
                {itemsHTML}
              </div>

            </div>

            <div className='cs-notes-container'>
              <div className='cs-title'>NOTES</div>
              {notesHTML}
            </div>

          </div>

        </div>
      </>
    )
  }

  if (mode === 'Manual Rolling') {
    const name = characterSheet.name;

    const might = characterSheet.abilities.might;
    const initMight = characterSheet.abilities.init_might;
    const magic = characterSheet.abilities.magic;
    const initMagic = characterSheet.abilities.init_magic;
    const sneak = characterSheet.abilities.sneak;
    const initSneak = characterSheet.abilities.init_sneak;
    const charm = characterSheet.abilities.charm;
    const initCharm = characterSheet.abilities.init_charm;
    const fluke = characterSheet.abilities.fluke;
    const initFluke = characterSheet.abilities.init_fluke;
    const health = characterSheet.stats.health;
    const maxHealth = characterSheet.stats.max_health;

    const crit = characterSheet.stats.crit;
    const potions = characterSheet.stats.potions;
    const gold = characterSheet.stats.gold;

    const weapon = characterSheet.weapon;

    const nameStr = '**Name**: ' + name;

    const mightStr = '**MIGHT**: **' + getAbilityScore(might) + '** *(' + getAbilityScore(initMight) + ')*';
    const magicStr = '**MAGIC**: **' + getAbilityScore(magic) + '** *(' + getAbilityScore(initMagic) + ')*';
    const sneakStr = '**SNEAK**: **' + getAbilityScore(sneak) + '** *(' + getAbilityScore(initSneak) + ')*';
    const charmStr = '**CHARM**: **' + getAbilityScore(charm) + '** *(' + getAbilityScore(initCharm) + ')*';
    const flukeStr = '**FLUKE**: **' + getAbilityScore(fluke) + '** *(' + getAbilityScore(initFluke) + ')*';

    const healthStr = '**Health**: **' + health + '**/*' + maxHealth + '*';
    const critStr = '**Crit**: **' + crit + '**';
    const potionsStr = '**Potions**: **' + potions + '**';
    const goldStr = '**Gold**: **' + gold + '**';

    const weaponStr = '**Weapon**: **' + weapon.name + '** (*' + weapon.bonus + '*)';

    return (
      <>
        <div className='character-sheet'>
          <ReactMarkdown>{nameStr}</ReactMarkdown>
          <ReactMarkdown>***Abilities***</ReactMarkdown>
          <ReactMarkdown>{mightStr}</ReactMarkdown>
          <ReactMarkdown>{magicStr}</ReactMarkdown>
          <ReactMarkdown>{sneakStr}</ReactMarkdown>
          <ReactMarkdown>{charmStr}</ReactMarkdown>
          <ReactMarkdown>{flukeStr}</ReactMarkdown>
          <ReactMarkdown>***Stats***</ReactMarkdown>
          <ReactMarkdown>{healthStr}</ReactMarkdown>
          <ReactMarkdown>{critStr}</ReactMarkdown>
          <ReactMarkdown>{potionsStr}</ReactMarkdown>
          <ReactMarkdown>{goldStr}</ReactMarkdown>
          <ReactMarkdown>{weaponStr}</ReactMarkdown>
        </div>
      </>
    )
  }
  return (null);
}

export default CharacterSheet
