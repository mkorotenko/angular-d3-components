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

        const newBarTransition = d3.transition()
            .duration(750)
            .ease(d3.easeLinear);

        const height = this.areaHeight;

        const timeline_group = this.graph_timeline.selectAll('g.timeline-group')
            .data(this._types);
        timeline_group.enter().append('g')
            .attr('transform', (group: string, index: number) => 'translate(0,' + (height - (25 + (index * 25))) + ')')
            .attr('class', (group: string, index: number) => 'timeline-group timeline_' + index);
        timeline_group.exit().remove();

         this._types.forEach((group: string, index: number) => {

            const groupData = this.graphData.data.filter((d) => d.group === group);
            const timelineData = timeline.timeline(groupData);

            const groupBar = this.graph_timeline.select('.timeline-group.timeline_' + index);
            const timeBar = groupBar.selectAll('rect')
                .data(timelineData);

            const timeText = groupBar.selectAll('text')
                .data(timelineData);

            timeBar.enter().append('rect')
                .attr('rx', 10)
                .attr('x', (d: {start}) => d.start)
                .attr('y', (d: {y}) => d.y)
                .attr('height', (d: {dy}) => d.dy)
                // .transition(newBarTransition)
                .attr('width', (d: {start, end}) => (d.end - d.start));

            timeText.enter().append('text')
                .attr('x', (d: {start, end}) => (d.start + (d.end - d.start) / 2))
                .attr('y', (d: {y}) => d.y)
                .attr('dy', '1.15em')
                .text((d: {station}) => d.station);

            timeBar
                .attr('x', (d: {start}) => d.start)
                .attr('y', (d: {y}) => d.y)
                .attr('height', (d: {dy}) => d.dy)
                .attr('width', (d: {start, end}) => (d.end - d.start));

            timeText
                .attr('x', (d: {start, end}) => (d.start + (d.end - d.start) / 2))
                .attr('y', (d: {y}) => d.y)
                .text((d: {station}) => d.station)

            timeBar.exit()
                // .transition(newBarTransition)
                .attr('width', 0)
                .remove()

            timeText.exit()
                .remove()

        });

    }

    private onClick(timeline) {
        // tslint:disable-next-line:no-console
        console.info('onClick', timeline );
    }

}
