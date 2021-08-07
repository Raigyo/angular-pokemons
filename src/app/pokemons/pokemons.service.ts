import { Injectable } from "@angular/core";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemons";

// Injectable: the service can have its own dependancies
// Component, directive and pipe already include @Injectable()
@Injectable()
export class PokemonsService {
  // Return all the pokemon
  getPokemons(): Pokemon[] {
    return POKEMONS;
  }

  // Returns the pokemon with the identifier passed in parameter
  getPokemon(id: number): Pokemon | any {
    const pokemons = this.getPokemons();

    // for (const pokemonIndex of pokemons)
    for (let index = 0; index < pokemons.length; index++) {
      if (id === pokemons[index].id) {
        return pokemons[index];
      }
    }
  }
}
