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
import LoadingScreen from "../commonComponents/LoadingScreen";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import { guestModeAction, logoutAction, getSettingsList } from "../modules/auth/actions/action";
import { getFriendsInRequestsAction } from '../modules/friends/actions/action';
import settingsList from '../modules/auth/helpers/settingsList';
import girlBox from '../images/girl-box.jpg';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import {getTrueSettingsToArray} from "../utils";

class HomeScreen extends React.Component {

    state = {
        showLeftMenu: false,
        availableSettings: [],
        friendsRequestsNumber: 0
    };

    //TODO оптимизировать, куча ненужных запросов!!!
    componentWillReceiveProps(nextProps) {
        {/*Если был не залогинен, потом залогинился*/ }
        if (!this.props.isLogged && nextProps.isLogged && nextProps.login) {
            this.props.getSettingsList(nextProps.login)
                .then(() => {
                    const availableSettings = getTrueSettingsToArray(this.props.settingsList);
                    this.setState({ availableSettings });
                });
        }
        else if (nextProps.settingsList && !_.isEqual(this.state.availableSettings, getTrueSettingsToArray(nextProps.settingsList))) {
            {/*Если апдейтнул настройки и надо обновить их на главной*/ }
            this.props.getSettingsList(this.props.login)
                .then(() => {
                    const availableSettings = getTrueSettingsToArray(this.props.settingsList);
                    this.setState({ availableSettings });
                });
        }
    }

    componentDidMount() {

        const willFocusListener = this.props.navigation.addListener('willFocus', () => {

        });

        let availableSettings = [];
        for (let key in this.props.settingsList) {
            if (this.props.settingsList[key] === true) {
                availableSettings.push(key);
            }
        }
        if (this.props.id) {
            this.props.getFriendsInRequests(this.props.id)
                .then(() => this.setState({ friendsRequestsNumber: this.props.friendsRequests.length }))
        }
        this.setState({ availableSettings });
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

    //функция переключения показа левого меню
    handleShowLeftMenu = () => {
        this.setState({ showLeftMenu: !this.state.showLeftMenu })
    };

    //гостевой экран
    mainGuestScreen = () => {
        return (
            <ImageBackground
                source={girlBox}
                style={styles.guestContainer}
            >
                <Header
                    leftComponent={{ icon: 'menu', onPress: this.handleShowLeftMenu }}
                    centerComponent={{ text: 'Главная' }}
                    containerStyle={styles.header}
                />
                {this.leftMenu()}
                <Text style={styles.textStyle}>Вы зашли как незарегистрированный пользователь, вы все еще можете</Text>
                <Button
                    title='Зарегистрироваться'
                    buttonStyle={{ ...styles.buttonStyle, marginTop: 0 }}
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
                <Text style={styles.textStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </Text>
                <Button
                    title="Новости спорта"
                    buttonStyle={styles.buttonStyle}
                    onPress={() => this.props.navigation.navigate('NewsScreen')}
                />
            </ImageBackground>
        )
    };

    //экран залогиненного пользователя
    mainLoggedScreen = () => {
        return (
            <ImageBackground
                source={girlBox}
                style={styles.loggedContainer}
            >
                <Header
                    leftComponent={{ icon: 'menu', onPress: this.handleShowLeftMenu }}
                    centerComponent={{ text: 'Главная' }}
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
        if (this.props.isLoading) {
            return <LoadingScreen/>
        }
        //гостевой режим
        else if (this.props.isGuestMode) return this.mainGuestScreen();
        // залогиненный режим
        else if (this.props.isLogged) return this.mainLoggedScreen();
        else
            return (
                <ImageBackground
                    source={girlBox}
                    style={styles.mainContainer}
                >
                    <Button
                        title="Вход"
                        buttonStyle={{ ...styles.buttonStyle, marginTop: 0 }}
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
    id: state.register.id,
    login: state.register.login,
    isLoading: state.register.isFetching,
    isLogged: state.register.isLogged,
    isGuestMode: state.register.isGuestMode,
    settingsList: state.register.settingsList,
    friendsRequests: state.friends.friendsInRequests
});

const mapDispatchToProps = dispatch => ({
    runGuestMode: () => dispatch(guestModeAction()),
    logout: () => dispatch(logoutAction()),
    getSettingsList: (login) => dispatch(getSettingsList(login)),
    getFriendsInRequests: id => dispatch(getFriendsInRequestsAction(id))
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
        color: 'gray'
    }
});
