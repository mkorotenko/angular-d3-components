import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'line-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height"></svg>
  `,
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit, AfterViewInit, OnChanges {

    public graph: any; // ForceDirectedGraph;
    public svg: any;

    public _options: { width, height } = { width: 600, height: 600 };
    public margin = {top: 20, right: 20, bottom: 30, left: 50};

    @ViewChild('svg') _svg: any;

    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //     // this.updateChart();
    // }

    // tslint:disable-next-line:member-ordering
    @Input() data: any[];
    // tslint:disable-next-line:member-ordering
    private _data: {date, close}[] = [];

    constructor(private ref: ChangeDetectorRef) {
        // console.info('constructor', this.svg.nativeElement);
    }

    ngOnInit() {
        /** Receiving an initialized simulated graph from our custom d3 service */
        // this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

        /** Binding change detection check on each tick
         * This along with an onPush change detection strategy should enforce checking only when relevant!
         * This improves scripting computation duration in a couple of tests I've made, consistently.
         * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
         */
    }

    ngOnChanges(changes: SimpleChanges) {
        const parseTime = d3.timeParse('%d-%b-%y');
        if (changes.data) {
            this._data = changes.data.currentValue.map(item => ({date: parseTime(item.date), close: item.value}));
        }
        // console.info('ngOnChanges', this._data);
    }

    ngAfterViewInit() {

        // console.info('ngOnChanges', this._data);
        this.svg = d3.select(this._svg.nativeElement);
        this.graph = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.updateChart();
    }

    public updateChart() {
        const gBox = { width: this.svg.attr('width'), height: this.svg.attr('height') }; // this.graph.node().getBBox();
        const width = +gBox.width - this.margin.left - this.margin.right,
            height = +gBox.height - this.margin.top - this.margin.bottom;

        const x = d3.scaleTime()
            .rangeRound([0, width]);

        const y = d3.scaleLinear()
            .rangeRound([height, 0]);

        const data = this._data;

        x.domain(d3.extent(data, (d: any) => d.date));
        y.domain(d3.extent(data, (d: any) => d.close));
        this._line = d3.line()
            .x((d: any): number => x(d.date))
            .y((d: any): number => y(d.close));

        this.graph.append('g')
              .attr('transform', 'translate(0,' + height + ')')
              .call(d3.axisBottom(x));
            // .select(".domain")
            //   .remove();

        this.graph.append('g')
              .call(d3.axisLeft(y))
              .append('text')
              .attr('fill', '#000')
            //   .attr("transform", "rotate(-90)")
              .attr('y', 6)
              .attr('dy', '0.71em')
              .attr('text-anchor', 'end')
              .text('Price ($)');

        this.line = this.graph.append('path')
              .datum(data)
              // .enter()
              .attr('fill', 'none')
              .attr('stroke', 'steelblue')
              .attr('stroke-linejoin', 'round')
              .attr('stroke-linecap', 'round')
              .attr('stroke-width', 1.5)
              .attr('d', <any>this._line);

    }

    // tslint:disable-next-line:member-ordering
    public line: any;
    // tslint:disable-next-line:member-ordering
    private _line: any;

    public newDate() {
        this.line
            .attr('d', <any>this._line);
    }

    get options() {
        return this._options = {
        width: window.innerWidth,
        height: window.innerHeight
        };
    }
}
