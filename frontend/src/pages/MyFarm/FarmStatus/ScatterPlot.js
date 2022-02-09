import React from "react";

import Axios from 'axios';
import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';

import { ResponsiveScatterPlotCanvas } from '@nivo/scatterplot'

class ScatterPlot extends React.Component {
  render() {
    const data = this.props.chartData;

    return (
        <ResponsiveScatterPlotCanvas
        data={data}
        margin={{ top: 5, right: 20, bottom: 35, left: 70 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        xFormat=" >-.2f"
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        yFormat=">-.2f"
        nodeSize={6}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '습도',
            legendPosition: 'middle',
            legendOffset: 30
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '온도',
            legendPosition: 'middle',
            legendOffset: -35
        }}
        // enableGridX={false}
        // enableGridY={false}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                translateX: 38,
                translateY: 40,
                itemWidth: 83,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 5,
                itemDirection: 'left-to-right'
            }
        ]}
    />
    );
  }
}

export default ScatterPlot;
