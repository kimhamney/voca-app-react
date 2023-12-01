import React, { useEffect, useRef, useState } from "react"

import FlipCard from "./flip_card.js";
import FlipCardButton from "./flip_card_button.js";
import ListComponent from "./list_component.js";
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

const TopButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #0066ff;
  border: 0;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
`;

export default function IntervalMode({settings, dataList}) {
    const [isShowFlipCard, setIsShowFlipCard] = useState(false)
    const [isFinish, setFinish] = useState(false)
    const [showDataList, setShowDataList] = useState([])
    const [currentStage, setCurrentStage] = useState(0)
    const [showNextBtn, setShowNextBtn] = useState(false)
    const [isTest, setIsTest] = useState(false)
    const [testCount, setTestCount] = useState('')
    const submitRef = useRef()

    let stageCount = Math.ceil((settings.endIndex - settings.startIndex + 1) / settings.intervalCount);

    useEffect(() => {
        if (dataList) {
            setList();
            setNextBtn();
        }
    }, [currentStage]);

    const setList = () => {
        let list = [];
        let startIndex = (settings.intervalCount * currentStage) + settings.startIndex;
        let endIndex = startIndex + settings.intervalCount;

        if (endIndex > settings.endIndex) {
            endIndex = settings.endIndex + 1
        }

        for (let i = startIndex; i < endIndex; i++) {
            list.push(dataList[i]);
        }
        
        setShowDataList(list);
    }

    const setNextBtn = () => {
        let stage = currentStage + 1
        setShowNextBtn(stage < stageCount);
    }
    
    const onClickNext = () => {
        setTestCount('')
        setFinish(false)
        setCurrentStage(currentStage + 1);
        setNextBtn();
        setIsTest(false);
    }

    const onClickTest = () => {
        setIsTest(true)
        setIsShowFlipCard(false)
    }

    const onSubmit = () => {
        setNextBtn()
        setFinish(true)
        submitRef.current.submit();
    }

    const onShowFlip = () => {
        setIsShowFlipCard(!isShowFlipCard)
    }

    return (<>
        <TopContainer>
          <Text>{currentStage + 1 + "/" + stageCount}</Text>
          {isTest && testCount !== "" ? (<Text>{testCount}</Text>) : <></>}
          <RightContainer>
            {!isTest ? <FlipCardButton 
                isFlipCard={isShowFlipCard} 
                onShowFlip={onShowFlip}>
            </FlipCardButton> : <></>}
            <TopButton 
                className='nextButton' 
                onClick={onClickNext}
                style={{display: isFinish && showNextBtn ? "inline" : "none"}}>다음
            </TopButton>
            <TopButton 
                className='testButton' 
                onClick={onClickTest}
                style={{display: !isTest ? "inline" : "none"}}>Test
            </TopButton>
            <TopButton
              className='submitButton' 
              onClick={onSubmit}
              style={{display: isTest && !isFinish ? "inline" : "none"}}>
              {isFinish ? "Retry" : "Submit"}
            </TopButton>
          </RightContainer>
        </TopContainer>
        {isShowFlipCard ?
        <FlipCard dataList={showDataList}></FlipCard> : 
        <ListComponent
            testMode={isTest ? settings.testMode : "none"}
            dataList={showDataList}
            isFinish={isFinish}
            testCount={setTestCount}
            ref={submitRef}>
        </ListComponent>}
    </>)
}