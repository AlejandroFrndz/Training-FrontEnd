import CharactersService from '../../services/characters.service';
import { Character } from '../types';
import { Dispatch } from 'redux';

export enum CharacterActionTypes {
  GET_CHARACTERS = 'getCharacters',
  GET_CHARACTERS_PENDING = 'getCharactersPending',
  GET_CHARACTERS_ERROR = 'getCharactersError',
  UPDATE_CHARACTERS = 'updateCharacter',
  UPDATE_CHARACTERS_PENDING = 'updateCharactersPending',
  UPDATE_CHARACTERS_ERROR = 'updateCharactersError',
  CREATE_CHARACTER = 'createCharacter',
  DELETE_CHARACTER = 'deleteCharacter',
  GET_IMMORTAL_CHARACTER = 'getImmortalCharacter'
}

interface GetCharactersAction {
  type: CharacterActionTypes.GET_CHARACTERS;
  payload: Character[];
}

interface GetCharactersPendingAction {
  type: CharacterActionTypes.GET_CHARACTERS_PENDING;
}

interface GetCharactersErrorAction {
  type: CharacterActionTypes.GET_CHARACTERS_ERROR;
}

interface UpdateCharacterAction {
  type: CharacterActionTypes.UPDATE_CHARACTERS;
  payload: Character;
}

interface UpdateCharacterPendingAction {
  type: CharacterActionTypes.UPDATE_CHARACTERS_PENDING;
}

interface UpdateCharacterErrorAction {
  type: CharacterActionTypes.UPDATE_CHARACTERS_ERROR;
}

interface CreateCharacterAction {
  type: CharacterActionTypes.CREATE_CHARACTER;
  payload: Character;
}

interface DeleteCharacterAction {
  type: CharacterActionTypes.DELETE_CHARACTER;
  payload: number;
}

interface GetImmortalCharacter {
  type: CharacterActionTypes.GET_IMMORTAL_CHARACTER;
  payload: number;
}

export type CharacterAction =
  | GetCharactersAction
  | GetCharactersPendingAction
  | GetCharactersErrorAction
  | UpdateCharacterAction
  | UpdateCharacterPendingAction
  | UpdateCharacterErrorAction
  | CreateCharacterAction
  | DeleteCharacterAction
  | GetImmortalCharacter;

// eslint-disable-next-line
export const getCharacters = () => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<CharacterAction>) => {
    dispatch({
      type: CharacterActionTypes.GET_CHARACTERS_PENDING
    });
    try {
      const res = await CharactersService.getAll();
      dispatch({
        type: CharacterActionTypes.GET_CHARACTERS,
        payload: res.data
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: CharacterActionTypes.GET_CHARACTERS_ERROR
      });
    }
  };
};

// eslint-disable-next-line
export const updateCharacter = (character: Character) => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<CharacterAction>) => {
    dispatch({
      type: CharacterActionTypes.UPDATE_CHARACTERS_PENDING
    });
    try {
      if (character.id !== undefined) {
        const res = await CharactersService.update(character, character.id);
        dispatch({
          type: CharacterActionTypes.UPDATE_CHARACTERS,
          payload: res.data
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: CharacterActionTypes.UPDATE_CHARACTERS_ERROR
      });
    }
  };
};

// eslint-disable-next-line
export const createCharacter = (newCharacter: Character) => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<CharacterAction>) => {
    const res = await CharactersService.create(newCharacter);
    dispatch({
      type: CharacterActionTypes.CREATE_CHARACTER,
      payload: res.data
    });
  };
};

// eslint-disable-next-line
export const deleteCharacter = (id: number) => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<CharacterAction>) => {
    // eslint-disable-next-line
    const res = await CharactersService.delete(id);
    dispatch({
      type: CharacterActionTypes.DELETE_CHARACTER,
      payload: id
    });
  };
};

export const getImmortalCharacter = () => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<CharacterAction>) => {
    const res = await CharactersService.getImmortalCharacter();
    dispatch({
      type: CharacterActionTypes.GET_IMMORTAL_CHARACTER,
      payload: res.data.id
    });
  };
};
