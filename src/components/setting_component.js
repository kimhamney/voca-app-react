import React, { useState } from "react"

import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 500px;
`;

const OptionContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: left;
    margin: 10px;
`;

const OptionText = styled.label`
    font-size: 1rem;
    margin: 0 10px 0 10px;
    width: 150px;
`;

const ModeSelectBtn = styled.button`
    width: 70px;
    height: 70px;
    border: 2px solid #079ad9;
    border-radius: 5px;
    margin: 1px;
    color: #079ad9;
`;

const Input = styled.input`
    border: 0;
    width: 100px;
    height: 30px;
    margin: 0 10px 0 10px;
    border: 2px solid #079ad9;
    border-radius: 5px;
`;

const SubmitContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

const SubmitBtn = styled.button`
    width: 100px;
    height: 50px;
    background-color: #0066ff;
    border: 0;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
`;

export const TestMode = {
    NONE: "none",
    WORD: "word",
    MEANING: "meaning",
    LISTENING: "listening",
}

const DEFAULT_START_INDEX = 1;
const DEFAULT_INTERVAL_COUNT = 20;
const DEFAULT_MINUTES = 10;

export default function SettingComponent({mode, dataCount, setSettings}) {
    const [testMode, setTestMode] = useState(TestMode.WORD);

    const [settings, setSetting] = useState({  
        testMode: TestMode.WORD,
        startIndex: DEFAULT_START_INDEX,
        endIndex: dataCount,
        intervalCount: DEFAULT_INTERVAL_COUNT,
        minutes: DEFAULT_MINUTES,
    })

    const onChange = (e) => {
        const { name, value } = e.target
 
        const inputs = {
            ...settings,  
            [name]: parseInt(value),
        }
        setSetting(inputs)
     }

    const onSubmit = () => {
        settings.testMode = testMode

        settings.startIndex--;
        settings.endIndex--;

        if (settings.startIndex < 1) {
            settings.startIndex = 0;
        } else if (settings.startIndex >= dataCount) {
            settings.startIndex = dataCount - 1;
        }

        if (settings.endIndex < 1) {
            settings.endIndex = 0;
        }
        
        // 범위를 올바로 입력해주세요 (1~count)
        // 단어 갯수를 올바로 입력해주세요 (최대 count)
        // 테스트 시간을 올바로 입력해주세요
        console.log(settings)
        setSettings(settings)
    }
    
    return (
        <Wrapper>
        <Container>
            <OptionContainer>
                <OptionText>모드</OptionText>
                <ModeSelectBtn 
                    className={testMode === TestMode.WORD ? "tabActive" : ""} 
                    onClick={() => setTestMode(TestMode.WORD)}>단어
                </ModeSelectBtn>
                <ModeSelectBtn
                    className={testMode === TestMode.MEANING ? "tabActive" : ""} 
                    onClick={() => setTestMode(TestMode.MEANING)}>뜻
                </ModeSelectBtn>
                <ModeSelectBtn
                    className={testMode === TestMode.LISTENING ? "tabActive" : ""} 
                    onClick={() => setTestMode(TestMode.LISTENING)}>듣기
                </ModeSelectBtn>
            </OptionContainer>
            
            <OptionContainer>
                <OptionText>범위</OptionText>
                <Input 
                    name="startIndex" 
                    type="number" 
                    min="1"
                    onChange={onChange}
                    placeholder={DEFAULT_START_INDEX}>
                </Input>~
                <Input 
                    name="endIndex" 
                    type="number" 
                    min="1" 
                    max={dataCount}
                    onChange={onChange}
                    placeholder={dataCount}>
                </Input>
            </OptionContainer>

            <OptionContainer style={{display : mode === "interval" ? "flex" : "none"}}>
                <OptionText>인터벌 단어 갯수</OptionText>
                <Input 
                    name="intervalCount"
                    type="number" 
                    min="1" 
                    max={dataCount}
                    onChange={onChange}
                    placeholder={DEFAULT_INTERVAL_COUNT}>
                </Input>
            </OptionContainer>
            <OptionContainer>
                <OptionText>테스트 시간(분)</OptionText>
                <Input
                    name="minutes"
                    type="number" 
                    min="1"
                    onChange={onChange}
                    placeholder={DEFAULT_MINUTES}>
                </Input>
            </OptionContainer>
            <SubmitContainer>
                <SubmitBtn onClick={onSubmit}>시작</SubmitBtn>
            </SubmitContainer>
        </Container>
        </Wrapper>
    )
}