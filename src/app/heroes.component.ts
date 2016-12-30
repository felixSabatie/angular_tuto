import {Component} from '@angular/core';
import { Hero } from './hero';
import {HeroService} from './hero.service';
import {OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-heroes',
    //templateUrl: './app.component.html',
    templateUrl: './heroes.component.html',
    //styleUrls: ['./app.component.css']
    styleUrls: ['./heroes.component.css'],
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
    constructor(
        private heroService: HeroService,
        private router: Router
    ) {}

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

    getHeroes(): void {
        // On utilise le système de Promise. La récupération des données se fait de
        // manière asynchrone
        //this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        // On simule un temps d'accès long au serveur pour afficher un message de loading
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if(!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if(this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}
