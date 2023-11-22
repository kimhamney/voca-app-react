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
  }
}

let correctCount = 0
let dataList = []

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
  const [isFinish, setFinish] = useState(false)
  dataList = getData();

  const submit = () => {
    setFinish(true)

    let inputList = document.getElementsByClassName('input')
    let meaningList = document.getElementsByClassName('meaning')
    let counter = document.getElementsByClassName('counter')[0]

    correctCount = 0

    for (let i = 0; i < dataList.length; i++) {
      let meaningArr = dataList[i].meaning
      let inputArr = getFilterArr(inputList[i].value)

      let isCorrect = checkWord(meaningArr, inputArr);
      dataList[i].isCorrect = isCorrect;
      inputList[i].style.borderColor = isCorrect ? "blue" : "red"
      meaningList[i].style.display = isCorrect ? "none" : "inline"

      if (isCorrect)
        correctCount++
    }

    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-US';
    speech.text = 'Speech';
    speech.volume = 1;
    speech.rate = 0.8;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);

    counter.innerText = correctCount + "/" + dataList.length
  }

  const refresh = () => {
    setFinish(false)
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
      {dataList?.map((word, index) => <WordList key={index} word={word} />)}
      <SubmitBtn onClick={isFinish ? refresh : submit}>{isFinish ? "Refresh" : "Submit"}</SubmitBtn>
      <Text className="counter"></Text>
    </div>
  );
}

export default App;

