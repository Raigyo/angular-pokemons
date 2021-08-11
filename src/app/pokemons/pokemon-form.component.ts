import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PokemonsService } from "./pokemons.service";
import { Pokemon } from "./pokemon";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"]
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon; // component input property
  types: Array<string>; // types available for a pokemon: 'Water', 'Fire', etc ...
  constructor(
    private pokemonsService: PokemonsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initializing the types property
    this.types = this.pokemonsService.getPokemonTypes();
  }

  // Determines whether or not the type passed in parameters belongs to the pokemon being edited.
  hasType(type: string): boolean {
    const index = this.pokemon.types.indexOf(type);
    if (index > -1) {
      return true;
    }
    return false;
  }

  // Method called when the user adds or removes a type from the pokemon being edited.
  selectType($event: any, type: string): void {
    const checked = $event.target.checked;
    if (checked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      if (index > -1) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  // Validate the number of types for each pokemon.
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  // The method called when the form is submitted.
  onSubmit(): void {
    console.log("Submit form !");
    // const link = ["/pokemon", this.pokemon.id];
    // this.router.navigate(link);
    this.pokemonsService
      .updatePokemon(this.pokemon)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    const link = ["/pokemons", this.pokemon.id];
    console.log("url:", link);

    this.router.navigate(link);
  }
}
