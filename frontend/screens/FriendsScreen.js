import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button, SearchBar, ListItem, Input} from "react-native-elements";
import IconEvil from 'react-native-vector-icons/EvilIcons';
import {Toast} from '../commonComponents/Toast';
import {searchFriendsAction, addFriendAction} from "../modules/friends/actions/action";
import {connect} from 'react-redux';

class FriendsScreen extends React.Component {

    state = {
        search: '',
    };

    searchFriends = () => {
        this.props.searchFriends(this.state.search);
    };

    addFriend = (id, friendId) => {
        this.props.addFriend(id, friendId);
    };

    foundedPeople = () => {
        const {foundedPeople} = this.props;
        if (foundedPeople.length > 0) {
            return (
                <ScrollView
                    contentContainerStyle={styles.friendsList}
                >
                    {foundedPeople.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.name}
                            subTitle={item.surName}
                            rightElement={
                                //проверяем, чтобы пользователь был залогинен и не мог добавить сам себя
                                this.props.id && this.props.id !== item.id ?
                                <Button
                                    title='Добавить'
                                    onPress={() => this.props.addFriend(this.props.id, item.id)}
                                    disabled={this.props.isLoadingAddFriend}
                                />
                                : null
                            }
                        />
                    )
                )}
                </ScrollView>
            )}
        else {
            return null;
        }
    };

    render() {

        if (this.props.isLoading) return <View><Text>Загрузка...</Text></View>;
        else
        return (
            <View>
            <View style={styles.container}>
                <Text>найти больше друзей</Text>
                <Input
                    placeholder='Поиск'
                    onChangeText={text => this.setState({search: text})}
                    value={this.state.search}
                    containerStyle={{width: 400}}
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
                    onPress={this.searchFriends}
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

const mapStateToProps = state => ({
    id: state.register.id,
    isLoading: state.friends.isFetching,
    isLoadingAddFriend: state.friends.isFetchingAddFriend,
    foundedPeople: state.friends.foundedPeople,
    message: state.friends.message
});

const mapDispatchToProps = dispatch => ({
    searchFriends: (text) => dispatch(searchFriendsAction(text)),
    addFriend: (id, friendId) => dispatch(addFriendAction(id, friendId))
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
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    friendsList: {
        borderWidth: 2
    }
});