import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  template: `
    <div class="row">
      <div class="col s12 m4 offset-m4">
        <div class="card hoverable">
          <div class="card-content center">
            <span class="card-title">Page de connexion</span>
            <p>
              <em>{{ message }}</em>
            </p>
          </div>
          <form #loginForm="ngForm">
            <div>
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                [(ngModel)]="name"
                name="name"
                required
              />
            </div>
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                [(ngModel)]="password"
                name="password"
                required
              />
            </div>
          </form>
          <div class="card-action center">
            <a
              (click)="login()"
              class="waves-effect waves-light btn"
              *ngIf="!authService.isLoggedIn"
              >Se connecter</a
            >
            <a (click)="logout()" *ngIf="authService.isLoggedIn"
              >Se déconnecter</a
            >
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  message: string = "Vous êtes déconnecté. (pikachu/pikachu)";
  public name: string;
  public password: string;

  constructor(public authService: AuthService, public router: Router) {}

  // Informs the user about his authentfication.
  setMessage() {
    this.message = this.authService.isLoggedIn
      ? "Vous êtes connecté."
      : "Identifiant ou mot de passe incorrect.";
  }

  // Connects the user to the Guard
  login() {
    this.message = "Tentative de connexion en cours ...";
    this.authService.login(this.name, this.password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirection URL from the authentication service
        // If no redirection has been defined, redirect the user to the list of pokemons.
        let redirect = this.authService.redirectUrl
          ? this.authService.redirectUrl
          : "/pokemons/all";
        // Redirect user
        this.router.navigate([redirect]);
      } else {
        this.password = "";
      }
    });
  }

  // Log out the user
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
