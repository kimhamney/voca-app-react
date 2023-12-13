import React, { useEffect, useRef, useState } from 'react'

import FlipCard from './flip_card.js'
import FlipCardButton from './flip_card_button.js'
import ListComponent from './list_component.js'
import styled from 'styled-components'

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    padding-bottom: 5px;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`

const LeftContainer = styled.div`
    display: flex;
`

const RightContainer = styled.div`
    display: flex;
`

const TopButton = styled.button`
    width: 100px;
    height: 40px;
    background-color: #0066ff;
    border: 0;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
`

const StageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-right: 10px;
    border: 2px solid #079ad9;
    border-radius: 5px;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 2px solid #e62c51;
    border-radius: 5px;
`

const TimerText = styled.label`
    font-size: 0.9rem;
    color: #079ad9;
    margin-top: 10px;
    text-align: center;
`

const InfoText = styled.label`
    font-size: 0.8rem;
    color: #079ad9;
`

const ResultText = styled.label`
    font-size: 0.8rem;
    color: #e62c51;
`

export default function IntervalMode({ settings, dataList }) {
    const [isShowFlipCard, setIsShowFlipCard] = useState(false)
    const [isFinish, setFinish] = useState(false)
    const [showDataList, setShowDataList] = useState([])
    const [currentStage, setCurrentStage] = useState(0)
    const [showNextBtn, setShowNextBtn] = useState(false)
    const [isTest, setIsTest] = useState(false)
    const [testCount, setTestCount] = useState('')
    const [seconds, setSeconds] = useState(-1)
    const submitRef = useRef()

    const stageCount = Math.ceil(
        (settings.endIndex - settings.startIndex + 1) / settings.intervalCount
    )
    const timerCount = settings.minutes * 60

    useEffect(() => {
        if (dataList) {
            setList()
            setNextBtn()
        }
        setSeconds(timerCount)
    }, [dataList, currentStage])

    useEffect(() => {
        if (timerCount > 0 && seconds >= 0) {
            let timer = setInterval(() => {
                setSeconds((seconds) => seconds - 1)
            }, 1000)

            if (seconds === 0) {
                clearInterval(timer)
                endInterval()
            }
            return () => clearInterval(timer)
        }
    }, [seconds])

    const getTimeText = (time) => {
        const minutes = Number(Math.floor(time / 60))
        const seconds = Number(time % 60)

        const text = minutes + ':'
        if (seconds < 10) {
            return text + 0 + String(seconds)
        } else {
            return text + String(seconds)
        }
    }

    const endInterval = () => {
        if (seconds === 0) onClickTest()
    }

    const setList = () => {
        let list = []
        let startIndex =
            settings.intervalCount * currentStage + settings.startIndex
        let endIndex = startIndex + settings.intervalCount

        if (endIndex > settings.endIndex) {
            endIndex = settings.endIndex + 1
        }

        for (let i = startIndex; i < endIndex; i++) {
            list.push(dataList[i])
        }

        setShowDataList(list)
    }

    const setNextBtn = () => {
        let stage = currentStage + 1
        setShowNextBtn(stage < stageCount)
    }

    const onClickNext = () => {
        setTestCount('')
        setFinish(false)
        setCurrentStage(currentStage + 1)
        setNextBtn()
        setIsTest(false)
    }

    const onClickTest = () => {
        setIsTest(true)
        setIsShowFlipCard(false)
        showDataList.sort(() => Math.random() - 0.5)
    }

    const onSubmit = () => {
        setNextBtn()
        setFinish(true)
        submitRef.current.submit()
    }

    const onShowFlip = () => {
        setIsShowFlipCard(!isShowFlipCard)
    }

    return (
        <>
            <TopContainer>
                <LeftContainer>
                    <StageContainer>
                        <InfoText>Step</InfoText>
                        <InfoText>
                            {currentStage + 1} / {stageCount}
                        </InfoText>
                    </StageContainer>
                    {isTest && testCount !== '' ? (
                        <ResultContainer>
                            <ResultText>Result</ResultText>
                            <ResultText>{testCount}</ResultText>
                        </ResultContainer>
                    ) : (
                        <></>
                    )}
                </LeftContainer>
                <TimerText>
                    {!isTest && seconds > 0 ? getTimeText(seconds) : ''}
                </TimerText>
                <RightContainer>
                    {!isTest ? (
                        <FlipCardButton
                            isFlipCard={isShowFlipCard}
                            onShowFlip={onShowFlip}
                        ></FlipCardButton>
                    ) : (
                        <></>
                    )}
                    <TopButton
                        className="nextButton"
                        onClick={onClickNext}
                        style={{
                            display:
                                isFinish && showNextBtn ? 'inline' : 'none',
                        }}
                    >
                        Next
                    </TopButton>
                    <TopButton
                        className="testButton"
                        onClick={onClickTest}
                        style={{ display: !isTest ? 'inline' : 'none' }}
                    >
                        Test
                    </TopButton>
                    <TopButton
                        className="submitButton"
                        onClick={onSubmit}
                        style={{
                            display: isTest && !isFinish ? 'inline' : 'none',
                        }}
                    >
                        {isFinish ? 'Retry' : 'Submit'}
                    </TopButton>
                </RightContainer>
            </TopContainer>
            {isShowFlipCard ? (
                <FlipCard dataList={showDataList}></FlipCard>
            ) : (
                <ListComponent
                    testMode={isTest ? settings.testMode : 'none'}
                    dataList={showDataList}
                    isFinish={isFinish}
                    testCount={setTestCount}
                    ref={submitRef}
                ></ListComponent>
            )}
        </>
    )
}
