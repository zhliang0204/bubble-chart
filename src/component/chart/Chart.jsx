import React from 'react';
import {
  VictoryScatter,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryTheme,
} from 'victory';

const BubbleChart = ({
  data,
  x,
  y,
  bubbleProperty,
  labels,
  setCategory,
  legendData,
  minDomain,
  maxBubbleSize,
}) => {
  return (
    <div style={{ margin: '5%' }}>
      <VictoryChart minDomain={minDomain} theme={VictoryTheme.material}>
        <VictoryLegend
          y={20}
          x={10}
          centerTitle
          orientation="horizontal"
          gutter={15}
          symbolSpacer={3}
          style={{ data: { fontSize: 8 } }}
          data={legendData}
        />
        <VictoryScatter
          style={{
            data: {
              fill: ({ datum }) => datum.color,
            },
          }}
          maxBubbleSize={maxBubbleSize}
          data={data}
          x={(datum) => x(datum)}
          y={(datum) => y(datum)}
          bubbleProperty={bubbleProperty}
          labels={({ datum }) => labels(datum)}
          labelComponent={<VictoryLabel style={{ fontSize: '8px' }} dy={8} />}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onClick: (event, props) => {
                  setCategory(props.datum.category);
                },
              },
            },
          ]}
        />
      </VictoryChart>
    </div>
  );
};

export default BubbleChart;
