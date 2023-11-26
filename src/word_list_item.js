import { HiMiniSpeakerWave } from "react-icons/hi2";
import WordListInput from "./word_list_input.js";
import styled from 'styled-components';

const List = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const Text = styled.label`
  margin: 10px;
  width: 50px;
  text-align: left;
`;

const PosText = styled.label`
  margin: 10px;
  width: 40px;
  text-align: center;
`;

const MeaningText = styled.label`
  margin: 10px;
  width: 30%;
  text-align: left;
`;

const SpeackerBtn = styled.button`
  position: relative;
  border: 1px;
  border-color: black;
  border-radius: 20px;
  background-color: pink;
  height: 50px;
  width: 50px;
  text-align: center;
  cursor:pointer;
`;

export default function WordListItem({testMode, index, word, isFinish}) {
  let isMeaning = testMode === "meaning";
  let text = isMeaning ? word.meaning : word.word
  let inputText = isMeaning ? word.word : word.meaning

  const onSpeech = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-US';
    speech.text = word.word;
    speech.volume = 1;
    speech.rate = 0.5;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  }

  const WordComponent = () => {
    switch(testMode)
    {
      case "none":
      case "word":
      case "meaning":
          return <Text>{text}</Text>
      case "sound":
        return <WordListInput 
          text={text} 
          isWord={true} 
          isCorrect={word.isCorrect} 
          isFinish={isFinish} />
      default: return
    }
  }

  const MeaningComponent = () => {
    switch(testMode)
    {
      case "word":
      case "meaning":
      case "sound":
        return <WordListInput 
          text={inputText} 
          isWord={false} 
          isCorrect={word.isCorrect} 
          isFinish={isFinish} />
      case "none":
        return <MeaningText>{word.meaning}</MeaningText>
      default: return
    }
  }

  return <div>
    <List>
      <Text>{index + 1}</Text>
      {!isMeaning ? (<SpeackerBtn onClick={onSpeech} tabIndex="-1">
        <HiMiniSpeakerWave />
      </SpeackerBtn>) :<></>}
      {WordComponent()}
      <PosText>{word.pos}</PosText>
      {MeaningComponent()}
    </List>
  </div>
    
}