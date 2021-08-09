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

![Life cycle schema](_readme-img/life-cycle.png)

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

Use pipes to transform strings, currency amounts, dates, and other data for display. Pipes are simple functions to use in template expressions to accept an input value and return a transformed value. Pipes are useful because you can use them throughout your application, while only declaring each pipe once.

**In short** (\_fr)

- Les pipes permettent de formater les données affichées dans nos templates.
- L'opérateur des pipes est « | ».
- Angular fournit des pipes prêts à l'emploi, disponibles dans tous les templates de notre application : DatePipe, UpperCasePipe, - LowerCasePipe, etc.
- Les pipes peuvent avoir des paramètres, mais tous les paramètres sont facultatifs.
- On peut créer des pipes personnalisés pour les besoins de notre application avec l'annotation @Pipe.
- Les pipes personnalisés doivent être déclarés avant de pouvoir être utilisés dans les templates de composants.

### Routes

Routing in Angular helps us navigate from one view to another as users perform tasks in web apps.

**In short** (\_fr)

- Angular simule la navigation de l'utilisateur auprès du navigateur, sans que nous n'ayons rien à faire.
- On construit un système de navigation en associant une url et un composant dans un fichier à part.
- Le système de routes d'Angular interprète les routes qui sont déclarées du haut vers le bas.
- La balise <router-outlet> permet de définir où le template des composants fils sera injecté. Cette balise est disponible dans tous les - templates des composants du module racine.
- L'opérateur permettant d'intercepter toutes les routes est \*\*.
- Les routes doivent être regroupées par fonctionnalité au sein de modules.

### Modules

Angular applications are modular and Angular has its own modularity system called NgModules. NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities. They can contain components, service providers, and other code files whose scope is defined by the containing NgModule. They can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.

Every Angular application has at least one NgModule class, the root module, which is conventionally named AppModule and resides in a file named app.module.ts. You launch your application by bootstrapping the root NgModule.

While a small application might have only one NgModule, most applications have many more feature modules. The root NgModule for an application is so named because it can include child NgModules in a hierarchy of any depth.

**In short** (\_fr)

- Il existe deux types de modules : le module racine et les modules de fonctionnalité, appelés également sous-modules.
- On déclare un module avec l'annotation @NgModule, quel que soit le type du module.
- On peut créer des applications complexes en ajoutant des modules de fonctionnalité au module racine.
- Chaque module regroupe tous les composants, directives, pipes, services, ... liés au développement d'une fonctionnalité donnée, dans un - dossier à part.
- Chaque module peut disposer de ses propres routes également.

### Services and Dependancies injections (DI)

**Service** is a piece of reusable code with a focused purpose. A code that you will use in many components across your application

Our components need to access the data. You can write data access code in each component, but that is very inefficient and breaks the rule of single responsibility. The Component must focus on presenting data to the user. The task of getting data from the back-end server must be delegated to some other class. We call such a class a Service class. Because it provides the service of providing data to every component that needs it.

- Features that are independent of components such a logging services
- Share logic or data across components
- Encapsulate external interactions like data access

**Dependencies** are services or objects that a class needs to perform its function. Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them.

Angular's DI framework provides dependencies to a class upon instantiation. You can use Angular DI to increase flexibility and modularity in your applications.

A **provider** is an instruction to the Dependency Injection system on how to obtain a value for a dependency. Most of the time, these dependencies are services that you create and provide.

**In short** (\_fr)

- Il faut ajouter l'annotation @Injectable sur tous nos services.
- Un service permet de factoriser et de centraliser du code qui peut être utile ailleurs dans l'application.
- On utilise l'injection de dépendances pour rendre un service disponible dans un composant.
- On ne gère jamais nous-mêmes les dépendances sur un composant ou un service, on passe toujours par l'injection de dépendances.
- L'injection de dépendance permet de garantir que l'instance de notre service est unique à travers toute l'application.
- On définit un fournisseur de service pour déterminer dans quelles zones de notre application notre service sera disponible.
- On peut fournir un service pour toute l'application, pour un module particulier ou pour un composant.

### Forms

Angular provides two different approaches to handling user input through forms: **reactive** and **template-driven**. Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes.

Below are some of the high-level differences between the two types:

- Template-driven forms make use of the "FormsModule", while reactive forms are based on "ReactiveFormsModule".
- Template-driven forms are asynchronous in nature, whereas Reactive forms are mostly synchronous.
- In a template-driven approach, most of the logic is driven from the template, whereas in reactive-driven approach, the logic resides mainly - in the component or typescript code. Let us get started by generating a component and then we'll update our form code.
- Template-driven forms use two-way data binding to update the data model in the component as changes are made in the template and vice versa (using two-way data binding syntax `[(ngModel)]="..."` - property binding [] / event binding () . There is no two way binding in Reactive forms. Angular provides the methods to update the values from the component class. Reactive forms are used on complex cases, like dynamic forms element, dynamic validations etc.

**In short** (\_fr)

- Il y a deux modules différents pour développer des formulaires avec Angular: FormsModule et ReactiveFormsModule.
- Le module FormsModule est pratique pour développer des formulaires de petites tailles, et met à disposition les directives NgForm et - NgModel.
- La directive NgModel ajoute et retire certaines classes au champ sur lequel elle s'applique. Ces classes peuvent être utilisées pour - afficher des messages d'erreurs ou de succès, et des indicateurs visuels.
- La syntaxe à retenir pour utiliser NgModel est [()].
- On peut utiliser les attributs HMTL5 pour gérer la validation côté client, comme required ou pattern.
- On peut utiliser des validateurs personnalisés en développant ses propres méthodes de validation.
- Il faut toujours effectuer une validation côté serveur en complément de la validation côté client, si vous avez prévu de stocker des données depuis votre application.

## Ressources

- [Ressources de la formation](https://www.alexandria-library.co/ressources-angular/)
- [Built-in directives](https://angular.io/guide/built-in-directives)
- [HTML <input> pattern Attribute](https://www.w3schools.com/tags/att_input_pattern.asp)
