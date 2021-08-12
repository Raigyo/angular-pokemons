import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Pokemon } from "./pokemon";
import { PokemonsService } from "./pokemons.service";

@Component({
  selector: "app-edit-pokemon",
  template: `
    <h2 class="header center">Editer {{ pokemon?.name }}</h2>
    <p class="center">
      <img *ngIf="pokemon" [src]="pokemon.picture" />
    </p>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Edit Pokémon");
    const id = +this.route.snapshot.params["id"];
    this.pokemonsService
      .getPokemon(id)
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }
}
