import { CharacterActionTypes } from '../../../redux/actions/charactersActions';
import characterReducer from '../../../redux/reducers/charactersReducer';
import { EpisodeActionTypes } from '../../../redux/actions/episodesActions';
import episodeReducer from '../../../redux/reducers/episodesReducer';
import { CharacterState, EpisodeState, Episode } from '../../../redux/types';

describe('Characters Reducer', () => {
  const prevState: CharacterState = {
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
    errorUpdate: false,
    immortalCharacter: 0
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
        type: CharacterActionTypes.GET_CHARACTERS_PENDING
      });

      expect(newState).toMatchObject({ ...prevState, loadingGet: true });
    });

    test('Get Characters', () => {
      const newState = characterReducer(prevState, {
        type: CharacterActionTypes.GET_CHARACTERS,
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
        type: CharacterActionTypes.GET_CHARACTERS_ERROR
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
        type: CharacterActionTypes.UPDATE_CHARACTERS_PENDING
      });

      expect(newState).toMatchObject({ ...prevState, loadingUpdate: true });
    });

    test('Update Character', () => {
      const newState = characterReducer(prevState, {
        type: CharacterActionTypes.UPDATE_CHARACTERS,
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
        type: CharacterActionTypes.UPDATE_CHARACTERS_ERROR
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
      type: CharacterActionTypes.CREATE_CHARACTER,
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
      type: CharacterActionTypes.DELETE_CHARACTER,
      payload: deleteId
    });

    expect(newState).toMatchObject({
      ...prevState,
      characters: [prevState.characters[1]]
    });
  });

  test('Set immortal character', () => {
    const immortalId = 96;

    const newState = characterReducer(prevState, {
      type: CharacterActionTypes.GET_IMMORTAL_CHARACTER,
      payload: immortalId
    });

    expect(newState).toMatchObject({
      ...prevState,
      immortalCharacter: immortalId
    });
  });
});

describe('Episodes reducer', () => {
  const prevState: EpisodeState = {
    episodes: [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        seen: false
      },
      {
        id: 2,
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        seen: false
      }
    ],
    loadingGet: false,
    errorGet: false,
    loadingUpdate: false,
    errorUpdate: false
  };

  describe('Get Episodes', () => {
    const newEpisodes: Episode[] = [
      {
        id: 3,
        name: 'Anatomy Park',
        air_date: 'December 16, 2013',
        episode: 'S01E03',
        seen: false
      },
      {
        id: 4,
        name: 'M. Night Shaym-Aliens!',
        air_date: 'January 13, 2014',
        episode: 'S01E04',
        seen: false
      }
    ];

    test('Get Episodes Pending', () => {
      const newState = episodeReducer(prevState, {
        type: EpisodeActionTypes.GET_EPISODES_PENDING
      });

      expect(newState).toMatchObject({ ...prevState, loadingGet: true });
    });

    test('Get Episodes', () => {
      const newState = episodeReducer(prevState, {
        type: EpisodeActionTypes.GET_EPISODES,
        payload: newEpisodes
      });

      expect(newState).toMatchObject({
        ...prevState,
        loadingGet: false,
        episodes: newEpisodes
      });
    });

    test('Get Episodes Error', () => {
      const newState = episodeReducer(prevState, {
        type: EpisodeActionTypes.GET_EPISODES_ERROR
      });

      expect(newState).toMatchObject({
        ...prevState,
        loadingGet: false,
        errorGet: true
      });
    });
  });

  describe('Update Episode', () => {
    const newEpisode: Episode = {
      id: 3,
      name: 'Anatomy Park',
      air_date: 'December 16, 2013',
      episode: 'S01E03',
      seen: false
    };

    test('Update Episode Pending', () => {
      const newState = episodeReducer(prevState, {
        type: EpisodeActionTypes.UPDATE_EPISODE_PENDING
      });

      expect(newState).toMatchObject({ ...prevState, loadingUpdate: true });
    });

    test('Update Episode', () => {
      const newState = episodeReducer(prevState, {
        type: EpisodeActionTypes.UPDATE_EPISODE,
        payload: newEpisode
      });

      expect(newState).toMatchObject({
        ...prevState,
        loadingUpdate: false,
        episodes: prevState.episodes.map((ele) =>
          ele.id === newEpisode.id ? newEpisode : ele
        )
      });
    });

    test('Update Episode Error', () => {
      const newState = episodeReducer(prevState, {
        type: EpisodeActionTypes.UPDATE_EPISODE_ERROR
      });

      expect(newState).toMatchObject({
        ...prevState,
        loadingUpdate: false,
        errorUpdate: true
      });
    });
  });
});
