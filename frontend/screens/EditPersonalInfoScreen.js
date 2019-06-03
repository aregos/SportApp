import React from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import {getUserInfoAction, updateUserInfoAction} from '../modules/auth/actions/action';
import {
    Button,
    Input,
    Text
} from 'react-native-elements';
import BackLink from '../commonComponents/BackLink';

class EditPersonalInfoScreen extends React.Component {
    state = {
        email: '',
        name: '',
        surName: '',
    };

    componentDidMount() {
        this.props.getUserInfo(this.props.login)
    };

    componentWillReceiveProps(nextProps, nextContext) {
        let changedProps = {};
        for (let key in nextProps) {
            if (nextProps.key !== this.state.key) {
                changedProps = {...changedProps, key : nextProps.key}
            }
        }
        this.setState({changedProps})
    };

    update = () => {
        this.props.updateUserInfo(this.props.login, this.state);
    };

    render() {
            if (this.props.isLoading) return (
                <View>
                    <Text>Загрузка...</Text>
                </View>
            );
        else return (
            <View>
                <BackLink
                    onPress={() => this.props.navigation.goBack()}
                />
                <Input
                    placeholder='Имя'
                    value={this.state.name}
                    onChangeText={ text => this.setState({name: text})}
                />
                <Input
                    placeholder='Фамилия'
                    value={this.state.surName}
                    onChangeText={ text => this.setState({surName: text})}
                />
                <Button
                    onPress={this.update}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
   isLoading: state.register.isFetching,
   login: state.register.login,
   name: state.register.name,
   surName: state.register.surName
});

const mapDispatchToProps = dispatch => ({
    getUserInfo: (login) => dispatch(getUserInfoAction(login)),
    updateUserInfo: (login, props) => dispatch(updateUserInfoAction(login, props))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalInfoScreen)