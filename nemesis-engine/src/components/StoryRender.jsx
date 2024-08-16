import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';
import $ from 'jquery';
import '../Game.css';
import ModeMenu from './ModeMenu';
import CreateCharacter from './CreateCharacter';
import ManualCreateCharacter from './ManualCreateCharacter';
import AbilityRoll from './AbilityRoll';

function StoryRender({ parsedStory, storyPassage, setStoryPassage, characterSheet, setCharacterSheet, mode, setMode }) {
  //console.log('StoryRender Component Rendered');
  let danger = (<></>);
  if (storyPassage.endsWith('!')) {
    danger = (<div className='md-mimic danger'>! DANGER !</div>);
  }
  let renderStory = <ReactMarkdown className='center'># Loading...</ReactMarkdown>
  if (parsedStory && storyPassage) {
    //console.log('Rendering parsed story...');
    renderStory = parsedStory[storyPassage].map((element) => parse(element, {
      replace(domNode) {
        //console.log('domNode:');
        //console.log(domNode);
        if (domNode.attribs && domNode.attribs.onclick) {
          //console.log('Found domNode with onclick:');
          //console.log(domNode);
          //console.log('domNode attribs:');
          //console.log(domNode.attribs)
          let click = domNode.attribs.onclick.slice(17, domNode.attribs.onclick.length - 2);
          delete domNode.attribs.onclick;
          domNode.attribs.onclick = click;
          return (<a onClick={() => { setStoryPassage(click) }}>{domNode.children[0].data}</a>);
        }
        if (domNode.data && domNode.data.startsWith('{')) {
          //console.log('Found domNode with injection brackets {}:');
          //console.log(domNode);
          let code = domNode.data.slice(1, domNode.data.length - 1);
          code = code.split('(');
          const componentName = code[0];
          //console.log('Component name: ' + componentName);
          const argsStr = code[1].slice(0, code[1].length - 1);
          const args = {};
          for (let i = 0; i < argsStr.split(', ').length; i++) {
            let argPair = argsStr.split(', ')[i].split('=');
            args[argPair[0]] = eval(argPair[1]);
          }
          console.log('Args: ');
          console.log(args);
          if (componentName == 'ModeMenu') {
            //console.log('Replacing with ModeMenu!');
            return (<ModeMenu {...args} setMode={setMode} setStoryPassage={setStoryPassage} characterSheet={characterSheet} setCharacterSheet={setCharacterSheet} />);
          }
          if (componentName == 'CreateCharacter') {
            //console.log('Replacing with CreateCharacter!');
            if (mode == 'Automated') {
              return (<CreateCharacter {...args} characterSheet={characterSheet} setCharacterSheet={setCharacterSheet} setStoryPassage={setStoryPassage} />);
            }
            return (<ManualCreateCharacter {...args} characterSheet={characterSheet} setCharacterSheet={setCharacterSheet} setStoryPassage={setStoryPassage} />)
          }
          if (componentName == 'AbilityRoll') {
            //console.log('Replacing with AbilityRoll!');
            return (<AbilityRoll {...args} mode={mode} setStoryPassage={setStoryPassage} characterSheet={characterSheet} />);
          }
        }
      }
    }));
  }

  return (
    <>
      <div className='story-render-container'>
        <div className='story-render'>
          {danger}
          {renderStory}
        </div>
      </div>
    </>
  )
}

export default StoryRender
