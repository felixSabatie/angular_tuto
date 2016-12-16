import {Component} from '@angular/core';
import { Hero } from './hero';
import {HeroService} from './hero.service';
import {OnInit} from '@angular/core';

@Component({
    selector: 'my-heroes',
    //templateUrl: './app.component.html',
    template: `
    <h2>My heroes</h2>
    <ul class="heroes">
        <div *ngIf="!heroes">Loading...</div>
        <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
        </li>
    </ul>
  `,
    //styleUrls: ['./app.component.css']
    styles: [`
.selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`] ,
    // Indique à Angular qu'il doit créer une instance de HeroService à la création du composant
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    /** Permet de donner une instance de HeroService à la création du composant.
     * Evite d'avoir à faire un new HeroService qui est dégueu car plusieurs composants
     * auront besoin d'accéder à ce service. Bien penser à ajouter le HeroService dans les
     * providers, au sein de la metadata du composant.
     * @param heroService
     */
    constructor(private heroService: HeroService) {}

    /**
     * Ne pas écrire de traitement dans le constructeur !
     * Du coup on peut écrire ces traitements dans le on init
     */
    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    removeSelectedHero(): void {
        this.selectedHero = null;
    }

    getHeroes(): void {
        // On utilise le système de Promise. La récupération des données se fait de
        // manière asynchrone
        //this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        // On simule un temps d'accès long au serveur pour afficher un message de loading
        this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }
}
