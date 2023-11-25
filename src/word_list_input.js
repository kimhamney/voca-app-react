import styled from 'styled-components';

const Container = styled.div`
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

export default function WordListInput({text, isWord, isCorrect, isFinish}) {
    return <Container>
        <Input
          className={isWord ? "wordInput" : "meaningInput"}
          type="text" 
          style={!isFinish ? {borderColor : "black"} : 
                             {borderColor : isCorrect ? "blue" : "red"}}>
        </Input>
        <Meaning 
          className="meaning" 
          style={{display : !isFinish || isCorrect ? "none" : "inline"}}>
            {text}
        </Meaning>
    </Container>
}