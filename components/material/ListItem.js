import Icon from 'react-native-vector-icons/MaterialIcons'
import React, {
  View,
  Text,
  TouchableHighlight,
  Switch,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'
import {
  setTheme,
  MKColor,
  MKRadioButton,
 } from 'react-native-material-kit'

import TextPrimary from './text/TextPrimary'
import TextSecondary from './text/TextSecondary'

export default class ListItem extends Component {
  static propTypes = {
    drawer: PropTypes.bool,
    dense: PropTypes.bool,
    containerStyle: PropTypes.array,
    onPress: PropTypes.func,
    // textSecondaryLines: PropTypes.number,

    textPrimary: PropTypes.string.isRequired,
    textPrimaryStyle: PropTypes.array,

    textSecondary: PropTypes.string,
    textSecondaryStyle: PropTypes.array,

    textRight: PropTypes.string,
    textRightStyle: PropTypes.array,

    iconColor: PropTypes.string,
    iconSize: PropTypes.number,

    iconLeftName: PropTypes.string,
    onIconLeftPress: PropTypes.func,

    iconRightName: PropTypes.string,
    onIconRightPress: PropTypes.func,
    onIconRightPressIn: PropTypes.func,
    onIconRightPressOut: PropTypes.func,
    iconRightWithoutFeedback: PropTypes.bool,

    avatarImgSrc: PropTypes.string,
    avatarColor: PropTypes.string,
    avatarBgColor: PropTypes.string,
    avatarLeftName: PropTypes.string,

    switchValue: PropTypes.bool,
    switchDisabled: PropTypes.bool,
    onSwitchValueChange: PropTypes.func,

    radioButtonChecked: PropTypes.bool,
    radioButtonGroup: PropTypes.object,
    onRadioButtonCheckedChange: PropTypes.func,
  };
  static defaultProps = {
    drawer: false,
    dense: false,
    containerStyle: null,
    onPress: null,
    // textSecondaryLines,

    textPrimary: null,
    textPrimaryStyle: null,

    textSecondary: null,
    textSecondaryStyle: null,

    textRight: null,
    textRightStyle: null,

    iconSize: null,
    iconColor: '#aaa',

    iconLeftName: null,
    onIconLeftPress: null,

    iconRightName: null,
    onIconRightPress: null,
    onIconRightPressIn: null,
    onIconRightPressOut: null,
    iconRightWithoutFeedback: false,

    avatarImgSrc: null,
    avatarColor: '#aaa',
    avatarBgColor: null,
    avatarLeftName: null,

    switchValue: null,
    switchDisabled: null,
    onSwitchValueChange: null,

    radioButtonChecked: null,
    radioButtonGroup: null,
    onRadioButtonCheckedChange: null,
  };

  render() {
    const {
      drawer,
      dense,
      containerStyle,
      onPress,
      // textSecondaryLines,

      // TODO: custom text color
      textPrimary,
      textPrimaryStyle,

      textSecondary,
      textSecondaryStyle,

      textRight,
      textRightStyle,

      iconSize,
      iconColor,

      iconLeftName,
      onIconLeftPress,

      iconRightName,
      onIconRightPress,
      onIconRightPressIn,
      onIconRightPressOut,
      iconRightWithoutFeedback,

      avatarImgSrc,
      avatarColor,
      avatarBgColor,
      avatarLeftName,

      switchValue,
      switchDisabled,
      onSwitchValueChange,

      radioButtonChecked,
      radioButtonGroup,
      onRadioButtonCheckedChange,
    } = this.props;

    var defaultListItemHeight = drawer ? (dense ? 48 : 56) : (textSecondary ? (dense ? 60 : 72) : (avatarLeftName || avatarImgSrc ? (dense ? 48 : 56) : (dense ? 40 : 48)));
    var defaultTextSizePrimary = drawer ? 14 : (textSecondary ? (dense ? 13 : 16) : (avatarLeftName || avatarImgSrc ? 16 : (dense ? 13 : 16)));
    var defaultTextSizeSecondary = drawer ? 14 : (textSecondary ? (dense ? 12 : 14) : null);
    var defaultIconSize = iconSize ? iconSize : (drawer ? 24 : (dense ? 20 : 24));


    // leftElement
    if (avatarImgSrc) {
      // TODO: use avatar image as left element
    }
    else if (avatarLeftName) {
      // use avatar icon as left element
      var leftElement = (
        <View style={[
            styles.avatarContainer,
            dense && {width: 36, height: 36},
            avatarBgColor && {backgroundColor: avatarBgColor}]}>
          <Icon name={avatarLeftName} size={defaultIconSize} color={avatarColor} style={styles.icon}/>
        </View>
      )
    }
    else if (iconLeftName) {
      // use icon as left element
      var leftElement = (
        <Icon name={iconLeftName} size={defaultIconSize} color={iconColor} style={styles.icon}/>
      )
    };

    // rightElement
    if (radioButtonChecked !== null) {
      var rightElement = (
        <MKRadioButton
          checked={radioButtonChecked}
          group={radioButtonGroup}
          onCheckedChange={onRadioButtonCheckedChange}/>
      )
    }
    else if (switchValue !== null) {
      var rightElement = (
        <Switch
          value={switchValue}
          onValueChange={onSwitchValueChange}/>
      )
    }
    else if (iconRightName) {
      var rightElement = (
        <Icon name={iconRightName} size={defaultIconSize} color={iconColor} style={styles.icon}/>
      );
      if (onIconRightPress || onIconRightPressIn) {
        let touchablePadding = dense ? (40 - defaultIconSize)/2 : (48 - defaultIconSize)/2;
        if (iconRightWithoutFeedback) {
          rightElement = (
            <TouchableHighlight
                style={{padding: touchablePadding}}
                onPress={onIconRightPress}
                onPressIn={onIconRightPressIn}
                onPressOut={onIconRightPressOut}
                underlayColor={"transparent"}>
              {rightElement}
            </TouchableHighlight>
          )
        }
        else {
          rightElement = (
            <TouchableHighlight
              style={{padding: touchablePadding}}
              onPress={onIconRightPress}
              onPressIn={onIconRightPressIn}
              onPressOut={onIconRightPressOut}
              underlayColor={"rgba(0,0,0,0.1)"}>
              {rightElement}
            </TouchableHighlight>
          )
        }
      }
    };

    var listItem = (
      <View style={[
          styles.container,
          {height: defaultListItemHeight},
          containerStyle]}>

        <View style={styles.horizontalContainer}>
          {/* left element */}
          {leftElement && <View style={[
              styles.rowElementContainer,
              styles.leftElementContainer,
              avatarLeftName && {marginRight: 0}, avatarLeftName && dense && {marginRight: 4},
              iconLeftName && {marginRight: 16}, iconLeftName && dense && {marginRight: 20}]}>
            {leftElement}
          </View>}
          {/* left text */}
          <View style={[
              styles.rowElementContainer,
              styles.leftTextContainer,
              textSecondary && styles.multiLineText]}>
            <TextPrimary style={[
                styles.textPrimary,
                {fontSize: defaultTextSizePrimary},
                drawer && styles.textPrimaryDrawer,
                textPrimaryStyle]}>
              {textPrimary}
            </TextPrimary>
            {textSecondary && <TextSecondary style={[
                styles.textSecondary,
                {fontSize: defaultTextSizeSecondary},
                drawer && styles.textSecondaryDrawer,
                textSecondaryStyle]}>
              {textSecondary}
            </TextSecondary>}
          </View>
        </View>

        <View style={styles.horizontalContainer}>
          {/* right text */}
          {textRight && <View style={[
            styles.rowElementContainer,
            styles.rightTextContainer,
            !rightElement && {marginRight: 16}]}>
            <TextPrimary style={[
                styles.textPrimary,
                styles.textRight,
                {fontSize: defaultTextSizePrimary},
                textRightStyle]}>
              {textRight}
            </TextPrimary>
          </View>}
          {/* right element */}
          {rightElement && <View style={[
              styles.rowElementContainer,
              styles.rightElementContainer,
              {marginHorizontal: 4}, dense && {marginHorizontal: 6},
              (!onIconRightPress && !onIconRightPressIn) && {marginHorizontal: 16},
              (switchValue !== null) && {marginRight: 12} ]}>
            {rightElement}
          </View>}
        </View>
      </View>
    );
    if (onPress) {
      var listItem = (
        <TouchableHighlight onPress={onPress} underlayColor={"rgba(0,0,0,0.1)"}>
          {listItem}
        </TouchableHighlight>
      )
    };

    return (listItem)
  }
};

var styles = StyleSheet.create({
  // Container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
    // , backgroundColor: 'yellow'
  },
  rowElementContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftElementContainer: {
    marginLeft: 16
    // , backgroundColor: 'pink'
  },
  leftTextContainer: {
    marginLeft: 16
  },
  rightElementContainer: {
    // backgroundColor: 'pink'
  },
  rightTextContainer: {
    justifyContent: 'flex-end'
  },
  // Icon & Avatar
  avatarContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: 'transparent'
  },
  // Text
  multiLineText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textPrimary: {
    // color: '#000'
  },
  textSecondary: {
    color: '#555'
  },
  textRight: {
    textAlign: 'right'
  },
  textPrimaryDrawer: {
    fontWeight: "500"
  },
  textSecondaryDrawer: {
    fontWeight: "normal"
  }
})
