import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import storyFile from './markdown/test.md'
import StoryRender from './components/StoryRender'

function Game() {
  const [storyText, setStoryText] = useState('')
  const [storyPassage, setStoryPassage] = useState('0.Title')
  console.log("Game Component Rendered")

  async function fetchStory(){
		try {
			fetch(storyFile).then((response) => response.text()).then((text) => {
        console.log(text)
        setStoryText(text)
        console.log('Story Set')
      })
		} catch (err) {
			console.log("Error: ", err)
		}
	}

	useEffect(() => {
    console.log('Use Effect triggered')
		fetchStory();
    console.log('Test');
    console.log(storyText);
	}, []);

  /*
  for (let i = 0; i < storyText.split('\r\n# ').length; i++) {
    console.log(storyText.split('\r\n# ')[i])
  }
  */

  return (
    <>
      <div>
        <StoryRender storyText={storyText} storyPassage={storyPassage} />
      </div>
      <button onClick={() => setStoryPassage('0.Title')}>
        Title
      </button>
      <button onClick={() => setStoryPassage('0.a.Rules')}>
        Rules
      </button>
      <button onClick={() => setStoryPassage('1.Start')}>
        Start
      </button>
    </>
  )
}

export default Game
