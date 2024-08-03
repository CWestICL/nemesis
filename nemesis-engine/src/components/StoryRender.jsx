import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import '../App.css'

function StoryRender({ storyText, storyPassage }) {
  //console.log("Story:")
  //console.log(storyText)
  let splitStory = storyText.split('\r\n# ')
  splitStory[0] = splitStory[0].substring(2)
  let story = {}
  for (let i = 0; i < splitStory.length; i++) {
    let lines = splitStory[i].split('\r\n')
    //console.log("Section " + i)
    //console.log(lines)
    let name = lines.shift()
    lines.shift()
    story[name] = lines
  }
  let renderStory
  if (storyText) {
    renderStory = story[storyPassage].join('\r\n')
  }

  return (
    <>
      <div>
        <ReactMarkdown>{renderStory}</ReactMarkdown>
      </div>
    </>
  )
}

export default StoryRender
