import React from 'react';
import {View} from 'react-native';
import {Button, Text, Icon} from 'react-native-elements';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {fetchNews} from "../modules/news/actions/action";
import NewsList from '../modules/news/components/NewsList';
import IconAnt from "react-native-vector-icons/AntDesign";

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
                    icon={
                        <IconAwesome
                            name="refresh"
                            size={15}
                            color="white"
                        />
                    }
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