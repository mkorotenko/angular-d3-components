// https://github.com/d3/d3-shape
// http://bl.ocks.org/d3noob/7030f35b72de721622b8
import { Component, Input, ChangeDetectorRef, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rm-points]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg:g #points></g>
    `,
  styleUrls: ['./rm-points.component.css']
})
export class PointsComponent implements AfterViewInit, OnChanges {

    @ViewChild('points') _points: any;

    // tslint:disable-next-line:no-input-rename
    @Input('rm-points') sizes: {width; height; data};
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
    public graph_points: any;

    ngAfterViewInit() {

        this.graph_points = d3.select(this._points.nativeElement);

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
        this.yAxis.domain([0, yMax + yMax * 0.05]);

    }

    public updateChart() {

        if (!this.graph_points) {
            return;
        }

        const data = this._data;

        const x = this.xAxis,
            y = this.yAxis;

        this.graph_points.selectAll('circle.dot')
            .remove();

        this.graph_points.selectAll('circle.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('r', 4)
            .attr('cx', (d) => x(d.date))
            .attr('cy', (d) => y(d.close))
            .on('click', this.onClick.bind(this))
            .on('mouseover', this.onMouseOver.bind(this))
            .on('mouseout', this.onMouseOut.bind(this));
    }

    public initChart() {

        const data = this._data;

        const x = this.xAxis,
            y = this.yAxis;

        // add the points
        this.graph_points.selectAll('circle.dot')
             .data(data)
             .enter().append('circle')
             .attr('class', 'dot')
             .attr('r', 4)
             .attr('cx', (d) => x(d.date))
             .attr('cy', (d) => y(d.close))
             .on('click', this.onClick.bind(this))
             .on('mouseover', this.onMouseOver.bind(this))
             .on('mouseout', this.onMouseOut.bind(this));

    }

    private onClick(point) {
        // tslint:disable-next-line:no-console
        console.info('onClick', point );
    }

    private onMouseOver(point) {
        // tslint:disable-next-line:no-console
        // console.info('mouseover', point );
    }

    private onMouseOut(point) {
        // tslint:disable-next-line:no-console
        // console.info('onMouseOut', point );
    }

}
