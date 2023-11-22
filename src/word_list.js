import styled from 'styled-components';

const List = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  margin: 10px;
`;

const MeanContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px;
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

export default function WordList(props) {
    return <div>
        <List key={props.index}>
            <Text>{props.index + 1}</Text>
            <Text>{props.word.word}</Text>
            <Text>{props.word.pos}</Text>
            <MeanContainer>
                <Input className="input" type="text"></Input>
                <Meaning className="meaning">{props.word.meaning.map((data) => data + ". ")}</Meaning>
            </MeanContainer>
        </List>
      </div>
}