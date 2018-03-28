import { Component, ViewEncapsulation } from '@angular/core';
import * as d3 from '../shared/utils/d3-datetime';

export class ScheduleNode {
  station: string;
  start: Date;
  end: Date;
  group: string;
}

export class ChartNode {
  date: Date;
  value: number;
}

const DateTime = d3.timeParse('%d/%m/%Y %H:%M');

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Chart1Component {

  public timeline: ScheduleNode[] = [
    {
      station: 'STATION NAME 1',
      group: 'group1',
      start: DateTime('22/03/2018 09:30'),
      end: DateTime('22/03/2018 13:00'),
    },
    {
      station: 'STATION NAME 1',
      group: 'group1',
      start: DateTime('22/03/2018 14:00'),
      end: DateTime('22/03/2018 19:00'),
    },
    {
      station: 'STATION NAME 1',
      group: 'group1',
      start: DateTime('22/03/2018 20:00'),
      end: DateTime('22/03/2018 21:30'),
    },
    {
      station: 'STATION NAME 2',
      group: 'group2',
      start: DateTime('22/03/2018 11:00'),
      end: DateTime('22/03/2018 15:00'),
    },
    {
      station: 'STATION NAME 2',
      group: 'group2',
      start: DateTime('22/03/2018 16:00'),
      end: DateTime('22/03/2018 21:00'),
    },
    {
      station: 'STATION NAME 3',
      group: 'group3',
      start: DateTime('22/03/2018 10:00'),
      end: DateTime('22/03/2018 12:00'),
    },
    {
      station: 'STATION NAME 4',
      group: 'group4',
      start: DateTime('22/03/2018 11:00'),
      end: DateTime('22/03/2018 15:00'),
    },
    {
      station: 'STATION NAME 4',
      group: 'group4',
      start: DateTime('22/03/2018 16:00'),
      end: DateTime('22/03/2018 20:00'),
    },
    {
      station: 'STATION NAME 5',
      group: 'group5',
      start: DateTime('22/03/2018 16:30'),
      end: DateTime('22/03/2018 21:00'),
    },
  ];

  public area: ChartNode[] = [
    {
      date: DateTime('22/03/2018 09:30'),
      value: 120,
    },
    {
      date: DateTime('22/03/2018 10:00'),
      value: 400,
    },
    {
      date: DateTime('22/03/2018 11:00'),
      value: 850,
    },
    {
      date: DateTime('22/03/2018 12:00'),
      value: 1150,
    },
    {
      date: DateTime('22/03/2018 13:00'),
      value: 1180,
    },
    {
      date: DateTime('22/03/2018 14:00'),
      value: 900,
    },
    {
      date: DateTime('22/03/2018 15:00'),
      value: 480,
    },
    {
      date: DateTime('22/03/2018 16:00'),
      value: 430,
    },
    {
      date: DateTime('22/03/2018 17:00'),
      value: 750,
    },
    {
      date: DateTime('22/03/2018 18:00'),
      value: 1160,
    },
    {
      date: DateTime('22/03/2018 19:00'),
      value: 1300,
    },
    {
      date: DateTime('22/03/2018 20:00'),
      value: 1100,
    },
    {
      date: DateTime('22/03/2018 21:00'),
      value: 650,
    },
    {
      date: DateTime('22/03/2018 21:30'),
      value: 410,
    },
  ];

}
