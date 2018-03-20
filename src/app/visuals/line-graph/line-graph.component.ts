import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'line-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height"></svg>
  `,
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit, AfterViewInit, OnChanges {
  
    public graph: any;//ForceDirectedGraph;
    public svg: any;
  
    public _options: { width, height } = { width: 800, height: 600 };
    public margin = {top: 20, right: 20, bottom: 30, left: 50};

    @ViewChild('svg') _svg: any;

    @HostListener('window:resize', ['$event'])
    onResize(event) {

    }

    @Input() data: any[];
    private _data: {date,close}[] = [];

    constructor(private ref: ChangeDetectorRef) {
        // console.info('constructor', this.svg.nativeElement);
    }

    ngOnInit() {
        /** Receiving an initialized simulated graph from our custom d3 service */
        //this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

        /** Binding change detection check on each tick
         * This along with an onPush change detection strategy should enforce checking only when relevant!
         * This improves scripting computation duration in a couple of tests I've made, consistently.
         * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
         */
        console.info('ngOnInit', this._data);
    }

    ngOnChanges(changes: SimpleChanges) {
        var parseTime = d3.timeParse("%d-%b-%y");
        if (changes.data) {
            this._data = changes.data.currentValue.map(item => { return {date: parseTime(item.date), close: item.value} });
        }
        console.info('ngOnChanges', this._data);
    }

    ngAfterViewInit() {

        console.info('ngOnChanges', this._data);
        this.svg = d3.select(this._svg.nativeElement);
        this.graph = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.updateChart();
    }

    public updateChart() {

        let width = +this.svg.attr("width") - this.margin.left - this.margin.right,
            height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    
        var x = d3.scaleTime()
            .rangeRound([0, width]);
        
        var y = d3.scaleLinear()
            .rangeRound([height, 0]);
        
        // let data: {date,close}[] = [
        //     {date: parseTime('24-Apr-07'), close: 93.24},
        //     {date: parseTime('25-Apr-07'), close: 95.35},
        //     {date: parseTime('26-Apr-07'), close: 98.84},
        //     {date: parseTime('27-Apr-07'), close: 99.92},
        //     {date: parseTime('28-Apr-07'), close: 99.80},
        // ];
        let data = this._data;
        
        x.domain(d3.extent(data, (d: any) => { return d.date; }));
        y.domain(d3.extent(data, (d: any) => { return d.close; }));
        var line = d3.line()
            .x((d: any): number => { return x(d.date); })
            .y((d: any): number => { return y(d.close); });
        
        
        this.graph.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))
            // .select(".domain")
            //   .remove();
        
        this.graph.append("g")
              .call(d3.axisLeft(y))
              .append("text")
              .attr("fill", "#000")
            //   .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .text("Price ($)");
        
        this.graph.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("d", <any>line);
        
    }

    get options() {
        return this._options = {
        width: window.innerWidth,
        height: window.innerHeight
        };
    }
}
