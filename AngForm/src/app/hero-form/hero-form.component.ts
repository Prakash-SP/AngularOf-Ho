import { Component, OnInit } from '@angular/core';
import { Hero }    from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
   model = new Hero( null,'', '', '');

  submitted = false;

  onSubmit() { 
    this.submitted = true; 
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model); 
  }

  constructor() {}

  ngOnInit() {
  }

  newHero() {
    this.model = new Hero(null,'', '', '');
  }
}
