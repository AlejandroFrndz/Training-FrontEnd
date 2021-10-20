import React, { useState } from 'react';
import EpisodeComponent from '../components/Episode/Episode.component';
import { Episode } from '../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateEpisode } from '../redux/actions/episodesActions';
import { State } from '../redux/reducers/rootReducer';

interface Props {
  episode: Episode;
}

const EpisodeContainer: React.FC<Props> = (props) => {
  const { episode } = props;
  const split = episode.episode.split(' ');
  const season = split[0][2];
  const num = split[1][1] !== '0' ? split[1][1] + split[1][2] : split[1][2];
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state: State) => state.episodes.loadingUpdate);

  const handleSeen = () => {
    dispatch(updateEpisode({ ...episode, seen: !episode.seen }));
  };

  const handleHover = () => {
    setHovered(!hovered);
  };

  return (
    <EpisodeComponent
      episode={episode}
      season={season}
      num={num}
      handleSeen={handleSeen}
      handleHover={handleHover}
      seen={episode.seen}
      hovered={hovered}
      loading={loading}
    />
  );
};

export default EpisodeContainer;
