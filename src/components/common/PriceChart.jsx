import React from 'react';
import styled from 'styled-components';
import { Chart } from 'react-charts';
const PriceChartWrapper = styled.div`
  width: 100%;
  marginTop: 20px;
  height: 20vh;
  margin: auto;
  color: ${({ theme }) => theme.textColors.primary};
`;  
const PriceChart = ({buyinfo})=> {
    const data = React.useMemo(
      () => [  
        {
          label: 'price',
          data: buyinfo.length !==0?buyinfo.map((data) => [data['buydate'],data['price']]):[["1",1]]
        }
      ],
      [buyinfo]
    )
    const axes = React.useMemo(
      () => [
        { 
          primary: true, 
          type: 'ordinal', 
          position: 'bottom',
          show: true,
          showGrid: true,
          showTicks: false
        },
        { 
          type: 'linear', 
          position: 'left', 
          min: 0, 
          tickSizeInner: 0,
          tickSizeOuter:0,
          showTicks: false,
          showGrid: true,
          stacked: true,
        }
      ],
      []
    )
    return (
      <PriceChartWrapper>
        <h4> Price Chart </h4>
        <Chart data={data} axes={axes} tooltip />
      </PriceChartWrapper>
    )
  }

  export default PriceChart;