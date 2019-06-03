import React from 'react';
import {
    Button
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default (props) => {
    return(
        <Button
            icon={
                <Ionicons
                    size={20}
                    name="md-arrow-round-back"
                    color="black"
                />
            }
            {...props}
        />
    )
}