import React from 'react';
import {ScrollView, View} from 'react-native';
import { CheckBox, Text, Button } from 'react-native-elements'
import {connect} from 'react-redux';
import {updateSettingsList, getSettingsList} from "../modules/auth/actions/action";


class SettingsScreen extends React.Component {

    state = {
        friends: false,
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

    componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.settingsList) return;
        if (!Object.is(nextProps.settingsList, this.state)) {
            this.setState({...nextProps.settingsList})
        }
    }

    updateSettingsList = () => {
        this.props.updateSettingsList(this.props.login, {...this.state})
    };

    render() {
        if (this.props.isLoading) return <View><Text>Загрузка</Text></View>;
        else
        return (
            <ScrollView>
                <Text>Пункты меню</Text>
                <CheckBox
                    center
                    title='Друзья'
                    checked={this.state.friends}
                    onPress={() => this.setState({friends: !this.state.friends})}
                />
                <CheckBox
                    center
                    title='Тренировки'
                    checked={this.state.trainings}
                    onPress={() => this.setState({trainings: !this.state.trainings})}
                />
                <CheckBox
                    center
                    title='Новости спорта'
                    checked={this.state.news}
                    onPress={() => this.setState({news: !this.state.news})}
                />
                <CheckBox
                    center
                    title='Команды'
                    checked={this.state.teams}
                    onPress={() => this.setState({teams: !this.state.teams})}
                />
                <CheckBox
                    center
                    title='Тренеры'
                    checked={this.state.coaches}
                    onPress={() => this.setState({coaches: !this.state.coaches})}
                />
                <CheckBox
                    center
                    title='Клубы/секции'
                    checked={this.state.clubs}
                    onPress={() => this.setState({clubs: !this.state.clubs})}
                />
                <CheckBox
                    center
                    title='Магазины'
                    checked={this.state.shops}
                    onPress={() => this.setState({shops: !this.state.shops})}
                />
                <CheckBox
                    center
                    title='Гостиницы'
                    checked={this.state.hotels}
                    onPress={() => this.setState({hotels: !this.state.hotels})}
                />
                <CheckBox
                    center
                    title='Путешествия'
                    checked={this.state.travels}
                    onPress={() => this.setState({travels: !this.state.travels})}
                />
                <CheckBox
                    center
                    title='Страхование'
                    checked={this.state.insurance}
                    onPress={() => this.setState({insurance: !this.state.insurance})}
                />
                <CheckBox
                    center
                    title='Мед. услуги'
                    checked={this.state.medicalServices}
                    onPress={() => this.setState({medicalServices: !this.state.medicalServices})}
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
    login: state.register.login,
    isLoading: state.register.isFetching,
    settingsList: state.register.settingsList,
    isLogged: state.register.isLogged
});

const mapDispatchToProps = dispatch => ({
    getSettingsList: (login) => dispatch(getSettingsList(login)),
    updateSettingsList: (login, settingsList) => dispatch(updateSettingsList(login, settingsList))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)