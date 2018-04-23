import React from 'react';
import { Text } from 'react-native';
import { Svg } from 'expo';

export default class Smiley extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { adjustment: 220, besierAdjustment: 220 };
  componentWillReceiveProps() {
    this.setState({
      adjustment: 220 - this.props.value / 100 * 20,
      besierAdjustment: 220 + this.props.value / 100 * 20,
    });
  }
  render() {
    return (
      <Svg height={300} width={300}>
        <Svg.Circle
          cx={150}
          cy={150}
          r={145}
          strokeWidth={2.5}
          stroke="#e74c3c"
          fill="#f1c40f"
        />
        <Svg.Circle
          cx={100}
          cy={130}
          r={15}
          strokeWidth={2.5}
          stroke="#e74c3c"
          fill="#e74c3c"
        />
        <Svg.Circle
          cx={200}
          cy={130}
          r={15}
          strokeWidth={2.5}
          stroke="#e74c3c"
          fill="#e74c3c"
        />
        <Svg.Path
          d={
            'M80,' +
            this.state.adjustment +
            'C 80 ' +
            this.state.besierAdjustment +
            ', 220 ' +
            this.state.besierAdjustment +
            ', 220, ' +
            this.state.adjustment
          }
          fill="#f1c40f"
          stroke="#e74c3c"
          strokeWidth={2.5}
        />
      </Svg>
    );
  }
}
