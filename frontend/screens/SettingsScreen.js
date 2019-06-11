import React from 'react';
import {ScrollView} from 'react-native';
import { CheckBox, Text, Button } from 'react-native-elements'
import {connect} from 'react-redux';
import {updateSettingsList, getSettingsList} from "../modules/auth/actions/action";


class SettingsScreen extends React.Component {

    state = {
        trainings: true,
        news: true,
        teams: false,
        coaches: true,
        clubs: false,
        shops: false,
        hotels: true,
        travels: false,
        insurance: false,
        medicalServices: false
    };

    componentDidMount() {
        this.props.getSettingsList(this.props.login);
    }

    updateSettingsList = () => {
        this.props.updateSettingsList(this.props.login, {...this.state})
    };

    render() {
        return (
            <ScrollView>
                <CheckBox
                    center
                    title='Тренировки'
                    checked={this.state.trainings}
                />
                <CheckBox
                    center
                    title='Новости спорта'
                    checked={this.state.news}
                />
                <CheckBox
                    center
                    title='Команды'
                    checked={this.state.teams}
                />
                <CheckBox
                    center
                    title='Тренеры'
                    checked={this.state.coaches}
                />
                <CheckBox
                    center
                    title='Клубы/секции'
                    checked={this.state.clubs}
                />
                <CheckBox
                    center
                    title='Магазины'
                    checked={this.state.shops}
                />
                <CheckBox
                    center
                    title='Гостиницы'
                    checked={this.state.hotels}
                />
                <CheckBox
                    center
                    title='Путешествия'
                    checked={this.state.travels}
                />
                <CheckBox
                    center
                    title='Страхование'
                    checked={this.state.insurance}
                />
                <CheckBox
                    center
                    title='Мед. услуги'
                    checked={this.state.medicalServices}
                />
                <Button
                    title='Сохранить'
                    onPress={this.updateSettingsList}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    login: state.register.login
});

const mapDispatchToProps = dispatch => ({
    getSettingsList: (login) => dispatch(getSettingsList(login)),
    updateSettingsList: (login, settingsList) => dispatch(updateSettingsList(login, settingsList))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)