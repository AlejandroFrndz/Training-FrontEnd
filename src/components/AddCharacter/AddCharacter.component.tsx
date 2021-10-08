import React from 'react';
import { NewCharacter } from '../../redux/types';

interface Props {
  handleSubmit: (character: NewCharacter) => void;
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
    <form onSubmit={onSubmit}>
      <div className="form-group mb-2">
        <label htmlFor="name" className="ps-1 pe-1 h4">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          className="form-control"
          required
          value={name}
          onChange={(target) => setName(target.currentTarget.value)}
        />
      </div>

      <div className="form-group mb-2">
        <h4>Status</h4>

        <div className="form-check form-check-inline">
          <label
            htmlFor="Alive"
            className="form-check-label bg-light ps-1 pe-1"
          >
            Alive
          </label>
          <input
            type="radio"
            id="Alive"
            name="status"
            className="form-check-input"
            value="Alive"
            checked={status === 'Alive'}
            onChange={(target) => setStatus(target.currentTarget.value)}
          />
        </div>

        <div className="form-check form-check-inline">
          <label htmlFor="Dead" className="form-check-label bg-light ps-1 pe-1">
            Dead
          </label>
          <input
            type="radio"
            id="Dead"
            name="status"
            className="form-check-input"
            checked={status === 'Dead'}
            value="Dead"
            onChange={(target) => setStatus(target.currentTarget.value)}
          />
        </div>
      </div>

      <div className="form-group mb-2">
        <label htmlFor="species" className="h4 ps-1 pe-1 mb-2">
          Species
        </label>
        <input
          type="text"
          id="species"
          name="species"
          placeholder="Species"
          className="form-control"
          value={species}
          onChange={(target) => setSpecies(target.currentTarget.value)}
        />
      </div>

      <div className="form-group mb-2">
        <h4>Gender</h4>

        <div className="form-check form-check-inline">
          <label
            htmlFor="female"
            className="form-check-label bg-light ps-1 pe-1"
          >
            Female
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            className="form-check-input"
            value="Female"
            checked={gender === 'Female'}
            onChange={(target) => setGender(target.currentTarget.value)}
          />
        </div>

        <div className="form-check form-check-inline">
          <label htmlFor="male" className="form-check-label bg-light ps-1 pe-1">
            Male
          </label>
          <input
            type="radio"
            id="male"
            name="gender"
            className="form-check-input"
            value="Male"
            checked={gender === 'Male'}
            onChange={(target) => setGender(target.currentTarget.value)}
          />
        </div>

        <div className="form-check form-check-inline">
          <label
            htmlFor="unknown"
            className="form-check-label bg-light ps-1 pe-1"
          >
            Unknown
          </label>
          <input
            type="radio"
            id="unknown"
            name="gender"
            className="form-check-input"
            value="Unknown"
            checked={gender === 'Unknown'}
            onChange={(target) => setGender(target.currentTarget.value)}
          />
        </div>
      </div>

      <div className="form-group mb-2">
        <label htmlFor="image" className="h4 ps-1 pe-1 mb-2">
          Image
        </label>
        <input
          type="text"
          placeholder="Image URL"
          id="image"
          name="image"
          className="form-control"
          required
          value={image}
          onChange={(target) => setImage(target.currentTarget.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Character
      </button>
    </form>
  );
};

export default AddCharacter;
