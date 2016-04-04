'use strict';

import React, {
  Text,
  View,
  ListView,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  PropTypes,
  Component,
} from 'react-native';

export default class SortableListView extends Component {

  static propTypes = {
    dataSource:   PropTypes.object.isRequired,
    dataOrder:    PropTypes.array.isRequired,
    renderRow:    PropTypes.func,
    onRowMove:    PropTypes.func,
    onRowPress:   PropTypes.func,
    rowStyle:     PropTypes.array,
    SortRowStyle: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource:       new ListView.DataSource({rowHasChanged: (r1, r2) => true}),
      sortRowData:      null,
      sortRowID:        '',
      sortTargetRowID:  '',
      sortRowTopY:      new Animated.Value(0),
      sortRowOffsetY:   0,
      squeezedRowsTopY: {}, //contain Animated.Values for all rows beside sortRow.
      rowsLayout:       {},
      // lastSqueezedRowID: ['', ''],
    };
    this.scrollContentOffsetY = 0;
    this.panResponderGranted = false;

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => false,

      // onMoveShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => {
        // console.log('onMoveShouldSetPanResponder');
        return this.state.sortRowData && true;
      },

      onPanResponderGrant: (evt, gestureState) => {
        // console.log('onPanResponderGrant');
        this.onPanResponderGranted = true;
      },
      onPanResponderReject: (evt, gestureState) => {
        // console.log('onPanResponderReject');
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log('onPanResponderMove');

        this.state.sortRowTopY.setOffset(this.state.sortRowOffsetY);
        this.state.sortRowTopY.setValue(gestureState.dy);
        // TODO: Stop sortRow from going out of the container.

        console.log('length', this.props.dataOrder.length);
        let listLength = this.props.dataOrder.length;
        let targetPixelY =            this._getTargetPixelY();
        this.state.sortTargetRowID =  this._getSortTargetRowID(targetPixelY, listLength);
        let squeezedRowInfo =         this._getSqueezedRowInfo(targetPixelY);
        this._animateSqueezedRows(targetPixelY, listLength, squeezedRowInfo);

        console.log('sortTargetRowID', this.state.sortTargetRowID);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // console.log('onPanResponderRelease');
        // TODO: Add animation on press release using LayoutAnimation.
        let moveInfo = {
          fromOrder: this.props.dataOrder.indexOf(this.state.sortRowID),
          toOrder: this.props.dataOrder.indexOf(this.state.sortTargetRowID),
        };
        console.log(moveInfo);
        this.state.sortTargetRowID && this.props.onRowMove && this.props.onRowMove(moveInfo);
        // Reset all squeezedRowsTopY to 0.
        for(let index in this.state.squeezedRowsTopY) {
          if (this.state.squeezedRowsTopY.hasOwnProperty(index)) {
            this.state.squeezedRowsTopY[index].setValue(0);
          }
        };
        this.onPanResponderGranted = false;
        // Reset states.
        this.setState({
          sortRowData: null,
          sortRowID: '',
          sortTargetRowID: '',
          // lastSqueezedRowID: ['', ''],
        });
      }
    });
  }

  // componentWillMount() {
  //   this._setDataOrder(this.props);
  // }
  // componentWillReceiveProps(nextProps) {
  //   this._setDataOrder(nextProps);
  // }
  // _setDataOrder(props) {
  //   this.dataOrder = props.dataOrder || Object.keys(props.dataSource) || [];
  // }

  _getTargetPixelY() {
    let sortRowCenterY = this.state.rowsLayout[this.state.sortRowID].y + this.state.rowsLayout[this.state.sortRowID].height/2;
    let sortRowMoveY = this.state.sortRowTopY._value;
    return sortRowCenterY + sortRowMoveY;
  }
  /*  Return the rowID of the row currently being covered by the floating row.  */
  _getSortTargetRowID(targetPixelY, listLength) {
    let rowOrderIndex = 0;

    let rowID, NextRowID = '';
    let rowLayout, NextRowLayout, sortRowLayout = {};

    let sortRowOrder = this.props.dataOrder.indexOf(this.state.sortRowID);
    let sortRowHeight = this.state.rowsLayout[this.state.sortRowID].height;
    let sortRowOffsetY = 0;

    // Find the target zone seperating line that is right below targetPixelY
    // (i.e. targetPixelY locate in the above target zone).
    for (let i = 0; rowOrderIndex < listLength && i < targetPixelY; rowOrderIndex++) {
      rowID =     this.props.dataOrder[rowOrderIndex];
      NextRowID = this.props.dataOrder[rowOrderIndex + 1];

      rowLayout =     this.state.rowsLayout[rowID];
      NextRowLayout = rowOrderIndex == (listLength - 1) ? {height: 0} : this.state.rowsLayout[NextRowID];
      sortRowLayout = this.state.rowsLayout[this.state.sortRowID];

      i = 0;
      // targetPixelY locate inside the last row, 'continue' in order to let rowOrderIndex++.
      if (rowOrderIndex == listLength - 1) {
        continue;
      }
      // Use the top of 'row' as base, find the vertical middle point within 'row' & the 'sortRow' right below it.
      else if (rowOrderIndex < sortRowOrder) {
        // Replace rowLayout.y with the accumulated heights of above rows since rowLayout.y has unkown problem.
        let rowLayoutY = 0;
        for (let j = 0; j < rowOrderIndex; j++) {
          rowLayoutY += this.state.rowsLayout[this.props.dataOrder[j]].height;
        };
        i = rowLayoutY + (rowLayout.height + sortRowLayout.height)/2;
      }
      // Use the top of 'sortRow' as base, find the vertical middle point within 'sortRow' & the 'row' right below it.
      else if (rowOrderIndex == sortRowOrder) {
        i = sortRowLayout.y + (sortRowLayout.height + NextRowLayout.height)/2;
      }
      else if (rowOrderIndex > sortRowOrder) {
        // Add up all the 'height's of the rows below 'sortRow' as the offset for rebasing 'sortRow' to the last row right above 'nextRow'.
        sortRowOffsetY = 0;
        for (var j = sortRowOrder + 1; j <= rowOrderIndex; j++) {
          sortRowOffsetY += this.state.rowsLayout[this.props.dataOrder[j]].height;
        }
        i = sortRowLayout.y + sortRowOffsetY + (sortRowLayout.height + NextRowLayout.height)/2;
      }
    }
    rowOrderIndex -= 1;

    if (this.state.sortRowID == this.props.dataOrder[rowOrderIndex]) {
      return false;   // return false when no new target, i.e. target row = pressed row.
    }
    else {
      return this.props.dataOrder[rowOrderIndex];  // return the rowID of the covered row.
    }
  }
  /*  Return the rowID of the row currently being 'sqeezed' by the floating row.  */
  _getSqueezedRowInfo(targetPixelY) {
    let squeezedRowInfo = null;
    let rowID, NextRowID = '';
    let rowLayout, NextRowLayout = {};
    let sortRowLayout = this.state.rowsLayout[this.state.sortRowID];
    let squeezedDetectionTopY, squeezedDetectionBottomY = 0;
    let sortRowOrder = this.props.dataOrder.indexOf(this.state.sortRowID);

    for (let rowOrderIndex = 1; squeezedRowInfo == null && rowOrderIndex < this.props.dataOrder.length; rowOrderIndex++) {
      // TODO: Make squeezedDetectionZone correct with rows with different heights.
      // NOTE: for some unkown reason, rowLayout.y is not correct. Hence accumulated heights of above rows should be used.
      // rowID =     this.props.dataOrder[rowOrderIndex - 1];
      // NextRowID = this.props.dataOrder[rowOrderIndex];
      // rowLayout =     this.state.rowsLayout[rowID];
      // NextRowLayout = this.state.rowsLayout[NextRowID];
      // squeezedDetectionTopY =     rowLayout.y + sortRowLayout.height/2;
      // squeezedDetectionBottomY =  NextRowLayout.y + sortRowLayout.height/2;

      squeezedDetectionTopY =     rowOrderIndex * sortRowLayout.height - sortRowLayout.height/2;
      squeezedDetectionBottomY =  rowOrderIndex * sortRowLayout.height + sortRowLayout.height/2;

      if (targetPixelY >= squeezedDetectionTopY) {
        // in the zone
        if (targetPixelY <= squeezedDetectionBottomY) {
          // sortRow came from above
          if (sortRowOrder < rowOrderIndex) {
            squeezedRowInfo = {
              'squeezedRowID': this.props.dataOrder[rowOrderIndex],
              'squeezedDetectionTopY': squeezedDetectionTopY,
              'squeezedDetectionBottomY': squeezedDetectionBottomY
            };
          }
          // sortRow came from above
          else {
            squeezedRowInfo = {
              'squeezedRowID': this.props.dataOrder[rowOrderIndex-1],
              'squeezedDetectionTopY': squeezedDetectionTopY,
              'squeezedDetectionBottomY': squeezedDetectionBottomY
            };
          }
        }
        // not sure yet, keep checking
        else {
          continue;
        }
      }
      // Not in any of the animation zones for sure.
      else {
        squeezedRowInfo = false;
      }
    }

    return squeezedRowInfo;
  }
  _animateSqueezedRows(targetPixelY, listLength, squeezedRowInfo) {
    // FIXME: First squeezed row move faster than others.
    if (squeezedRowInfo) {
      let sortRowHeight = this.state.rowsLayout[this.state.sortRowID].height;
      let squeezedDetectionTopY =    squeezedRowInfo.squeezedDetectionTopY;
      let squeezedDetectionBottomY = squeezedRowInfo.squeezedDetectionBottomY;
      let squeezedDetectionHeight =  squeezedDetectionBottomY - squeezedDetectionTopY;

      let sortRowOrder =       this.props.dataOrder.indexOf(this.state.sortRowID);
      let sortTargetRowOrder = this.props.dataOrder.indexOf(this.state.sortTargetRowID);
      let squeezedRowOrder =   this.props.dataOrder.indexOf(squeezedRowInfo.squeezedRowID);

      let squeezedDistanceRatio = sortRowOrder < squeezedRowOrder ?
            (targetPixelY - squeezedDetectionTopY)/squeezedDetectionHeight : (squeezedDetectionBottomY - targetPixelY)/squeezedDetectionHeight;
      // Set squeezedDistance.
      let squeezedDistance = 0;
      if (squeezedDistanceRatio < 1/3) {
        squeezedDistance = 0;
      }
      else if (1/3 <= squeezedDistanceRatio && squeezedDistanceRatio <= 2/3) {
        squeezedDistance = sortRowOrder < squeezedRowOrder ?
            -(sortRowHeight * (squeezedDistanceRatio - 1/3) * 3) : sortRowHeight * (squeezedDistanceRatio - 1/3) * 3;
      }
      else if (squeezedDistanceRatio > 2/3) {
        squeezedDistance = sortRowOrder < squeezedRowOrder ? -sortRowHeight : sortRowHeight;
      }
      // Set the squeezedRowsTopY offset.
      this.state.squeezedRowsTopY[squeezedRowInfo.squeezedRowID].setValue(squeezedDistance);
      // Reset other rows' squeezedRowsTopY offset.
      if (sortTargetRowOrder > sortRowOrder) {  // moved down from the sortRow
        for (var i = 0; i < sortRowOrder; i++) {
          this.state.squeezedRowsTopY[this.props.dataOrder[i]].setValue(0);
        }
        for (var i = sortRowOrder + 1; i < squeezedRowOrder; i++) {
          this.state.squeezedRowsTopY[this.props.dataOrder[i]].setValue(-sortRowHeight);
        }
        for (var i = squeezedRowOrder + 1; i < listLength; i++) {
          this.state.squeezedRowsTopY[this.props.dataOrder[i]].setValue(0);
        }
      }
      else {  // moved up from the sortRow
        for (var i = 0; i < squeezedRowOrder; i++) {
          this.state.squeezedRowsTopY[this.props.dataOrder[i]].setValue(0);
        }
        for (var i = squeezedRowOrder + 1; i < sortRowOrder; i++) {
          this.state.squeezedRowsTopY[this.props.dataOrder[i]].setValue(sortRowHeight);
        }
        for (var i = sortRowOrder; i < listLength; i++) {
          this.state.squeezedRowsTopY[this.props.dataOrder[i]].setValue(0);
        }
      }
      // Store previous squeezed row ID.
      // if (squeezedRowInfo.squeezedRowID != this.state.lastSqueezedRowID[1]) {
      //   this.setState({
      //     lastSqueezedRowID: [this.state.lastSqueezedRowID[1], squeezedRowInfo.squeezedRowID],
      //   });
      // }
    }
  }

  render() {
    let dataSource = this.state.dataSource.cloneWithRows(this.props.dataSource, this.props.dataOrder);
    // console.log('render SortableListView,', 'scrollEnabled:', !this.state.sortRowData);
    return (
      <View
        style={[
          { flex: 1 },
          this.props.containerStyle
        ]}
        {...this.props}>
        <ListView
          ref={(listView) => this.listViewRef = listView}
          {...this.state.panResponder.panHandlers}
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={() => {}}
          scrollEnabled={!this.state.sortRowData}
          onScroll={(e) => {
            this.scrollContentOffsetY = (e.nativeEvent.contentOffset.y === undefined) ? 0 : e.nativeEvent.contentOffset.y;
            console.log(this.scrollContentOffsetY);
            // this.scrollContainerHeight = e.nativeEvent.contentSize.height;
            // if (this.props.onScroll) this.props.onScroll(e);
          }}
        />
        {this._renderSortRow(this.state.sortRowData, this.state.sortRowID)}
      </View>
    )
  }

  /*  Called by <ListView> and _renderSortRow().
      Argument 'sortRowData' is a custom argument and is null when called by <ListView>.  */
  _renderRow(rowData, sectionID, rowID, highlightRow, isSortRow) {
    let Component = isSortRow ? SortRow : Row;
    if (!isSortRow) {
      this.state.squeezedRowsTopY[rowID] = new Animated.Value(0);
    };
    return (
        <Component
          key={rowID}
          rowData={rowData}
          rowID={rowID}
          rowStyle={this.props.rowStyle}
          renderRow={this.props.renderRow}
          onDragHandlePressInHandler={this._onDragHandlePressInHandler.bind(this)}
          onDragHandlePressOutHandler={this._onDragHandlePressOutHandler.bind(this)}
          onRowPressHandler={this._onRowPressHandler.bind(this)}
          onRowLayout={ (e) => this.state.rowsLayout[rowID] = e.nativeEvent.layout }
          squeezedRowTopY={this.state.squeezedRowsTopY[rowID]}
          sortRowID={this.state.sortRowID}
          sortRowStyle={this.props.sortRowStyle}
          sortRowLayout={this.state.rowsLayout[rowID]}
          sortRowTopY={this.state.sortRowTopY}
        />
    )
  }
  _renderSortRow(sortRowData, sortRowID) {
    if (!this.state.sortRowData) { return };
    return this._renderRow(sortRowData, null, sortRowID, null, true);
  }
  _renderSeparator(sectionID, rowID) {
    return <View
      style={{borderTopWidth:1, borderColor: '#ccc'}}
      key={rowID}/>
  }

  /*  Set <SortableListView>'s state with pressedRowInfo
      whitch will trigger the floating SortRow to be rendered.  */
  _onDragHandlePressInHandler(pressedRowInfo) {
    // console.log('_onDragHandlePressInHandler');
    // this.listViewRef.scrollTo({x: 5, y:2000});

    let pressedRowOffsetY = this.state.rowsLayout[pressedRowInfo.rowID].y - this.scrollContentOffsetY;
    this.state.sortRowTopY.setOffset(pressedRowOffsetY);
    this.state.sortRowTopY.setValue(0);

    // console.log('update sortRowData');
    this.setState({
        sortRowData: pressedRowInfo.rowData,
        sortRowID: pressedRowInfo.rowID,
        sortRowOffsetY: pressedRowOffsetY,
      }, this._onSortAnimationLoop);
  }
  _onDragHandlePressOutHandler() {
    // console.log('_onDragHandlePressOutHandler');
    if (!this.onPanResponderGranted) {
      // console.log('> reset sortRowData');
      // Reset states.
      this.setState({
        sortRowData: null,
        sortRowID: '',
        sortTargetRowID: '',
        // lastSqueezedRowID: ['', ''],
      });
    }
  }
  _onRowPressHandler(pressedRowID) {
    this.props.onRowPress(pressedRowID);
  }

  _onSortAnimationLoop() {
    if (false && this.state.sortRowData) {
      // TODO: Scroll list when SortRow is near the edges.
      // console.log('inside _onSortAnimationLoop');
      requestAnimationFrame(this._onSortAnimationLoop.bind(this));
    }
  }
}

/*  The element to render static rows in the SortableListView.  */
class Row extends Component {
  static propTypes = {
    rowData:      PropTypes.object,
    rowID:        PropTypes.string,
    rowStyle:     PropTypes.array,
    onRowLayout:  PropTypes.func,
    sortRowID:    PropTypes.string,
    squeezedRowTopY:  PropTypes.object, // Animated Value
    renderRow:        PropTypes.func,
    onDragHandlePressInHandler: PropTypes.func,
    onDragHandlePressOutHandler: PropTypes.func,
    onRowPressHandler: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    // console.log('render Row');
    return (
      <Animated.View
        onLayout={this.props.onRowLayout}
        style={[
          {backgroundColor: 'rgba(255, 255, 255, 1.0)',
          top: this.props.squeezedRowTopY},
          (this.props.sortRowID == this.props.rowID) && {opacity: 0},
          this.props.rowStyle
        ]}>
        {this.props.renderRow(
          this.props.rowData,
          this._onDragHandlePressInHandler.bind(this),
          this._onDragHandlePressOutHandler.bind(this),
          this._onRowPressHandler.bind(this)
        )}
      </Animated.View>
    )
  }

  /*  Get the layout of the pressed row and
      invoke the _onDragHandlePressInHandler() callback on <SortableListView>
      with an pressedRowInfo object containing info about the pressed row.  */
  _onDragHandlePressInHandler() {
    // console.log('_onDragHandlePressInHandler');
    this.props.onDragHandlePressInHandler({
      rowData: this.props.rowData,
      rowID: this.props.rowID,
    });
  }
  _onDragHandlePressOutHandler() {
    // console.log('_onDragHandlePressOutHandler');
    this.props.onDragHandlePressOutHandler();
  }
  _onRowPressHandler() {
    this.props.onRowPressHandler(this.props.rowID);
  }
}

/*  The element to render the 'hovering' row that is being drag and sorted. */
class SortRow extends Component {
  static propTypes = {
    rowData: PropTypes.object,
    sortRowStyle: PropTypes.array,
    sortRowLayout: PropTypes.object,
    sortRowTopY: PropTypes.object,  // Animated Value
    renderRow: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    // console.log('render sortRow');
    return (
      <Animated.View
        style={{
          backgroundColor: 'rgba(69, 252, 217, 0.64)',
          position: 'absolute',
          top: this.props.sortRowTopY,
          width: this.props.sortRowLayout.width
        }}>
        {this.props.renderRow(this.props.rowData)}
      </Animated.View>
    )
  }
}
//
