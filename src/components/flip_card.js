import React, { useState } from "react"

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styled from 'styled-components';

const Text = styled.div`
    font-size: 1.5rem;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const FrontCard = styled.div`
    position: relative;
    width: 400px;
    height: 40vh;
    background-color: #F0F8FF;
    border: 0;
    border-radius: .5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    user-select: none;
`;

const BackCard = styled.div`
    position: relative;
    width: 400px;
    height: 40vh;
    background-color: #AFDBF5;
    border: 0;
    border-radius: .5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    user-select: none;
`;

const PrevBtn = styled.button`
    margin-right: 10px;
    display: inline-block;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 0;
    background-color: #0066ff;
    cursor: pointer;
`;

const NextBtn = styled.button`
    margin-left: 10px;
    display: inline-block;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 0;
    background-color: #0066ff;
    cursor: pointer;
`;

const CardText = styled.label`
    display: flex;
    height: 100%;
    text-align: center;
    font-size: 3rem;
    font-weight: 600 !important;
    padding: 0 10px 0 10px;
    justify-content: center;
    align-items: center;
`;

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 10px;
`;

export default function FlipCard({dataList}) {
    const [isFlip, setIsFlip] = useState(false); 
    const [cardIndex, setCardIndex] = useState(0);
    
    let card = dataList[cardIndex];
    
    const onCardClick = () => {
        setIsFlip(!isFlip)
    }

    const onBtnClick = (isFront) => {
        let index = cardIndex;
        if (isFront) {
            index--;
            if (index < 0)
                index = dataList.length - 1;
        } else {
            index++;
            if (index >= dataList.length)
                index = 0;
        }
        
        card = (dataList[index])
        setCardIndex(index)

        setIsFlip(false)
    }
  
    return (<>
        <Container>
            <FrontCard 
                onClick={onCardClick}
                style={{display: isFlip ? "none" : "block"}}>
                <CardText>{card?.word}</CardText>
            </FrontCard>
            <BackCard 
                onClick={onCardClick} 
                style={{display: !isFlip ? "none" : "block"}}>
                <CardText>{card?.meaning}</CardText>
            </BackCard>
        </Container>
        <BottomContainer>
            <PrevBtn onClick={() => onBtnClick(true)}>
                <IoIosArrowBack 
                    color="white" 
                    fontSize="1.5em" 
                    style={{backgroundColor: "transparent"}}/>
            </PrevBtn>
            <Text>{cardIndex + 1} / {dataList.length}</Text>
            <NextBtn onClick={() => onBtnClick(false)}>
                <IoIosArrowForward 
                    color="white" 
                    fontSize="1.5em" 
                    style={{backgroundColor: "transparent"}}/>
            </NextBtn>
        </BottomContainer>
    </>)
  }