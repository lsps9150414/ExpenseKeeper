import React, {
  Text,
  TextInput,
  View,
  PropTypes,
  Component
} from 'react-native'

import Subheader from '../../material/text/Subheader'
import CategorySelectionGrid from '../../../components/custom/CategorySelectionGrid'
import { categoryIconColors } from '../../../constants/categoryIconColors'

export default class CategoryEditing extends Component {
  static propTypes = {
    categoryID:       PropTypes.string,
    categoryName:     PropTypes.string.isRequired,
    categoryIconName: PropTypes.string.isRequired,
    getSceneState:    PropTypes.func.isRequired,
    scene:            PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      categoryID:       this.props.categoryID,
      categoryName:     this.props.categoryName,
      categoryIconName: this.props.categoryIconName,
      scene:            this.props.scene,
      stateReady:       false,
    }
  }

  componentWillMount() {
    this.props.getSceneState(this.state);
  }
  render() {
    return (
      <View>
        <Subheader>NAME</Subheader>
        <TextInput
          style={{
            marginHorizontal: 16,
            height: 48,
          }}
          autoFocus={true}
          /*FIXME: autoCapitalize not working*/
          autoCapitalize={'words'}
          defaultValue={this.state.categoryName}
          onChangeText={(inputText) => {
            this.setState({categoryName: inputText});
            this._stateReady() && this.props.getSceneState(this.state);
          }}
        />
        <Subheader>SELECT AN ICON</Subheader>
        <CategorySelectionGrid
          iconNameColors={categoryIconColors}
          selectedIconName={this.state.categoryIconName}
          onIconSelectHandler={(selectedIconName) => {
            this.setState({categoryIconName: selectedIconName});
            this._stateReady() && this.props.getSceneState(this.state);
          }}/>
      </View>
    )
  }

  _stateReady() {
    if (
      this.state.categoryName != '' &&
      this.state.categoryIconName != '') {
      this.setState({stateReady: true});
      return true;
    }
    else {
      return false;
    }
  }
}
