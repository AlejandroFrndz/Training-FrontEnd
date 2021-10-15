import http from '../../http-common';
import {
  getCharacters,
  updateCharacter,
  createCharacter,
  deleteCharacter,
  ActionTypes
} from '../../redux/actions/charactersActions';
import { Character, NewCharacter } from '../../redux/types';

jest.mock('../../http-common');
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
        type: ActionTypes.GET_CHARACTERS_PENDING
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.GET_CHARACTERS,
        payload: fetchedCharacters
      });
    });

    it('Fails due to network error', async () => {
      mockHttp.get.mockRejectedValueOnce('Mocked Get Error');

      await getCharacters()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.GET_CHARACTERS_PENDING
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.GET_CHARACTERS_ERROR
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
        type: ActionTypes.UPDATE_CHARACTERS_PENDING
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.UPDATE_CHARACTERS,
        payload: newCharacter
      });
    });

    it('Fails due to network error', async () => {
      mockHttp.put.mockRejectedValueOnce('Mocked Update Error');

      await updateCharacter(newCharacter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.UPDATE_CHARACTERS_ERROR
      });
    });
  });

  describe('Create Character', () => {
    const newCharacter: NewCharacter = {
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
        type: ActionTypes.CREATE_CHARACTER,
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
        type: ActionTypes.DELETE_CHARACTER,
        payload: id
      });
    });
  });
});
