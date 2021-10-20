import { EpisodeAction, EpisodeActionTypes } from '../actions/episodesActions';
import { EpisodeState } from '../types';

const initialState: EpisodeState = {
  episodes: [],
  loadingGet: true,
  errorGet: false,
  loadingUpdate: false,
  errorUpdate: false
};

//eslint-disable-next-line
const reducer = (state: EpisodeState = initialState, action: EpisodeAction) => {
  switch (action.type) {
    case EpisodeActionTypes.GET_EPISODES:
      return { ...state, episodes: [...action.payload], loadingGet: false };

    case EpisodeActionTypes.GET_EPISODES_PENDING:
      return { ...state, loadingGet: true };

    case EpisodeActionTypes.GET_EPISODES_ERROR:
      return { ...state, loadingGet: false, errorGet: true };

    case EpisodeActionTypes.UPDATE_EPISODE:
      return {
        ...state,
        episodes: state.episodes.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        ),
        loadingUpdate: false
      };

    case EpisodeActionTypes.UPDATE_EPISODE_PENDING:
      return { ...state, loadingUpdate: true };

    case EpisodeActionTypes.UPDATE_EPISODE_ERROR:
      return { ...state, loadingUpdate: false, errorUpdate: true };

    default:
      return state;
  }
};

export default reducer;
