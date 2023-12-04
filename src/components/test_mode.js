import React, { useEffect, useRef, useState } from "react"

import ListComponent from "./list_component.js";
import styled from 'styled-components';

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  display: flex;
`;

const TopButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #0066ff;
  border: 0;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
`;

const CountContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 2px solid #079ad9;
    border-radius: 5px;
`;

const InfoText = styled.label`
    font-size: 0.8rem;
    color: #079ad9;
`;

export default function TestMode({settings, dataList}) {
    const [isFinish, setFinish] = useState(false)
    const [showDataList, setShowDataList] = useState([])
    const [testCount, setTestCount] = useState('')
    const submitRef = useRef()

    useEffect(() => {
        if (dataList) {
            setList();
        }
    }, [dataList]);

    const setList = () => {
        let list = [];

        for (let i = 0; i < dataList.length; i++) {
            list.push(dataList[i]);
        }
        list.sort(() => Math.random() - 0.5)
        setShowDataList(list);        
    }

    const onSubmit = () => {
        setFinish(!isFinish);
        if (isFinish) {
            setList();
        } else {
            submitRef.current.submit();
        }
    }

    return (<>
        <TopContainer>
            <LeftContainer>
                {isFinish ?
                <CountContainer>
                    <InfoText>맞은갯수</InfoText>
                    <InfoText>{testCount}</InfoText>
                </CountContainer> : <></>}
            </LeftContainer>
            <RightContainer>
                <TopButton
                    className='submitButton' 
                    onClick={onSubmit}>
                    {isFinish ? "Retry" : "Submit"}
                </TopButton>
            </RightContainer>
        </TopContainer>
        <ListComponent
            testMode={settings.testMode}
            dataList={showDataList}
            isFinish={isFinish}
            testCount={setTestCount}
            ref={submitRef}>
        </ListComponent>
    </>)
}