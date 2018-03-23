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
export class AxisComponent implements OnInit, AfterViewInit, OnChanges {

    public width = 600;
    public height = 600;

    public graph: any;
    public svg: any;

    @ViewChild('xAxis') _xAxis: any;
    @ViewChild('yAxis') _yAxis: any;

    // tslint:disable-next-line:no-input-rename
    @Input('rm-axis') sizes: {width; height; data};
    // tslint:disable-next-line:member-ordering
    @Input() data: any[];
    // tslint:disable-next-line:member-ordering
    private _data: {date, close}[] = [];

    constructor(
        private el: ElementRef,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.data) {
            this._data = changes.data.currentValue.map(item => ({date: item.date, close: item.value}));
        }

    }

    // tslint:disable-next-line:member-ordering
    public graph_xAxis: any;
    // tslint:disable-next-line:member-ordering
    public graph_yAxis: any;

    ngAfterViewInit() {

        this._data = this.sizes.data;
        this.updateScales();

        this.graph_xAxis = d3.select(this._xAxis.nativeElement);
        // _xAxis.call(d3.axisBottom(this.xAxis));

        this.graph_yAxis = d3.select(this._yAxis.nativeElement);
        // _yAxis.call(d3.axisLeft(this.yAxis));

        this.initAxis();

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {

        // const rect = this.el.nativeElement.getBoundingClientRect();
        // this.width = rect.width;
        // this.height = rect.height;

        // this.svg.attr('width', this.width)
        //         .attr('height', this.height);

        // this.updateScales();
        // this.updateArea();
        // this.updateAxis();

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

    public initAxis() {

        const svg = this.graph;
        const width = this.areaWidth,
            height = this.areaHeight;

        // add the X Axis
        this.graph_xAxis
            .attr('class', 'axis x-axis')
            .attr('transform', 'translate(0,' + (height - 50) + ')');

        // add the Y Axis
        this.graph_yAxis
            .attr('class', 'axis y-axis');

        this.updateAxis();

    }

    public updateAxis() {

        const svg = this.graph;
        const width = this.areaWidth,
            height = this.areaHeight;

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
            .attr('y2', -height);

        this.graph_yAxis.selectAll('g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', width)
            .attr('y2', 0);
    }

    public updateArea() {

        const data = this._data;

        const svg = this.graph;
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

        svg.selectAll('path')
            .remove();

        svg.selectAll('path')
            .data([data])
            .enter().append('path')
            .attr('class', 'area')
            .attr('d', area);

    }

    public initChart() {
        // tslint:disable-next-line:no-console
        console.info('initChart');

        this.updateScales();
        const data = this._data;

        const svg = this.graph;
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

        // this._line = d3.line()
        //     .curve(d3.curveNatural)
        //     .x((d: any): number => x(d.date))
        //     .y((d: any): number => y(d.close));

        // const tf = d3.timeFormat('%I:%M %p');

        // add the area
         svg.selectAll('path.area')
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

        this.initAxis();

    }

    // tslint:disable-next-line:member-ordering
    public line: any;
    // tslint:disable-next-line:member-ordering
    private _line: any;

}
