import CharactersService from '../../services/characters.service';
import { Character } from '../types';
import { Dispatch } from 'redux';

export enum ActionTypes {
  GET_CHARACTERS = 'getCharacters',
  UPDATE_CHARACTERS = 'updateCharacter',
  INCREASE_AMOUNT = 'increaseAmount'
}

interface GetCharactersAction {
  type: ActionTypes.GET_CHARACTERS;
  payload: Character[];
}

interface UpdateCharacterAction {
  type: ActionTypes.UPDATE_CHARACTERS;
  payload: Character;
}

interface IncreaseAmount {
  type: ActionTypes.INCREASE_AMOUNT;
  payload: number;
}

export type Action =
  | GetCharactersAction
  | UpdateCharacterAction
  | IncreaseAmount;

export const getCharacters = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await CharactersService.getAll();
      dispatch({
        type: ActionTypes.GET_CHARACTERS,
        payload: res.data
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateCharacter = (character: Character) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await CharactersService.update(character, character.id);
      dispatch({
        type: ActionTypes.UPDATE_CHARACTERS,
        payload: res.data
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const increaseAmount = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.INCREASE_AMOUNT,
      payload: amount
    });
  };
};
