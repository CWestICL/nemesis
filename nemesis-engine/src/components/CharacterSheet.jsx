import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import $ from 'jquery';
import '../Game.css'

function CharacterSheet({ characterSheet, setCharacterSheet }) {
  //console.log('CharacterSheet Component Rendered');

  function getAbilityScore(value) {
    if (value > 0) {
      return 'D' + (4 + (2 * (value - 1)));
    }
    return '0';
  }

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
  const initHealth = characterSheet.stats.init_health;

  const crit = characterSheet.stats.crit;
  const initCrit = characterSheet.stats.init_crit;
  const potions = characterSheet.stats.potions;
  const gold = characterSheet.stats.gold;

  const weapon = characterSheet.weapon;

  const nameStr = '**Name**: ' + name;

  const mightStr = '**MIGHT**: **' + getAbilityScore(might) + '** *(' + getAbilityScore(initMight) + ')*';
  const magicStr = '**MAGIC**: **' + getAbilityScore(magic) + '** *(' + getAbilityScore(initMagic) + ')*';
  const sneakStr = '**SNEAK**: **' + getAbilityScore(sneak) + '** *(' + getAbilityScore(initSneak) + ')*';
  const charmStr = '**CHARM**: **' + getAbilityScore(charm) + '** *(' + getAbilityScore(initCharm) + ')*';
  const flukeStr = '**FLUKE**: **' + getAbilityScore(fluke) + '** *(' + getAbilityScore(initFluke) + ')*';

  const healthStr = '**Health**: **' + health + '** *(' + initHealth + ')*';
  const critStr = '**Crit**: **' + crit + '** *(' + initCrit + ')*';
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

export default CharacterSheet
