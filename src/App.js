import React, { useEffect, useState } from "react"

import WordList from "./word_list.js";
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
    this.meaning = getFilterArr(data.meaning)
    this.isCorrect = false
  }
}

let correctCount = 0

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

const App = () => {
  const [dataList, setDataList] = useState([])
  const [isFinish, setFinish] = useState(false)

  if (dataList.length === 0) {
    setDataList(getData())
  }

  const onSubmit = () => {
    setFinish(true)
    
    let inputList = document.getElementsByClassName('input')
    let counter = document.getElementsByClassName('counter')[0]

    correctCount = 0

    for (let i = 0; i < dataList.length; i++) {
      let meaningArr = dataList[i].meaning
      let inputArr = getFilterArr(inputList[i].value)

      let isCorrect = checkWord(meaningArr, inputArr);
      dataList[i].isCorrect = isCorrect;

      if (isCorrect)
        correctCount++
    }

    counter.innerText = correctCount + "/" + dataList.length
  }

  const onRefresh = () => {
    setFinish(false)
    dataList.sort(() => Math.random() - 0.5);
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
  
  return (
    <div className="App">
      {dataList?.map((word, index) => 
        <WordList 
          key={index} 
          index={index} 
          word={word} 
          finish={isFinish}>
        </WordList>)}
      <SubmitBtn 
        onClick={isFinish ? onRefresh : onSubmit}>
        {isFinish ? "Refresh" : "Submit"}
      </SubmitBtn>
      <Text className="counter"></Text>
    </div>
  );
}

export default App;

