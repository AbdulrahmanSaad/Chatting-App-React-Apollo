import React, {Component} from 'react';
 
class TextInputComponent extends Component {

    onChange = (event) => {

        let value = event.target.value

        const {
            onChange
        } = this.props;

        if (onChange){
           onChange(value);
        }
    }

    render(){
        
        const {
            placeholder,
            value
        } = this.props

        return (
            <input
            placeholder={placeholder}
            value={value ? value : ''}
            onChange={this.onChange}
            />
        )
    }
}

export {TextInputComponent};