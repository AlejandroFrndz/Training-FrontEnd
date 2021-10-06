import { Action, ActionTypes } from '../actions/charactersActions';
import { State } from '../types';

const initialState: State = {
  characters: [],
  loadingGet: false,
  errorGet: false,
  loadingUpdate: false,
  errorUpdate: false
};

// eslint-disable-next-line
const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_CHARACTERS:
      return {
        ...state,
        characters: [...action.payload],
        loadingGet: false
      };

    case ActionTypes.GET_CHARACTERS_PENDING:
      return {
        ...state,
        loadingGet: true
      };

    case ActionTypes.GET_CHARACTERS_ERROR:
      return {
        ...state,
        loadingGet: false,
        errorGet: true
      };

    case ActionTypes.UPDATE_CHARACTERS:
      return {
        ...state,
        characters: [
          ...state.characters.map((ele) =>
            ele.id === action.payload.id ? action.payload : ele
          )
        ],
        loadingUpdate: false
      };

    case ActionTypes.UPDATE_CHARACTERS_PENDING:
      return {
        ...state,
        loadingUpdate: true
      };

    case ActionTypes.UPDATE_CHARACTERS_ERROR:
      return {
        ...state,
        loadingUpdate: false,
        errorUpdate: true
      };

    default:
      return state;
  }
};

export default reducer;
