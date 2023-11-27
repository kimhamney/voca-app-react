import * as xlsx from 'xlsx';

import React, { useEffect, useState } from "react"

import FlipCard from "./flip_card.js";
import WordListItem from "./word_list_item.js";
import styled from 'styled-components';

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
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
  let obj = require('../words_data_small.json')
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

export const Mode = {
  LIST: 'list',
  INTERVAL: 'interval',
  TEST: 'test',
}

export const TestMode = {
  NONE: "none",
  WORD: "word",
  MEANING: "meaning",
  SOUND: "sound",
}

export default function WordList({testMode, isInterval}) {
  const [correctCount, setCorrectCount] = useState('')
  const [dataList, setDataList] = useState([])
  const [isFinish, setFinish] = useState(false)
  const [count, setCount] = useState(isInterval? 5 : 0);

  const [isFlipCard, setIsFlipCard] = useState(false)

  // soundPlay(dataList)

  useEffect(() => {
    setDataList(getData())

    // const id = setInterval(() => {
    //   setCount((count) => count - 1);
    // }, 1000);
    
    // if(isInterval && count === 0) {
    //     clearInterval(id);
    //     endInterval();
    // }

    // return () => clearInterval(id);
  }, [count]);

  const endInterval = () => {
    isInterval = false;
    // setTestMode(TestMode.WORD)
  }
  
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

  const onUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "string" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const datas = xlsx.utils.sheet_to_json(worksheet);

            const dataArr = [...datas].sort(() => Math.random() - 0.5);
            const list = []

            for (let i = 0; i < datas.length; i++) {
              let data = new Word(dataArr[i], false);
              list.push(data)
            }

            setDataList(list)
        };
        reader.readAsArrayBuffer(e.target.files[0]);
     }
  }

  const onModeSelect = (e) => {
    // setTestMode(e.target.value)
    setFinish(false)
    setCorrectCount('')
  }

  const onShowFlip = () => {
    setIsFlipCard(!isFlipCard)
  }
  
  return (
    <div className="App">
        <TopContainer>
          <Text className="counter">Test {correctCount}</Text>
          {count > 0 ? (<Text>{count}</Text>) : <></>}
          <select name="TestMode" onChange={onModeSelect}>
            <option value="none">List</option>
            <option value="word">Word</option>
            <option value="meaning">Meaning</option>
            <option value="sound">Sound</option>
          </select>
          <button onClick={onShowFlip}>
            Flip
          </button>
          <button 
            className='submitButton' 
            onClick={isFinish ? onRefresh : onSubmit}
            style={{display: testMode === TestMode.NONE ? "none" : "inline"}}>
            {isFinish ? "Retry" : "Submit"}
          </button>
        </TopContainer>
        {/* <form>
          <label htmlFor="upload">Upload File</label>
          <input
              type="file"
              name="upload"
              id="upload"
              onChange={onUploadFile}
          />
      </form> */}
        {isFlipCard ? 
        <FlipCard dataList={dataList}></FlipCard> : 
        dataList?.map((word, index) => 
          <WordListItem 
            key={index} 
            testMode={testMode}
            index={index} 
            word={word}
            isFinish={isFinish}>
          </WordListItem>)}     
        
    </div>
  );
}

