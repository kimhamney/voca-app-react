import { LiaListOlSolid } from "react-icons/lia";
import { PiCardsDuotone } from "react-icons/pi";
import React from "react"
import styled from 'styled-components';

const FlipBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: #3457D5;
  border: 0;
  border-radius: 10px;
  margin-right: 10px;
  color: #fff;
  cursor: pointer;
`;

export default function FlipCardButton({isFlipCard, onShowFlip}) {
    return (
        <FlipBtn 
            onClick={onShowFlip}>
            {!isFlipCard ? 
                <PiCardsDuotone 
                    fontSize="1.5em" 
                    style={{backgroundColor: "transparent"}}/> :
                <LiaListOlSolid
                    fontSize="1.5rem" 
                    style={{backgroundColor: "transparent"}}/>}
        </FlipBtn>
    )
}