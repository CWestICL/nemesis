import { useState } from 'react'
import $ from 'jquery'; 
import ReactMarkdown from 'react-markdown'
import '../App.css'

function StoryParser({ storyHTML, parsedStory, setParsedStory }) {
    //console.log("Parse?")
    //console.log(storyHTML)
    //console.log(parsedStory)
    if (storyHTML && !(parsedStory)) {
        console.log("Parsing...")
        console.log(storyHTML.length)
        storyHTML = $(storyHTML)
        const story = {}
        let heading = '';
        for (let i = 0; i < storyHTML.length; i++) {
            console.log("nodeName: " + storyHTML[i].nodeName);
            console.log("innerHTML: " + storyHTML[i].innerHTML);
            if (storyHTML[i].nodeName == 'H1') {
                console.log("Adding header...")
                heading = storyHTML[i].innerHTML;
                story[heading] = [];
            }
            else if (storyHTML[i].innerHTML) {
                if (storyHTML[i].innerHTML.includes('{')) {
                    //console.log('{} Found!')
                    let code = storyHTML[i].innerHTML.match("\\{.*}")[0];
                    code = code.substring(1, code.length-1);
                    if (code.startsWith('.')) {
                        const subtract = storyHTML[i].innerHTML.length - (code.length + 2);
                        storyHTML[i].innerHTML = storyHTML[i].innerHTML.substring(0, subtract)
                        const classes = code.split(' ')
                        for (let x = 0; x < classes.length; x++) {
                            storyHTML[i].classList.add(classes[x].substring(1))
                        }
                    }
                }
                if (storyHTML[i].innerHTML.includes('</a>')){
                    console.log("<a> tag found!")
                    storyHTML[i].innerHTML = storyHTML[i].innerHTML.replace(`<a href="`, `<a onclick="setStoryPassage('`)
                    storyHTML[i].innerHTML = storyHTML[i].innerHTML.replace(`">`, `')">`)
                    console.log("Replaced: ", storyHTML[i].innerHTML)
                }
                story[heading].push(storyHTML[i].outerHTML)
            }
        }
        console.log(story)
        setParsedStory(story)
    }

    return (null)
}

export default StoryParser
