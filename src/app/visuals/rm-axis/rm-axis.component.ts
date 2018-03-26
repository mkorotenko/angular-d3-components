// https://github.com/d3/d3-shape
// http://bl.ocks.org/d3noob/7030f35b72de721622b8
import { Component, Input, ChangeDetectorRef, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rm-axis]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg:g #xAxis></g>
    <svg:g #yAxis></g>
    `,
  styleUrls: ['./rm-axis.component.css']
})
export class AxisComponent implements AfterViewInit, OnChanges {

    @ViewChild('xAxis') _xAxis: any;
    @ViewChild('yAxis') _yAxis: any;

    constructor(
        private el: ElementRef,
        private cd: ChangeDetectorRef
    ) { }

    // tslint:disable-next-line:no-input-rename
    @Input('rm-axis') sizes: {width; height; data};

    ngOnChanges(changes: SimpleChanges) {

        if (changes.sizes) {
            this._data = this.sizes.data;
            this.updateScales();
            this.updateChart();
        }

    }

    // tslint:disable-next-line:member-ordering
    private _data: {date, close}[] = [];
    // tslint:disable-next-line:member-ordering
    public graph_xAxis: any;
    // tslint:disable-next-line:member-ordering
    public graph_yAxis: any;
    // tslint:disable-next-line:member-ordering
    private xAxis: any;
    // tslint:disable-next-line:member-ordering
    private yAxis: any;

    ngAfterViewInit() {

        this.graph_xAxis = d3.select(this._xAxis.nativeElement);

        this.graph_yAxis = d3.select(this._yAxis.nativeElement);

        this.initChart();

    }

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

    public initChart() {

        // add the X Axis
        this.graph_xAxis
            .attr('class', 'axis x-axis')
            .attr('transform', 'translate(0,' + (this.areaHeight) + ')');

        // add the Y Axis
        this.graph_yAxis
            .attr('class', 'axis y-axis');

        this.updateChart();

    }

    public updateChart() {

        if (!this.graph_xAxis) {
            return;
        }

        this.graph_xAxis
            .call(d3.axisBottom(this.xAxis));

        this.graph_yAxis
             .call(d3.axisLeft(this.yAxis));

        this.graph_xAxis.selectAll('line.grid-line')
            .remove();

        this.graph_yAxis.selectAll('line.grid-line')
            .remove();

        this.graph_xAxis.selectAll('g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -this.areaHeight);

        this.graph_yAxis.selectAll('g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', this.areaWidth)
            .attr('y2', 0);
    }

}
