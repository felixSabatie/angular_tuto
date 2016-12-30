import { Component, OnInit } from '@angular/core';

// Gestion de la route
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap'

import { Hero } from './hero';
import {HeroService} from "./hero.service";

@Component({
    selector : 'my-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
})

export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => this.hero = hero)
        /*
         Note how the switchMap operator maps the id in the observable route parameters to a new Observable, the result of the HeroService.getHero method.

         If the user re-navigates to this component while a getHero request is still inflight, switchMap cancels that old request before calling HeroService.getHero again.

         The hero id is a number. Route parameters are always strings. So we convert the route parameter value to a number with the JavaScript (+) operator.
         */
    }

    goBack(): void {
        this.location.back()
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }

}
