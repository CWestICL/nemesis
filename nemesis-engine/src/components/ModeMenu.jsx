import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import '../Game.css'

function ModeMenu({ setMode, setStoryPassage, characterSheet, setCharacterSheet, exit_pass }) {
  //console.log('ModeMenu Component Rendered');

  function handleMode(event) {
    if (event.target.innerHTML.slice(0, event.target.innerHTML.length - 5) == 'Manual Rolling') {
      setCharacterSheet({
        ...characterSheet,
        treasure: '',
        items: '',
      });
    }
    setMode(event.target.innerHTML.slice(0, event.target.innerHTML.length - 5));
    setStoryPassage(exit_pass);
  }

  return (
    <>
      <div>
      <ul>
        <li className='md-mimic'><a onClick={handleMode}>Automated Mode</a> - If you want to use virtual dice and character sheet</li>
        <li className='md-mimic'><a onClick={handleMode}>Manual Rolling Mode</a> - If you have physical dice but would like a virtual character sheet</li>
        <li className='md-mimic'><a onClick={handleMode}>Pen and Paper Mode</a> - If you'd rather use physical dice <strong>and</strong> a physical character sheet</li>
      </ul>
      </div>
    </>
  );
}

export default ModeMenu
