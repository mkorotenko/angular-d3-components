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
            <g [rm-area]="areaGraphData"></g>
            <g [rm-timeline]="timelineGraphData"></g>
            <g [rm-points]="pointsGraphData"></g>
            <g [rm-axis]="areaGraphData"></g>
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
export class GraphComponent implements AfterViewInit, OnChanges {

    constructor(
        private el: ElementRef,
        private cd: ChangeDetectorRef
    ) { }

    // @ViewChild('svg') _svg: any;
    @ViewChild('tooltip') _tooltip: any;

    @Input() areaData: any[];

    @Input() pointsData: any[];

    @Input() timelineData: any[];

    public get timelineGraphData(): {width, height, data} {
        return {
            width: this.areaWidth,
            height: this.areaHeight,
            data: this.timelineData
        };
    }

    public get areaGraphData(): {width, height, data} {
        return {
            width: this.areaWidth,
            height: this.areaHeight,
            data: this.areaData
        };
    }

    public get pointsGraphData(): {width, height, data} {
        return {
            width: this.areaWidth,
            height: this.areaHeight,
            data: this.pointsData
        };
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    ngAfterViewInit() {

        const rect = this.el.nativeElement.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        this.cd.detectChanges();

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {

        const rect = this.el.nativeElement.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

    }

    // tslint:disable-next-line:member-ordering
    public startTime: string;
    // tslint:disable-next-line:member-ordering
    public endTime: string;
    // tslint:disable-next-line:member-ordering
    public sales: string;
    // tslint:disable-next-line:member-ordering
    public hours: string;

    // tslint:disable-next-line:member-ordering
    public width = 500;
    // tslint:disable-next-line:member-ordering
    public height = 400;

    // // tslint:disable-next-line:member-ordering
    // public graph: any;
    // // tslint:disable-next-line:member-ordering
    // public svg: any;
    // tslint:disable-next-line:member-ordering
    public tooltip: any;

    // tslint:disable-next-line:member-ordering
    public margin = {top: 20, right: 0, bottom: 30, left: 50};

    // // tslint:disable-next-line:member-ordering
    // private xAxis: any;
    // // tslint:disable-next-line:member-ordering
    // private yAxis: any;

    private get areaWidth(): number {
        return this.width - this.margin.left - this.margin.right;
    }
    private get areaHeight(): number {
        return this.height - this.margin.top - this.margin.bottom;
    }

    // private updateScales() {

    //     const yMax = d3.max(this._data, (d: any) => d.close);
    //     const yMin = d3.min(this._data, (d: any) => d.close);

    //     this.xAxis = d3.scaleTime().range([0, this.areaWidth]);
    //     this.yAxis = d3.scaleLinear().rangeRound([this.areaHeight, 0]);

    //     this.xAxis.domain(d3.extent(this._data, (d: any) => d.date));
    //     // this.yAxis.domain([yMin - yMax * 0.05, yMax + yMax * 0.05]);
    //     this.yAxis.domain([0, yMax + yMax * 0.05]);

    // }

}
