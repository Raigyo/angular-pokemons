import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; // for submodules instead BrowserModule
import { FormsModule } from "@angular/forms";

import { PokemonRoutingModule } from "./pokemons-routing.module";

import { ListPokemonComponent } from "./list-pokemon.component";
import { DetailPokemonComponent } from "./detail-pokemon.component";
import { BorderCardDirective } from "./border-card.directive";
import { PokemonTypeColorPipe } from "./pokemon-type-color.pipe";
import { PokemonsService } from "./pokemons.service";
import { EditPokemonComponent } from "./edit-pokemon.component";
import { PokemonFormComponent } from "./pokemon-form.component";

@NgModule({
  imports: [CommonModule, FormsModule, PokemonRoutingModule],
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    EditPokemonComponent,
    PokemonFormComponent
  ],
  providers: [PokemonsService]
})
export class PokemonsModule {}
