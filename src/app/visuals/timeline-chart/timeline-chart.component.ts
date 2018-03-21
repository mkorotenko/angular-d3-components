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
        const gBox = { width: this.svg.attr('width'), height: this.svg.attr('height') }; // this.graph.node().getBBox();
        const width = +gBox.width - this.margin.left - this.margin.right,
            height = +gBox.height - this.margin.top - this.margin.bottom;

        //     var x = d3.scaleTime().range([0, width]);
        //     var y = d3.scaleLinear().range([height, 0]);

        // const data = this._data;

        // x.domain(d3.extent(data, (d: any) => d.date));
        // y.domain([0, d3.max(data, (d: any) => d.close)]);

        // var area = d3.area()
        //     .x((d: any) => x(d.date))
        //     .y0(height)
        //     .y1((d: any) => y(d.close));

        // this._line = d3.line()
        //     .x((d: any): number => x(d.date))
        //     .y((d: any): number => y(d.close));

        let types = ["European","Native","Colonial","Latin America","Internal"];

        let colorScale = d3.scaleOrdinal()
          .domain(types)
          .range(["#96abb1", "#313746", "#b0909d", "#687a97", "#292014"]);
        
       //var timeline = d3.layout.timeline()
          var timeline = new Timeline();
          timeline.size([500,80])
            .extent(["7/4/1776", "12/31/1876"])
            .padding(3)
            .maxBandHeight(20);
  
            let csv = this.csv;
            let svg = this.svg;
            console.info('csv:', csv);
            types.forEach(function (type, i) {
                let onlyThisType = csv.filter((d) => d.sphere === type);
              
                let theseBands = timeline.timeline(onlyThisType);
              
                svg.append("g")
                .attr("transform", "translate(100," + (35 + (i * 90)) + ")")
                .selectAll("rect")
                .data(<any>theseBands)
                .enter()
                .append("rect")
                .attr("rx", 2)
                .attr("x", (d: {start}) => d.start)
                .attr("y", (d: {y}) => d.y)
                .attr("height", (d: {dy}) => d.dy)
                .attr("width", (d: {start,end}) => {return d.end - d.start})
                .style("fill", (d: {sphere}) => <any>colorScale(d.sphere))
                .style("stroke", "black")
                .style("stroke-width", 1);
              
                svg.append("text")
                .text(type)
                .attr("y", 50 + (i * 90))
                .attr("x", 20)
              
              })
//            let svg = this.graph;
        // // add the area
        // svg.append("path")
        //     .data([this._data])
        //     .attr("class", "area")
        //     .attr("d", area);

        // // add the valueline path.
        // svg.append("path")
        //     .data([data])
        //     .attr("class", "line")
        //     .attr("d", <any>this._line);

        // // add the X Axis
        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x));

        // // add the Y Axis
        // svg.append("g")
        //     .call(d3.axisLeft(y));

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
        {
            "name": "American Revolutionary War",
            "start": "4/19/1775",
            "end": "9/3/1783",
            "sphere": "European"
        },
        {
            "name": "Cherokee–American wars",
            "start": "01/01/1776",
            "end": "12/31/1795",
            "sphere": "Native"
        },
        {
            "name": "Northwest Indian War",
            "start": "01/01/1785",
            "end": "12/31/1795",
            "sphere": "Native"
        },
        {
            "name": "Whiskey Rebellion",
            "start": "01/01/1795",
            "end": "12/31/1795",
            "sphere": "Internal"
        },
        {
            "name": "Quasi-War",
            "start": "01/01/1798",
            "end": "12/31/1800",
            "sphere": "European"
        },
        {
            "name": "First Barbary War",
            "start": "5/10/1801",
            "end": "6/10/1805",
            "sphere": "Colonial"
        },
        {
            "name": "Tecumseh's War",
            "start": "01/01/1811",
            "end": "12/31/1811",
            "sphere": "Native"
        },
        {
            "name": "War of 1812",
            "start": "6/18/1812",
            "end": "2/18/1815",
            "sphere": "European"
        },
        {
            "name": "Red Stick War",
            "start": "01/01/1813",
            "end": "8/31/1814",
            "sphere": "Native"
        },
        {
            "name": "Second Barbary War",
            "start": "06/17/1815",
            "end": "06/19/1815",
            "sphere": "Colonial"
        },
        {
            "name": "First Seminole War",
            "start": "01/01/1817",
            "end": "12/31/1818",
            "sphere": "Native"
        },
        {
            "name": "Texas/Indian Wars",
            "start": "01/01/1820",
            "end": "12/31/1875",
            "sphere": "Native"
        },
        {
            "name": "Arikara War",
            "start": "01/01/1823",
            "end": "12/31/1823",
            "sphere": "Native"
        },
        {
            "name": "Aegean Sea Anti/Piracy Operations",
            "start": "01/01/1825",
            "end": "12/31/1828",
            "sphere": "Colonial"
        },
        {
            "name": "Winnebago War",
            "start": "01/01/1827",
            "end": "12/31/1827",
            "sphere": "Native"
        },
        {
            "name": "First Sumatran expedition",
            "start": "01/01/1832",
            "end": "12/31/1832",
            "sphere": "Colonial"
        },
        {
            "name": "Black Hawk War",
            "start": "01/01/1832",
            "end": "12/31/1832",
            "sphere": "Native"
        },
        {
            "name": "Second Seminole War",
            "start": "01/01/1835",
            "end": "12/31/1842",
            "sphere": "Native"
        },
        {
            "name": "Patriot War",
            "start": "01/01/1838",
            "end": "12/31/1838",
            "sphere": "European"
        },
        {
            "name": "United States Exploring Expedition",
            "start": "01/01/1838",
            "end": "12/31/1842",
            "sphere": "Colonial"
        },
        {
            "name": "Second Sumatran expedition",
            "start": "01/01/1838",
            "end": "12/31/1838",
            "sphere": "Colonial"
        },
        {
            "name": "Mexican–American War",
            "start": "01/01/1846",
            "end": "12/31/1848",
            "sphere": "Latin America"
        },
        {
            "name": "Cayuse War",
            "start": "01/01/1847",
            "end": "12/31/1855",
            "sphere": "Native"
        },
        {
            "name": "Taiping Rebellion",
            "start": "01/01/1850",
            "end": "12/31/1864",
            "sphere": "Colonial"
        },
        {
            "name": "Apache Wars",
            "start": "01/01/1851",
            "end": "12/31/1900",
            "sphere": "Native"
        },
        {
            "name": "Bombardment of Greytown",
            "start": "01/01/1854",
            "end": "12/31/1854",
            "sphere": "European"
        },
        {
            "name": "Puget Sound War",
            "start": "01/01/1855",
            "end": "12/31/1856",
            "sphere": "Native"
        },
        {
            "name": "First Fiji Expedition",
            "start": "01/01/1855",
            "end": "12/31/1855",
            "sphere": "Colonial"
        },
        {
            "name": "Rogue River Wars",
            "start": "01/01/1855",
            "end": "12/31/1856",
            "sphere": "Native"
        },
        {
            "name": "Third Seminole War",
            "start": "01/01/1855",
            "end": "12/31/1858",
            "sphere": "Native"
        },
        {
            "name": "Yakima War",
            "start": "01/01/1855",
            "end": "12/31/1858",
            "sphere": "Native"
        },
        {
            "name": "Filibuster War",
            "start": "01/01/1856",
            "end": "12/31/1857",
            "sphere": "Latin America"
        },
        {
            "name": "Second Opium War",
            "start": "01/01/1856",
            "end": "12/31/1859",
            "sphere": "Colonial"
        },
        {
            "name": "Utah War",
            "start": "01/01/1857",
            "end": "12/31/1858",
            "sphere": "Internal"
        },
        {
            "name": "Navajo Wars",
            "start": "01/01/1858",
            "end": "12/31/1866",
            "sphere": "Native"
        },
        {
            "name": "Second Fiji Expedition",
            "start": "01/01/1858",
            "end": "12/31/1858",
            "sphere": "Colonial"
        },
        {
            "name": "First and Second Cortina War",
            "start": "01/01/1859",
            "end": "12/31/1861",
            "sphere": "Latin America"
        },
        {
            "name": "Paiute War",
            "start": "01/01/1860",
            "end": "12/31/1860",
            "sphere": "Native"
        },
        {
            "name": "Reform War",
            "start": "01/01/1860",
            "end": "12/31/1860",
            "sphere": "Latin America"
        },
        {
            "name": "American Civil War",
            "start": "01/01/1861",
            "end": "12/31/1865",
            "sphere": "Internal"
        },
        {
            "name": "Bombardment of Qui Nhơn",
            "start": "01/01/1861",
            "end": "12/31/1861",
            "sphere": "Colonial"
        },
        {
            "name": "Yavapai Wars",
            "start": "01/01/1861",
            "end": "12/31/1875",
            "sphere": "Native"
        },
        {
            "name": "Dakota War of 1862",
            "start": "01/01/1862",
            "end": "12/31/1862",
            "sphere": "Native"
        },
        {
            "name": "Colorado War",
            "start": "01/01/1863",
            "end": "12/31/1865",
            "sphere": "Native"
        },
        {
            "name": "Shimonoseki War",
            "start": "01/01/1863",
            "end": "12/31/1864",
            "sphere": "Colonial"
        },
        {
            "name": "Snake War",
            "start": "01/01/1864",
            "end": "12/31/1868",
            "sphere": "Native"
        },
        {
            "name": "Powder River War",
            "start": "01/01/1865",
            "end": "12/31/1865",
            "sphere": "Native"
        },
        {
            "name": "Red Cloud's War",
            "start": "01/01/1866",
            "end": "12/31/1868",
            "sphere": "Native"
        },
        {
            "name": "Siege of Mexico City",
            "start": "01/01/1867",
            "end": "12/31/1867",
            "sphere": "Latin America"
        },
        {
            "name": "Formosa Expedition",
            "start": "01/01/1867",
            "end": "12/31/1867",
            "sphere": "Colonial"
        },
        {
            "name": "Comanche Campaign",
            "start": "01/01/1867",
            "end": "12/31/1875",
            "sphere": "Native"
        },
        {
            "name": "United States expedition to Korea",
            "start": "01/01/1871",
            "end": "12/31/1871",
            "sphere": "Colonial"
        },
        {
            "name": "Modoc War",
            "start": "01/01/1872",
            "end": "12/31/1873",
            "sphere": "Native"
        },
        {
            "name": "Red River War",
            "start": "01/01/1874",
            "end": "12/31/1875",
            "sphere": "Native"
        },
        {
            "name": "Las Cuevas War",
            "start": "01/01/1875",
            "end": "12/31/1875",
            "sphere": "Latin America"
        },
        {
            "name": "Great Sioux War of 1876",
            "start": "01/01/1876",
            "end": "12/31/1877",
            "sphere": "Native"
        },
        {
            "name": "Buffalo Hunters' War",
            "start": "01/01/1876",
            "end": "12/31/1877",
            "sphere": "Native"
        }
    ]
}
