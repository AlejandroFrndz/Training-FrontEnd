import http from "../http-common";
import CharacterData from "../types/character.type";

class CharactersService {
    private resource : string;

    constructor() {
        this.resource = "/characters";
    }

    getAll() {
        return http.get<CharacterData[]>(`${this.resource}?_sort=id&_order=asc`);
    }

    get(id : number | string) {
        return http.get<CharacterData>(`${this.resource}/${id}`);
        
    }

    create(data : CharacterData) {
        return http.post<CharacterData>(this.resource,data);
    }

    update(data : CharacterData, id : number | string) {
        return http.put<CharacterData>(`${this.resource}/${id}`, data);
    }

    delete(id : number | string) {
        return http.delete(`${this.resource}/${id}`);
    }

    deleteAll() {
        return http.delete(this.resource);
    }

    findByName(name : string) {
        return http.get<CharacterData[]>(`${this.resource}?name_like=${name}`);
    }
}

export default new CharactersService();