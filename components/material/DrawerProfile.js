import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {
  View,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native';

import ListItem from './ListItem';

export default class DrawerProfile extends Component {
  static propTypes = {
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    avatarImgSrc: PropTypes.string,
    avatarColor: PropTypes.string,
    avatarBgColor: PropTypes.string,
    userNameStyle: PropTypes.array,
    userEmailStyle: PropTypes.array,
    iconColor: PropTypes.string
  };
  static defaultProps = {
    avatarImgSrc: null,
    avatarColor: null,
    avatarBgColor: null,
    userName: 'User Name',
    userEmail: 'user@email.com',
    userNameStyle: null,
    userEmailStyle: null,
    iconColor: null
  };
  render() {
    const {
      userName,
      userEmail,
      userNameStyle,
      userEmailStyle,
      avatarImgSrc,
      avatarColor,
      avatarBgColor,
      iconColor
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.avatarArea}>
          <View style={[
              styles.avatarContainer,
              avatarBgColor && {backgroundColor: avatarBgColor}]}>
            {avatarImgSrc &&
              {/* avatar image */}
            }
            {!avatarImgSrc && <Icon name={'account-circle'} size={64} color={avatarColor || '#aaa'} style={styles.avatar}/>}
          </View>
        </View>

        <ListItem
          drawer={true}
          iconRightName={'arrow-drop-down'}
          iconColor={iconColor || '#fff'}
          textPrimary={userName}
          textSecondary={userEmail}
          textPrimaryStyle={[styles.userName, userNameStyle]}
          textSecondaryStyle={[styles.userEmail, userEmailStyle]}
          onPress={() => null}
        />
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 16,
    backgroundColor: 'gray'
  },
  avatarArea: {
    paddingHorizontal: 16,
  },
  avatarContainer: {
    borderRadius: 50,
    width: 64,
    backgroundColor: '#fff'
  },
  avatar: {
  },
  userName: {
    fontSize: 14,
    color: '#fff'
  },
  userEmail: {
    fontSize: 14,
    color: '#fff'
  }
})
