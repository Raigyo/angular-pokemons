import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Pokemon } from "./pokemon";
import { PokemonsService } from "./pokemons.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  styleUrls: ["./detail-pokemon.component.css"]
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
    this.pokemonsService
      .getPokemon(id)
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }

  // Events

  goBack(): void {
    this.router.navigate(["/pokemons/all"]);
  }

  goEdit(pokemon: Pokemon): void {
    const link = ["/pokemons/edit", pokemon.id];
    this.router.navigate(link);
  }

  goDelete(pokemon: Pokemon): void {
    this.pokemonsService.deletePokemon(pokemon).subscribe((_) => this.goBack());
  }
}
