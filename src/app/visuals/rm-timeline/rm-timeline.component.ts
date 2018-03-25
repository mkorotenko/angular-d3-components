// https://github.com/d3/d3-shape
// http://bl.ocks.org/d3noob/7030f35b72de721622b8
import { Component, Input, ChangeDetectorRef, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Timeline } from './timeline.model';

const DateTime = d3.timeParse('%d/%m/%Y %H:%M');

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rm-timeline]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg:g #timeline></g>
    `,
  styleUrls: ['./rm-timeline.component.css']
})
export class TimelineComponent implements AfterViewInit, OnChanges {

    @ViewChild('timeline') _timeline: any;

    // tslint:disable-next-line:no-input-rename
    @Input('rm-timeline') sizes: {width; height; data};
    // tslint:disable-next-line:member-ordering
    private _data: {date, close}[] = [];

    constructor(
        private el: ElementRef,
        private cd: ChangeDetectorRef
    ) { }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.sizes) {
            this._data = this.sizes.data; // changes.data.currentValue.map(item => ({date: item.date, close: item.value}));
            this.updateScales();
            this.updateChart();
        }

    }

    // tslint:disable-next-line:member-ordering
    public graph_timeline: any;

    ngAfterViewInit() {

        this.graph_timeline = d3.select(this._timeline.nativeElement);

        this.initChart();

    }

    // tslint:disable-next-line:member-ordering
    private xAxis: any;
    // tslint:disable-next-line:member-ordering
    private yAxis: any;

    private get areaWidth(): number {
        return this.sizes.width;
    }
    private get areaHeight(): number {
        return this.sizes.height;
    }

    private updateScales() {

        const yMax = d3.max(this._data, (d: any) => d.close);
        const yMin = d3.min(this._data, (d: any) => d.close);

        this.xAxis = d3.scaleTime().range([0, this.areaWidth]);
        this.yAxis = d3.scaleLinear().rangeRound([this.areaHeight, 0]);

        this.xAxis.domain(d3.extent(this._data, (d: any) => d.date));
        this.yAxis.domain([yMin - yMax * 0.05, yMax + yMax * 0.05]);

    }

    public updateChart() {

        if (!this.graph_timeline) {
            return;
        }

        const data = this._data;

        const x = this.xAxis,
            y = this.yAxis;

        // this.graph_timeline.selectAll('circle.dot')
        //     .remove();

        // this.graph_timeline.selectAll('circle.dot')
        //     .data(data)
        //     .enter().append('circle')
        //     .attr('class', 'dot')
        //     .attr('r', 4)
        //     .attr('cx', (d) => x(d.date))
        //     .attr('cy', (d) => y(d.close));

    }

    public initChart() {

        const types = ['group1', 'group2'];

        const colorScale = d3
            .scaleOrdinal()
            .domain(types)
            .range(['#202576', '#202576']);

        const timeline = new Timeline();
        timeline.size([this.areaWidth, 480])
            .extent([DateTime('22/03/2018 10:00').getTime(), DateTime('22/03/2018 21:00').getTime()])
            .padding(3)
            .maxBandHeight(20);

        const csv = this.csv;

        const height = this.areaHeight;
        types.forEach((type, i) => {

            const onlyThisType = csv.filter((d) => d.group === type);
            const theseBands = timeline.timeline(onlyThisType);

            const bar = this.graph_timeline.selectAll('g.timeline_' + i)
                .data(theseBands)
                .enter().append('g')
                .attr('class', 'g.timeline_' + i)
                .attr('transform', 'translate(0,' + (height - (45 + (i * 45))) + ')')
                .attr('class', 'timeline');

            bar.append('rect')
                .attr('rx', 10)
                .attr('x', (d: {start}) => d.start)
                .attr('y', (d: {y}) => d.y)
                .attr('height', (d: {dy}) => d.dy)
                .attr('width', (d: {start, end}) => (d.end - d.start));

            bar.append('text')
                .attr('x', (d: {start, end}) => (d.start + (d.end - d.start) / 2))
                .attr('y', (d: {y}) => d.y)
                .attr('dy', '1em')
                .attr('font-size', '12px')
                .text((d: {station}) => d.station);

        });

    }

    // tslint:disable-next-line:member-ordering
    public csv = [
        {
            station: 'STATION NAME 1',
            group: 'group1',
            start: DateTime('22/03/2018 10:30'),
            end: DateTime('22/03/2018 13:00'),
        },
        {
            station: 'STATION NAME 1',
            group: 'group1',
            start: DateTime('22/03/2018 14:00'),
            end: DateTime('22/03/2018 19:00'),
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
    ];
}
