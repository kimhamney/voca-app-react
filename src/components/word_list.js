import React, { useEffect, useState } from 'react'

import IntervalMode from './interval_mode.js'
import { IoIosArrowBack } from 'react-icons/io'
import ListMode from './list_mode.js'
import SettingComponent from './setting_component.js'
import TestModePage from './test_mode.js'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
`

const TopContainer = styled.div`
    margin-bottom: 5px;
    border-radius: 0.5rem;
    background-color: #eee;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
`

const BackButton = styled.div`
    width: 30px;
    height: 30px;
    color: #0066ff;
    text-align: center;
    padding-top: 7px;
    cursor: pointer;
`

export const Mode = {
    LIST: 'list',
    INTERVAL: 'interval',
    TEST: 'test',
}

export const TestMode = {
    NONE: 'none',
    WORD: 'word',
    MEANING: 'meaning',
    LISTENING: 'listening',
}

export default function WordList({ getDataList, clearData }) {
    const [dataList, setDataList] = useState([])
    const [currentTab, clickTab] = useState(Mode.LIST)
    const [settings, setSettings] = useState()

    useEffect(() => {
        setDataList(getDataList)
    }, [getDataList, dataList])

    const onClickTab = (mode) => {
        setSettings(null)
        clickTab(mode)
    }

    const onClickBack = () => {
        clearData()
    }

    const ModeComponent = () => {
        switch (currentTab) {
            case Mode.LIST:
                return <ListMode dataList={dataList} />
            case Mode.INTERVAL:
                return settings ? (
                    <IntervalMode
                        settings={settings}
                        dataList={dataList}
                    ></IntervalMode>
                ) : (
                    <SettingComponent
                        mode={Mode.INTERVAL}
                        dataCount={dataList.length}
                        setSettings={setSettings}
                    ></SettingComponent>
                )
            case Mode.TEST:
                return settings ? (
                    <TestModePage
                        settings={settings}
                        dataList={dataList}
                    ></TestModePage>
                ) : (
                    <SettingComponent
                        mode={Mode.TEST}
                        dataCount={dataList.length}
                        setSettings={setSettings}
                    ></SettingComponent>
                )
            default:
                return
        }
    }

    return (
        <>
            <Container>
                <TopContainer>
                    <div className="radio-inputs">
                        <BackButton onClick={onClickBack}>
                            <IoIosArrowBack
                                fontSize="1.5em"
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </BackButton>
                        <label
                            className="radio"
                            onClick={() => onClickTab(Mode.LIST)}
                        >
                            <input type="radio" name="radio" defaultChecked />
                            <span className="name">List</span>
                        </label>
                        <label
                            className="radio"
                            onClick={() => onClickTab(Mode.INTERVAL)}
                        >
                            <input type="radio" name="radio" />
                            <span className="name">Interval</span>
                        </label>
                        <label
                            className="radio"
                            onClick={() => onClickTab(Mode.TEST)}
                        >
                            <input type="radio" name="radio" />
                            <span className="name">Test</span>
                        </label>
                    </div>
                </TopContainer>
                {ModeComponent()}
            </Container>
        </>
    )
}
