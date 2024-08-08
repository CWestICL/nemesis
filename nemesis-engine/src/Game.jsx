import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Game.css'
import storyFile from './markdown/test.md'
import StoryRender from './components/StoryRender'
import StoryParser from './components/StoryParser'
import CharacterSheet from './components/CharacterSheet'

const initialCharacter = {
  name: '',
  abilities: {
    init_might: 0,
    might: 0,
    init_magic: 0,
    magic: 0,
    init_sneak: 0,
    sneak: 0,
    init_charm: 0,
    charm: 0,
    init_fluke: 0,
    fluke: 0,
  },
  stats: {
    init_health: 0,
    health: 0,
    init_crit: 0,
    crit: 0,
    gold: 0,
    potions: 0,
  },
  weapon: {
    name: "Adventurer's Sword",
    bonus: '+2 AS',
  },
  treasure: [],
  items: [],
  notes: '',
}

function Game() {
  //console.log('Game Component Rendered');
  
  const [storyText, setStoryText] = useState('');
  const [storyHTML, setStoryHTML] = useState(null);
  const [parsedStory, setParsedStory] = useState(null);
  const [storyPassage, setStoryPassage] = useState('0.Title');
  const [characterSheet, setCharacterSheet] = useState(initialCharacter);

  async function fetchStory(){
		try {
			fetch(storyFile).then((response) => response.text()).then((text) => {
        //console.log('Found text:\n' + text);
        setStoryText(text);
        //console.log('Story Set');
      })
		} catch (err) {
			console.log('Error: ', err);
		}
	}

	useEffect(() => {
    //console.log('fetchStory Use Effect triggered');
		fetchStory();
    //console.log('Story text:\n' + storyText);
	}, []);

  useEffect(() => {
    //console.log('HTML Use Effect triggered');
    const mdDiv = document.querySelector('.markdown-html');
    if (mdDiv.children) {
      //console.log('markdown-html Children found');
      const mdHTML = mdDiv.innerHTML;
      setStoryHTML(mdHTML);
      //console.log('HTML found:\n' + mdHTML);
    }
  }, [storyText]);

  return (
    <>
      <StoryParser storyHTML={storyHTML} parsedStory={parsedStory} setParsedStory={setParsedStory} />
      <div style={{display: 'none'}} className='markdown-html'>
        <ReactMarkdown children={storyText} />
      </div>
      <div className="story">
        <StoryRender parsedStory={parsedStory} storyPassage={storyPassage} setStoryPassage={setStoryPassage} characterSheet={characterSheet} setCharacterSheet={setCharacterSheet}/>
        <CharacterSheet characterSheet={characterSheet} setCharacterSheet={setCharacterSheet} />
      </div>
    </>
  )
}

export default Game
