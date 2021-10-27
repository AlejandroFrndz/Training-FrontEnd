import http from '../http-common';
import { Character, NewCharacter, ImmortalCharacter } from '../redux/types';

class CharactersService {
  private resource: string;

  constructor() {
    this.resource = '/api/characters';
  }

  getAll() {
    return http.get<Character[]>(`${this.resource}?_sort=id&_order=asc`);
  }

  get(id: number | string) {
    return http.get<Character>(`${this.resource}/${id}`);
  }

  create(data: NewCharacter) {
    return http.post<Character>(this.resource, data);
  }

  update(data: Character, id: number | string) {
    return http.put<Character>(`${this.resource}/${id}`, data);
  }

  delete(id: number | string) {
    return http.delete(`${this.resource}/${id}`);
  }

  deleteAll() {
    return http.delete(this.resource);
  }

  findByName(name: string) {
    return http.get<Character[]>(`${this.resource}?name_like=${name}`);
  }

  getImmortalCharacter() {
    return http.get<ImmortalCharacter>(`${this.resource}/immortalCharacter`);
  }
}

export default new CharactersService();
