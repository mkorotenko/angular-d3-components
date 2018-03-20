import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class LineGraphComponent implements OnInit, AfterViewInit {
  
    graph: any;//ForceDirectedGraph;
  
    public _options: { width, height } = { width: 800, height: 600 };
    @ViewChild('svg') svg: any;

    @HostListener('window:resize', ['$event'])
    onResize(event) {

    }

    constructor(private ref: ChangeDetectorRef) {}

    ngOnInit() {
        /** Receiving an initialized simulated graph from our custom d3 service */
        //this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

        /** Binding change detection check on each tick
         * This along with an onPush change detection strategy should enforce checking only when relevant!
         * This improves scripting computation duration in a couple of tests I've made, consistently.
         * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
         */
    }

    ngAfterViewInit() {
        let svg = d3.select(this.svg.nativeElement);
        let     margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parseTime = d3.timeParse("%d-%b-%y");
    
    var x = d3.scaleTime()
        .rangeRound([0, width]);
    
    var y = d3.scaleLinear()
        .rangeRound([height, 0]);
    
    var line = d3.line()
        .x((d: any): number => { return x(d.date); })
        .y((d: any): number => { return y(d.close); });
    
    // d3.tsv("data.tsv", (d: any): any => {
    //   d.date = parseTime(d.date);
    //   d.close = +d.close;
    //   return d;
    // }, (error: any, data: any) => {
    //   if (error) throw error;
    let data: {date,close}[] = [
        {date: new Date('2007-04-24'), close: 93.24},
        {date: new Date('2007-04-25'), close: 95.35},
        {date: new Date('2007-04-26'), close: 98.84},
        {date: new Date('2007-04-27'), close: 99.92},
        {date: new Date('2007-04-28'), close: 99.80},
    ];
    
      x.domain(d3.extent(data, (d: any) => { return d.date; }));
      y.domain(d3.extent(data, (d: any) => { return d.close; }));
    
      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
        .select(".domain")
          .remove();
    
      g.append("g")
          .call(d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");
    
      g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", <any>line);
    
    // });
}

    get options() {
        return this._options = {
        width: window.innerWidth,
        height: window.innerHeight
        };
    }
}
