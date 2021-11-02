import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducers/rootReducer';
import Home from '../components/Home/Home.component';

const HomeContainer = () => {
  const characters = useSelector((state: State) => state.characters.characters);
  const immortalCharacter = useSelector(
    (state: State) => state.characters.immortalCharacter
  );

  return (
    <Home character={characters.find((e) => e.id === immortalCharacter)} />
  );
};

export default HomeContainer;
