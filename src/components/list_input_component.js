import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`

const Input = styled.input`
    margin: 10px;
    border-radius: 5px;
    height: 20px;
    margin-right: 10px;
    padding-right: 10px;
`

const Meaning = styled.p`
    position: relative;
    top: -10px;
    left: 10px;
    font-size: 0.8rem;
    color: red;
`

export default function WordListInput({ text, isWord, isCorrect, isFinish }) {
    const inputRef = useRef()

    useEffect(() => {
        if (!isFinish && inputRef.current) {
            inputRef.current.value = ''
        }
    }, [isFinish])

    return (
        <Container>
            <Input
                ref={inputRef}
                className={isWord ? 'wordInput' : 'meaningInput'}
                type="text"
                style={
                    !isFinish
                        ? { borderColor: 'black' }
                        : { borderColor: isCorrect ? 'blue' : 'red' }
                }
            />
            <Meaning
                className="meaning"
                style={{ display: !isFinish || isCorrect ? 'none' : 'inline' }}
            >
                {text}
            </Meaning>
        </Container>
    )
}
