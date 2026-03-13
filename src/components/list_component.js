import React, { forwardRef, useImperativeHandle } from 'react'

import ListItemComponent from './list_item_component.js'
import styled from 'styled-components'

const ListContainer = styled.div`
    height: 80vh;
    overflow-y: scroll;
`

const normalize = (str = '') => {
    return str.toLowerCase().replace(/\s/g, '')
}

const getFilterArr = (input) => {
    let value = normalize(input)
    let arr = value.split(/[^a-zA-Z가-힣]/).filter(Boolean)
    return arr
}

const checkWord = (words, inputs) => {
    if (!inputs || inputs.length === 0) return false

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < inputs.length; j++) {
            if (normalize(words[i]) === normalize(inputs[j])) return true
        }
    }
    return false
}

const ListComponent = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        submit() {
            return checkData()
        },
    }))

    const checkData = () => {
        let wordInputList = document.getElementsByClassName('wordInput')
        let meaningInputList = document.getElementsByClassName('meaningInput')
        let count = 0
        let wrongList = []

        for (let i = 0; i < props.dataList.length; i++) {
            let meaningArr = props.dataList[i].meaningArr
            let inputArr = getFilterArr(meaningInputList[i].value)

            let isCorrect = false
            switch (props.testMode) {
                case 'word':
                    isCorrect = checkWord(meaningArr, inputArr)
                    break
                case 'listening':
                    isCorrect =
                        checkWord(meaningArr, inputArr) &&
                        normalize(props.dataList[i].word) ===
                            normalize(wordInputList[i].value)
                    break
                case 'meaning':
                    isCorrect =
                        normalize(props.dataList[i].word) ===
                        normalize(meaningInputList[i].value)
                    break
                default:
                    break
            }
            props.dataList[i].isCorrect = isCorrect

            if (isCorrect) {
                count++
            } else {
                wrongList.push(props.dataList[i])
            }
        }

        props.testCount(count + '/' + props.dataList.length)
        return wrongList
    }

    return (
        <ListContainer>
            {props.dataList?.map((word, index) => (
                <ListItemComponent
                    key={index}
                    testMode={props.testMode}
                    index={index}
                    word={word}
                    isFinish={props.isFinish}
                />
            ))}
        </ListContainer>
    )
})

export default ListComponent
