'use strict';

import Icon from 'react-native-vector-icons/MaterialIcons'
import React, {
  Text,
  View,
  ListView,
  StyleSheet,
  Component
} from 'react-native'
import {
  setTheme,
  MKColor,
  MKButton,
 } from 'react-native-material-kit'

import ListItem from '../../components/material/ListItem'
import { categoryIconColors } from '../../constants/categoryIconColors'
import {MockupExpenses, MockupCategories} from '../../containers/mockupdata'

const ColoredFab = MKButton.coloredFab()
  .build();

export default class Expense extends Component {
  constructor(props) {
    super(props);

    let getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
    }
    let getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[sectionID + ':' + rowID];
    }
    let ds = new ListView.DataSource({
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
        rowHasChanged           : (r1, r2) => r1 !== r2,
        getSectionData          : getSectionData,
        getRowData              : getRowData,
      });

    this.state = {
      dataSource: ds,
      loaded: false
    }
  }

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.props.dataBlob, this.props.sectionIDs, this.props.rowIDs),
      loaded: true
    });
    // this._fetchAllExpense(MockupExpenses, MockupCategories);
  }

  _fetchAllExpense(expenses, categories) {
    var dataBlob = {
      '2016-03'  : { "month": 'Mar', 'year': '2016', "spent": 18000 },
      '2016-02'  : { "month": 'Feb', 'year': '2016', "spent": 18000 },
      '2016-01'  : { "month": 'Jan', 'year': '2016', "spent": 18000 },

      '2016-03:rowID1': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 3, 2016",  "amount": 150 },
      '2016-03:rowID2': {"category": "TRANSPORTATION", "icon": "home", "color": "#ccc", "date": "Mar 2, 2016",  "amount": 250 },
      '2016-03:rowID3': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      '2016-03:rowID4': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      '2016-03:rowID5': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      '2016-03:rowID6': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      '2016-03:rowID7': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      '2016-03:rowID8': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },

      '2016-01:rowID1': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 28, 2016", "amount": 350 },
      '2016-01:rowID2': {"category": "GROCERIES",      "icon": "home", "color": "#ccc", "date": "Feb 27, 2016", "amount": 450 },
      '2016-01:rowID3': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 26, 2016", "amount": 550 },
      '2016-01:rowID4': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 26, 2016", "amount": 550 },
    };

    var  sectionIDs = [ '2016-03', '2016-02', '2016-01' ];

    var  rowIDs = [
      [ 'rowID1', 'rowID2', 'rowID3', 'rowID4', 'rowID5', 'rowID6', 'rowID7', 'rowID8'],
      [ 'rowID1', 'rowID2', 'rowID3' ],
      [ 'rowID1', 'rowID2', 'rowID3', 'rowID4'],
    ];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      loaded: true
    });
  }

  render() {
    // console.log('props', this.props);
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderSectionHeader={this._renderSectionHeader}
          renderRow={this._renderRow}
        />
      <ColoredFab
        onPress={() => {
          this.props.navigator.push({
            name: 'expenseEditing',
            props: {
              title: 'Edit',
            }
          });
        }}
        style={styles.fab}>
          <Icon name={'add'} size={24} color={'#fff'} style={{}}/>
        </ColoredFab>
      </View>
    )
  }
  _renderSectionHeader(sectionData, sectionID) {
    return (
      <ListItem
        iconColor={'#fff'}
        iconLeftName={"expand-more"}
        textPrimary={sectionData.month + ' ' + sectionData.year}
        textRight={"$" + sectionData.spent}
        containerStyle={[{backgroundColor: '#ccc'}]}
      />
    )
  }
  _renderRow(rowData) {
    if (!rowData) {
      return null;
    }
    return (
      <ListItem
        dense={true}
        avatarLeftName={rowData.iconName}
        avatarColor={'#fff'}
        avatarBgColor={categoryIconColors[rowData.iconName]}
        textPrimary={rowData.categoryName}
        textSecondary={rowData.date}
        textRight={"$" + rowData.amount}
      />
    )
  }
};

var styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    right: 16,
    bottom: 16,
  }
})
