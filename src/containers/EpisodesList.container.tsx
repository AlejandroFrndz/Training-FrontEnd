import React, { useEffect } from 'react';
import { State } from '../redux/reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getEpisodes } from '../redux/actions/episodesActions';
import Loader from 'react-loader-spinner';
import EpisodeList from '../components/EpisodeList/EpisodeList.component';

const EpisodesListContainer: React.FC = () => {
  const dispatch = useDispatch();
  const episodes = useSelector((state: State) => state.episodes.episodes);
  const loading = useSelector((state: State) => state.episodes.loadingGet);

  useEffect(() => {
    dispatch(getEpisodes());
  }, []);

  if (loading) {
    return <Loader type="TailSpin" />;
  }

  return <EpisodeList episodes={episodes} />;
};

export default EpisodesListContainer;
