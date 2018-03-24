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
    <svg:g #area></g>
    `,
  styleUrls: ['./rm-points.component.css']
})
export class PointsComponent implements AfterViewInit, OnChanges {

    public width = 600;
    public height = 600;

    public graph: any;
    public svg: any;

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
        this.yAxis = d3.scaleLinear().rangeRound([this.areaHeight - 50, 0]);

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
        const width = this.areaWidth,
            height = this.areaHeight;

        const area = d3.area()
            .curve(d3.curveNatural)
            .x((d: any) => x(d.date))
            // .y((d: any) => y(d.close));
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

        // this._line = d3.line()
        //     .curve(d3.curveNatural)
        //     .x((d: any): number => x(d.date))
        //     .y((d: any): number => y(d.close));

        // const tf = d3.timeFormat('%I:%M %p');

        // add the area
        this.graph_area.selectAll('path.area')
             .data([data])
             .enter().append('path')
             .attr('class', 'area')
             .attr('d', area);
        // this.updateArea();
        // svg.selectAll('dot')
        //     .data(data)
        //     .enter().append('circle')
        //     .attr('r', 4)
        //     .attr('cx', (d) => x(d.date))
        //     .attr('cy', (d) => y(d.close))
        //     .on('mouseover', (d) => {
        //         this.startTime = tf(d.date);
        //         this.endTime = tf(d.date);
        //         this.sales = '$' + d.close;
        //         this.hours = '1';

        //         this.tooltip
        //             .style('left', (d3.event.pageX) + 'px')
        //             .style('top', (d3.event.pageY) - 85 + 'px')
        //             .transition().duration(200)
        //             .style('opacity', 1);

        //         this.cd.markForCheck();
        //     })
        //     .on('mouseout', (d) => {
        //         this.tooltip.transition()
        //             .duration(500)
        //             .style('opacity', 0);
        //     });

        // add the valueline path.
        // svg.append("path")
        //     .data([data])
        //     .attr("class", "line")
        //     .attr("d", <any>this._line);

    }

    // tslint:disable-next-line:member-ordering
    public line: any;
    // tslint:disable-next-line:member-ordering
    private _line: any;

}
