import React from 'react';
import { Character } from '../../redux/types';
import { useTranslation } from 'react-i18next';

interface Props {
  handleSubmit: (character: Character) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  species: string;
  setSpecies: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const AddCharacter: React.FC<Props> = (props) => {
  const {
    name,
    setName,
    status,
    setStatus,
    species,
    setSpecies,
    gender,
    setGender,
    image,
    setImage,
    handleSubmit
  } = props;

  const { t } = useTranslation('common');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit({
      name: name,
      status: status,
      species: species,
      gender: gender,
      image: image,
      type: ''
    });
  };

  return (
    <>
      <div className="row p-5" />
      <form
        onSubmit={onSubmit}
        data-testid="form"
        id="addCharacterForm"
        className=" bg-black text-white pt-3 pb-3 container rounded"
      >
        <div className="row mb-4">
          <div className="col-4" />
          <div className="form-group mb-2 col-4 text-center">
            <label htmlFor="name" className="ps-1 pe-1 h4">
              {t('characterInfo.name')}
            </label>
            <input
              type="text"
              placeholder={t('characterInfo.name')}
              id="name"
              name="name"
              className="form-control"
              required
              value={name}
              onChange={(target) => setName(target.currentTarget.value)}
              data-testid="nameInput"
            />
            <div className="col-4" />
          </div>
        </div>

        <div className="form-row text-center mb-4">
          <div className="form-group mb-2">
            <h4>{t('characterInfo.status.root')}</h4>

            <div className="form-check form-check-inline">
              <label htmlFor="Alive" className="form-check-label ps-1 pe-1">
                {t('characterInfo.status.Alive')}
              </label>
              <input
                type="radio"
                id="Alive"
                name="status"
                className="form-check-input"
                value="Alive"
                checked={status === 'Alive'}
                onChange={(target) => setStatus(target.currentTarget.value)}
                data-testid="statusAliveInput"
              />
            </div>

            <div className="form-check form-check-inline">
              <label htmlFor="Dead" className="form-check-label  ps-1 pe-1">
                {t('characterInfo.status.Dead')}
              </label>
              <input
                type="radio"
                id="Dead"
                name="status"
                className="form-check-input"
                checked={status === 'Dead'}
                value="Dead"
                onChange={(target) => setStatus(target.currentTarget.value)}
                data-testid="statusDeadInput"
              />
            </div>
          </div>
        </div>

        <div className="form-group mb-2 row mb-4">
          <div className="col-4" />
          <div className="col-4 text-center">
            <label htmlFor="species" className="h4 ps-1 pe-1 mb-2">
              {t('characterInfo.species.root')}
            </label>
            <input
              type="text"
              id="species"
              name="species"
              placeholder={t('characterInfo.species.root')}
              className="form-control"
              value={species}
              onChange={(target) => setSpecies(target.currentTarget.value)}
              data-testid="speciesInput"
            />
          </div>
          <div className="col-4" />
        </div>

        <div className="form-group mb-4 form-row text-center">
          <h4>{t('characterInfo.gender.root')}</h4>

          <div className="form-check form-check-inline">
            <label htmlFor="female" className="form-check-label  ps-1 pe-1">
              {t('characterInfo.gender.Female')}
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              className="form-check-input"
              value="Female"
              checked={gender === 'Female'}
              onChange={(target) => setGender(target.currentTarget.value)}
              data-testid="genderFemaleInput"
            />
          </div>

          <div className="form-check form-check-inline">
            <label htmlFor="male" className="form-check-label  ps-1 pe-1">
              {t('characterInfo.gender.Male')}
            </label>
            <input
              type="radio"
              id="male"
              name="gender"
              className="form-check-input"
              value="Male"
              checked={gender === 'Male'}
              onChange={(target) => setGender(target.currentTarget.value)}
              data-testid="genderMaleInput"
            />
          </div>

          <div className="form-check form-check-inline">
            <label htmlFor="unknown" className="form-check-label  ps-1 pe-1">
              {t('characterInfo.gender.Unknown')}
            </label>
            <input
              type="radio"
              id="unknown"
              name="gender"
              className="form-check-input"
              value="Unknown"
              checked={gender === 'Unknown'}
              onChange={(target) => setGender(target.currentTarget.value)}
              data-testid="genderUnknownInput"
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-4" />
          <div className="col-4 text-center">
            <div className="form-group mb-2">
              <label htmlFor="image" className="h4 ps-1 pe-1 mb-2">
                {t('characterInfo.image')}
              </label>
              <input
                type="text"
                placeholder={t('characterInfo.image')}
                id="image"
                name="image"
                className="form-control"
                required
                value={image}
                onChange={(target) => setImage(target.currentTarget.value)}
                data-testid="imageInput"
              />
            </div>
          </div>
          <div className="col-4" />
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg"
              id="submitButton"
            >
              {t('buttons.addCharacter')}
            </button>
          </div>
        </div>
      </form>
      <div className="row p-5" />
    </>
  );
};

export default AddCharacter;
