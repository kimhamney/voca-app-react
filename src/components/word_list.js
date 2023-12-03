import React, { useEffect, useState } from "react"

import IntervalMode from "./interval_mode.js";
import ListComponent from "./list_component.js";
import SettingComponent from "./setting_component.js";
import TestModePage from "./test_mode.js"
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
  const [dataList, setDataList] = useState([])
  const [currentTab, clickTab] = useState(Mode.LIST);
  const [settings, setSettings] = useState()

  useEffect(() => {
    setDataList(getDataList)    
  }, [getDataList, dataList]);

  const onClickTab = (mode) => {
    setSettings(null)
    clickTab(mode);
  }

  const ModeComponent = () => {
    switch(currentTab)
    {
      case Mode.LIST:
        return <ListComponent
            testMode={testMode}
            dataList={dataList}
            isFinish={false}>
          </ListComponent>
      case Mode.INTERVAL:
        return (settings ? 
          <IntervalMode 
            settings={settings}
            dataList={dataList}>
          </IntervalMode> :
          <SettingComponent 
              mode={Mode.INTERVAL} 
              dataCount={dataList.length}
              setSettings={setSettings}>
          </SettingComponent>)
      case Mode.TEST:
        return (settings ? 
          <TestModePage 
            settings={settings}
            dataList={dataList}>
          </TestModePage> :
          <SettingComponent 
              mode={Mode.TEST} 
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
        {ModeComponent()}
    </>
  );
}

