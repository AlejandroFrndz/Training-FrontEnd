import CharactersService from '../../services/characters.service';
import { Character, NewCharacter } from '../types';
import { Dispatch } from 'redux';

export enum ActionTypes {
  GET_CHARACTERS = 'getCharacters',
  GET_CHARACTERS_PENDING = 'getCharactersPending',
  GET_CHARACTERS_ERROR = 'getCharactersError',
  UPDATE_CHARACTERS = 'updateCharacter',
  UPDATE_CHARACTERS_PENDING = 'updateCharactersPending',
  UPDATE_CHARACTERS_ERROR = 'updateCharactersError',
  CREATE_CHARACTER = 'createCharacter',
  DELETE_CHARACTER = 'deleteCharacter'
}

interface GetCharactersAction {
  type: ActionTypes.GET_CHARACTERS;
  payload: Character[];
}

interface GetCharactersPendingAction {
  type: ActionTypes.GET_CHARACTERS_PENDING;
}

interface GetCharactersErrorAction {
  type: ActionTypes.GET_CHARACTERS_ERROR;
}

interface UpdateCharacterAction {
  type: ActionTypes.UPDATE_CHARACTERS;
  payload: Character;
}

interface UpdateCharacterPendingAction {
  type: ActionTypes.UPDATE_CHARACTERS_PENDING;
}

interface UpdateCharacterErrorAction {
  type: ActionTypes.UPDATE_CHARACTERS_ERROR;
}

interface CreateCharacterAction {
  type: ActionTypes.CREATE_CHARACTER;
  payload: Character;
}

interface DeleteCharacterAction {
  type: ActionTypes.DELETE_CHARACTER;
  payload: number;
}

export type Action =
  | GetCharactersAction
  | GetCharactersPendingAction
  | GetCharactersErrorAction
  | UpdateCharacterAction
  | UpdateCharacterPendingAction
  | UpdateCharacterErrorAction
  | CreateCharacterAction
  | DeleteCharacterAction;

// eslint-disable-next-line
export const getCharacters = () => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.GET_CHARACTERS_PENDING
    });
    try {
      const res = await CharactersService.getAll();
      dispatch({
        type: ActionTypes.GET_CHARACTERS,
        payload: res.data
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ActionTypes.GET_CHARACTERS_ERROR
      });
    }
  };
};

// eslint-disable-next-line
export const updateCharacter = (character: Character) => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.UPDATE_CHARACTERS_PENDING
    });
    try {
      const res = await CharactersService.update(character, character.id);
      dispatch({
        type: ActionTypes.UPDATE_CHARACTERS,
        payload: res.data
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ActionTypes.UPDATE_CHARACTERS_ERROR
      });
    }
  };
};

// eslint-disable-next-line
export const createCharacter = (newCharacter: NewCharacter) => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<Action>) => {
    const res = await CharactersService.create(newCharacter);
    dispatch({
      type: ActionTypes.CREATE_CHARACTER,
      payload: res.data
    });
  };
};

// eslint-disable-next-line
export const deleteCharacter = (id: number) => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<Action>) => {
    // eslint-disable-next-line
    const res = await CharactersService.delete(id);
    dispatch({
      type: ActionTypes.DELETE_CHARACTER,
      payload: id
    });
  };
};
