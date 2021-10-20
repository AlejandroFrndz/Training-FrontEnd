import React from 'react';
import { Episode } from '../../redux/types';
import EpisodeContainer from '../../containers/Episode.container';

interface Props {
  episodes: Episode[];
}
const EpisodeList: React.FC<Props> = (props) => {
  const { episodes } = props;

  return (
    <div className="container">
      <div className="row justify-content-center">
        {episodes.length > 0
          ? episodes.map((episode) => {
              return (
                <div className="col-3" key={episode.id}>
                  <EpisodeContainer episode={episode} />
                </div>
              );
            })
          : 'Never'}
      </div>
    </div>
  );
};

export default EpisodeList;
