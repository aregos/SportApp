import React from 'react';
import {View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import {getUserInfoAction, updateUserInfoAction} from '../modules/auth/actions/action';
import {
    Button,
    ButtonGroup,
    Input,
    Text
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import BackLink from '../commonComponents/BackLink';

class EditPersonalInfoScreen extends React.Component {
    state = {
        name: '',
        surName: '',
        birthDate: '01-01-1990',
        gender: null
    };

    componentDidMount() {
        this.props.getUserInfo(this.props.login)
    };

    componentWillReceiveProps(nextProps, nextContext) {
        let changedProps = {};
        for (let key in nextProps) {
            if (this.state.hasOwnProperty(key) && nextProps[key] !== this.state[key]) {
                 changedProps[key] = nextProps[key];
            }
        }
        this.setState({...changedProps})
    };

    update = () => {
        const updatedInfo = {...this.state};
        this.props.updateUserInfo(this.props.login, updatedInfo);
    };

    updateGender = (gender) => {
        this.setState({gender});
    };

    render() {

        const genderButtons = ['Мужской', 'Женский'];

            if (this.props.isLoading) return (
                <View>
                    <Text>Загрузка...</Text>
                </View>
            );
        else return (
            <View>
                <BackLink/>
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
                <ButtonGroup
                    buttons={genderButtons}
                    onPress={this.updateGender}
                    selectedIndex={this.state.gender}
                />
                <DatePicker
                    style={{width: 200}}
                    date={this.state.birthDate}
                    mode="date"
                    placeholder="Выбрать дату"
                    format="DD-MM-YYYY"
                    minDate="01-01-1950"
                    maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({birthDate: date})}}
                />
                <Button
                    title='Изменить'
                    onPress={this.update}
                />
                <Text>Также вы можете настроить пункты, показываемые в боковом меню</Text>
                <Button
                    buttonStyle = {styles.buttonStyle}
                    onPress = {() => this.props.navigation.navigate('SettingsScreen')}
                    title='Настроить'
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.register.isFetching,
    login: state.register.login,
    name: state.register.name,
    surName: state.register.surName,
    birthDate: state.register.birthDate,
    gender: state.register.gender
});

const mapDispatchToProps = dispatch => ({
    getUserInfo: (login) => dispatch(getUserInfoAction(login)),
    updateUserInfo: (login, props) => dispatch(updateUserInfoAction(login, props))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalInfoScreen)

const styles = StyleSheet.create({
    buttonStyle: {
        marginVertical: 10,
        padding: 20,
        width: 300,
        height: 50,
        backgroundColor: '#50b593',
        borderWidth: 1,
        borderColor: 'white',
        opacity: 0.8
    }
});