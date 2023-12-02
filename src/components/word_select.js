import * as xlsx from 'xlsx';

import { HiOutlineUpload } from "react-icons/hi";
import React from "react"
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const WordContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #E1EBEE;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    height: 150px;
    margin: 10px;
    overflow-x: auto;
`;

const WordText = styled.label`
    width: 100%;
    font-weight: 600;
    font-size: 1.2rem;
    color: #13274F;
    margin: 10px 0 0 10px;
    text-align: center;
`;

const WordCard = styled.button`
    display: flex;
    width: 100px;
    height: 100px;
    margin: 10px;
	flex-grow: 0;
	flex-shrink: 0;
    border-radius: 10%;
    justify-content: center;
    align-items: center;
    background-color: #0066ff;
    border: 0;
`;

const CardText = styled.label`
    color: white;
    font-size: 1rem;
`;

const InputLabel = styled.label`
    display: flex;
    align-self: center;
    width: 100px;
    height: 70px;
    background-color: #0066ff;
    margin: 10px;
    border-radius: 8%;
    justify-content: center;
    align-items: center;
    &:hover {
        filter: brightness(1.1);
    }
`;

class Word {
    constructor(data) {
      this.word = data.word
      this.pos = data.pos
      this.meaning = data.meaning
      this.meaningArr = getFilterArr(data.meaning)
      this.isCorrect = false
      this.isPlaying = false
    }
}

const getFilterArr = (input) => {
    if (!input) {
        return []
    }

    let value = input.replace(/\s/g, '')
    let arr = value.split(/[^a-zA-Z가-힣]/).filter(Boolean)
    return arr
  }

const MIDDLE_WORD_COUNT = 15
const TOEFL_WORD_COUNT = 13
  
const getLocalData = (index, isMiddle) => {
    let fileNum = index + 1;
    let folder = isMiddle ? 'middle_word' : 'toefl_word'
    // let obj = require('../resources/' + folder + '/' + folder + '_' + fileNum + '.json')
    let obj = require('../resources/words_data_small.json')
    let json = JSON.parse(JSON.stringify(obj))
    let datas = json['data']
    let list = [];
  
    for (let i = 0; i < datas.length; i++) {
      let data = new Word(datas[i], false);
      list.push(data)
    }
    return list
}

export default function WordSelect(props) {
    const setList = (isMiddle) => {
        let list = [];
        let count = isMiddle ? MIDDLE_WORD_COUNT : TOEFL_WORD_COUNT;
        for (let i = 0; i < count; i++) {
            list.push(
                <WordCard key={i} onClick={() => onClickBtn(i, isMiddle)}>
                    <CardText>day {i+1}</CardText>
                </WordCard>
            )
        }
        return list;
    }

    const onClickBtn = (index, isMiddle) => {
        props.getDataList(getLocalData(index, isMiddle))
    }

    const onUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "string" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const datas = xlsx.utils.sheet_to_json(worksheet);
                const list = []
                for (let i = 0; i < datas.length; i++) {
                  if (!datas[i].word) {
                    console.log("excel error")
                    return;
                  }
                  
                  let data = new Word(datas[i], false);
                  list.push(data)
                }
                props.getDataList(list)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
         }
      }
    
    return (
        <Container>
            <WordContainer>
                <WordText>중고등 단어</WordText>
                <ListContainer>
                    {setList(true)}
                </ListContainer>
            </WordContainer>
            <WordContainer>
                <WordText>토플 단어</WordText>
                <ListContainer>
                    {setList(false)}
                </ListContainer>
            </WordContainer>
            <WordContainer>
                <WordText>엑셀 업로드</WordText>
                <InputLabel htmlFor="upload">
                    <HiOutlineUpload 
                        fontSize="2rem" 
                        style={{backgroundColor: "transparent", color: "white"}}/>
                    <input
                        type="file"
                        accept=".xlsx"
                        name="upload"
                        id="upload" 
                        onChange={onUploadFile}
                        hidden
                    />
                </InputLabel>
            </WordContainer>
        </Container>)
}