import React from 'react';
import { View, Alert, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import {registerAction} from '../modules/auth/actions/action.js';
import validator from '../modules/auth/helpers/validator';

export class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
            error: '',
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.error && ((prevState.login.length > this.state.login.length)||(prevState.password > this.state.password.length)||(prevState.email > this.state.email.length))) {
            this.setState({error: ''});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isLogged === true) {
            this.props.navigation.navigate('CongratScreen')
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
            <View
                style={styles.container}
            >
                <Text>Email</Text>
                <Input
                    style={{ borderWidth : 4 }}
                    value={this.state.email}
                    maxLength={40}
                    onChangeText={ (text) => this.setState({email: text})}
                />
                <Text>Логин</Text>
                <Input
                    style={{ borderWidth : 4 }}
                    value={this.state.login}
                    maxLength={14}
                    onChangeText={ (text) => this.setState({login: text})}
                />
                <Text>Пароль</Text>
                <Input
                    style={{ borderWidth : 4}}
                    value={this.state.password}
                    maxLength={14}
                    onChangeText={ (text) => this.setState({password: text}) }
                />
                <Button
                    buttonStyle={styles.buttonStyle}
                    title='Зарегистрироваться'
                    onPress={this.register}
                />
                <Text>{this.state.error && Alert.alert('Ошибка', this.state.error)}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.register.isLogged
});

const mapDispatchToProps = dispatch => ({
    register: (email,login,password) => dispatch(registerAction(email,login,password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        width: 300,
        height: 50,
        backgroundColor: '#50b593',
        borderWidth: 1,
        borderColor: 'white',
        opacity: 0.8
    }
});