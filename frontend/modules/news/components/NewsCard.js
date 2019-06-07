import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Image} from 'react-native-elements';

export default props => {
    const {article} = props;
    return (
        <View style={styles.article}>
            <Image
                style={styles.image}
                source={{uri: article.urlToImage}}
            />
            <Text style={styles.title}>{article.title}</Text>
            <Text>{article.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    article: {
        width: 360,
        fontSize: 15,
        marginTop: 20,
        borderWidth: 5,
    },
    title: {
        fontWeight: 'bold'
    },
    image: {
        width: 350,
        height: 200
    }
});