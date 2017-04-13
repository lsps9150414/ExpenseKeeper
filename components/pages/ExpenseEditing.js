// TODO: make this page
// TODO: route to this page

import React, {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
  Component,
  InteractionManager,
} from 'react-native'
import {
  setTheme,
  MKColor,
  MKRadioButton,
} from 'react-native-material-kit'

import DialogExpenseEditing from '../custom/dialogs/DialogExpenseEditing'
import ListItem from '../material/ListItem'
import Subheader from '../material/text/Subheader'
import { categoryIconColors } from '../../constants/categoryIconColors'

export default class ExpenseEditing extends Component {
  constructor() {
    super();
    this.state = {
      openModal: true,
      spentAmount: 0,
      selectedCategoryID: 'ID-0',
      stateReady: false,
      scene: 'expenseAdd',
      isLoading: true,
    }
    this.radioGroup = new MKRadioButton.Group();
  }
  componentWillMount() {
    // console.log('componentWillMount');
    InteractionManager.runAfterInteractions(() => {
      this.setState({isLoading: false});
    });
    this.props.getSceneState(this.state);
  }
  // componentDidMount() {
  //   console.log('componentDidMount');
  // }
  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  //   console.log(this.state);
  // }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableHighlight
            style={styles.spentInputContainer}
            onPress={ () => {this.setState({openModal: true})} }>
            <Text style={styles.spentAmount}>$ {this.state.spentAmount}</Text>
          </TouchableHighlight>
          <Subheader>CATEGORY</Subheader>
          {this.props.categories.map((category, index) => {
            // return <Text>{category.name}</Text>
            return this._renderCategoryRadio(category.id, category.name, category.icon_name, index);
          })}
          <Subheader>INFOS</Subheader>
          <ListItem
            iconLeftName={'event'}
            iconColor={'gray'}
            textPrimary={'Date'}/>
          <ListItem
            iconLeftName={'label'}
            iconColor={'gray'}
            textPrimary={'Note'}/>

        </ScrollView>
        <DialogExpenseEditing
          backdrop={true}
          position={'center'}
          isOpen={this.state.openModal}
          closeModal={ () => {
            this.setState({openModal: false, stateReady: true});
            this.props.getSceneState(this.state);
          }}
          defaultSpentAmount={this.state.spentAmount}
          updateSpent={(spentInput) => {
            this.setState({spentAmount: spentInput});
            // this.props.onBudgetUpdateHandler(this.state.pressedCategoryID, budgetInput);
          }}
        />
      </View>
    )
  }

  _renderCategoryRadio(id, name, iconName, index = 0) {
    return (
      <ListItem
        key={index}
        dense={true}
        avatarLeftName={iconName}
        avatarColor={'#fff'}
        avatarBgColor={ categoryIconColors[iconName] }
        onIconRightPress={() => {onEditPress(id, budgetAmount, budgetTimeframe)}}
        textPrimary={name.charAt(0).toUpperCase() + name.slice(1)}
        radioButtonChecked={index == 0}
        radioButtonGroup={this.radioGroup}
        onRadioButtonCheckedChange={ (arg) => {
          if (arg.checked) {
            this.setState({selectedCategoryID: id});
          }
          /*FIXME: Find a way to getSceneState only once.*/
          this.props.getSceneState(this.state);
        }}
      />
    );
  }
}

let styles = StyleSheet.create({
  spentInputContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 0.3,
    borderColor: 'gray'
  },
  spentAmount: {
    textAlign: 'right',
    fontSize: 30,
    color: 'black'
  }
})
