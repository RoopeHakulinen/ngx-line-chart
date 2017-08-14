import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  data3 = [
    {
      name: 'likes',
      points: []
    }
  ];
  data3XAxisValues = [0, 200, 1000];
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

  ngOnInit() {
    this.data3[0].points = this.generateLargeDataSet();
    setInterval(() => {
      this.data3[0].points = this.generateLargeDataSet();
    }, 10000);
  }

  generateLargeDataSet() {
    return new Array(50).fill(0).map(item => (
      {
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000)
      })
    );
  }
}
