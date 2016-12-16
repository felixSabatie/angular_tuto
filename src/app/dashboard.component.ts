import { Component, OnInit } from '@angular/core';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

    heroes: Hero[] = []

    constructor(private heroeService: HeroService) { }

    ngOnInit(): void {
        this.heroeService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5))
    }

}