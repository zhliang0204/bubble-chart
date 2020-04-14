import React, { useState, useEffect } from 'react';
import restAPI from '../api/api';
import SelectField from './../component/textField/SelectField';
import BubbleChart from './../component/chart/Chart';
import CustomTable from './../component/table/Table';
import withStyles from '@material-ui/core/styles/withStyles';

const FIELDS = {
  CATEGORY: 'category',
  COUNT: 'count',
  FOUNDINGAMOUNTL: 'fundingAmount',
  LOCATION: 'location',
  COLOR: 'color',
};

const COLORARRAY = ['#1EB2A6', '#D4F8E8', '#FFA34D', '#F67575', '#FFBCBC'];

const OPTIONS = [
  {
    // bubble chart:
    // x-axis: total funding amount divides total numbers of funding round
    // y-axis: the total numbers of funding round
    // radius: the total funding amount
    label: 'Funding Amount',
    value: 'fundingAmount',
  },
  {
    // bubble chart:
    // x-axis: total funding amount divides total numbers of funding round
    // y-axis: the total funding amount
    // radius: the total numbers of funding round
    label: 'Funding Round Numbers',
    value: 'fundingRounds',
  },
];

const styles = (theme) => ({
  container: {
    textAlign: 'center',
    with: '100%',
    maxWidth: '800px',
    padding: '10% auto',
    margin: '10%',
  },
});

const Analysis = ({ header, classes }) => {
  const [chartData, setChartData] = useState(undefined);
  const [rawData, setRawData] = useState(undefined);
  const [filteredData, setFilteredData] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [selectedValue, setSelectedValue] = useState(OPTIONS[0].value);
  const [legendData, setLegendData] = useState(undefined);

  const getData = () => {
    restAPI
      .get()
      .then((data) => {
        setRawData(data);
        setChartData(renderDataPre(aggregateArray(data)));
      })
      .catch((error) => alert(error));
  };

  const getLegendData = () => {
    if (!!chartData) {
      let result = chartData.map((cur) => {
        return {
          name: cur[FIELDS.CATEGORY],
          symbol: { fill: cur[FIELDS.COLOR] },
        };
      });
      setLegendData(result);
    }
  };

  const filterData = () => {
    let result = [];
    if (!!rawData && !!category) {
      for (let i = 0; i < rawData.length; i++) {
        if (rawData[i][FIELDS.CATEGORY] === category) {
          result.push(rawData[i]);
        }
      }
      setFilteredData(result);
    }
  };

  useEffect(getData, []);
  useEffect(filterData, [category]);
  useEffect(getLegendData, [chartData]);

  const loading = !chartData;

  return loading ? (
    <div>...load</div>
  ) : (
    <div className={classes.container}>
      <h2>{header}</h2>
      <div>
        <SelectField
          options={OPTIONS}
          value={selectedValue}
          customOnChange={(e) => setSelectedValue(e.target.value)}
        />
      </div>
      <BubbleChart
        data={chartData}
        minDomain={{ y: 0, x: 0 }}
        legendData={legendData}
        setCategory={setCategory}
        y={(datum) =>
          selectedValue === FIELDS.FOUNDINGAMOUNTL
            ? datum[FIELDS.COUNT]
            : datum[FIELDS.FOUNDINGAMOUNTL]
        }
        x={(datum) =>
          parseFloat(datum[FIELDS.FOUNDINGAMOUNTL] / datum[FIELDS.COUNT], 2)
        }
        bubbleProperty={
          selectedValue === FIELDS.FOUNDINGAMOUNTL
            ? FIELDS.FOUNDINGAMOUNTL
            : FIELDS.COUNT
        }
        labels={(datum) =>
          selectedValue === FIELDS.FOUNDINGAMOUNTL
            ? datum[FIELDS.FOUNDINGAMOUNTL]
            : datum[FIELDS.COUNT]
        }
        maxBubbleSize={30}
      />
      <CustomTable nodes={filteredData} />
    </div>
  );
};

const aggregateArray = (dataArray) => {
  const result = [];
  const tempMap = {};
  for (let i = 0; i < dataArray.length; i++) {
    if (tempMap[dataArray[i][FIELDS.CATEGORY]] === undefined) {
      dataArray[i][FIELDS.COUNT] = 1;
      let newCategory = {
        [FIELDS.CATEGORY]: dataArray[i][FIELDS.CATEGORY],
        [FIELDS.COUNT]: 1,
        [FIELDS.FOUNDINGAMOUNTL]: dataArray[i][FIELDS.FOUNDINGAMOUNTL],
      };
      tempMap[dataArray[i][FIELDS.CATEGORY]] = result.length;
      result.push(newCategory);
    } else {
      let index = tempMap[dataArray[i][FIELDS.CATEGORY]];
      result[index][FIELDS.COUNT] += 1;
      result[index][FIELDS.FOUNDINGAMOUNTL] +=
        dataArray[i][FIELDS.FOUNDINGAMOUNTL];
    }
  }
  return result;
};

const renderDataPre = (aggregatedData) =>
  aggregatedData.map((cur, index) => {
    cur[FIELDS.COLOR] = COLORARRAY[index];
    return cur;
  });

export default withStyles(styles)(Analysis);
