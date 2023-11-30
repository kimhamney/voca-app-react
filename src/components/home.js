import React, { useState } from "react"

import WordList from "./word_list.js";
import WordSelect from "./word_select.js";

export default function Home() {
    const [dataList, setDataList] = useState(null);

    const getDataList = (data) => {
        setDataList(data);
    }
    
    return (<>
        {!dataList ?
            <WordSelect getDataList={getDataList} /> : 
            <WordList testMode={"none"} isInterval={false} getDataList={dataList} />}
        </>)
}