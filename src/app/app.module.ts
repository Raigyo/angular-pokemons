import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./auth/login.component";
import { LoginRoutingModule } from "./auth/login-routing.module";

import { AppRoutingModule } from "./app-routing.module";
import { PokemonsModule } from "./pokemons/pokemons.module";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found.component";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false // no data key
    }),
    PokemonsModule,
    LoginRoutingModule,
    AppRoutingModule
  ], // order has importance
  declarations: [AppComponent, LoginComponent, PageNotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
