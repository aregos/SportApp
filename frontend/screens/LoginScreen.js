import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { loginAction } from '../modules/auth/actions/action';
import validator from '../modules/auth/helpers/validator';

class LoginScreen extends React.Component {

    state = {
        login: '',
        password: ''
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isLogged === true) {
            this.props.navigation.navigate('CongratScreen');
        }
    }

    login = () => {
        const {login, password} = this.state;
        if (login && password) {
            if (validator.nameValidator(login) && validator.passwordValidator(password)) {
                this.props.login(login, password)
            }
            else this.setState({error: 'Введенные данные не соответствуют правилам'});
        }
        else {
            this.setState({error: 'У вас не заполнено поле'});
        }

    };

    render() {
        if (this.props.isLoading) return (
            <View>
                <Text>Загрузка...</Text>
            </View>
        );
        else
        return (
            <View>
                <Text>Логин</Text>
                <Input
                    style={{ borderWidth : 4 }}
                    value={this.state.login}
                    onChangeText = { text => this.setState({login : text})}
                />
                <Text>Пароль</Text>
                <Input
                    style={{ borderWidth : 4}}
                    value={this.state.password}
                    onChangeText = { text => this.setState({password : text})}
                />
                <Button
                    title='Вход'
                    onPress={this.login}
                    type='solid'
                />
                <Text>{this.state.error && Alert.alert('Ошибка', this.state.error)}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
   isLoading: state.register.isFetching,
   isLogged: state.register.isLogged
});

const mapDispatchToProps = dispatch => ({
   login: (login, password) => dispatch(loginAction(login, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)