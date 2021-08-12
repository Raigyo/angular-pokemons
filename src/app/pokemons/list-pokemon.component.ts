import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Pokemon } from "./pokemon";
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
    private pokemonsService: PokemonsService,
    private titleService: Title
  ) {
    // service injection
  }

  ngOnInit(): void {
    this.titleService.setTitle("Pokémons list");
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonsService
      .getPokemons()
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }

  selectPokemon(pokemon: Pokemon): void {
    console.log("Vous avez selectionné " + pokemon.name);
    const link = ["/pokemons", pokemon.id];
    this.router.navigate(link);
  }
}
