import React from 'react';
import { View, Text, Button } from 'react-native';

export default class CongratScreen extends React.Component {

    render() {
        return (
            <View>
                <Text>Поздравляем, вы вошли!</Text>
                <Button
                    title='Перейти на главную'
                    onPress={() => this.props.navigation.navigate('HomeScreen')}
                />
            </View>
        )
    }
}