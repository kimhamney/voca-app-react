import React, { useEffect, useState } from "react"

import { HiMiniSpeakerWave } from "react-icons/hi2";
import styled from 'styled-components';

const List = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  margin: 10px;
  width: 30px;
`;

const MeanContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px;
  border-radius: 5px;
  height: 20px;
  width: 200px;
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

const SpeackerBtn = styled.button`
  position: relative;
  border: 0;
  background-color: transparent;
  height:10px;
  width: 100px;
  top: 15px;
  cursor:pointer;
`;

export default function WordList({index, word, finish}) {
  const onSpeech = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-US';
    speech.text = word.word;
    speech.volume = 1;
    speech.rate = 0.5;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  }

  return <div>
    <List>
      <Text>{index + 1}</Text>
      <Text>{word.word}</Text>
      <SpeackerBtn onClick={onSpeech} tabIndex="-1">
        <HiMiniSpeakerWave />
      </SpeackerBtn>
      <Text>{word.pos}</Text>
      <MeanContainer>
        <Input
          className="input" 
          type="text" 
          style={!finish ? {borderColor : "black"} : 
                {borderColor : word.isCorrect ? "blue" : "red"}}>
        </Input>
        <Meaning 
          className="meaning" 
          style={{display : !finish || word.isCorrect ? "none" : "inline"}}>
            {word.meaning.map((data) => data + ". ")}
        </Meaning>
      </MeanContainer>
    </List>
  </div>
    
}