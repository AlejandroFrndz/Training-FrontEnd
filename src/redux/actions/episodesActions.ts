import EpisodeService from '../../services/episode.service';
import { Episode } from '../types';
import { Dispatch } from 'redux';

export enum EpisodeActionTypes {
  GET_EPISODES = 'getEpisodes',
  GET_EPISODES_PENDING = 'getEpisodesPending',
  GET_EPISODES_ERROR = 'getEpisodesError',
  UPDATE_EPISODE = 'updateEpisode',
  UPDATE_EPISODE_PENDING = 'updateEpisodePending',
  UPDATE_EPISODE_ERROR = 'updateEpisodeError'
}

interface GetEpisodesAction {
  type: EpisodeActionTypes.GET_EPISODES;
  payload: Episode[];
}

interface GetEpisodesPendingAction {
  type: EpisodeActionTypes.GET_EPISODES_PENDING;
}

interface GetEpisodesErrorAction {
  type: EpisodeActionTypes.GET_EPISODES_ERROR;
}

interface UpdateEpisodeAction {
  type: EpisodeActionTypes.UPDATE_EPISODE;
  payload: Episode;
}

interface UpdateEpisodePendingAction {
  type: EpisodeActionTypes.UPDATE_EPISODE_PENDING;
}

interface UpdateEpisodeErrorAction {
  type: EpisodeActionTypes.UPDATE_EPISODE_ERROR;
}

export type EpisodeAction =
  | GetEpisodesAction
  | GetEpisodesPendingAction
  | GetEpisodesErrorAction
  | UpdateEpisodeAction
  | UpdateEpisodePendingAction
  | UpdateEpisodeErrorAction;

//eslint-disable-next-line
export const getEpisodes = () => {
  //eslint-disable-next-line
  return async (dispatch: Dispatch<EpisodeAction>) => {
    dispatch({
      type: EpisodeActionTypes.GET_EPISODES_PENDING
    });

    try {
      const res = await EpisodeService.getAll();
      dispatch({
        type: EpisodeActionTypes.GET_EPISODES,
        payload: res.data
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: EpisodeActionTypes.GET_EPISODES_ERROR
      });
    }
  };
};

// eslint-disable-netx-line
export const updateEpisode = (episode: Episode) => {
  //eslint-disable-next-line
  return async (dispatch: Dispatch<EpisodeAction>) => {
    dispatch({
      type: EpisodeActionTypes.UPDATE_EPISODE_PENDING
    });

    try {
      const res = await EpisodeService.update(episode, episode.id);
      dispatch({
        type: EpisodeActionTypes.UPDATE_EPISODE,
        payload: res.data
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: EpisodeActionTypes.UPDATE_EPISODE_ERROR
      });
    }
  };
};
