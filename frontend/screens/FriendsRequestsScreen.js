import React from 'react';
import { ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getFriendsInRequestsAction, acceptFriendRequestAction } from '../modules/friends/actions/action';
import LoadingScreen from "../commonComponents/LoadingScreen";

class FriendsRequestsScreen extends React.Component {

  componentDidMount() {
    //TODO не вешать для незалогиненного пользователя
    const willFocusListener = this.props.navigation.addListener('willFocus', () => {
      if (this.props.id) {
        this.props.getFriendsRequests(this.props.id);
      }
    })
  }

  handleAcceptFriendRequest = (id, friendId) => {
    this.props.acceptFriendRequest(id, friendId);
  };

  render() {
    if (this.props.isLoading) {
      return <LoadingScreen/>
    }
    return (
      <ScrollView>
        {
          this.props.friendsRequests.map((request, index) => {
            return (
              <ListItem
                key={index}
                title={request.name}
                subTitle={request.surName}
                rightElement={
                  <Button
                    onPress={() => this.handleAcceptFriendRequest(this.props.id, request.id)}
                  />
                }
              />
            )
          })
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  id: state.register.id,
  isLogged: state.register.isLogged,
  isLoading: state.friends.isFetching,
  friendsRequests: state.friends.friendsInRequests
});

const mapDispatchToProps = dispatch => ({
  getFriendsRequests: (id) => dispatch(getFriendsInRequestsAction(id)),
  acceptFriendRequest: (id, friendId) => dispatch(acceptFriendRequestAction(id, friendId))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRequestsScreen)