import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

export default props => {
    const {news} = props;
    return (
        <View>
            <Text>{news.title}</Text>
        </View>
    )
}