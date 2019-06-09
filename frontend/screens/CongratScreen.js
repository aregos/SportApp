import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class CongratScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Поздравляем, вы вошли!</Text>
                <Button
                    buttonStyle={styles.buttonStyle}
                    title='Перейти на главную'
                    onPress={() => this.props.navigation.navigate('HomeScreen')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        marginTop: 20
    },
    buttonStyle: {
        marginTop: 20
    }
});