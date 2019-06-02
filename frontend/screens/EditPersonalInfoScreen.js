import React from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';

class EditPersonalInfoScreen extends React.Component {
    state = {
        email: '',
        name: ''
    };

    componentDidMount() {

    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

export default connect()(EditPersonalInfoScreen)