import { useState } from 'react'
import $ from 'jquery'; 
import ReactMarkdown from 'react-markdown'

function StoryParser({ storyHTML, parsedStory, setParsedStory }) {
  //console.log('StoryParser Component Rendered');
  if (storyHTML && !(parsedStory)) {
    //console.log('Parsing HTML...');
    //console.log('storyHTML length:\n' + storyHTML.length);
    storyHTML = $(storyHTML);

    const story = {};
    let heading = '';
    for (let i = 0; i < storyHTML.length; i++) {
      //console.log('nodeName: ' + storyHTML[i].nodeName + '\ninnerHTML:\n' + storyHTML[i].innerHTML);
      if (storyHTML[i].nodeName == 'H1') {
        heading = storyHTML[i].innerHTML;
        //console.log('Adding header ' + heading);
        story[heading] = [];
      }
      else if (storyHTML[i].innerHTML) {
        if (storyHTML[i].innerHTML.includes('{')) {
          //console.log('Code injection brackets {} found!');
          let code = storyHTML[i].innerHTML.match('\\{.*}')[0];
          code = code.slice(1, code.length-1);
          if (code.startsWith('.')) {
            //console.log('Adding injected classes...');
            const subtract = storyHTML[i].innerHTML.length - (code.length + 2);
            storyHTML[i].innerHTML = storyHTML[i].innerHTML.slice(0, subtract);
            const classes = code.split(' ');
            for (let x = 0; x < classes.length; x++) {
              storyHTML[i].classList.add(classes[x].substring(1));
            }
          }
        }
        if (storyHTML[i].innerHTML.includes('</a>')){
          //console.log('<a> tag found!')
          storyHTML[i].innerHTML = storyHTML[i].innerHTML.replace(`<a href="`, `<a onclick="setStoryPassage('`);
          storyHTML[i].innerHTML = storyHTML[i].innerHTML.replace(`">`, `')">`);
          //console.log('New <a> tag:\n' + storyHTML[i].innerHTML);
        }
        story[heading].push(storyHTML[i].outerHTML);
      }
    }
    //console.log('Created story object:');
    //console.log(story);
    setParsedStory(story);
  }

  return (null)
}

export default StoryParser
