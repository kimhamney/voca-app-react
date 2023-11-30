import { HiMiniSpeakerWave } from "react-icons/hi2";
import ListInputComponent from "./list_input_component.js";
import styled from 'styled-components';

const List = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: left;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 10px;
`;

const NumText = styled.label`
  margin: 10px;
  width: 50px;
  min-width: 50px;
  text-align: center;
`;

const WordText = styled.label`
  margin: 10px;
  padding-left: 10px;
  width: 100px;
  text-align: center;
`;

const PosText = styled.label`
  margin: 10px;
  width: 50px;
  text-align: center;
`;

const MeaningText = styled.label`
  margin: 10px;
  width: 30%;
  text-align: left;
`;

const SpeackerBtn = styled.button`
  position: relative;
  border: 0;
  border-radius: 10%;
  background-color: white;
  height: 30px;
  width: 30px;
  top: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
          return <WordText>{text}</WordText>
      case "sound":
        return <ListInputComponent 
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
        return <ListInputComponent 
          text={inputText} 
          isWord={false} 
          isCorrect={word.isCorrect} 
          isFinish={isFinish} />
      case "none":
        return <MeaningText>{word.meaning}</MeaningText>
      default: return
    }
  }

  return (
    <div>
      <List>
        <NumText>{index + 1}</NumText>
        {!isMeaning ? (
        <SpeackerBtn onClick={onSpeech} tabIndex="-1">
          <HiMiniSpeakerWave 
            fontSize="1.5em" 
            style={{backgroundColor: "transparent"}}/>
        </SpeackerBtn>) :<></>}
        {WordComponent()}
        <PosText>{word.pos}</PosText>
        {MeaningComponent()}
      </List>
    </div>)
}