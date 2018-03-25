// https://github.com/d3/d3-shape
// http://bl.ocks.org/d3noob/7030f35b72de721622b8
import { Component, Input, ChangeDetectorRef, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rm-area]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg:g #area></g>
    `,
  styleUrls: ['./rm-area.component.css']
})
export class AreaComponent implements AfterViewInit, OnChanges {

    @ViewChild('area') _area: any;

    // tslint:disable-next-line:no-input-rename
    @Input('rm-area') sizes: {width; height; data};
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
    public graph_area: any;

    ngAfterViewInit() {

        this.graph_area = d3.select(this._area.nativeElement);

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

        if (!this.graph_area) {
            return;
        }

        const data = this._data;

        const x = this.xAxis,
            y = this.yAxis;

        const area = d3.area()
            .curve(d3.curveNatural)
            .x((d: any) => x(d.date))
             //  .y((d: any) => y(d.close))
            .y0(this.areaHeight)
            .y1((d: any) => y(d.close));

        this.graph_area.selectAll('path')
            .remove();

        this.graph_area.selectAll('path')
            .data([data])
            .enter().append('path')
            .attr('class', 'area')
            .attr('d', area);

    }

    public initChart() {

        const data = this._data;

        const x = this.xAxis,
            y = this.yAxis;

        const area = d3.area()
            .curve(d3.curveNatural)
            .x((d: any) => x(d.date))
            // .y((d: any) => y(d.close));
            .y0(this.areaHeight)
            .y1((d: any) => y(d.close));

        // add the area
        this.graph_area.selectAll('path.area')
             .data([data])
             .enter().append('path')
             .attr('class', 'area')
             .attr('d', area);

    }

}
