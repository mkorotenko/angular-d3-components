import { Component } from '@angular/core';
import * as d3 from '../shared/utils/d3-datetime';

export class ScheduleNode {
  station: string;
  start: Date;
  end: Date;
  group: string;
}

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component {

  constructor() {
    // d3.timeParse('%d-%b-%y')
    console.info('d3', d3);
  }

  public data1: ScheduleNode[] = [
    {
      station: 'STATION NAME 1', 
      start: new Date('2018-03-22T09:30'),
      end: new Date('2018-03-22T09:30'),
      group: 'group1'
    },
  ];

  public data: any[] = [
    {date: '24-Apr-07', value: 93.24},
    {date: '25-Apr-07', value: 95.35},
    {date: '26-Apr-07', value: 98.84},
    {date: '27-Apr-07', value: 99.92},
    {date: '28-Apr-07', value: 99.80},
  ];

}
