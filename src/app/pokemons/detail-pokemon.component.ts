import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Pokemon } from "./pokemon";
import { PokemonsService } from "./pokemons.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html"
  // providers: [PokemonsService]
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon; // pokemon to display

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonsService: PokemonsService
  ) {}

  ngOnInit(): void {
    // @ts-ignore: Object is possibly 'null'.
    const id = +this.route.snapshot.paramMap.get("id");
    // snapshot is a synchronous operation
    // paramMap: A map that provides access to the required and optional parameters specific to a route.
    this.pokemon = this.pokemonsService.getPokemon(id);
  }

  goBack(): void {
    this.router.navigate(["/pokemons"]);
  }

  goEdit(pokemon: Pokemon): void {
    const link = ["/pokemon/edit", pokemon.id];
    this.router.navigate(link);
  }
}
