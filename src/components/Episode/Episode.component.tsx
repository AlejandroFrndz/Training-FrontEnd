import React from 'react';
import { Episode } from '../../redux/types';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

interface Props {
  episode: Episode;
  seen: boolean;
  hovered: boolean;
  season: string;
  num: string;
  loading: boolean;
  handleSeen: () => void;
  handleHover: () => void;
}

const EpisodeComponent: React.FC<Props> = (props) => {
  const {
    episode,
    seen,
    hovered,
    season,
    num,
    loading,
    handleSeen,
    handleHover
  } = props;

  const { t } = useTranslation('common');

  const computeIcon = () => {
    if (loading) {
      return <span className="spinner-border spinner-border-sm"></span>;
    }
    if (seen) {
      return hovered ? <AiFillEyeInvisible /> : <AiFillEye />;
    } else {
      return hovered ? <AiFillEye /> : <AiFillEyeInvisible />;
    }
  };

  const airDateSplit = episode.air_date.split(' ');

  return (
    <>
      <div className={`card ${seen ? 'bg-secondary' : 'bg-dark'} text-white`}>
        <div className="card-header text-center">
          {t(`episodeInfo.Titles.${episode.name}`)}
        </div>
        <div className="card-body">
          <p>
            {t('episodeInfo.Season') + ' ' + season}{' '}
            {t('episodeInfo.Episode') + ' ' + num}
          </p>
          <button
            onClick={handleSeen}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            disabled={loading}
          >
            {computeIcon()}
          </button>
        </div>
        <div className="card-footer">
          {t(`months.${airDateSplit[0]}`) +
            ' ' +
            airDateSplit[1] +
            ' ' +
            airDateSplit[2]}
        </div>
      </div>
    </>
  );
};

export default EpisodeComponent;
