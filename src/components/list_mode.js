import React, { useState } from 'react'

import FlipCard from './flip_card.js'
import FlipCardButton from './flip_card_button.js'
import ListComponent from './list_component.js'
import styled from 'styled-components'

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    width: 100%;
    height: 40px;
    padding-bottom: 5px;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`

export default function ListMode({ dataList }) {
    const [isShowFlipCard, setIsShowFlipCard] = useState(false)

    const onShowFlip = () => {
        setIsShowFlipCard(!isShowFlipCard)
    }

    return (
        <>
            <TopContainer>
                <FlipCardButton
                    isFlipCard={isShowFlipCard}
                    onShowFlip={onShowFlip}
                />
            </TopContainer>
            {isShowFlipCard ? (
                <FlipCard dataList={dataList}></FlipCard>
            ) : (
                <ListComponent
                    testMode={'none'}
                    dataList={dataList}
                    isFinish={false}
                ></ListComponent>
            )}
        </>
    )
}
