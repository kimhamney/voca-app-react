import React, { useState } from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    width: 500px;
`

const OptionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px;
`

const OptionText = styled.label`
    font-size: 0.9rem;
    margin: 0 10px 0 10px;
    text-align: center;
    color: #079ad9;
    margin: 10px;
`

const ModeSelectBtn = styled.button`
    width: 80px;
    height: 80px;
    border: 2px solid #079ad9;
    border-radius: 5px;
    margin: 1px;
    color: #079ad9;
`

const Input = styled.input`
    border: 0;
    width: 100px;
    height: 30px;
    border: 2px solid #079ad9;
    border-radius: 5px;
    background-color: transparent;
`

const SubmitContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    flex-direction: column;
`

const SubmitBtn = styled.button`
    width: 100px;
    height: 50px;
    background-color: #0066ff;
    border: 0;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
`

const ErrorMessageText = styled.label`
    align-self: center;
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
`

export const TestMode = {
    NONE: 'none',
    WORD: 'word',
    MEANING: 'meaning',
    LISTENING: 'listening',
}

const DEFAULT_START_INDEX = 1
const DEFAULT_INTERVAL_COUNT = 20
const DEFAULT_MINUTES = 10

export default function SettingComponent({ mode, dataCount, setSettings }) {
    const [testMode, setTestMode] = useState(TestMode.WORD)
    const [errorMessage, setErrorMessage] = useState('')

    const [settings, setSetting] = useState({
        testMode: TestMode.WORD,
        startIndex: DEFAULT_START_INDEX,
        endIndex: dataCount,
        intervalCount: DEFAULT_INTERVAL_COUNT,
        minutes: DEFAULT_MINUTES,
    })

    const onChange = (e) => {
        const { name, value } = e.target

        const inputs = {
            ...settings,
            [name]: parseInt(value),
        }
        setSetting(inputs)
    }

    const onSubmit = () => {
        if (checkSettings()) {
            setSettings(settings)
        } else {
            ShowErrorMessage()
        }
    }

    const checkSettings = () => {
        settings.testMode = testMode

        settings.startIndex--
        settings.endIndex--

        if (settings.startIndex < 0) {
            settings.startIndex = 0
        } else if (settings.startIndex >= dataCount) {
            settings.startIndex = dataCount - 1
        }

        if (settings.endIndex >= dataCount) {
            settings.endIndex = dataCount - 1
        }

        if (settings.startIndex >= settings.endIndex) return false

        if (
            mode === 'interval' &&
            (settings.intervalCount <= 0 ||
                settings.intervalCount > dataCount ||
                settings.intervalCount >
                    settings.endIndex - settings.startIndex)
        )
            return false

        return true
    }

    const ShowErrorMessage = () => {
        setErrorMessage('Please enter a valid value')
    }

    return (
        <Wrapper>
            <Container>
                <OptionContainer>
                    <OptionText>Mode</OptionText>
                    <div>
                        <ModeSelectBtn
                            className={
                                testMode === TestMode.WORD ? 'tabActive' : ''
                            }
                            onClick={() => setTestMode(TestMode.WORD)}
                        >
                            Word
                        </ModeSelectBtn>
                        <ModeSelectBtn
                            className={
                                testMode === TestMode.MEANING ? 'tabActive' : ''
                            }
                            onClick={() => setTestMode(TestMode.MEANING)}
                        >
                            Meaning
                        </ModeSelectBtn>
                        <ModeSelectBtn
                            className={
                                testMode === TestMode.LISTENING
                                    ? 'tabActive'
                                    : ''
                            }
                            onClick={() => setTestMode(TestMode.LISTENING)}
                        >
                            Listening
                        </ModeSelectBtn>
                    </div>
                </OptionContainer>

                <OptionContainer>
                    <OptionText>Range</OptionText>
                    <div>
                        <Input
                            name="startIndex"
                            type="number"
                            min="1"
                            onChange={onChange}
                            placeholder={DEFAULT_START_INDEX}
                        ></Input>
                        <OptionText>~</OptionText>
                        <Input
                            name="endIndex"
                            type="number"
                            min="1"
                            max={dataCount}
                            onChange={onChange}
                            placeholder={dataCount}
                        ></Input>
                    </div>
                </OptionContainer>

                {mode === 'interval' ? (
                    <>
                        <OptionContainer
                            style={{
                                display: mode === 'interval' ? 'flex' : 'none',
                            }}
                        >
                            <OptionText>Interval word count</OptionText>
                            <Input
                                name="intervalCount"
                                type="number"
                                min="1"
                                max={dataCount}
                                onChange={onChange}
                                placeholder={DEFAULT_INTERVAL_COUNT}
                            ></Input>
                        </OptionContainer>
                        <OptionContainer>
                            <OptionText>Interval Time(minutes)</OptionText>
                            <Input
                                name="minutes"
                                type="number"
                                min="1"
                                onChange={onChange}
                                placeholder={DEFAULT_MINUTES}
                            ></Input>
                        </OptionContainer>
                    </>
                ) : (
                    <></>
                )}
                <SubmitContainer>
                    <SubmitBtn onClick={onSubmit}>Start</SubmitBtn>
                    <ErrorMessageText>{errorMessage}</ErrorMessageText>
                </SubmitContainer>
            </Container>
        </Wrapper>
    )
}
