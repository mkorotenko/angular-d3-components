// https://github.com/d3/d3-shape
// http://bl.ocks.org/d3noob/7030f35b72de721622b8
// https://medium.com/@c_behrens/enter-update-exit-6cafc6014c36
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
    @Input('rm-timeline') graphData: {
        width: number,
        height: number,
        data: {station; group; start; end}[]
    };
    // tslint:disable-next-line:member-ordering
    private _data: {station; group; start; end}[] = [];
    private _types: string[] = [];
    private _timeMin: number = DateTime('22/03/2018 09:30').getTime();
    private _timeMax: number = DateTime('22/03/2018 21:30').getTime();

    constructor(
        private el: ElementRef,
        private cd: ChangeDetectorRef
    ) { }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.graphData) {
            this._data = this.graphData.data;
            this._types = [];
            const groups: any = {};
            this._data.forEach(item => {
                groups[item.group] = item.group;
            });
            // tslint:disable-next-line:forin
            for (const group in groups) {
                this._types.push(group);
            }

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

    private get areaWidth(): number {
        return this.graphData.width;
    }
    private get areaHeight(): number {
        return this.graphData.height;
    }

    private updateScales() {

    }

    public updateChart() {

        if (!this.graph_timeline) {
            return;
        }

        this.initChart();

    }

    public initChart() {

        const timeline = new Timeline();
        timeline.size([this.areaWidth, 480])
            .extent([this._timeMin, this._timeMax])
            .padding(3)
            .maxBandHeight(22);

        const height = this.areaHeight;
        this._types.forEach((type, i) => {

            const onlyThisType = this.graphData.data.filter((d) => d.group === type);
            const theseBands = timeline.timeline(onlyThisType);

            this.graph_timeline.selectAll('g.timeline_' + i)
                .remove();

            const bar = this.graph_timeline.selectAll('g.timeline_' + i)
                .data(theseBands)
                .enter().append('g')
                .attr('transform', 'translate(0,' + (height - (25 + (i * 25))) + ')')
                // .attr('class', 'timeline-group')
                .attr('class', 'timeline-group timeline_' + i);

            const t = d3.transition()
                .duration(750)
                .ease(d3.easeLinear);

            bar.append('rect')
                .on('click', this.onClick.bind(this))
                .attr('rx', 10)
                .attr('x', (d: {start}) => d.start)
                .attr('y', (d: {y}) => d.y)
                .attr('height', (d: {dy}) => d.dy)
                .transition(t)
                .attr('width', (d: {start, end}) => (d.end - d.start));
                // .on('click', this.onClick.bind(this));

            bar.append('text')
                .attr('x', (d: {start, end}) => (d.start + (d.end - d.start) / 2))
                .attr('y', (d: {y}) => d.y)
                .attr('dy', '1.15em')
                // .attr('font-size', '12px')
                .text((d: {station}) => d.station);

        });

    }

    private onClick(timeline) {
        // tslint:disable-next-line:no-console
        console.info('onClick', timeline );
    }

}
