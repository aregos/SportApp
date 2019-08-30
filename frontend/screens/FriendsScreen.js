import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, ListItem, Input } from "react-native-elements";
import IconEvil from 'react-native-vector-icons/EvilIcons';
import { Toast } from '../commonComponents/Toast';
import { searchFriendsAction, sendFriendRequestAction, getFriendsInRequestsAction } from "../modules/friends/actions/action";
import { connect } from 'react-redux';

class FriendsScreen extends React.Component {

    state = {
        search: '',
    };

    componentWillMount() {
        if (this.props.id) {
            this.props.getFriendsInRequests(this.props.id);
        }
    }

    handleSearchFriends = () => {
        this.props.searchFriends(this.state.search);
    };

    handleSendFriendRequest = (id, friendId) => {
        this.props.sendFriendRequest(id, friendId);
    };

    foundedPeople = () => {
        const { foundedPeople } = this.props;
        if (foundedPeople.length > 0) {
            return (
                <ScrollView
                    contentContainerStyle={styles.friendsList}
                >
                    {foundedPeople.map((man, index) => (
                        <ListItem
                            key={index}
                            title={man.name}
                            subTitle={man.surName}
                            rightElement={
                                //проверяем, чтобы пользователь был залогинен и не мог добавить сам себя
                                this.props.id && this.props.id !== man.id ?
                                    <Button
                                        title='Добавить'
                                        onPress={() => this.handleSendFriendRequest(this.props.id, man.id)}
                                        disabled={this.props.isLoadingAddFriend}
                                    />
                                    : null
                            }
                        />
                    )
                    )}
                </ScrollView>
            )
        }
        else {
            return null;
        }
    };

    render() {

        if (this.props.isLoading) {
            return (
                <View>
                    <Text>Загрузка...</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.container}>
                        {!!this.props.id && !!this.props.friendsInRequests &&
                            (<Text>У вас {this.props.friendsInRequests.length} заявок в друзья</Text>)
                        }
                        {
                            !!this.props.id && !!this.props.friendsInRequests && this.props.friendsInRequests.length > 0 &&
                            <Button
                                title='Просмотреть'
                                onPress={() => this.props.navigation.navigate('FriendsRequestsScreen')}
                            />
                        }
                        <Text>Найти больше друзей</Text>
                        <Input
                            placeholder='Поиск'
                            onChangeText={text => this.setState({ search: text })}
                            value={this.state.search}
                            containerStyle={styles.inputStyle}
                        />
                        <Button
                            icon={
                                <IconEvil
                                    name='search'
                                    size={15}
                                    color='white'
                                />
                            }
                            buttonStyle={styles.buttonStyle}
                            onPress={this.handleSearchFriends}
                        />
                    </View>
                    {this.foundedPeople()}
                    <Toast
                        visible={!!this.props.message}
                        message={this.props.message}
                    />
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    id: state.register.id,
    isLoading: state.friends.isFetching,
    isLoadingAddFriend: state.friends.isFetchingAddFriend,
    foundedPeople: state.friends.foundedPeople,
    friendsInRequests: state.friends.friendsInRequests,
    message: state.friends.message
});

const mapDispatchToProps = dispatch => ({
    searchFriends: (text) => dispatch(searchFriendsAction(text)),
    sendFriendRequest: (id, friendId) => dispatch(sendFriendRequestAction(id, friendId)),
    getFriendsInRequests: (id) => dispatch(getFriendsInRequestsAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)

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
    },
    inputStyle: {
        width: 400
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
    },
    friendsList: {
        borderWidth: 2
    }
});