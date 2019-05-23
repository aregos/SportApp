import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import {registerAction} from '../modules/auth/actions/action.js';

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
            this.props.register(this.state.email, this.state.login, this.state.password);
        }
        else {
            this.setState({error: 'У вас не заполнено поле'});
        }
    }

    render() {
        return (
            <View>
                <Text>Email</Text>
                <TextInput
                    style={{ borderWidth : 4 }}
                    value={this.state.email}
                    onChangeText={ (text) => this.setState({email: text})}
                />
                <Text>Логин</Text>
                <TextInput
                    style={{ borderWidth : 4 }}
                    value={this.state.login}
                    onChangeText={ (text) => this.setState({login: text})}
                />
                <Text>Пароль</Text>
                <TextInput
                    style={{ borderWidth : 4}}
                    value={this.state.password}
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
    register: () => dispatch(registerAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)