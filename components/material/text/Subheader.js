import React, {
  Text,
  View,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native';

export default class Subheader extends Component {
  static propTypes = {
    children:   PropTypes.string.isRequired,
    textRight:  PropTypes.string,
    center:     PropTypes.bool,
    color:      PropTypes.string
  };

  render() {
    const {
      children,
      textRight,
      center,
      color,
    } = this.props;

    if (textRight) {
      var rightElement = (<Text style={styles.textRight}>{textRight}</Text>);
    }

    return (
      <View style={[styles.container, center && {justifyContent: 'center'}]}>
        <Text style={[styles.text, this.props.style, color && {color: color}]}>
          {children}
        </Text>
        {rightElement}
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(1,1,1,0.54)'
  },
  textRight: {
    fontFamily: 'Roboto',
    fontSize: 16
  }
})
