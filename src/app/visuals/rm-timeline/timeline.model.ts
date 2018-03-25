import * as d3 from 'd3';

export class Timeline {

    timelines = [];
    dateAccessor = (d) => new Date(d);
    // tslint:disable-next-line:member-ordering
    processedTimelines = [];
    startAccessor = (d) => d.start;
    endAccessor = (d) => d.end;
    // tslint:disable-next-line:member-ordering
    _size = [0, 0];
    // tslint:disable-next-line:member-ordering
    timelineExtent = [-Infinity, Infinity];
    // tslint:disable-next-line:member-ordering
    setExtent = [];
    // tslint:disable-next-line:member-ordering
    displayScale = d3.scaleLinear();
    // tslint:disable-next-line:member-ordering
    swimlanes = [];
    // tslint:disable-next-line:member-ordering
    _padding = 0;
    // tslint:disable-next-line:member-ordering
    fixedExtent = false;
    // tslint:disable-next-line:member-ordering
    maximumHeight = Infinity;

    public processTimelines() {

 this.timelines.forEach((band) => {
 const projectedBand = {start: undefined, end: undefined, lane: undefined};
            for (const x in band) {
                if (band.hasOwnProperty(x)) {
                    projectedBand[x] = band[x];
                }
            }
 projectedBand.start = this.dateAccessor(this.startAccessor(band));
 projectedBand.end = this.dateAccessor(this.endAccessor(band));
 projectedBand.lane = 0;
 this.processedTimelines.push(projectedBand);
 });

    }

    projectTimelines() {
        if (this.fixedExtent === false) {
            const minStart = d3.min(this.processedTimelines, (d) => d.start);
            const maxEnd = d3.max(this.processedTimelines, (d) => d.end);
            this.timelineExtent = [minStart, maxEnd];
        } else {
            this.timelineExtent = <any>[this.dateAccessor(this.setExtent[0]), this.dateAccessor(this.setExtent[1])];
        }

        this.displayScale.domain(this.timelineExtent).range([0, this._size[0]]);

        this.processedTimelines.forEach((band) => {
            band.originalStart = band.start;
            band.originalEnd = band.end;
            band.start = this.displayScale(band.start);
            band.end = this.displayScale(band.end);
        });
    }

    fitsIn(lane, band) {
 if (lane.end < band.start || lane.start > band.end) {
 return true;
 }
 const filteredLane = lane.filter((d) => (d.start <= band.end && d.end >= band.start));
 if (filteredLane.length === 0) {
 return true;
 }
 return false;
    }

    findlane(band) {
 // make the first array
 if (this.swimlanes[0] === undefined) {
 this.swimlanes[0] = [band];
 return;
 }
 const l = this.swimlanes.length - 1;
 let x = 0;

 while (x <= l) {
 if (this.fitsIn(this.swimlanes[x], band)) {
 this.swimlanes[x].push(band);
 return;
 }
 x++;
 }
 this.swimlanes[x] = [band];
 return;
    }

    timeline(data) {
 if (!arguments.length) { return this.timeline; }

 this.timelines = data;

 this.processedTimelines = [];
 this.swimlanes = [];

 this.processTimelines();
        this.projectTimelines();


 this.processedTimelines.forEach((band) => {
 this.findlane(band);
 });

 let height = this._size[1] / this.swimlanes.length;
 height = Math.min(height, this.maximumHeight);

 this.swimlanes.forEach((lane, i) => {
 lane.forEach((band) => {
 band.y = i * (height);
 band.dy = height - this._padding;
 band.lane = i;
 });
 });

 return this.processedTimelines;
    }

    dateFormat (_x): Timeline {
 if (!arguments.length) { return <any>this.dateAccessor; }
 this.dateAccessor = _x;
 return this;
    }

    bandStart (_x): Timeline {
 if (!arguments.length) { return <any>this.startAccessor; }
 this.startAccessor = _x;
 return this;
    }

    bandEnd (_x): Timeline {
 if (!arguments.length) { return <any>this.endAccessor; }
 this.endAccessor = _x;
 return this;
    }

    size (_x): Timeline {
 if (!arguments.length) { return <any>this.size; }
 this._size = _x;
 return this;
    }

    padding (_x): Timeline {
 if (!arguments.length) { return <any>this._padding; }
 this._padding = _x;
 return this;
    }

    extent (_x): Timeline {
 if (!arguments.length) { return <any>this.timelineExtent; }
        this.fixedExtent = true;
        this.setExtent = _x;
 if (_x.length === 0) {
 this.fixedExtent = false;
 }
 return this;
    }

    maxBandHeight (_x): Timeline {
 if (!arguments.length) { return <any>this.maximumHeight; }
        this.maximumHeight = _x;
 return this;
    }

}
