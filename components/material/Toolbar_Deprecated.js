import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {
  View,
  Text,
  StyleSheet,
  ToolbarAndroid,
  Component
} from 'react-native';

export default class Toolbar extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <ToolbarAndroid
        title={this.props.title}
        titleColor="#ffffff"
        navIcon={require('../../img/ic_menu_white_48dp.png')}
        onIconClicked={ this.props.onIconClicked }
        style={styles.toolbar}
      />
    )
  }
};

var styles = StyleSheet.create({
  toolbar: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    height: 56,
    elevation: 8,
    backgroundColor: "gray"
  }
})
