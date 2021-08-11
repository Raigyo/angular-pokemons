import { Injectable } from "@angular/core";
// RxJS 6
import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false; // Is the user logged in?
  redirectUrl: string; // where to redirect the user after authentication?
  // A connection method
  login(name: string, password: string): Observable<boolean> {
    // Make your call to an authentication service ...
    const isLoggedIn = name === "pikachu" && password === "pikachu";

    return of(true).pipe(
      delay(1000),
      tap((val) => (this.isLoggedIn = isLoggedIn))
    );
  }

  // A method of disconnection
  logout(): void {
    this.isLoggedIn = false;
  }
}
