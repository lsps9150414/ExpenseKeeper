'use strict';

import React, {
  Text,
  View,
  ScrollView,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'

import ListItem from '../../material/ListItem'
import SortableListView from '../../material/SortableListView'

// var myData = {
//   row1: {name: 'Row 1', iconName: 'local-dining', color: 'blue'},
//   row2: {name: 'Row 2', iconName: 'favorite', color: 'pink'},
//   row3: {name: 'Row 3', iconName: 'home', color: 'blue'},
//   row4: {name: 'Row 4', iconName: 'home', color: 'blue'},
//   row5: {name: 'Row 5', iconName: 'home', color: 'blue'},
//   row6: {name: 'Row 6', iconName: 'home', color: 'blue'},
//   row7: {name: 'Row 7', iconName: 'home', color: 'blue'},
//   row8: {name: 'Row 8', iconName: 'home', color: 'blue'},
//   row9: {name: 'Row 9', iconName: 'home', color: 'blue'},
//   row10: {name: 'Row 10', iconName: 'home', color: 'blue'},
// };
//
// var myOrder = [
//   'row1',
//   'row2',
//   'row3',
//   'row4',
//   'row5',
//   'row6',
//   'row7',
//   'row8',
//   'row9',
//   'row10',
// ]

export default class CategorySetting extends Component {
  static propTypes = {
    categoriesData:     PropTypes.object.isRequired,
    categoriesOrder:    PropTypes.array.isRequired,
    onRowMoveHandler:   PropTypes.func.isRequired,
  }
  render() {
    return (
      <SortableListView
        renderRow={this._renderRow}
        dataSource={this.props.categoriesData}
        dataOrder={this.props.categoriesOrder}
        onRowMove={this.props.onRowMoveHandler}
        onRowPress={(pressedRowID) => {
          this.props.navigator.push({
            name: 'categoryEditing',
            props: {
              title: 'Edit Category',
              categoryID: pressedRowID,
              getSceneState: this.props.mainRef._getSceneState.bind(this.props.mainRef),
            }
          })
        }}
      />
    )
  }
  _renderRow(rowData, onDragHandlePressInHandler, onDragHandlePressOutHandler, onRowPress) {
    // textSecondary={rowData.data2}
    return (
      <ListItem
        containerStyle={[{height: 60}]}
        textPrimary={rowData.name}
        avatarLeftName={rowData.iconName}
        avatarBgColor={rowData.color}
        avatarColor={'white'}
        iconColor={'black'}
        iconRightName={'drag-handle'}
        onIconRightPressIn={onDragHandlePressInHandler}
        onIconRightPressOut={onDragHandlePressOutHandler}
        iconRightWithoutFeedback={true}
        onPress={onRowPress}
        />
    )
  }
};
