import React from 'react';
import {ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import NewsCard from './NewsCard';

export default props => {
    const {news} = props;
    return (
        <ScrollView>
            <Card title='Новости'>
            {
                news.map((news, index) => {
                    return (
                    <NewsCard news={news} key = {index}/>
                    )
                })
            }
            </Card>
        </ScrollView>
    )
}