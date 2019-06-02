import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  Button
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {guestModeAction, logoutAction} from "../modules/auth/actions/action";

import { connect } from 'react-redux';

class HomeScreen extends React.Component {

  mainGuestScreen = () => {
    return(
    <View>
      <Text>Главная страница</Text>
        <Text>Вы зашли как незарегистрированный пользователь, вы все еще можете</Text>
        <Button
            title='Зарегистрироваться'
            style={styles.buttonStyle}
            icon={
                <IconAnt
                    name="profile"
                    size={15}
                    color="white"
                />
            }
            type='solid'
            onPress={() => this.props.navigation.navigate('RegisterScreen')}
        />
        <Text>Если у вас уже есть аккаунт</Text>
        <Button
            title="Войти"
            icon={
                <Icon
                    name="login"
                    size={15}
                    color="white"
                />
            }
            type='solid'
            onPress={() => this.props.navigation.navigate('LoginScreen')}
        />
        <Text>Контент</Text>
    </View>
    )
  };

  mainLoggedScreen = () => {
      return (
          <View>
              <Button
                  title="Выйти"
                  icon={
                      <IconAnt
                          name="logout"
                          size={20}
                          color="white"
                      />
                  }
                  type='solid'
                  onPress={() => this.props.logout()}
              />
              <Text>Контент</Text>
          </View>
      )
  };

  render() {
    if (this.props.isLoading) return (
        <View>
          <Text>Загрузка...</Text>
        </View>
    );
    else if (this.props.isGuestMode) return this.mainGuestScreen();
    else if (this.props.isLogged) return this.mainLoggedScreen();
    else
    return (
      <View style={styles.container}>
            <Button
              title="Вход"
              icon={
                <Icon
                    name="login"
                    size={15}
                    color="white"
                />
              }
              type='solid'
              onPress={() => this.props.navigation.navigate('LoginScreen')}
            />
            <Button
              title="Регистрация"
              style={styles.buttonStyle}
              icon={
                <IconAnt
                    name="profile"
                    size={15}
                    color="white"
                />
              }
              type='solid'
              onPress={() => this.props.navigation.navigate('RegisterScreen')}
            />
            <Button
              title="Войти без регистрации"
              style={styles.buttonStyle}
              icon={
                <IconAwesome
                  name="user-secret"
                  size={15}
                  color="white"
                />
              }
              type='solid'
              onPress={() => this.props.runGuestMode()}
            />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  name: state.register.login,
  isLoading: state.register.isFetching,
  isLogged: state.register.isLogged,
  isGuestMode: state.register.isGuestMode
});

const mapDispatchToProps = dispatch => ({
  runGuestMode: () => dispatch(guestModeAction()),
  logout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 100
  },
  buttonStyle: {
    marginTop: 40
  }
});
