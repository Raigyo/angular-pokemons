import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Pokemon } from "./pokemon";
// import { POKEMONS } from "./mock-pokemons";

// Injectable: the service can have its own dependancies
// Component, directive and pipe already include @Injectable()
@Injectable()
export class PokemonsService {
  constructor(private http: HttpClient) {}

  private pokemonsUrl = "api/pokemons";

  // LOGS METHODS

  private log(log: string) {
    console.log(log);
  }

  // type variable <T>: generic interface
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); // of: transform data into observable
    };
  }

  // CRUD

  // --GET

  // Return all the pokemon
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      /* The map operator will simply apply a function to that data
      and return the result. The tap operator however takes a data,
      apply a function to that data but returns the original data, if the function bothered
      to return a result, tap just ignores it.*/
      tap((_) => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`, []))
    );
  }

  // Returns the pokemon with the identifier passed in parameter
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap((_) => this.log(`fetched pokemons id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemons id=${id}`))
    );
  }

  getPokemonTypes(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Électrique",
      "Poison",
      "Fée",
      "Vol"
    ];
  }

  // --UPDATE

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap((_) => this.log(`updated pokemons id=${pokemon.id}`)),
      catchError(this.handleError<any>(`updatedPokemon}`))
    );
  }

  // --DELETE

  deletePokemon(pokemon: Pokemon): Observable<Pokemon | any> {
    const url = `${this.pokemonsUrl}/${pokemon.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap((_) => this.log(`deleted pokemons id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>(`deletePokemon}`))
    );
  }

  // SEARCH

  searchPokemons(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if empty
      return of([]);
    }

    return this.http.get<Pokemon[]>(`$(this.pokemonUrl)/?name=${term}`).pipe(
      tap((_) => this.log(`found pokemon matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>("searchPokemon", []))
    );
  }
}
