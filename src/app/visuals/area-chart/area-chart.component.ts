// https://github.com/d3/d3-shape
import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'area-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg #svg [attr.width]="width" [attr.height]="height"></svg>
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
    </div>
  `,
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit, AfterViewInit, OnChanges {

    public startTime: string;
    public endTime: string;
    public sales: string;
    public hours: string;

    public width: number = 600;
    public height: number = 600;

    public graph: any; // ForceDirectedGraph;
    public svg: any;
    public tooltip: any;

    public _options: { width, height } = { width: 600, height: 600 };
    public margin = {top: 20, right: 20, bottom: 30, left: 50};

    @ViewChild('svg') _svg: any;
    @ViewChild('tooltip') _tooltip: any;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
    //     // this.updateChart();
        this.width = 700;
        this.cd.markForCheck();
        this.updateChart();

    }

    // tslint:disable-next-line:member-ordering
    @Input() data: any[];
    // tslint:disable-next-line:member-ordering
    private _data: {date, close}[] = [];

    constructor(private cd: ChangeDetectorRef) {
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
        //const parseTime = d3.timeParse('%d-%b-%y');
        if (changes.data) {
            this._data = changes.data.currentValue.map(item => ({date: item.date, close: item.value}));
        }
        // console.info('ngOnChanges', this._data);
    }

    ngAfterViewInit() {

        // console.info('ngOnChanges', this._data);
        this.svg = d3.select(this._svg.nativeElement);
        this.graph = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        this.tooltip = d3.select(this._tooltip.nativeElement);

        this.updateChart();
    }

    public updateChart() {
        console.info('updateChart', this._data);

        const gBox = { width: this.width, height: this.height }; // this.graph.node().getBBox();
        const width = +gBox.width - this.margin.left - this.margin.right,
            height = +gBox.height - this.margin.top - this.margin.bottom;

        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().rangeRound([height, 0]);

        const data = this._data;

        let yMax = d3.max(data, (d: any) => d.close); 
        let yMin = d3.min(data, (d: any) => d.close); 
        x.domain(d3.extent(data, (d: any) => d.date));
        y.domain([yMin - yMax*0.05, yMax + yMax*0.05]);
        // y.domain(d3.extent(data, (d: any) => d.close));

        var area = d3.area()
            .curve(d3.curveNatural)
            .x((d: any) => x(d.date))
            // .y((d: any) => y(d.close));
            .y0(height)
            .y1((d: any) => y(d.close));

        // this._line = d3.line()
        //     .curve(d3.curveNatural)
        //     .x((d: any): number => x(d.date))
        //     .y((d: any): number => y(d.close));

        let tf = d3.timeFormat('%I:%M %p');
        let svg = this.graph;
        // add the area
        svg.selectAll("path")
            .data([data])
            .enter().append("path")
            .attr("class", "area")
            .attr("d", area);

        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", (d) => x(d.date))
            .attr("cy", (d) => y(d.close))
            .on("mouseover", (d) => {
                this.startTime = tf(d.date);
                this.endTime = tf(d.date);
                this.sales = '$' + d.close;
                this.hours = '1';

                this.tooltip
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) - 85 + "px")
                    .transition().duration(200)
                    .style("opacity", 1);

                this.cd.markForCheck();
            })
            .on("mouseout", (d) => {
                this.tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        
        // add the valueline path.
        // svg.append("path")
        //     .data([data])
        //     .attr("class", "line")
        //     .attr("d", <any>this._line);

        // add the X Axis
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the Y Axis
        svg.append("g")
            .attr("class", "axis y-axis")
            .call(d3.axisLeft(y));

        svg.selectAll("g.x-axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -height); 


        svg.selectAll("g.y-axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0); 
        
    }

    // tslint:disable-next-line:member-ordering
    public line: any;
    // tslint:disable-next-line:member-ordering
    private _line: any;

}
