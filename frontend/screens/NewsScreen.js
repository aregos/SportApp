import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchNews} from "../modules/news/actions/action";
import NewsList from '../modules/news/components/NewsList';

class NewScreen extends React.Component {

    componentDidMount() {
        this.props.fetch();
    }

    render() {
        if (this.props.isLoading) return (
        <View>
            <Text>Загрузка...</Text>
        </View>
        );
        else
        return (
            <View>
                <Button
                    title="Обновить"
                    onPress={this.props.fetch}
                />
                <NewsList news = {this.props.news}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.news.isFetching,
    news: state.news.news
});

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetchNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewScreen)