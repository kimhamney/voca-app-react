import React, { useEffect, useState } from "react"

import styled from 'styled-components';

const List = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  margin: 10px;
`;

const Input = styled.input`
  margin: 10px;
`;

const SubmitBtn = styled.button`

`;

const MeanContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Meaning = styled.p`
  position : relative;
  height: 10px;
  top: -10px;
  left: 10px;
  font-size: 0.8rem;
  color: red;
  display: none;
`;

class Word {
  constructor(data, isCorrect) {
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

const App = () => {
  let obj = require('./words_data_small.json')
  let json = JSON.stringify(obj)
  let data = JSON.parse(json)
  let dataArr = data['data']
  let dataList = [];

  for (let i = 0; i < dataArr.length; i++) {
    let data = new Word(dataArr[i], false);
    dataList.push(data)
  }

  const submit = () => {
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
    speech.rate = 1;
    speech.pitch = 2;
    window.speechSynthesis.speak(speech);

    counter.innerText = correctCount + "/" + dataList.length
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
      {dataArr?.map((word, index) => <List key={index}>
        <Text>{index + 1}</Text>
        <Text>{word.word}</Text>
        <Text>{word.pos}</Text>
        <MeanContainer>
          <Input className="input" type="text"></Input>
          <Meaning className="meaning">{word.meaning}</Meaning>
        </MeanContainer>
      </List>)}
      <SubmitBtn onClick={submit}>Submit</SubmitBtn>
      <Text className="counter"></Text>
    </div>
  );
}

export default App;

