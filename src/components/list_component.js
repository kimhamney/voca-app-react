import React, { forwardRef, useImperativeHandle } from "react"

import ListItemComponent from "./list_item_component.js";
import styled from 'styled-components';

const ListContainer = styled.div`
  height: 75vh;
  overflow-y: scroll;
`;

const getFilterArr = (input) => {
  let value = input.replace(/\s/g, '')
  let arr = value.split(/[^a-zA-Z가-힣]/).filter(Boolean)
  return arr
}

const checkWord = (words, inputs) => {
  if (!inputs || inputs.length === 0)
    return false;

  for (let i = 0; i < words.length; i++)
  {
    for (let j = 0; j < inputs.length; j++)
    {
      if (words[i] === inputs[j])
        return true
    }
  }
  return false
}

const ListComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    submit() {
      checkData();
    }
  }));

  const checkData = () => {
    let wordInputList = document.getElementsByClassName('wordInput')
    let meaningInputList = document.getElementsByClassName('meaningInput')
    let count = 0
    
    for (let i = 0; i < props.dataList.length; i++) {
      let meaningArr = props.dataList[i].meaningArr
      let inputArr = getFilterArr(meaningInputList[i].value)

      let isCorrect = false
      switch(props.testMode)
      {
        case "word":
          isCorrect = checkWord(meaningArr, inputArr)
          break
        case "listening":
          isCorrect = checkWord(meaningArr, inputArr) && 
          props.dataList[i].word === wordInputList[i].value;
          break
        case "meaning":
          isCorrect = props.dataList[i].word === meaningInputList[i].value;
          break
        default: break
      }
      props.dataList[i].isCorrect = isCorrect;
      
      if (isCorrect)
        count++
    }

    props.testCount(count + "/" + props.dataList.length);
  }

  return (
        <ListContainer>
          {props.dataList?.map((word, index) => 
            <ListItemComponent 
              key={index} 
              testMode={props.testMode}
              index={index} 
              word={word}
              isFinish={props.isFinish}>
            </ListItemComponent>)}
        </ListContainer>
  );
})

export default ListComponent
