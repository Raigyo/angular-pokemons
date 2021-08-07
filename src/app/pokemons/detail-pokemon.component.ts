import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemons";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html"
})
export class DetailPokemonComponent implements OnInit {
  pokemons: Pokemon[]; // list of pokemons
  pokemon: Pokemon; // pokemon to display

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.pokemons = POKEMONS;
    // @ts-ignore: Object is possibly 'null'.
    const id = +this.route.snapshot.paramMap.get("id");
    // snapshot is a synchronous operation
    // paramMap: A map that provides access to the required and optional parameters specific to a route.
    for (let i = 0; i < this.pokemons.length; i++) {
      if (this.pokemons[i].id == id) {
        this.pokemon = this.pokemons[i];
      }
    }
  }

  goBack(): void {
    this.router.navigate(["/pokemons"]);
  }
}
