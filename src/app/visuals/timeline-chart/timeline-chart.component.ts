import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Timeline } from './timeline.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'timeline-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height"></svg>
  `,
  styleUrls: ['./timeline-chart.component.css']
})
export class TimelineChartComponent implements OnInit, AfterViewInit, OnChanges {

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
        // this.graph = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.updateChart();
    }

    public updateChart() {
        const gBox = { width: this.svg.attr('width'), height: this.svg.attr('height') };
        const width = +gBox.width - this.margin.left - this.margin.right,
            height = +gBox.height - this.margin.top - this.margin.bottom;

        let types = ["Colonial"];

        let colorScale = d3.scaleOrdinal()
          .domain(types)
          .range(["#202576"]);
        
          var timeline = new Timeline();
          timeline.size([500,80])
            .extent(["7/4/1836", "12/31/1876"])
            .padding(3)
            .maxBandHeight(20);
  
            let csv = this.csv;
            let svg = this.svg;

            types.forEach(function (type, i) {
                
                let onlyThisType = csv.filter((d) => d.sphere === type);
                let theseBands = timeline.timeline(onlyThisType);

                var bar = svg.selectAll("g")
                    .data(theseBands)
                    .enter().append("g")
                    .attr("transform", "translate(100," + (45 + (i * 90)) + ")")
                    .attr("class", "timeline");

                bar.append("rect")
                    .attr("rx", 10)
                    .attr("x", (d: {start}) => d.start)
                    .attr("y", (d: {y}) => d.y)
                    .attr("height", (d: {dy}) => d.dy)
                    .attr("width", (d: {start,end}) => (d.end - d.start));

                bar.append("text")
                    .attr("x", (d: {start,end}) => (d.start + (d.end - d.start)/2))
                    .attr("y", (d: {y}) => d.y)
                    .attr("dy", '1em')
                    .attr("font-size", '12px')
                    .text((d: {name}) => d.name);
              
              })

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

    public csv = [
        // {
        //     "name": "First Barbary War",
        //     "start": "5/10/1801",
        //     "end": "6/10/1805",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "Second Barbary War",
        //     "start": "06/17/1815",
        //     "end": "06/19/1815",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "Aegean Sea Anti/Piracy Operations",
        //     "start": "01/01/1825",
        //     "end": "12/31/1828",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "First Sumatran expedition",
        //     "start": "01/01/1832",
        //     "end": "12/31/1832",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "United States Exploring Expedition",
        //     "start": "01/01/1838",
        //     "end": "12/31/1842",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "Second Sumatran expedition",
        //     "start": "01/01/1838",
        //     "end": "12/31/1838",
        //     "sphere": "Colonial"
        // },
        {
            "name": "Taiping Rebellion",
            "start": "01/01/1850",
            "end": "12/31/1864",
            "sphere": "Colonial"
        },
        // {
        //     "name": "First Fiji Expedition",
        //     "start": "01/01/1855",
        //     "end": "12/31/1855",
        //     "sphere": "Colonial"
        // },
        {
            "name": "Second Opium War",
            "start": "01/01/1856",
            "end": "12/31/1859",
            "sphere": "Colonial"
        },
        {
            "name": "Second Fiji Expedition",
            "start": "01/01/1858",
            "end": "12/31/1858",
            "sphere": "Colonial"
        },
        // {
        //     "name": "Bombardment of Qui Nhơn",
        //     "start": "01/01/1861",
        //     "end": "12/31/1861",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "Shimonoseki War",
        //     "start": "01/01/1863",
        //     "end": "12/31/1864",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "Formosa Expedition",
        //     "start": "01/01/1867",
        //     "end": "12/31/1867",
        //     "sphere": "Colonial"
        // },
        // {
        //     "name": "United States expedition to Korea",
        //     "start": "01/01/1871",
        //     "end": "12/31/1871",
        //     "sphere": "Colonial"
        // },
    ]
}
