import {
  CharacterAction,
  CharacterActionTypes
} from '../actions/charactersActions';
import { CharacterState } from '../types';

const initialState: CharacterState = {
  characters: [],
  loadingGet: true,
  errorGet: false,
  loadingUpdate: false,
  errorUpdate: false,
  immortalCharacter: 0
};

// eslint-disable-next-line
const reducer = (
  state: CharacterState = initialState,
  CharacterAction: CharacterAction
) => {
  switch (CharacterAction.type) {
    case CharacterActionTypes.GET_CHARACTERS:
      return {
        ...state,
        characters: [...CharacterAction.payload],
        loadingGet: false
      };

    case CharacterActionTypes.GET_CHARACTERS_PENDING:
      return {
        ...state,
        loadingGet: true
      };

    case CharacterActionTypes.GET_CHARACTERS_ERROR:
      return {
        ...state,
        loadingGet: false,
        errorGet: true
      };

    case CharacterActionTypes.UPDATE_CHARACTERS:
      return {
        ...state,
        characters: [
          ...state.characters.map((ele) =>
            ele.id === CharacterAction.payload.id
              ? CharacterAction.payload
              : ele
          )
        ],
        loadingUpdate: false
      };

    case CharacterActionTypes.UPDATE_CHARACTERS_PENDING:
      return {
        ...state,
        loadingUpdate: true
      };

    case CharacterActionTypes.UPDATE_CHARACTERS_ERROR:
      return {
        ...state,
        loadingUpdate: false,
        errorUpdate: true
      };

    case CharacterActionTypes.CREATE_CHARACTER:
      return {
        ...state,
        characters: [...state.characters, CharacterAction.payload]
      };

    case CharacterActionTypes.DELETE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter(
          (ele) => ele.id !== CharacterAction.payload
        )
      };

    case CharacterActionTypes.GET_IMMORTAL_CHARACTER:
      return {
        ...state,
        immortalCharacter: CharacterAction.payload
      };
    default:
      return state;
  }
};

export default reducer;
