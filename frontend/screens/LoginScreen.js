import React from 'react';
import { View, TextInput, Text, Button} from 'react-native';
import { connect } from 'react-redux';
import { loginAction } from '../modules/auth/actions/action';

class LoginScreen extends React.Component {

    state = {
        login: '',
        password: ''
    };

    login = (login, password) => {
        this.props.login(login, password)
    };

    render() {
        return (
            <View>
                <Text>Логин</Text>
                <TextInput
                    style={{ borderWidth : 4 }}
                    value={this.state.login}
                    onChangeText = { text => this.setState({login : text})}
                />
                <Text>Пароль</Text>
                <TextInput
                    style={{ borderWidth : 4}}
                    value={this.state.password}
                    onChangeText = { text => this.setState({password : text})}
                />
                <Button
                    title='Вход'
                    onPress={this.login}
                />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login: (login, password) => dispatch(loginAction(login, password))
});

export default connect(null, mapDispatchToProps)(LoginScreen)