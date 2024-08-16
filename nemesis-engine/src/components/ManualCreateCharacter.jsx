import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import $ from 'jquery';
import '../Game.css'
import TextField from '@mui/material/TextField';

function CreateCharacter({ setStoryPassage, exit_pass }) {
  //console.log('CreateCharacter Component Rendered');
  const [stage, setStage] = useState(1);

  function handleNext() {
    setStage(stage + 1);
  }

  if (stage == 1) {
    return (
      <>
        <div>
          <ReactMarkdown>Enter a name for your adventurer in the ***'Name'*** field on your character sheet.</ReactMarkdown>
          <ReactMarkdown>Assign each of the following **Ability Scores** to the 5 abilities on your character sheet.</ReactMarkdown>
          <ul>
            <li><ReactMarkdown>**D12** - Your **Mastered** ability</ReactMarkdown></li>
            <li><ReactMarkdown>**D10** - Your **Skilled** ability</ReactMarkdown></li>
            <li><ReactMarkdown>**D8** - Your **Adequate** ability</ReactMarkdown></li>
            <li><ReactMarkdown>**D6** - Your **Lacklustre** ability</ReactMarkdown></li>
            <li><ReactMarkdown>**D4** - Your **Calamitous** ability</ReactMarkdown></li>
          </ul>
          <ReactMarkdown>Make sure you note down these scores in the **Initial Ability Score** fields too.</ReactMarkdown>
          <div className='md-mimic'>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      </>
    )
  }

  if (stage == 2) {
    return (
      <>
        <div>
          <ReactMarkdown>To calculate your **Health** stat, roll your **MIGHT** die and add 12 to the result.</ReactMarkdown>
          <blockquote>
            <ReactMarkdown>*Note: If your **MIGHT** score is **0**, you don't roll a die and your **Health** stat is 12.*</ReactMarkdown>
          </blockquote>
          <ReactMarkdown>Note down the result in the ***'Health'*** field on your character sheet.</ReactMarkdown>
          <ReactMarkdown>Make sure you note down this result in the ***'Max Health'*** field too.</ReactMarkdown>
          <div className='md-mimic'>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      </>
    )
  }

  if (stage == 3) {
    return (
      <>
        <div>
          <ReactMarkdown>To calculate your **Crit** stat, roll your **CHARM** die and add 2 to the result.</ReactMarkdown>
          <blockquote>
            <ReactMarkdown>*Note: If your **CHARM** score is **0**, you don't roll a die and your **Crit** stat is 2.*</ReactMarkdown>
          </blockquote>
          <ReactMarkdown>Note down the result in the ***'Crit'*** field on your character sheet.</ReactMarkdown>
          <ReactMarkdown>Make sure you note down this result in the ***'Initial Crit'*** field too.</ReactMarkdown>
          <div className='md-mimic'>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      </>
    )
  }

  if (stage == 4) {
    return (
      <>
        <div>
          <ReactMarkdown>To calculate your **Potions**, roll your **MAGIC** die and add 3 to the result.</ReactMarkdown>
          <blockquote>
            <ReactMarkdown>*Note: If your **MAGIC** score is **0**, you don't roll a die and you only have 3 **Potions**.*</ReactMarkdown>
          </blockquote>
          <ReactMarkdown>Note down the result in the ***'Potions'*** field on your character sheet.</ReactMarkdown>
          <div className='md-mimic'>
            <button onClick={() => setStoryPassage(exit_pass)}>Finish</button>
          </div>
        </div>
      </>
    )
  }

  return (null);
}

export default CreateCharacter
