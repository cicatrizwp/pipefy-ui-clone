import React, { useState } from 'react';
import { loadLists }from '../../services/api';
import produce from 'immer';

import { Container } from './styles';
import List from '../List';

import BoardContext from './context';

const data = loadLists();

function Board() {
  const move = (fromList, toList, from, to) => {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  };

  const [lists, setLists] = useState(data);
  
  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}

export default Board;