import React, { useState } from "react"

import WordList from "./word_list.js";
import WordSelect from "./word_select.js";

export default function Home() {
    const [dataList, setDataList] = useState(null);
    
    return (<>
        {!dataList ?
            <WordSelect getDataList={setDataList} /> : 
            <WordList getDataList={dataList} />}
        </>)
}