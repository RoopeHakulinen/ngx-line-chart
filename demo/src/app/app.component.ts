import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [
    {
      name: 'likes',
      points: [
        {x: 10, y: 10},
        {x: 20, y: 30},
        {x: 30, y: 70},
        {x: 40, y: 40},
        {x: 50, y: 90},
        {x: 60, y: 170}
      ]
    },
    {
      name: 'dislikes',
      points: [
        {x: 10, y: 4},
        {x: 20, y: 12},
        {x: 30, y: 19},
        {x: 40, y: 16},
        {x: 50, y: 21},
        {x: 60, y: 21}
      ]
    }
  ]
}
