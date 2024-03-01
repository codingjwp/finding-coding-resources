'use client'

import {
  select,
  scaleBand,
  scaleLinear,
  axisLeft,
  axisBottom,
  group,
  format,
  scaleOrdinal,
  ascending,
  axisRight,
} from 'd3'
import { useEffect, useRef, useState } from 'react'
import { VideosInfo } from 'APITypes'
import styles from '@/styles/bargraph.module.css'

type BarGraphProps = {
  titie: string
  barData: VideosInfo
}

export default function BarGraph({ titie, barData }: BarGraphProps) {
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
    // 값이 변경될 경우 이전 차트 데이터를 삭제
    select(divRef.current).selectAll('*').remove()
    // margin값
    const margin = { top: 10, bottom: 10, right: 10, left: 10 }
    const chartWidth = reSize! - margin.right - margin.left
    // 차트 높이
    const chartHeight = 260 - margin.top - margin.bottom

    const svg = select(divRef.current)
      .append('svg')
      .attr('width', reSize! - (margin.left + margin.right))
      .attr('height', 300)
      .attr('viewBox', `0 0 ${reSize!} 380`)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + 30})`)

    const data = barData.videoInfo.flatMap(({ statistics }, i) =>
      Object.entries(statistics).map(([key, value], j) => ({
        rank: `${i + 1}위`,
        key,
        value: +value,
      })),
    )

    // range([0, chartWidth]) 차트 x 범위 padding 막대 안,밖 간격
    const xScale = scaleBand()
      .domain(data.map((item) => item.rank))
      .range([0, chartWidth])
      .padding(0.2)

    // x축 작성
    svg
      .append('g')
      .classed(styles.axis, true)
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(axisBottom(xScale).tickSize(0).tickPadding(8))
      .selectAll('text')

    const leftYMax = Math.max(
      ...data.map((item) => (item.key === 'viewCount' ? item.value : 0)),
    )
    const rightYMax = Math.max(
      ...data.map((item) => (item.key !== 'viewCount' ? item.value : 0)),
    )
    const yLeftScale = scaleLinear()
      .domain([0, leftYMax])
      .range([chartHeight, 0])
    const yRightScale = scaleLinear()
      .domain([0, rightYMax])
      .range([chartHeight, 0])
    const fomater = format('.2s')

    // y축 좌우 추가
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

    const keys = Array.from(new Set(data.map((item) => item.key)))
    const xSubGroups = scaleBand()
      .domain(keys)
      .range([0, xScale.bandwidth()])
      .padding(0.05)

    const barColor = scaleOrdinal<string>()
      .domain(keys)
      .range(['#6200ee', '#BB86FC', '#7f39fb'])

    // chart 그리드
    const grid = svg.append('g').call(
      axisLeft(yLeftScale)
        .tickSize(-chartWidth)
        .tickFormat(() => ''),
    )
    grid.selectAll('line').attr('stroke', 'white')

    const tooltip = select(toolTipRef.current)
      .attr('id', 'chart_tooltip')
      .classed(styles.toolTip, true)

    const mouseOver = (event: MouseEvent) => {
      tooltip.style('opacity', 0.8)
      select(event.target as SVGAElement).style('opacity', 0.5)
    }
    const mouseMove = (
      event: MouseEvent,
      data: { rank: string; key: string; value: number },
    ) => {
      const fomater = format(',')
      tooltip
        .html(fomater(data.value))
        .style('top', `${event.pageY - 10}px`)
        .style('left', `${event.pageX + 10}px`)
      select(event.target as SVGAElement).style('opacity', 0.5)
    }
    const mouseLeave = (event: MouseEvent) => {
      tooltip.style('opacity', 0)
      select(event.target as SVGAElement).style('opacity', 1)
    }

    // bar 생성
    svg
      .append('g')
      .selectAll('g')
      .data(group(data, (d) => d.rank))
      .join('g')
      .attr('transform', (d) => `translate(${xScale(d[0])},0)`)
      .selectAll('rect')
      .data((d) => d[1].sort((a, b) => ascending(a.key, b.key)))
      .join('rect')
      .attr('x', (d) => xSubGroups(d.key)!)
      .attr('y', (d) => {
        if (d.key === 'viewCount') {
          return yLeftScale(d.value)
        } else {
          return yRightScale(d.value)
        }
      })
      .attr('width', xSubGroups.bandwidth())
      .attr('height', (d) => {
        if (d.key === 'viewCount') {
          return chartHeight - yLeftScale(d.value)
        } else {
          return chartHeight - yRightScale(d.value)
        }
      })
      .attr('fill', (d) => barColor(d.key))
      .on('mouseover', mouseOver)
      .on('mousemove', mouseMove)
      .on('mouseleave', mouseLeave)

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
  }

  if (reSize) {
    drawChart()
  }

  return (
    <article>
      <div ref={toolTipRef}></div>
      <div ref={divRef}></div>
    </article>
  )
}
