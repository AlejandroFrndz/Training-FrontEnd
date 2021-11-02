import http from '../../../http-common';
import {
  getCharacters,
  updateCharacter,
  createCharacter,
  deleteCharacter,
  CharacterActionTypes,
  getImmortalCharacter
} from '../../../redux/actions/charactersActions';
import {
  getEpisodes,
  updateEpisode,
  EpisodeActionTypes
} from '../../../redux/actions/episodesActions';
import { Character, Episode } from '../../../redux/types';

jest.mock('../../../http-common');
const mockHttp = http as jest.Mocked<typeof http>;

describe('Character Actions', () => {
  const dispatch = jest.fn();

  describe('Get Characters', () => {
    it('Gets characters', async () => {
      const fetchedCharacters: Character[] = [
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
      ];
      mockHttp.get.mockResolvedValueOnce({ data: fetchedCharacters });

      await getCharacters()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.GET_CHARACTERS_PENDING
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.GET_CHARACTERS,
        payload: fetchedCharacters
      });
    });

    it('Fails due to network error', async () => {
      mockHttp.get.mockRejectedValueOnce('Mocked Get Error');

      await getCharacters()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.GET_CHARACTERS_PENDING
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.GET_CHARACTERS_ERROR
      });
    });
  });

  describe('Update Character', () => {
    const newCharacter: Character = {
      id: 160,
      name: 'Updated Name',
      species: 'Updated Species',
      status: 'Alive',
      type: '',
      gender: 'Updated Gender',
      image: 'updated-img-url'
    };

    it('Updates character', async () => {
      mockHttp.put.mockResolvedValueOnce({ data: newCharacter });

      await updateCharacter(newCharacter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.UPDATE_CHARACTERS_PENDING
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.UPDATE_CHARACTERS,
        payload: newCharacter
      });
    });

    it('Fails due to network error', async () => {
      mockHttp.put.mockRejectedValueOnce('Mocked Update Error');

      await updateCharacter(newCharacter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.UPDATE_CHARACTERS_ERROR
      });
    });
  });

  describe('Create Character', () => {
    const newCharacter: Character = {
      name: 'Updated Name',
      species: 'Updated Species',
      status: 'Alive',
      type: '',
      gender: 'Updated Gender',
      image: 'updated-img-url'
    };

    it('Creates the characters', async () => {
      mockHttp.post.mockResolvedValueOnce({ data: newCharacter });

      await createCharacter(newCharacter)(dispatch);

      expect(dispatch).toHaveBeenLastCalledWith({
        type: CharacterActionTypes.CREATE_CHARACTER,
        payload: newCharacter
      });
    });
  });

  describe('Delete Character', () => {
    const id = 1;

    it('Deletes the character', async () => {
      mockHttp.delete.mockResolvedValueOnce(id);

      await deleteCharacter(id)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.DELETE_CHARACTER,
        payload: id
      });
    });
  });

  describe('Set immortal character', () => {
    const id = 96;

    it('Updates immortal character id', async () => {
      mockHttp.get.mockResolvedValueOnce({
        data: {
          id: id
        }
      });

      await getImmortalCharacter()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: CharacterActionTypes.GET_IMMORTAL_CHARACTER,
        payload: id
      });
    });
  });
});

describe('Episode Actions', () => {
  const dispatch = jest.fn();

  describe('Get episodes', () => {
    it('Gets the episodes', async () => {
      const fetchedEpisodes: Episode[] = [
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
      ];

      mockHttp.get.mockResolvedValueOnce({ data: fetchedEpisodes });

      await getEpisodes()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: EpisodeActionTypes.GET_EPISODES_PENDING
      });
      expect(dispatch).toHaveBeenLastCalledWith({
        type: EpisodeActionTypes.GET_EPISODES,
        payload: fetchedEpisodes
      });
    });

    it('Fails due to network error', async () => {
      mockHttp.get.mockRejectedValueOnce('Mocked episodes get error');

      await getEpisodes()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: EpisodeActionTypes.GET_EPISODES_PENDING
      });
      expect(dispatch).toHaveBeenLastCalledWith({
        type: EpisodeActionTypes.GET_EPISODES_ERROR
      });
    });
  });

  describe('Update episode', () => {
    const newEpisode: Episode = {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      seen: true
    };
    it('Updates the episode', async () => {
      mockHttp.put.mockResolvedValueOnce({ data: newEpisode });

      await updateEpisode(newEpisode)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: EpisodeActionTypes.UPDATE_EPISODE_PENDING
      });
      expect(dispatch).toHaveBeenLastCalledWith({
        type: EpisodeActionTypes.UPDATE_EPISODE,
        payload: newEpisode
      });
    });

    it('Fails due to network error', async () => {
      mockHttp.put.mockRejectedValueOnce('Mocked episode put error');

      await updateEpisode(newEpisode)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: EpisodeActionTypes.UPDATE_EPISODE_PENDING
      });
      expect(dispatch).toHaveBeenLastCalledWith({
        type: EpisodeActionTypes.UPDATE_EPISODE_ERROR
      });
    });
  });
});
