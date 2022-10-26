import { Component, OnInit } from '@angular/core';

import { Hero } from '../Ihero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  //The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
  constructor(private heroService: HeroService) { }
//better to call get.Heroes in ngOnInit than the constructor to let Angular call it atr an appropriate tim after constructing a HeroesComponent instance
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  /**
   * If you neglect to subscribe(), the service can't send the delete 
   * request to the server. 
   * As a rule, an Observable does nothing until something subscribes.
   */
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}

 // constructor(
  //   private heroService: HeroService,
  //   private messageService: MessageService) { }

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }
  
  // heroes = HEROES;

  //Rename the component's hero property to selectedHero but don't assign any value to it since there is no selected hero when the application starts.
  // selectedHero?: Hero;
  /* METHODS */

//list withOnselect replaced with list with links

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   //to show a history of each time the user clicks on a hero
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  //see hero.service.ts 

  //The previous version assigns an array of heroes to the component's heroes property. The assignment occurs synchronously, 
  //as if the server could return heroes instantly or the browser could freeze the UI while it waited for the server's response.

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  // getHeroes won't work when the HeroService is actually making requests of a remote server.
  // The new version waits for the Observable to emit the array of heroes, which could happen now or several minutes from now. 
  //The subscribe() method passes the emitted array to the callback 
  //(callback=function called in a function as a parameter, When you pass a function as an argument, remember not to use parenthesis.), which sets the component's heroes property.
  // The asynchronous approach (with subscribe) works when the HeroService requests heroes from the server.
