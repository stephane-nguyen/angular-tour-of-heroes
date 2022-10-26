import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../Ihero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    //holds information about the route to this instance of the HeroDetailComponent. 
    //This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.
    private route: ActivatedRoute,
    // gets hero data from the remote server and this component uses it to get the hero-to-display.
    private heroService: HeroService,
    //Location is an Angular service for interacting with the browser. This service lets you navigate back to the previous view.
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}

  //Let the parent component "heroes" updates data in the child component "hero-detail" 
  // @Input() hero?: Hero;