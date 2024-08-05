import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import $ from 'jquery';
import '../App.css'

function StoryRender({ parsedStory, storyPassage, setStoryPassage }) {
  let renderStory = <ReactMarkdown>'### Loading...'</ReactMarkdown>
  if (parsedStory && storyPassage) {
    renderStory = parsedStory[storyPassage].map((element) => parse(element, {
      replace(domNode) {
        if (domNode.attribs && domNode.attribs.onclick) {
          console.log("Hello?:", domNode);
          console.log("Hello?:", domNode.attribs);
          console.log("Hello?:", domNode.attribs.onclick.substring(17, domNode.attribs.onclick.length - 2));
          console.log("Hello?:", typeof domNode.attribs);
          let click = domNode.attribs.onclick.substring(17, domNode.attribs.onclick.length - 2);
          delete domNode.attribs.onclick;
          domNode.attribs.onclick = click;
          return (<a onClick={() => { setStoryPassage(click) }}>{domNode.children[0].data}</a>)
        }
      }
    }));
  }

  return (
    <>
      <div>
        {renderStory}
      </div>
    </>
  )
}

export default StoryRender
