import { Injectable } from '@angular/core';
import {Hero} from "./hero";
import {HEROES} from './mock-heroes';
@Injectable()

export class HeroService {

    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 500)) // delay 0.5 seconds
            .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        console.log('getHero n.' + id)
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id))
    }

}
