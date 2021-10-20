import { combineReducers } from 'redux';
import charactersReducer from './charactersReducer';
import episodesReducer from './episodesReducer';

const rootReducer = combineReducers({
  characters: charactersReducer,
  episodes: episodesReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
