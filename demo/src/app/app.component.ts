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
        { x: 10, y: 10 },
        { x: 20, y: 30 },
        { x: 30, y: 70 },
        { x: 40, y: 40 },
        { x: 50, y: 90 },
        { x: 60, y: 170 }
      ]
    },
    {
      name: 'dislikes',
      points: [
        { x: 10, y: 4 },
        { x: 20, y: 12 },
        { x: 30, y: 19 },
        { x: 40, y: 16 },
        { x: 50, y: 21 },
        { x: 60, y: 21 }
      ]
    }
  ];
  data2 = [
    {
      name: 'likes',
      points: [
        { x: 10, y: 10 },
        { x: 20, y: 30 },
        { x: 30, y: 70 },
        { x: 40, y: 40 },
        { x: 50, y: 90 },
        { x: 60, y: 170 }
      ]
    }
  ];
  data3 = [
    {
      name: 'likes',
      points: [
        { x: 10, y: 10 },
        { x: 11, y: 11 },
        { x: 12, y: 12 },
        { x: 13, y: 13 },
        { x: 14, y: 14 },
        { x: 15, y: 15 },
        { x: 16, y: 16 },
        { x: 17, y: 17 },
        { x: 18, y: 18 },
        { x: 19, y: 19 },
        { x: 20, y: 30 },
        { x: 25, y: 35 },
        { x: 30, y: 70 },
        { x: 35, y: 60 },
        { x: 40, y: 40 },
        { x: 45, y: 50 },
        { x: 50, y: 90 },
        { x: 60, y: 170 },
        { x: 65, y: 170 },
        { x: 70, y: 170 },
        { x: 80, y: 170 },
        { x: 90, y: 170 },
        { x: 100, y: 170 },
        { x: 110, y: 170 },
        { x: 120, y: 170 },
        { x: 130, y: 170 },
        { x: 140, y: 170 },
        { x: 150, y: 170 },
        { x: 160, y: 170 },
        { x: 170, y: 170 },
        { x: 180, y: 170 },
        { x: 190, y: 170 },
        { x: 200, y: 170 }
      ]
    }
  ];
  data3XAxisValues = [0, 50, 200];
  data4 = [
    {
      name: 'likes',
      points: [
        { x: 1501970833837, y: 4 },
        { x: 1501974433837, y: 12 },
        { x: 1501990833837, y: 19 },
        { x: 1502970833837, y: 16 },
        { x: 1503970833837, y: 21 },
        { x: 1504970833837, y: 21 }
      ]
    }
  ];

  convertXLabel(timestamp: number) {
    let dateObj = new Date(timestamp);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  }
}
