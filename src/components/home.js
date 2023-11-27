import React, { useState } from "react"

import WordList from "./word_list.js";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    width: 100px;
    background-color: #0066ff;
    border: 0;
    border-radius: 10px;
    color: #fff;
    padding: 1em 1.5em;
    margin: 20px;
    cursor: pointer;
`;

export const TestMode = {
    NONE: "none",
    WORD: "word",
    MEANING: "meaning",
    SOUND: "sound",
  }

export default function Home() {
    const [testMode, setTestMode] = useState(TestMode.NONE)

    const onClickButton = (testMode) => {
        setTestMode(testMode)
    }
    
    return <>
        <Container>
            <Button onClick={() => onClickButton(TestMode.NONE)}>List</Button>
            <Button onClick={() => onClickButton(TestMode.MEANING)}>Interval</Button>
            <Button onClick={() => onClickButton(TestMode.SOUND)}>Test</Button>
        </Container>
        <WordList testMode={testMode} isInterval={false} />
    </>
}