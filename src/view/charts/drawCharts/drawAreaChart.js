/* eslint-disable */
import * as d3 from "d3"
import { savingsAreaTooltip } from "view/charts/tooltips/savingsArea/tooltip"
import { cppAreaTooltip } from "view/charts/tooltips/cppArea/tooltips"
import { getMax } from "view/charts/drawCharts/chartHelpers"
import { stackedAreaTooltip } from "view/charts/tooltips/savingsStackedArea/tooltip"

export const drawAreaChart = (className, data, dataObject, height, state, width) => {
  const margin = { top: 20, right: 50, bottom: 40, left: 50 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right

  console.log(className)
  d3.select(`.${className} > *`).remove()
  d3.select(`.${className}tooltip`).remove()
  d3.select(`.${className}tooltip2`).remove()
  d3.select(`.${className}tooltip3`).remove()
  d3.selectAll(`circle`).remove()

  const stackedKeys = Object.keys(data[0])

  const hideAxis = true

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const graph = svg
    .append("g")
    .attr("height", graphHeight > 100 ? graphHeight : 100)
    .attr("width", graphWidth)
    .attr("transform", `translate(${margin.left + 10}, ${margin.top})`)

  const stack = d3.stack().keys(stackedKeys).order(d3.stackOrderReverse).offset(d3.stackOffsetDiverging)

  const color = className === "cppAreaChart" ? "#F29278" : className === "oasAreaChart" ? "#72929B" :"#5E9090"

  var defs = svg.append("defs")

  var gradient = defs.append("linearGradient").attr("id", "svgGradient").attr("x1", "0%").attr("x2", "100%").attr("y1", "0%").attr("y2", "100%")

  gradient.append("stop").attr("class", "start").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 1)

  gradient.append("stop").attr("class", "end").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", 1)

  const update = data => {
    const d3Max = getMax(className, dataObject) //500000 //d3.max(data, d => Object.values(d).reduce((a, n) => +a + +n)) + 500000

    const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])

    const xScale = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.year))

    const area = d3
      .area()
      .x(d => xScale(d.data.year))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveBasis) //sets the lines to be less jagged

    var layer = graph.selectAll(".layer").data(stack(data)).enter().append("g").attr("class", "layer")

    layer
      .append("path")
      .attr("class", "area")
      .attr("fill", "url(#svgGradient)")
      .attr("id", "chart")
      .style("opacity", (d, i) => (i > 3 ? 0.3 : 1))
      .raise()
      .attr("d", area)

    graph
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.year))
      .attr("y", 0)
      .attr("width", width / 85)
      .attr("height", height)
      .attr("class", `${className}Rect`)
      .attr("opacity", "0")
      .raise()
    console.log(className)
    if (className === "cppAreaChart" || className === "oasAreaChart") {
      cppAreaTooltip(className, data, graph, state, yScale, xScale)
    }
    if (className === "savingsStackedAreaChart") {
      stackedAreaTooltip(className, dataObject, graph, state, xScale, yScale)
    }
    if (className === "savingsAreaChart") {
      savingsAreaTooltip(className, dataObject, graph, state, xScale, yScale)
    }
    const xAxisGroup = graph.append("g").attr("transform", `translate(0, ${graphHeight})`).attr("class", "axis")

    const yAxisGroup = graph.append("g").attr("class", "axis")
    const xAxis = d3.axisBottom(xScale).tickValues([])

    const yAxis = d3
      .axisLeft(yScale)
      .ticks("3")
      .tickFormat(d => `${d / 1000}k`)
    if (!hideAxis) {
      xAxisGroup.call(xAxis)
      yAxisGroup.call(yAxis)
    }
  }

  update(data)
}
