# Angular - Pokemons

_July 2021_

> 🔨 From Udemy '[Angular 9 : Développer votre première application (2021) - Simon DIENY](https://www.udemy.com/course/angular-developper-tutoriel-application-typescript/)'.

![Angular logo](_readme-img/angular-logo.png)

## Notes

### Components

#### Life cycle (\_fr)

Chaque composant a un cycle de vie géré par Angular lui-même. Angular crée le composant, s'occupe de l'afficher, crée et affiche ses composants fils, vérifie quand les données des propriétés changent, et détruit les composants, avant de les retirer du DOM quand cela est nécessaire. Pratique, non ?

Angular nous offre la possibilité d'agir sur ces moments clefs quand ils se produisent, en implémentant une ou plusieurs interfaces, pour chacun des événements disponibles. Ces interfaces sont disponibles dans la librairie core d'Angular.

Chaque interface permettant d'interagir sur le cycle de vie d'un composant fournit une et une seule méthode, dont le nom est le nom de l'interface préfixé par ng. Par exemple, l'interface OnInit fournit la méthode ngOnInit, et permet de définir un comportement lorsque le composant est initialisé.

**In short** (\_fr)

- Un composant fonctionne en associant la logique d'une classe TypeScript avec un template HTML.
- On utilise l'annotation @Component pour indiquer à Angular qu'une classe est un composant.
- On peut initialiser une propriété avec une valeur simple directement lors de sa déclaration ou dans le constructeur d'un composant.
- Des méthodes nous permettent d'interagir avec le cycle de vie d'un composant. Ces méthodes sont toutes préfixées par ng.
- La méthode ngOnInit permet de définir un comportement spécifique lors de l'initialisation d'un composant.
- Les méthodes de cycle de vie d'un composant que nous utiliserons le plus sont ngOnInit et ngOnDestroy.

### Templates

#### keyup (manage var in template)

**Case 1**

_app.component.ts_

```ts
  public value: string = "";
  // ...
  onKey(event: KeyboardEvent) {
    this.value = "Hello" + (event.target as HTMLInputElement).value;
  }
```

_app.component.html_

```html
<input (keyup)="onKey($event)" />
<p>{{ value }}</p>
```

**Case 2**

_app.component.html_

```html
<input #box (keyup)="0" />
<p>{{ box.value }}</p>
```

**Case 3**

_app.component.ts_

```ts
  public value: string = "";
  // ...
  onKey(value: string) {
    this.value = "Hello" + value;
  }
```

_app.component.html_

```html
<input #box (keyup)="onKey(box.value)" />
<p>{{ box.value }}</p>
<p>{{ value }}</p>
```

#### keyup.enter / blur

_app.component.ts_

```ts
values = "";
```

_app.component.html_

```html
<input #box (keyup.enter)="values=box.value" (blur)="values=box.value" />
<p>{{ values }}</p>
```

#### Directive ngIf

_app.component.ts_

```ts
age = 20;
```

_app.component.html_

```html
<p *ngIf="age > 18">Message for people upper 18</p>
```

#### Directive ngFor

_app.component.ts_

```ts
import { Component, OnInit } from "@angular/core";

import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public pokemons: Pokemon[];
  public title: string = "Pokemon list";
  age = 20;

  ngOnInit() {
    this.pokemons = POKEMONS;
  }
}
```

_app.component.html_

```html
<ul>
  <li *ngFor="let pokemon of pokemons">{{ pokemon.name }}</li>
</ul>
```

**In short** (\_fr)

- L'interpolation permet d'afficher les propriétés de nos composants dans les templates, via la syntaxe {‌{ }}.
- On peut lier une propriété d'élément, d'attribut, de classe ou de style d'un composant vers le template.
- Si nos templates sont trop long, on peut utiliser le backtick d'ES6, ou définir nos templates dans des fichiers séparés.
- La directive NgIf permet de conditionner l'affichage d'un template.
- La directive NgFor permet d'afficher une propriété de type tableau dans un template.
- On peut gérer les interactions d'un utilisateur avec un élément de la page grâce à la syntaxe : '(' + 'nom de l'événement' + ')'.
- On peut référencer des variables directement dans le template plutôt que de manipuler l'objet $event.
- Les variables référencées dans le template sont accessibles pour tous les éléments fils et frères de l'élément dans lequel elle ont été - déclarées.
- Essayez d'éviter de mettre la logique de votre application dans vos templates. Gardez-les le plus simple possible !

### Directives

The different types of Angular directives are as follows:

- Components—directives with a template. This type of directive is the most common directive type (@Component).
- Attribute directives—directives that change the appearance or behavior of an element, component, or another directive (@Directive).
- Structural directives—directives that change the DOM layout by adding and removing DOM elements (ex: ngIf, ngFor...).

**In short** (\_fr)

- On utilise l'annotation @Directive pour déclarer une directive dans notre application.
- Il existe trois types de directives différentes : les composants, les directives d'attributs et les directives structurelles (ngFor et ngIf - par exemple).
- Une directive d'attribut permet d'agir avec les éléments HTML d'une page, en leur attachant un comportement spécifique.
- Une directive utilise un sélecteur CSS pour cibler les éléments HTML sur lesquels elle s’applique.
- Il est recommandé de préfixer le nom de ses directives pour éviter les problèmes de collisions.
- Angular crée une nouvelle instance de notre directive à chaque fois qu'il détecte un élément HTML avec l'attribut correspondant. Il injecte - alors dans le constructeur de la directive l'élément du DOM ElementRef.
- Il faut déclarer notre directive pour pouvoir l’utiliser.
- On utilise l'annotation @HostListener pour gérer les interactions de l'utilisateur au sein d'une directive.

### Pipes

**In short** (\_fr)

- Les pipes permettent de formater les données affichées dans nos templates.
- L'opérateur des pipes est « | ».
- Angular fournit des pipes prêts à l'emploi, disponibles dans tous les templates de notre application : DatePipe, UpperCasePipe, - LowerCasePipe, etc.
- Les pipes peuvent avoir des paramètres, mais tous les paramètres sont facultatifs.
- On peut créer des pipes personnalisés pour les besoins de notre application avec l'annotation @Pipe.
- Les pipes personnalisés doivent être déclarés avant de pouvoir être utilisés dans les templates de composants.

### Routes

**In short** (\_fr)

- Angular simule la navigation de l'utilisateur auprès du navigateur, sans que nous n'ayons rien à faire.
- On construit un système de navigation en associant une url et un composant dans un fichier à part.
- Le système de routes d'Angular interprète les routes qui sont déclarées du haut vers le bas.
- La balise <router-outlet> permet de définir où le template des composants fils sera injecté. Cette balise est disponible dans tous les - templates des composants du module racine.
- L'opérateur permettant d'intercepter toutes les routes est \*\*.
- Les routes doivent être regroupées par fonctionnalité au sein de modules.

### Modules

**In short** (\_fr)

- Il existe deux types de modules : le module racine et les modules de fonctionnalité, appelés également sous-modules.
- On déclare un module avec l'annotation @NgModule, quel que soit le type du module.
- On peut créer des applications complexes en ajoutant des modules de fonctionnalité au module racine.
- Chaque module regroupe tous les composants, directives, pipes, services, ... liés au développement d'une fonctionnalité donnée, dans un - dossier à part.
- Chaque module peut disposer de ses propres routes également.

## Ressources

- [Ressources de la formation](https://www.alexandria-library.co/ressources-angular/)
- [Built-in directives](https://angular.io/guide/built-in-directives)
