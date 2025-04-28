'use client'

import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

function ChartSection() {
  const chartData = [
    { month: 'January', grossValue: 2100 },
    { month: 'February', grossValue: 2000 },
    { month: 'March', grossValue: 2500 },
    { month: 'April', grossValue: 3000 },
    { month: 'May', grossValue: 2800 },
    { month: 'June', grossValue: 3200 },
    { month: 'July', grossValue: 3500 },
    { month: 'August', grossValue: 3700 },
    { month: 'September', grossValue: 3900 },
    { month: 'October', grossValue: 4100 },
    { month: 'November', grossValue: 4300 },
    { month: 'December', grossValue: 4500 },
  ]

  const chartConfig = {
    grossValue: {
      label: "Gross Value",
      color: "hsl(var(--chart-1))",
    }
  } satisfies ChartConfig

  return (
    <div>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent/>} />
          <defs>
            <linearGradient id="fillGrossValue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-grossValue)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-grossValue)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="grossValue"
            type="natural"
            fill="url(#fillGrossValue)"
            fillOpacity={0.4}
            stroke="var(--color-grossValue)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export default ChartSection