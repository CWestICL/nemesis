import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import parse from 'html-react-parser';
import $ from 'jquery';
import '../Game.css'

function StoryRender({ parsedStory, storyPassage, setStoryPassage }) {
  console.log('StoryRender Component Rendered');
  let renderStory = <ReactMarkdown className='center'># Loading...</ReactMarkdown>
  if (parsedStory && storyPassage) {
    console.log('Rendering parsed story...');
    renderStory = parsedStory[storyPassage].map((element) => parse(element, {
      replace(domNode) {
        if (domNode.attribs && domNode.attribs.onclick) {
          //console.log('Found domNode with onclick:');
          //console.log(domNode);
          //console.log('domNode attribs:');
          //console.log(domNode.attribs)
          let click = domNode.attribs.onclick.substring(17, domNode.attribs.onclick.length - 2);
          delete domNode.attribs.onclick;
          domNode.attribs.onclick = click;
          return (<a onClick={() => { setStoryPassage(click) }}>{domNode.children[0].data}</a>);
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
