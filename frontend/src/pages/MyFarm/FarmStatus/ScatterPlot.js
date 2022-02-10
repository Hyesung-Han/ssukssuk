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
        margin={{ top: 5, right: 70, bottom: 35, left: 45 }}
        xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        xFormat=" >-.2f"
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat=">-.2f"
        colors={['#008000', '#ff7f00', '#ff0000']}
        nodeSize={6}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '온도',
            legendPosition: 'middle',
            legendOffset: 30
        }}
        // axisRight={null}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '습도',
            legendPosition: 'middle',
            legendOffset: -35
        }}
        // enableGridX={false}
        // enableGridY={false}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'row',
        //         justify: false,
        //         translateX: 38,
        //         translateY: 40,
        //         itemWidth: 83,
        //         itemHeight: 20,
        //         itemsSpacing: 0,
        //         symbolSize: 5,
        //         itemDirection: 'left-to-right'
        //     }
        // ]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 12,
                itemsSpacing: 5,
                itemDirection: 'left-to-right',
                symbolSize: 12,
                symbolShape: 'rect',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    );
  }
}

export default ScatterPlot;
