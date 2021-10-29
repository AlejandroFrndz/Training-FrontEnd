import http from '../http-common';
import { Episode } from '../redux/types';

class EpisodeService {
  private resource: string;

  constructor() {
    this.resource = '/api/episodes';
  }

  getAll() {
    return http.get<Episode[]>(`${this.resource}?_sort=id&_order=asc`);
  }

  get(id: number | string) {
    return http.get<Episode>(`${this.resource}/${id}`);
  }

  update(data: Episode, id: number) {
    return http.put<Episode>(`${this.resource}/${id}`, data);
  }
}

export default new EpisodeService();
