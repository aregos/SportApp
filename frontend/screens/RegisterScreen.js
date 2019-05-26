import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import {registerAction} from '../modules/auth/actions/action.js';
import validator from '../modules/auth/helpers/validator';

export class RegisterScreen extends React.Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
            error: ''
        }
    }

    register = () => {
        const {email, login, password} = this.state;
        if (email && login && password) {
            if (validator.emailValidator(email) && validator.nameValidator(login) && validator.passwordValidator(password)) {
                this.props.register(email, login, password);
            }
            else this.setState({error: 'Введенные данные не соответствуют правилам'});
        }
        else {
            this.setState({error: 'У вас не заполнено поле'});
        }
    };

    render() {
        return (
            <View>
                <Text>Email</Text>
                <TextInput
                    style={{ borderWidth : 4 }}
                    value={this.state.email}
                    maxLength={40}
                    onChangeText={ (text) => this.setState({email: text})}
                />
                <Text>Логин</Text>
                <TextInput
                    style={{ borderWidth : 4 }}
                    value={this.state.login}
                    maxLength={14}
                    onChangeText={ (text) => this.setState({login: text})}
                />
                <Text>Пароль</Text>
                <TextInput
                    style={{ borderWidth : 4}}
                    value={this.state.password}
                    maxLength={14}
                    onChangeText={ (text) => this.setState({password: text}) }
                />
                <Button
                    title='Зарегистрироваться'
                    onPress={this.register}
                />
                <Text>{this.state.error && Alert.alert('Ошибка', this.state.error)}</Text>
            </View>
        )
    }
}

let mapStateToProps = state => ({
    reg: state.register
})

let mapDispatchToProps = dispatch => ({
    register: (email,login,password) => dispatch(registerAction(email,login,password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)