import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, SearchBar, ListItem} from "react-native-elements";
import IconEvil from 'react-native-vector-icons/EvilIcons';
import {searchFriendsAction} from "../modules/friends/actions/action";
import {connect} from 'react-redux';

class FriendsScreen extends React.Component {

    state = {
        search: '',
    };

    searchFriends = () => {
        this.props.searchFriends(this.state.search);
    };

    foundedPeople = () => {
        const {foundedPeople} = this.props;
        if (foundedPeople.length > 0) {
            return foundedPeople.map((item, index) => (
                <ListItem
                    key={index}
                    title={item.name}
                    subTitle={item.surName}
                />
            )
            )}
        else {
            return null;
        }
    };

    render() {
        if (this.props.isLoading) return <View><Text>Загрузка...</Text></View>;
        else
        return (
            <View style={styles.container}>
                <Text>найти больше друзей</Text>
                <SearchBar
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
                {this.foundedPeople()}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.friends.isFetching,
    foundedPeople: state.friends.foundedPeople
});

const mapDispatchToProps = dispatch => ({
    searchFriends: (text) => dispatch(searchFriendsAction(text))
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
});