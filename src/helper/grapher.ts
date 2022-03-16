interface Options {
  doEqualizeAxes: boolean;
  doDrawAxes: boolean;
}

type Equation = (x: number) => number; 

class Grapher {
  public svg;
  public svgNS;

  public lightStyle = {stroke: '#ddd', fill: 'transparent', 'stroke-width': 3}
  public darkStyle = {stroke: '#666', fill: 'transparent', 'stroke-width': 3}

  public numFnPts = 300

  constructor(
    svgId: string,
    public xSize: number,
    public ySize: number,
  ) {
    const svgElement = document.getElementById(svgId);
    if(!svgElement) throw new Error(`Cannot find svg with id of "${svgId}"`);
    this.svg = svgElement;
    this.svgNS = this.svg.namespaceURI;

    this.setCanvasSize(xSize, ySize);
  }

  setCanvasSize(w: number, h: number) {
    this.xSize = w
    this.ySize = h
    this.addAttributes(this.svg, { width: this.xSize, height: this.ySize })
  }

  add(eltName: string, attr: any) {
    const elt = document.createElementNS(this.svgNS, eltName)
    this.svg.appendChild(elt)
    if (attr) this.addAttributes(elt, attr)
    return elt
  }

  addAttributes(elt: Element, attr: any) {
    for (const key in attr) {
      elt.setAttribute(key, attr[key])
    }
    return elt
  }

  drawFn(xMin: number, xMax: number, yMin: number, yMax: number, opts: Options, fn: Equation) {
    if (opts && opts.doEqualizeAxes) {
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

    const canvasPtFromXY = (x: number, y: number) => {
      const xPerc = (x - xMin) / (xMax - xMin)
      const yPerc = (y - yMin) / (yMax - yMin)
      return [xPerc * this.xSize, this.ySize - yPerc * this.ySize]
    }

    const drawTickAroundPt = (p: number[], dir: 1 | 0) => {
      const tick = this.add('line', this.lightStyle)
      const a = [p[0], p[1]]
      a[dir] -= 5
      const b = [p[0], p[1]]
      b[dir] += 5
      this.addAttributes(tick, {x1: a[0], y1: a[1], x2: b[0], y2: b[1]})
    }

    if (opts && opts.doDrawAxes) {

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

    const polyline = this.add('polyline', this.darkStyle)
    this.addAttributes(polyline, {points: pts.join(' ')})
  }
}