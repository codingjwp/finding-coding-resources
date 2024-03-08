'use client'

import {
  select,
  scaleLinear,
  axisLeft,
  axisBottom,
  format,
  axisRight,
  line,
  Line,
  bisector,
  pointer,
} from 'd3'
import { useEffect, useRef, useState } from 'react'
import styles from '@/styles/linegraph.module.css'
import { VideosInfo } from 'APITypes'

type GraphProps = {
  titie: string
  lineData: VideosInfo
}

type lineDataTypes = {
  rank: number
  view: number
  like: number
  comment: number
}

export default function LineGraph({ titie, lineData }: GraphProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const toolTipRef = useRef<HTMLDivElement>(null)
  const [reSize, setReSize] = useState<number | null>(null)

  useEffect(() => {
    setReSize(window.innerWidth)

    const handleWindowsReSize = () => {
      setReSize(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowsReSize)
    return () => {
      window.removeEventListener('resize', handleWindowsReSize)
    }
  }, [])

  const drawChart = () => {
    select(divRef.current).selectAll('*').remove()
    const margin = { top: 10, bottom: 10, right: 10, left: 10 }
    let chartWidth =
      reSize! - margin.right - margin.left < 280
        ? 260
        : reSize! - margin.right - margin.left
    if (reSize! >= 768 && reSize! < 1280) {
      chartWidth -= 290
    } else if (reSize! >= 1280) {
      chartWidth -= 340
    }
    const chartHeight = 240

    const svg = select(divRef.current)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('viewBox', `0 0 ${chartWidth} ${chartHeight + 60}`)
      .append('g')
      .attr('transform', `translate(${margin.left / 2}, ${margin.top + 30})`)
      .on('pointerenter pointermove', pointermoved)
      .on('pointerleave', pointerleft)
      .on('touchstart', (event) => event.preventDefault())

    const data = lineData.videoInfo.map(({ statistics }, i) => ({
      rank: i + 1,
      view: +statistics.viewCount,
      like: +statistics.likeCount,
      comment: +statistics.commentCount,
    }))

    const xMax = Math.max(...data.map((item) => item.rank))
    const yLeftMax = Math.max(...data.map((item) => item.view))
    const yRightMax = Math.max(
      ...data.map((item) =>
        item.like > item.comment ? item.like : item.comment,
      ),
    )

    const xScale = scaleLinear().domain([1, xMax]).range([0, chartWidth])
    const yLeftScale = scaleLinear()
      .domain([0, yLeftMax])
      .range([chartHeight, 0])
    const yRightScale = scaleLinear()
      .domain([0, yRightMax])
      .range([chartHeight, 0])
    const fomater = format('.2s')

    svg
      .append('g')
      .classed(styles.axis, true)
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(
        axisBottom(xScale)
          .tickSize(0)
          .tickPadding(8)
          .tickFormat((rank) => `${rank}위`),
      )
      .selectAll('text')

    svg
      .append('g')
      .classed(styles.axis, true)
      .call(
        axisLeft(yLeftScale)
          .ticks(5)
          .tickSize(0)
          .tickPadding(6)
          .tickFormat(fomater),
      )
      .selectAll('text')

    svg
      .append('g')
      .classed(styles.axis, true)
      .attr('transform', `translate(${chartWidth}, 0)`)
      .call(
        axisRight(yRightScale)
          .ticks(5)
          .tickSize(0)
          .tickPadding(6)
          .tickFormat(fomater),
      )
      .selectAll('text')

    function setLineScale(type: string) {
      return line<lineDataTypes>()
        .x((d) => xScale(d.rank))
        .y((d) => {
          if (type === 'view') return yLeftScale(d.view)
          else if (type === 'like') return yRightScale(d.like)
          else return yRightScale(d.comment)
        })
    }

    function lineDrawSvg(line: Line<lineDataTypes>, color: string) {
      return svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('d', line)
        .attr('stroke-width', 2)
        .attr('stroke', color)
    }

    lineDrawSvg(setLineScale('view'), '#6200ee')
    lineDrawSvg(setLineScale('like'), '#BB86FC')
    lineDrawSvg(setLineScale('comment'), '#7f39fb')

    const texts = [titie, 'View', 'Like', 'Comment']
    const rects = ['#6200ee', '#BB86FC', '#7f39fb']
    const xPosition = -margin.left * 0.6
    const yTextPosition = -(margin.top * 1.4)
    const yRectPosition = -margin.top * 2.5
    let plusPos = 0
    texts.forEach((item, i) => {
      if (i > 0) {
        plusPos += i === 1 ? 80 : 60
      }
      svg
        .append('text')
        .attr('x', xPosition + plusPos)
        .attr('y', yTextPosition)
        .attr('font-size', `${i === 0 ? '14px' : '12px'}`)
        .attr('fill', 'white')
        .text(item)
    })

    rects.forEach((rect, i) => {
      svg
        .append('rect')
        .attr('x', xPosition + (i + 1) * 60)
        .attr('y', yRectPosition)
        .attr('width', 13)
        .attr('height', 13)
        .style('fill', rect)
    })

    const tooltip = svg.append('g')
    const bisect = bisector<lineDataTypes, unknown>((d) => d.rank).center

    function pointermoved(event: PointerEvent) {
      const i = bisect(data, xScale.invert(pointer(event)[0]))
      tooltip.style('display', null)
      tooltip.attr(
        'transform',
        `translate(${xScale(data[i].rank)}, ${chartHeight / 2})`,
      )
      const path = tooltip
        .selectAll('path')
        .data([,])
        .join('path')
        .attr('fill', 'white')
        .attr('stroke', 'black')

      const fomater = format(',')
      const text = tooltip
        .selectAll('text')
        .data([,])
        .join('text')
        .call((text) =>
          text
            .selectAll('tspan')
            .data([
              `${data[i].rank}위`,
              `view: ${fomater(data[i].view)}`,
              `like: ${fomater(data[i].like)}`,
              `comment: ${fomater(data[i].comment)}`,
            ])
            .join('tspan')
            .attr('x', 0)
            .attr('y', (_, i) => `${i * 1.2}em`)
            .attr('font-size', '1.6rem')
            .attr('font-weight', (_, i) => (i ? null : 'bold'))
            .text((d) => d),
        )

      const {
        y,
        width: w,
        height: h,
      } = (text.node() as SVGTextElement).getBBox()
      text.attr('transform', `translate(${-w / 2},${15 - y})`)
      path.attr('d', `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`)
    }

    function pointerleft() {
      tooltip.style('display', 'none')
    }
  }

  if (reSize) {
    drawChart()
  }

  return (
    <article>
      <div ref={toolTipRef}></div>
      <div ref={divRef} className={styles.linegraph}></div>
    </article>
  )
}
