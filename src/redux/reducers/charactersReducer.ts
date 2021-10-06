import { Action, ActionTypes } from '../actions/charactersActions';
import { State } from '../types';

const initialState: State = {
  characters: [],
  amount: 0
};

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_CHARACTERS:
      return {
        ...state,
        characters: [...action.payload]
      };
    case ActionTypes.UPDATE_CHARACTERS:
      return {
        ...state,
        characters: [
          ...state.characters.map((ele) =>
            ele.id === action.payload.id ? action.payload : ele
          )
        ]
      };

    case ActionTypes.INCREASE_AMOUNT:
      return {
        ...state,
        amount: state.amount + action.payload
      };

    default:
      return state;
  }
};

export default reducer;
