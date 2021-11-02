export interface Character {
  id?: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface CharacterState {
  characters: Character[];
  loadingGet: boolean;
  errorGet: boolean;
  loadingUpdate: boolean;
  errorUpdate: boolean;
  immortalCharacter: number;
}

export interface ImmortalCharacter {
  id: number;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  seen: boolean;
}

export interface EpisodeState {
  episodes: Episode[];
  loadingGet: boolean;
  errorGet: boolean;
  loadingUpdate: boolean;
  errorUpdate: boolean;
}
