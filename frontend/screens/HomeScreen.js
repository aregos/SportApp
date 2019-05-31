import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  isLoggedScreen = () => {
    return(
    <View>
      <Text>Бла бла бла</Text>
    </View>
    )
  };

  render() {

    if (this.props.isLogged) return this.isLoggedScreen();
    else
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Button
              title="Вход"
              onPress={() => this.props.navigation.navigate('LoginScreen')}
            />
            <Button
              title="Регистрация"
              onPress={() => this.props.navigation.navigate('RegisterScreen')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.register.isLogged
});

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    margin: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
});
