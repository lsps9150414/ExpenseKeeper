'use strict';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  DrawerLayoutAndroid,
  Navigator,
  StyleSheet,
  Component
} from 'react-native'

import DrawerProfile from '../components/material/DrawerProfile'
import ListItem from '../components/material/ListItem'
import NavigationBarRouteMapper from '../routers/NavigationBarRouteMapper'
import SceneRouter from '../routers/SceneRouter'
import TextPrimary from '../components/material/text/TextPrimary'
import { RoutesMain, RoutesExpenseEditing } from '../routers/Routes'

export default class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      sceneState: null,
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={ (drawer) => this.drawerRef = drawer }
        /*TODO: STYLING drawerWidth = screenWidth - 56*/
        drawerWidth={300}
        drawerPosition={ DrawerLayoutAndroid.positions.Left }
        renderNavigationView={ this._renderDrawerContent.bind(this) }>
        { this._renderNavigator(RoutesMain[2], SceneRouter, Navigator.SceneConfigs.FadeAndroid) }
      </DrawerLayoutAndroid>
    )
  }
  _renderDrawerContent() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
          <DrawerProfile
            userName={"userName"}
            userEmail={"userEmail"}
          />
        </View>
        <ScrollView>
          {RoutesMain.map((route, index) => (
            <ListItem
              key={index}
              drawer={true}
              dense={true}
              iconLeftName={route.props.iconName}
              textPrimary={route.props.title}
              onPress={() => {
                this.drawerRef.closeDrawer();
                this.navigatorRef.replace(RoutesMain[index]);
              }}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
  _renderNavigator(initialRoute, renderSceneMethod, configureScene) {
    return (
      <Navigator
        ref={ (navigator) => this.navigatorRef = navigator }
        initialRoute={ initialRoute }
        renderScene={ (route, navigator) => renderSceneMethod(route, navigator, this)
         }
        configureScene={ () => configureScene }
        navigationBar={ this._renderNavigationBar() }
      />
    )
  }
  _renderNavigationBar() {
    return (
      <Navigator.NavigationBar
        style={styles.navigationBar}
        routeMapper={NavigationBarRouteMapper(this)}
      />
    )
  }

  _getSceneState(passedSceneState) {
    // console.log('_getSceneState');
    if (passedSceneState != null) {
      this.setState({
        sceneState: passedSceneState,
      })
    }
  }
  _onToolbarDone() {
    console.log('_onToolbarDone');
    console.log(this.state.sceneState);
    if (this.state.sceneState.stateReady) {
      if (this.state.sceneState.scene == 'categoryAdd') {
        this.props.onCategoryAddHandler(this.state.sceneState);
      }
      else if (this.state.sceneState.scene == 'categoryUpdate') {
        this.props.onCategoryUpdateHandler(this.state.sceneState);
      }
      else if (this.state.sceneState.scene == 'expenseAdd') {
        this.props.onExpenseAddHandler(this.state.sceneState);
      }
      else if (this.state.sceneState.scene == 'expenseEditing') {
        // this.props.onExpenseUpdateHandler(this.state.sceneState);
      }
      return true;
    }
    else {
      return false;
    }
  }
  _onToolbarDelete() {
    // console.log('_onToolbarDelete');
    this.props.onCategoryDeleteHandler(this.state.sceneState);
  }
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    backgroundColor: '#246dd5'
  }
});
