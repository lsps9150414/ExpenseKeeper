import React, {
  View,
  TouchableHighlight,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class CategorySelectionGrid extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  static propTypes = {
    iconNameColors: PropTypes.object.isRequired,
    selectedIconName: PropTypes.string.isRequired,
    onIconSelectHandler: PropTypes.func.isRequired,
  };
  render() {
    let icons = [];
    for (let iconName in this.props.iconNameColors) {
      let isSelected = (iconName == this.props.selectedIconName);
      icons.push(
        <TouchableHighlight
          key={iconName}
          underlayColor={'rgba(0, 0, 0, 0.1)'}
          style={[
            styles.iconContainer,
            isSelected && {backgroundColor: 'rgba(0, 0, 0, 0.1)'} ]}
          onPress={ () => {this.props.onIconSelectHandler(iconName)} }>
          <View style={[
            styles.avatarContainer,
            {backgroundColor: this.props.iconNameColors[iconName]} ]}>
            <Icon name={iconName} size={24} color={'white'} style={styles.icon}/>
          </View>
        </TouchableHighlight>
      )
    };
    return (
      <View style={styles.container}>
        {icons}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 16
  },
  iconContainer: {
    // margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: 'transparent'
  },
})
