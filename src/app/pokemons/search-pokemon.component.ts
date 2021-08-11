import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Observable, Subject, of } from "rxjs";

import { PokemonsService } from "./pokemons.service";
import { Pokemon } from "./pokemon";

@Component({
  selector: "app-pokemon-search",
  templateUrl: "./search-pokemon.component.html"
})
export class PokemonSearchComponent implements OnInit {
  private searchTerms = new Subject<string>(); // Subject is an observable
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private pokemonsService: PokemonsService,
    private router: Router
  ) {}

  // Adds a search term to the 'searchTerms' Observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // wait 300ms of pause between each request
      debounceTime(300),
      // ignore the current search if it is the same as the previous one
      distinctUntilChanged(),
      // we return the list of results corresponding to the search terms
      switchMap((term: string) => this.pokemonsService.searchPokemons(term))
    );
  }

  gotoDetail(pokemon: Pokemon): void {
    const link = ["/pokemons", pokemon.id];
    console.log("url:", link);

    this.router.navigate(link);
  }
}
