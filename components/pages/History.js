'use strict';

import React, {
  Text,
  View,
  ListView,
  StyleSheet,
  Component
} from 'react-native';

import ListItem from '../../components/material/ListItem';
import {MockupExpenses, MockupCategories} from '../../containers/mockupdata';
import {GlobalStyle} from '../../styles/GlobalStyles';

export default class History extends Component {
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
    this._fetchAllHistory(MockupExpenses, MockupCategories);
  }

  // TODO: Create fetch methods
  _fetchAllHistory(expenses, categories) {
    // Obtain the expenses and categories json object and parse it into dataBolb format.
    var dataBlob = {},
        sectionIDs = [],
        rowIDs = [];

    // Populate dataBolb with SectionData

    // Populate dataBolb with rowData

    var dataBlob = {
      's1'       : { "month": 'Mar', "spent": 18000 },
      's2'       : { "month": 'Feb', "spent": 18000 },
      's3'       : { "month": 'Jan', "spent": 18000 },

      's1:rowID1': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 3, 2016",  "amount": 150 },
      's1:rowID2': {"category": "TRANSPORTATION", "icon": "home", "color": "#ccc", "date": "Mar 2, 2016",  "amount": 250 },
      's1:rowID3': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      's1:rowID4': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      's1:rowID5': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      's1:rowID6': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      's1:rowID7': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
      's1:rowID8': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },

      's3:rowID1': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 28, 2016", "amount": 350 },
      's3:rowID2': {"category": "GROCERIES",      "icon": "home", "color": "#ccc", "date": "Feb 27, 2016", "amount": 450 },
      's3:rowID3': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 26, 2016", "amount": 550 },
      's3:rowID4': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 26, 2016", "amount": 550 },
    };
    var  sectionIDs = [ 's1', 's2', 's3' ];
    var  rowIDs = [
      [ 'rowID1', 'rowID2', 'rowID3', 'rowID4', 'rowID5', 'rowID6', 'rowID7', 'rowID8'],
      [ 'rowID1', 'rowID2', 'rowID3' ],
      [ 'rowID1', 'rowID2', 'rowID3', 'rowID4'],
    ];

    // Update state
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      loaded: true
    });
    // console.log("dataSource: ", this.state.dataSource);
  }
  _fetchCategoryHistory(expenses, categories) {
    var dataBlob = {},
        sectionIDs = [],
        rowIDs = [];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      loaded: true
    });
  }
  _fetchAmountRangeHistory(expenses, categories) {
    var dataBlob = {},
        sectionIDs = [],
        rowIDs = [];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      loaded: true
    });
  }


  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderSectionHeader={this._renderSectionHeader}
        renderRow={this._renderRow}
      />
    )
  }
  _renderSectionHeader(sectionData, sectionID) {
    return (
      <ListItem
        iconColor={"#fff"}
        iconLeftName={"expand-more"}
        textPrimary={sectionData.month}
        textRight={"$" + sectionData.spent}
        containerStyle={[{backgroundColor: '#ccc'}]}
        />
    )
  }
  _renderRow(rowData) {
    console.log("rowData: ", rowData);
    if (!rowData) {
      return null;
    }
    return (
      <ListItem
        dense={true}
        iconColor={"#fff"}
        avatarLeftName={rowData.icon}
        avatarBgColor={rowData.color}
        textPrimary={rowData.category}
        textSecondary={rowData.date}
        textRight={"$" + rowData.amount}
        />
    )
  }
};

var styles = StyleSheet.create({
})
