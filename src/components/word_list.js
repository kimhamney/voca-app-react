import React, { useEffect, useState } from "react"

import FlipCard from "./flip_card.js";
import IntervalMode from "./interval_mode.js";
import ListComponent from "./list_component.js";
import SettingComponent from "./setting_component.js";
import styled from 'styled-components';

const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Tab = styled.button`
    width: 100px;
    background-color: #0066ff;
    border: 0;
    border-radius: 10px;
    color: #fff;
    padding: 1em 1.5em;
    margin: 20px;
    cursor: pointer;
`;

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

const RightContainer = styled.div`
  display: flex;
`;

const FlipBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: #3457D5;
  border: 0;
  border-radius: 10px;
  margin-right: 10px;
  color: #fff;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #0066ff;
  border: 0;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
`;

const getFilterArr = (input) => {
  let value = input.replace(/\s/g, '')
  let arr = value.split(/[^a-zA-Z가-힣]/).filter(Boolean)
  return arr
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
  LISTENING: "listening",
}

export default function WordList({testMode, isInterval, getDataList}) {
  const [correctCount, setCorrectCount] = useState('')
  const [dataList, setDataList] = useState([])
  const [isFinish, setFinish] = useState(false)
  const [count, setCount] = useState(isInterval? 5 : 0);
  const [currentTab, clickTab] = useState(Mode.LIST);
  const [isFlipCard, setIsFlipCard] = useState(false)
  const [settings, setSettings] = useState()

  useEffect(() => {
    setDataList(getDataList)

    // const id = setInterval(() => {
    //   setCount((count) => count - 1);
    // }, 1000);
    
    // if(isInterval && count === 0) {
    //     clearInterval(id);
    //     endInterval();
    // }

    // return () => clearInterval(id);
  }, [dataList]);

  const endInterval = () => {
    isInterval = false;
    // setTestMode(TestMode.WORD)
  }

  const onClickTab = (mode) => {
    // setFlipVisible(mode === Mode.LIST)
    setSettings(null)
    clickTab(mode);
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
        case "listening":
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

  const onModeSelect = (e) => {
    // setTestMode(e.target.value)
    setFinish(false)
    setCorrectCount('')
  }

  const ModeComponent = () => {
    switch(currentTab)
    {
      case Mode.LIST:
        return <ListComponent
            testMode={testMode}
            dataList={dataList}
            isFinish={isFinish}>
          </ListComponent>
      case Mode.INTERVAL:
      case Mode.TEST:
        return (
        settings ? 
          <IntervalMode 
            settings={settings}
            dataList={dataList}>
          </IntervalMode> :
          <SettingComponent 
              mode={Mode.INTERVAL} 
              dataCount={dataList.length}
              setSettings={setSettings}>
          </SettingComponent>)
        default: return;
    }
  }
  
  return (
    <>
        <TabContainer>
          <Tab onClick={() => onClickTab(Mode.LIST)}>List</Tab>
          <Tab onClick={() => onClickTab(Mode.INTERVAL)}>Interval</Tab>
          <Tab onClick={() => onClickTab(Mode.TEST)}>Test</Tab>
        </TabContainer>
        {ModeComponent()/* <TopContainer>
          <Text className="counter">{correctCount}</Text>
          {count > 0 ? (<Text>{count}</Text>) : <></>}
          <RightContainer>
            <SubmitButton 
              className='submitButton' 
              onClick={isFinish ? onRefresh : onSubmit}
              style={{display: testMode === TestMode.NONE ? "none" : "inline"}}>
              {isFinish ? "Retry" : "Submit"}
            </SubmitButton>
          </RightContainer>
        </TopContainer> */}
        
    </>
  );
}

