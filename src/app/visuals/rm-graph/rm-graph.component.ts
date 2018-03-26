// https://github.com/d3/d3-shape
// http://bl.ocks.org/d3noob/7030f35b72de721622b8
import { Component, Input, ChangeDetectorRef, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rm-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg #svg [attr.width]="width" [attr.height]="height">
        <svg:g [attr.transform]="'translate(' + margin.left + ',' + margin.top + ')'">
            <g [rm-area]="graphRect"></g>
            <g [rm-timeline]="graphRect"></g>
            <g [rm-points]="graphRect"></g>
            <g [rm-axis]="graphRect"></g>
        </g>
    </svg>
    <div #tooltip class="tooltip">
        <div class="info time">
            <span class="value">{{startTime}}-{{endTime}}</span>
        </div>
        <div class="info">
            Projected sales: <span class="value">{{sales}}</span>
        </div>
        <div class="info">
            Projected labor hours: <span class="value">{{hours}}</span>
        </div>
    </div>`,
  styleUrls: ['./rm-graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges {

    public startTime: string;
    public endTime: string;
    public sales: string;
    public hours: string;

    public width = 500;
    public height = 500;

    public graph: any;
    public svg: any;
    public tooltip: any;

    public margin = {top: 20, right: 20, bottom: 30, left: 50};
    public get graphRect(): {width; height, data} {
        return {width: this.areaWidth, height: this.areaHeight, data: this._data};
    }

    @ViewChild('svg') _svg: any;
    @ViewChild('tooltip') _tooltip: any;

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

    ngAfterViewInit() {

        const rect = this.el.nativeElement.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        // this.svg = d3.select(this._svg.nativeElement)
        //     .attr('width', this.width)
        //     .attr('height', this.height);

        // this.graph = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        // this.tooltip = d3.select(this._tooltip.nativeElement);

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {

        const rect = this.el.nativeElement.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

    }

    // tslint:disable-next-line:member-ordering
    private xAxis: any;
    // tslint:disable-next-line:member-ordering
    private yAxis: any;

    private get areaWidth(): number {
        return this.width - this.margin.left - this.margin.right;
    }
    private get areaHeight(): number {
        return this.height - this.margin.top - this.margin.bottom;
    }

    private updateScales() {

        const yMax = d3.max(this._data, (d: any) => d.close);
        const yMin = d3.min(this._data, (d: any) => d.close);

        this.xAxis = d3.scaleTime().range([0, this.areaWidth]);
        this.yAxis = d3.scaleLinear().rangeRound([this.areaHeight, 0]);

        this.xAxis.domain(d3.extent(this._data, (d: any) => d.date));
        this.yAxis.domain([yMin - yMax * 0.05, yMax + yMax * 0.05]);

    }

}
