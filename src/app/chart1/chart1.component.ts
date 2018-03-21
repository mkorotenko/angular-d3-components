import { Component } from '@angular/core';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component {

  public data: any[] = [
    {date: '24-Apr-07', value: 93.24},
    {date: '25-Apr-07', value: 95.35},
    {date: '26-Apr-07', value: 98.84},
    {date: '27-Apr-07', value: 99.92},
    {date: '28-Apr-07', value: 99.80},
  ];

}
