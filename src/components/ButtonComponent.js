import React, {Component} from 'react';
import '../App.css';

class ButtonComponent extends Component {

    onPress = () => {

        const {
            onPress
        } = this.props;

        if (onPress){
            onPress();
        }
    }

    render (){

        const {
            title
        } = this.props

        return (
            <button
            onClick={this.onPress}
            className="Button"
            >{title ? title : ''}</button>
        )
    }
}

export {ButtonComponent};