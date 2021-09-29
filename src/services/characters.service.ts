import http from "../http-common";
import CharacterData from "../types/character.type";

class CharactersService {
    private resource : string;

    constructor() {
        this.resource = "/characters/";
    }

    getAll() {
        return http.get(this.resource);
    }

    get(id : number | string) {
        return http.get(this.resource + id.toString());
    }

    create(data : CharacterData) {
        return http.post(this.resource,data);
    }

    update(data : CharacterData, id : number | string) {
        return http.put(this.resource + id.toString(), data);
    }

    delete(id : number | string) {
        return http.delete(this.resource + id.toString());
    }

    deleteAll() {
        return http.delete(this.resource);
    }
}

export default new CharactersService();