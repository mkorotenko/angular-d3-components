import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'area-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height"></svg>
  `,
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit, AfterViewInit, OnChanges {

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

            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);

        const data = this._data;

        x.domain(d3.extent(data, (d: any) => d.date));
        y.domain([0, d3.max(data, (d: any) => d.close)]);

        var area = d3.area()
            .x((d: any) => x(d.date))
            .y0(height)
            .y1((d: any) => y(d.close));

        this._line = d3.line()
            .x((d: any): number => x(d.date))
            .y((d: any): number => y(d.close));

        let svg = this.graph;
        // add the area
        svg.append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area);

        // add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", <any>this._line);

        // add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

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
