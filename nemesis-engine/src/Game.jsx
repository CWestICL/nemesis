import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import storyFile from './markdown/test.md'
import StoryRender from './components/StoryRender'
import StoryParser from './components/StoryParser'

function Game() {
  const [storyText, setStoryText] = useState('')
  const [storyHTML, setStoryHTML] = useState(null)
  const [parsedStory, setParsedStory] = useState(null)
  const [storyPassage, setStoryPassage] = useState('0.Title')
  console.log("Game Component Rendered")

  async function fetchStory(){
		try {
			fetch(storyFile).then((response) => response.text()).then((text) => {
        //console.log(text);
        setStoryText(text);
        console.log('Story Set');
      })
		} catch (err) {
			console.log("Error: ", err);
		}
	}

	useEffect(() => {
    console.log('fetchStory Use Effect triggered');
		fetchStory();
    //console.log('Test');
    //console.log(storyText);
	}, []);

  useEffect(() => {
    console.log('HTML Use Effect triggered');
    const mdDiv = document.querySelector('.markdown-html');
    if (mdDiv.children) {
        const mdHTML = mdDiv.innerHTML;
        setStoryHTML(mdHTML);
        console.log("Test HTML print:");
        console.log(mdHTML);
    }
  }, [storyText]);

  return (
    <>
      <div style={{display: 'none'}} className='markdown-html'>
        <ReactMarkdown children={storyText} />
      </div>
      <div>
        <StoryParser storyHTML={storyHTML} parsedStory={parsedStory} setParsedStory={setParsedStory} />
        <StoryRender parsedStory={parsedStory} storyPassage={storyPassage} setStoryPassage={setStoryPassage}/>
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
