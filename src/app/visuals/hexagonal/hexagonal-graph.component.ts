import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
//import { D3Service } from '../../d3';
import * as d3 from 'd3';
import * as d3Hexbin from 'd3-hexbin';

@Component({
  selector: 'hexa-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height"></svg>
  `,
  styleUrls: ['./hexagonal-graph.component.css']
})
export class HexagonalGraphComponent implements OnInit, AfterViewInit {
  graph: any;//ForceDirectedGraph;
  public _options: { width, height } = { width: 800, height: 600 };
  @ViewChild('svg') svg: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.graph.initSimulation(this.options);
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
    //this.graph.initSimulation(this.options);
    let svg = d3.select(this.svg.nativeElement);
    console.info('svg', svg, d3, this.svg);
    let     margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var randomX = d3.randomNormal(width / 2, 80),
    randomY = d3.randomNormal(height / 2, 80),
    points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

var color = d3.scaleSequential(d3.interpolateLab("white", "steelblue"))
    .domain([0, 20]);

var hexbin = d3Hexbin.hexbin()
    .radius(20)
    .extent([[0, 0], [width, height]]);

var x = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, height])
    .range([height, 0]);

g.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "hexagon")
    .attr("clip-path", "url(#clip)")
  .selectAll("path")
  .data(hexbin(points))
  .enter().append("path")
    .attr("d", hexbin.hexagon())
    .attr("transform", (d: {x, y}) => { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", (d: {length}) => { return color(d.length); });

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).tickSizeOuter(-width));

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(-height));
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
