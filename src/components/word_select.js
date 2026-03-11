import * as xlsx from 'xlsx'

import React, { useState } from 'react'

import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdFileDownload } from 'react-icons/md'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const WordContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #eee;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    height: 150px;
    margin: 10px;
    overflow-x: auto;
`

const WordText = styled.label`
    font-size: 1.2rem;
    color: #888888;
    text-align: center;
    font-weight: 600;
`

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
    cursor: pointer;
`

const CardText = styled.label`
    color: white;
    font-size: 1rem;
    cursor: pointer;
`

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
`

const DownloadContainer = styled.a`
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    text-decoration-line: none;
`

const DownloadText = styled.label`
    color: gray;
    font-size: 0.8rem;
`

const DownloadButton = styled.button`
    width: 70px;
    height: 30px;
`

const ErrorMessageText = styled.label`
    align-self: center;
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
`

class Word {
    constructor(data) {
        this.word = data.word
        this.pos = data.pos
        this.meaning = data.meaning
        this.meaningArr = getFilterArr(data.meaning)
        this.isCorrect = false
        this.isPlaying = false
        this.isFrench = false
    }
}

const getFilterArr = (input) => {
    if (!input) {
        return []
    }

    let value = input.replace(/\s/g, '')
    let arr = value.split(/[^a-zA-Z가-힣À-ÿ]/).filter(Boolean)
    return arr
}

const MIDDLE_WORD_COUNT = 15
const TOEFL_WORD_COUNT = 13
const FRENCH_WORD_COUNT = 20

const getLocalData = (index, type) => {
    let fileNum = String(index + 1).padStart(2, '0')
    let folder = ''

    if (type === 'middle') {
        folder = 'middle_word'
    } else if (type === 'toefl') {
        folder = 'toefl_word'
    } else if (type === 'french') {
        folder = 'french_word'
    }

    let obj = require(`../resources/${folder}/${folder}_${fileNum}.json`)
    let json = JSON.parse(JSON.stringify(obj))
    let datas = json['data']
    let list = []

    for (let i = 0; i < datas.length; i++) {
        let data = new Word(datas[i])
        data.isFrench = type === 'french'
        list.push(data)
    }

    return list
}

export default function WordSelect(props) {
    const [errorMessage, setErrorMessage] = useState('')

    const setList = (type) => {
        let list = []
        let count = 0

        if (type === 'middle') {
            count = MIDDLE_WORD_COUNT
        } else if (type === 'toefl') {
            count = TOEFL_WORD_COUNT
        } else if (type === 'french') {
            count = FRENCH_WORD_COUNT
        }

        for (let i = 0; i < count; i++) {
            list.push(
                <WordCard
                    key={`${type}-${i}`}
                    onClick={() => onClickBtn(i, type)}
                >
                    <CardText>day {i + 1}</CardText>
                </WordCard>
            )
        }

        return list
    }

    const onClickBtn = (index, type) => {
        props.getDataList(getLocalData(index, type))
    }

    const onUploadFile = (e) => {
        e.preventDefault()
        if (e.target.files) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const data = e.target.result
                    const workbook = xlsx.read(data, { type: 'array' })
                    const sheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[sheetName]
                    const datas = xlsx.utils.sheet_to_json(worksheet)
                    const list = []

                    for (let i = 0; i < datas.length; i++) {
                        if (!datas[i].word) {
                            ShowErrorMessage()
                            return
                        }

                        let data = new Word(datas[i])
                        list.push(data)
                    }

                    props.getDataList(list)
                } catch (e) {
                    ShowErrorMessage()
                    return
                }
            }

            if (e.target.files.length === 0) {
                ShowErrorMessage()
                return
            }

            reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    const ShowErrorMessage = () => {
        setErrorMessage('Please select the file again')
    }

    return (
        <Container>
            <WordContainer>
                <WordText>BASIC</WordText>
                <ListContainer>{setList('middle')}</ListContainer>
            </WordContainer>

            <WordContainer>
                <WordText>TOEFL</WordText>
                <ListContainer>{setList('toefl')}</ListContainer>
            </WordContainer>

            <WordContainer>
                <WordText>FRENCH</WordText>
                <ListContainer>{setList('french')}</ListContainer>
            </WordContainer>

            <WordContainer>
                <WordText>EXCEL</WordText>
                <InputLabel htmlFor="upload">
                    <FaCloudUploadAlt
                        fontSize="3rem"
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                        }}
                    />
                    <input
                        type="file"
                        accept=".xlsx"
                        name="upload"
                        id="upload"
                        onChange={onUploadFile}
                        hidden
                    />
                </InputLabel>

                <DownloadContainer
                    href="https://docs.google.com/uc?export=download&id=16FFN9jngsyKoV-e4Z6q9F3RFFMJlfHXA"
                    download
                    target="_blank"
                    rel="noreferrer"
                >
                    <DownloadButton>
                        <MdFileDownload
                            style={{
                                backgroundColor: 'transparent',
                                color: 'gray',
                            }}
                        />
                        <DownloadText>Form</DownloadText>
                    </DownloadButton>
                </DownloadContainer>

                <ErrorMessageText>{errorMessage}</ErrorMessageText>
            </WordContainer>
        </Container>
    )
}
