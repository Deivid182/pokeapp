export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  TYPE = 'type',
}

export interface PokemonItem {
  id: number;
  name: string;
  img: string
  types: TypeElement[]
}

export interface Pokemon {
  abilities: AbilityElement[];
  id:        number;
  sprites:   Sprites;
  name:      string;
  types:     TypeElement[];
}

export interface TypeElement {
  slot: number;
  type: TypeType;
}

export interface TypeType {
  name: string;
  url:  string;
}


export interface AbilityElement {
  ability:   AbilityAbility;
  is_hidden: boolean;
  slot:      number;
}

export interface AbilityAbility {
  name: string;
  url:  string;
}

export interface Sprites {
  back_default:       string;
  back_female:        null;
  back_shiny:         string;
  back_shiny_female:  null;
  front_default:      string;
  front_female:       null;
  front_shiny:        string;
  front_shiny_female: null;
  other:              Other;
}

export interface Other {
  dream_world:        DreamWorld;
  home:               Home;
  "official-artwork": OfficialArtwork;
}

export interface DreamWorld {
  front_default: string;
  front_female:  null;
}

export interface Home {
  front_default:      string;
  front_female:       null;
  front_shiny:        string;
  front_shiny_female: null;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny:   string;
}


export interface PokemonSingle {
  name: string;
  url:  string;
}
