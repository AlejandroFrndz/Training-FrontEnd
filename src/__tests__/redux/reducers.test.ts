import { ActionTypes } from '../../redux/actions/charactersActions';
import characterReducer from '../../redux/reducers/charactersReducer';
import { State } from '../../redux/types';

describe('Characters Reducer', () => {
  const prevState: State = {
    characters: [
      {
        id: 5,
        name: 'Beth Smith',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Female',
        image: 'img-url'
      },
      {
        id: 6,
        name: 'Jerry Smith',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        image: 'img-url'
      }
    ],
    loadingGet: false,
    errorGet: false,
    loadingUpdate: false,
    errorUpdate: false
  };

  describe('Get Characters', () => {
    const newCharacters = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        image: 'img-url'
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        image: 'img-url'
      }
    ];

    test('Get Characters Pending', () => {
      const newState = characterReducer(prevState, {
        type: ActionTypes.GET_CHARACTERS_PENDING
      });

      expect(newState).toMatchObject({ ...prevState, loadingGet: true });
    });

    test('Get Characters', () => {
      const newState = characterReducer(prevState, {
        type: ActionTypes.GET_CHARACTERS,
        payload: newCharacters
      });

      expect(newState).toMatchObject({
        ...prevState,
        characters: newCharacters,
        loadingGet: false
      });
    });

    test('Get Characters Error', () => {
      const newState = characterReducer(prevState, {
        type: ActionTypes.GET_CHARACTERS_ERROR
      });

      expect(newState).toMatchObject({
        ...prevState,
        errorGet: true,
        loadingGet: false
      });
    });
  });

  describe('Update Character', () => {
    const newCharacter = {
      id: 5,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: 'img-url'
    };

    test('Update Character Pending', () => {
      const newState = characterReducer(prevState, {
        type: ActionTypes.UPDATE_CHARACTERS_PENDING
      });

      expect(newState).toMatchObject({ ...prevState, loadingUpdate: true });
    });

    test('Update Character', () => {
      const newState = characterReducer(prevState, {
        type: ActionTypes.UPDATE_CHARACTERS,
        payload: newCharacter
      });

      expect(newState).toMatchObject({
        ...prevState,
        characters: [
          newCharacter,
          {
            id: 6,
            name: 'Jerry Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            image: 'img-url'
          }
        ],
        loadingUpdate: false
      });
    });

    test('Update Character Error', () => {
      const newState = characterReducer(prevState, {
        type: ActionTypes.UPDATE_CHARACTERS_ERROR
      });

      expect(newState).toMatchObject({
        ...prevState,
        loadingUpdate: false,
        errorUpdate: true
      });
    });
  });

  test('Create Character', () => {
    const newCharacter = {
      id: 7,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: 'img-url'
    };

    const newState = characterReducer(prevState, {
      type: ActionTypes.CREATE_CHARACTER,
      payload: newCharacter
    });

    expect(newState).toMatchObject({
      ...prevState,
      characters: [...prevState.characters, newCharacter]
    });
  });

  test('Delete Character', () => {
    const deleteId = 5;

    const newState = characterReducer(prevState, {
      type: ActionTypes.DELETE_CHARACTER,
      payload: deleteId
    });

    expect(newState).toMatchObject({
      ...prevState,
      characters: [prevState.characters[1]]
    });
  });
});
