import ListItemComponent from "./list_item_component.js";
import styled from 'styled-components';

const ListContainer = styled.div`
  height: 75vh;
  overflow-y: scroll;
`;

export default function ListComponent({testMode, dataList, isFinish}) {
  return (
        <ListContainer>
          {dataList?.map((word, index) => 
            <ListItemComponent 
              key={index} 
              testMode={testMode}
              index={index} 
              word={word}
              isFinish={isFinish}>
            </ListItemComponent>)}
        </ListContainer>
  );
}

