import { combineReducers } from 'redux';
import charactersReducer from './charactersReducer';
import episodesReducer from './episodesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  characters: charactersReducer,
  episodes: episodesReducer,
  auth: authReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
