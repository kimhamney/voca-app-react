import React, { useState } from "react"

import WordListItem from "./word_list_item.js";
import styled from 'styled-components';

const SubmitBtn = styled.button`

`;

const Text = styled.p`
  margin: 10px;
`;

class Word {
  constructor(data) {
    this.id = data.id
    this.word = data.word
    this.pos = data.pos
    this.meaning = data.meaning
    this.meaningArr = getFilterArr(data.meaning)
    this.isCorrect = false
    this.isPlaying = false
  }
}

const getFilterArr = (input) => {
  let value = input.replace(/\s/g, '')
  let arr = value.split(/[^a-zA-Z가-힣]/).filter(Boolean)
  return arr
}

const getData = () => {
  let obj = require('./words_data_small.json')
  let json = JSON.parse(JSON.stringify(obj))
  let datas = json['data']
  let list = [];

  const dataArr = [...datas].sort(() => Math.random() - 0.5);

  for (let i = 0; i < dataArr.length; i++) {
    let data = new Word(dataArr[i], false);
    list.push(data)
  }
  return list
}

const checkWord = (words, inputs) => {
  if (!inputs || inputs.length === 0)
    return false;

  for (let i = 0; i < words.length; i++)
  {
    for (let j = 0; j < inputs.length; j++)
    {
      if (words[i] === inputs[j])
        return true
    }
  }
  return false
}

const soundPlay = (dataList) => {
  for (var i = 0; i < dataList.length; i++) {
    for (var j = 0; j < 3; j++)
    {
      const speech = new SpeechSynthesisUtterance();
      speech.lang = 'en-US';
      speech.text = dataList[i].word;
      speech.volume = 1;
      speech.rate = 0.5;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  }
}

export const TestMode = {
  WORD: "word",
  MEANING: "meaning",
  SOUND: "sound",
}

const App = () => {
  const [testMode, setTestMode] = useState(TestMode.WORD)
  const [correctCount, setCorrectCount] = useState('')
  const [dataList, setDataList] = useState([])
  const [isFinish, setFinish] = useState(false)

  if (dataList.length === 0) {
    setDataList(getData())
  }

  // setTestMode(TestMode.WORD)
  // soundPlay(dataList)
  
  const onSubmit = () => {
    let wordInputList = document.getElementsByClassName('wordInput')
    let meaningInputList = document.getElementsByClassName('meaningInput')
    let count = 0
    
    for (let i = 0; i < dataList.length; i++) {
      let meaningArr = dataList[i].meaningArr
      let inputArr = getFilterArr(meaningInputList[i].value)

      let isCorrect = false
      switch(testMode)
      {
        case "word":
          isCorrect = checkWord(meaningArr, inputArr)
          break
        case "sound":
          isCorrect = checkWord(meaningArr, inputArr) && 
                      dataList[i].word === wordInputList[i].value;
          break
        case "meaning":
          isCorrect = dataList[i].word === meaningInputList[i].value;
          break
        default: break
      }
      dataList[i].isCorrect = isCorrect;
      
      if (isCorrect)
        count++
    }

    setFinish(true)
    setCorrectCount(count + "/" + dataList.length)
  }

  const onRefresh = () => {
    setFinish(false)
    dataList.sort(() => Math.random() - 0.5);
    setCorrectCount('')
  }
  
  return (
    <div className="App">
        {dataList?.map((word, index) => 
          <WordListItem 
            key={index} 
            testMode={testMode}
            index={index} 
            word={word}
            isFinish={isFinish}>
          </WordListItem>)}
        <SubmitBtn 
          onClick={isFinish ? onRefresh : onSubmit}>
          {isFinish ? "Retry" : "Submit"}
        </SubmitBtn>
        <Text className="counter">{correctCount}</Text>
    </div>
  );
}

export default App;

