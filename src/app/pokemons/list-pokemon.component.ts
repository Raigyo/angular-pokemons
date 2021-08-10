import { Component, OnInit } from "@angular/core";
import { Pokemon } from "./pokemon";
import { Router } from "@angular/router";
import { PokemonsService } from "./pokemons.service";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html"
  // providers: [PokemonsService]
})
export class ListPokemonComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(
    private router: Router,
    private pokemonsService: PokemonsService
  ) {
    // service injection
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonsService
      .getPokemons()
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }

  selectPokemon(pokemon: Pokemon): void {
    console.log("Vous avez selectionné " + pokemon.name);
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
