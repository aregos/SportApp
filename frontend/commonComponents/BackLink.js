import React from 'react';
import {withNavigation} from 'react-navigation';
import {
    Button
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class BackLink extends React.Component {
    render() {
        return(
            <Button
                icon={
                    <Ionicons
                        size={20}
                        name="md-arrow-round-back"
                        color="black"
                    />
                }
                onPress={() => this.props.navigation.goBack()}
                {...this.props}
            />
        )
    }
}

export default withNavigation(BackLink);