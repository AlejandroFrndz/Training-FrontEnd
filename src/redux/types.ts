export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface NewCharacter {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface State {
  characters: Character[];
  loadingGet: boolean;
  errorGet: boolean;
  loadingUpdate: boolean;
  errorUpdate: boolean;
}
