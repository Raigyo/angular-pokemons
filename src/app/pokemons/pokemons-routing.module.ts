import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListPokemonComponent } from "./list-pokemon.component";
import { DetailPokemonComponent } from "./detail-pokemon.component";
import { EditPokemonComponent } from "./edit-pokemon.component";

import { AuthGuard } from "../auth/auth-guard.service";

// the routes of the Pokémon module
const pokemonsRoutes: Routes = [
  {
    path: "pokemons",
    canActivate: [AuthGuard],
    children: [
      { path: "all", component: ListPokemonComponent },
      {
        path: "edit/:id",
        component: EditPokemonComponent,
        canActivate: [AuthGuard]
      },
      { path: ":id", component: DetailPokemonComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pokemonsRoutes)], // forChild: additionnal routes
  exports: [RouterModule]
})
export class PokemonRoutingModule {}
