import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ImageBackground
} from 'react-native';
import {
    Button,
    Header
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import {guestModeAction, logoutAction, getSettingsList} from "../modules/auth/actions/action";
import settingsList from '../modules/auth/helpers/settingsList';
import girlBox from '../images/girl-box.jpg';
import { connect } from 'react-redux';
import * as _ from 'lodash';

class HomeScreen extends React.Component {

    state = {
        showLeftMenu: false,
        availableSettings: []
    };

    getTrueSettingsToArray = allSettings => {
        let array = [];
        for (let key in allSettings) {
            if (allSettings[key] === true) {
                array.push(key);
            }
        }
        return array;
    };

    //TODO оптимизировать, куча ненужных запросов!!!
    componentWillReceiveProps(nextProps) {
        {/*Если был не залогинен, потом залогинился*/}
        if (this.props.isLogged === false && nextProps.isLogged === true && nextProps.login) {
            let availableSettings = [];
            this.props.getSettingsList(nextProps.login)
                    .then(() => {
                        for (let key in this.props.settingsList) {
                            if (this.props.settingsList[key] === true) {
                                availableSettings.push(key)
                            }
                        }
                        this.setState({availableSettings});
                    });
            }
        else if (nextProps.settingsList && !_.isEqual(this.state.availableSettings, this.getTrueSettingsToArray(nextProps.settingsList))) {
            {/*Если апдейтнул настройки и надо обновить их на главной*/}
            let availableSettings = [];
            this.props.getSettingsList(this.props.login)
                .then(() => {
                    for (let key in this.props.settingsList) {
                        if (this.props.settingsList[key] === true) {
                            availableSettings.push(key)
                        }
                    }
                    this.setState({availableSettings});
                });
        }
        }

    componentDidMount() {
        let availableSettings = [];
            for (let key in this.props.settingsList) {
                if (this.props.settingsList[key] === true) {
                    availableSettings.push(key);
                }
            }
            this.setState({availableSettings});
    }

    leftMenu = () => {
        if (this.state.showLeftMenu) {
                return (
                    <ScrollView
                        style={styles.leftMenu}
                    >
                        {this.state.availableSettings.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    buttonStyle={styles.leftMenuButton}
                                    title={settingsList[item].title}
                                    onPress={() => this.props.navigation.navigate(`${settingsList[item].navigate}`)}
                                />
                            )
                        })}
                    </ScrollView>
                );
            } else return null;
        };

  handleShowLeftMenu = () => {
      this.setState({showLeftMenu: !this.state.showLeftMenu})
  };

  mainGuestScreen = () => {
    return (
        <ImageBackground
            source={girlBox}
            style={styles.guestContainer}
        >
            <Header
                leftComponent={{icon: 'menu', onPress: this.handleShowLeftMenu}}
                centerComponent={{text: 'Главная'}}
                containerStyle={styles.header}
            />
            {this.leftMenu()}
            <Text style={styles.textStyle}>Вы зашли как незарегистрированный пользователь, вы все еще можете</Text>
            <Button
                title='Зарегистрироваться'
                buttonStyle={{...styles.buttonStyle, marginTop: 0}}
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
            <Text style={styles.textStyle}>Если у вас уже есть аккаунт</Text>
            <Button
                title="Войти"
                buttonStyle={styles.buttonStyle}
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
            <Text style={styles.textStyle}>Контент</Text>
            <Button
                title="Новости спорта"
                buttonStyle={styles.buttonStyle}
                onPress={() => this.props.navigation.navigate('NewsScreen')}
            />
        </ImageBackground>
    )
  };

  mainLoggedScreen = () => {
      return (
          <ImageBackground
              source={girlBox}
              style={styles.loggedContainer}
          >
              <Header
                  leftComponent={{icon: 'menu', onPress: this.handleShowLeftMenu}}
                  centerComponent={{text: 'Главная'}}
                  containerStyle={styles.header}
              />
              {this.leftMenu()}
              <Button
                  buttonStyle={styles.buttonStyle}
                  title="Выйти из аккаунта"
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
              <Button
                  buttonStyle={styles.buttonStyle}
                  title="Редактировать информацию"
                  icon={
                      <IconFeather
                        name="edit"
                        size={20}
                        color="white"
                      />
                  }
                  type='solid'
                  onPress={() => this.props.navigation.navigate('EditPersonalInfoScreen')}
              />
              <Text style={styles.textStyle}>Контент</Text>
              <Button
                  buttonStyle={styles.buttonStyle}
                  title="Новости спорта"
                  onPress={() => this.props.navigation.navigate('NewsScreen')}
              />
          </ImageBackground>
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
          <ImageBackground
              source={girlBox}
              style={styles.mainContainer}
          >
            <Button
              title="Вход"
              buttonStyle={{...styles.buttonStyle, marginTop: 0}}
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
              buttonStyle={styles.buttonStyle}
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
              buttonStyle={styles.buttonStyle}
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
          </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
    login: state.register.login,
    isLoading: state.register.isFetching,
    isLogged: state.register.isLogged,
    isGuestMode: state.register.isGuestMode,
    settingsList: state.register.settingsList
});

const mapDispatchToProps = dispatch => ({
    runGuestMode: () => dispatch(guestModeAction()),
    logout: () => dispatch(logoutAction()),
    getSettingsList: (login) => dispatch(getSettingsList(login))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  mainContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
  },
  loggedContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  guestContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
  },
  header: {
      opacity: 0.4,
  },
  leftMenu: {
      position: 'absolute',
      marginTop: 80,
      width: 150,
      left: 0,
      zIndex: 100
  },
  leftMenuButton: {
      backgroundColor: 'black',
      opacity: 0.8
  },
  buttonStyle: {
      marginVertical: 10,
      padding: 20,
      width: 300,
      height: 50,
      backgroundColor: '#50b593',
      borderWidth: 1,
      borderColor: 'white',
      opacity: 0.8
  },
    textStyle: {
      marginVertical: 20,
        color: 'white'
    }
});
