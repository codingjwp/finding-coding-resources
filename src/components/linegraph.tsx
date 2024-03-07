'use client'

import {
  select,
  scaleLinear,
  axisLeft,
  axisBottom,
  format,
  axisRight,
  line,
  max,
  scaleOrdinal,
  group,
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

    const viewLine = line<lineDataTypes>()
      .x((d) => xScale(d.rank))
      .y((d) => yLeftScale(d.view))

    const likeLine = line<lineDataTypes>()
      .x((d) => xScale(d.rank))
      .y((d) => yRightScale(d.like))

    const commentLine = line<lineDataTypes>()
      .x((d) => xScale(d.rank))
      .y((d) => yRightScale(d.comment))

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('d', viewLine)
      .attr('stroke-width', 2)
      .attr('stroke', '#6200ee')

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('d', likeLine)
      .attr('stroke-width', 2)
      .attr('stroke', '#BB86FC')
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('d', commentLine)
      .attr('stroke-width', 2)
      .attr('stroke', '#7f39fb')
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
