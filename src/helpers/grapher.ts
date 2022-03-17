interface Options {
  doEqualizeAxes: boolean;
  doDrawAxes: boolean;
  lineColor: string;
  xMax: number;
  xMin: number;
  yMin: number;
  yMax: number;
}

const defaultOptions: Options = {
  doEqualizeAxes: true,
  doDrawAxes: true,
  lineColor: '#666',
  xMax: 5,
  xMin: -5,
  yMin: -5,
  yMax: 5,
}

export class GrapherDrawer {
  private svg;
  private svgNS;

  private lightStyle = {stroke: '#ddd', fill: 'transparent', 'stroke-width': 3}

  private numFnPts = 300

  constructor(
    svgId: string,
    private xSize: number,
    private ySize: number,
  ) {
    this.svg = document.getElementById(svgId);
    this.svgNS = this.svg.namespaceURI;

    this.setCanvasSize(xSize, ySize);
  }

  public setCanvasSize(w: number, h: number) {
    this.xSize = w
    this.ySize = h
    this.addAttributes(this.svg, { width: this.xSize, height: this.ySize })
  }

  private add(eltName: string, attr) {
    const elt = document.createElementNS(this.svgNS, eltName)
    this.svg.appendChild(elt)
    if (attr) this.addAttributes(elt, attr)
    return elt
  }

  private addAttributes(elt, attr) {
    for (const key in attr) {
      elt.setAttribute(key, attr[key])
    }
    return elt
  }

  drawFn(fn: (x: number) => number, _opts: Partial<Options> = {}) {
    const opts = { ...defaultOptions, ..._opts };
    
    let xMax = opts.xMax;
    let xMin = opts.xMin;
    let yMin = opts.yMin;
    let yMax = opts.yMax;

    if (opts.doEqualizeAxes) {
      // This means to *increase* the frame just enough so that the axes are
      // equally scaled.
      const xRatio = (xMax - xMin) / this.xSize
      const yRatio = (yMax - yMin) / this.ySize
      if (xRatio < yRatio) {
        const xMid = (xMax + xMin) / 2
        const half = (xMax - xMin) / 2
        xMin = xMid - half * (yRatio / xRatio)
        xMax = xMid + half * (yRatio / xRatio)
      } else {
        const yMid = (yMax + yMin) / 2
        const half = (yMax - yMin) / 2
        yMin = yMid - half * (xRatio / yRatio)
        yMax = yMid + half * (xRatio / yRatio)
      }
    }

    const canvasPtFromXY = (x, y) => {
      const xPerc = (x - xMin) / (xMax - xMin)
      const yPerc = (y - yMin) / (yMax - yMin)
      return [xPerc * this.xSize, this.ySize - yPerc * this.ySize]
    }

    const drawTickAroundPt = (p, dir) => {
      const tick = this.add('line', this.lightStyle)
      const a = [p[0], p[1]]
      a[dir] -= 5
      const b = [p[0], p[1]]
      b[dir] += 5
      this.addAttributes(tick, {x1: a[0], y1: a[1], x2: b[0], y2: b[1]})
    }

    if (opts.doDrawAxes) {

      // The x-axis.
      const leftPt  = canvasPtFromXY(xMin, 0)
      const rightPt = canvasPtFromXY(xMax, 0)
      if (0 <= leftPt[1] && leftPt[1] < this.ySize) {
        const xAxis = this.add('line', this.lightStyle)
        this.addAttributes(xAxis, {x1:  leftPt[0], y1:  leftPt[1],
                              x2: rightPt[0], y2: rightPt[1]})
        for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
          const p = canvasPtFromXY(x, 0)
          drawTickAroundPt(p, 1)  // 1 == vertical tick
        }
      }

      // The y-axis.
      const botPt = canvasPtFromXY(0, yMin)
      const topPt = canvasPtFromXY(0, yMax)
      if (0 <= botPt[0] && botPt[0] < this.xSize) {
        const yAxis = this.add('line', this.lightStyle)
        this.addAttributes(yAxis, {x1: botPt[0], y1: botPt[1],
                              x2: topPt[0], y2: topPt[1]})
        for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
          const p = canvasPtFromXY(0, y)
          drawTickAroundPt(p, 0)  // 0 == horizontal tick
        }
      }
    }

    const xDelta = (xMax - xMin) / (this.numFnPts - 1)
    const pts = []
    let xPrev = xMin
    let prevCanvasY: any = false

    for (let i = 0; i < this.numFnPts; i++) {
      let x, xTarget = xMin + i * xDelta
      do {
        x = xTarget
        const y = fn(x)
        const canvasPt = canvasPtFromXY(x, y)
        let perc = 0.5
        while (prevCanvasY && Math.abs(prevCanvasY - canvasPt[1]) > 30 &&
              perc > 0.0001) {
          x = (1 - perc) * xPrev + perc * xTarget
          const y = fn(x)
          const canvasPt = canvasPtFromXY(x, y)
          perc /= 2
        }
        pts.push(canvasPt[0], canvasPt[1])
        xPrev = x
        prevCanvasY = canvasPt[1]
      } while (x < xTarget);
    }

    const polyline = this.add('polyline', { stroke: opts.lineColor, fill: 'transparent', 'stroke-width': 3 })
    this.addAttributes(polyline, {points: pts.join(' ')})
  }
}