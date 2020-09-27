import React, { Component } from 'react';
import {
    ButtonComponent,
    TextInputComponent
} from '../components/Index';
import '../App.css';
import { inject, observer } from "mobx-react";
import {
    withRouter
} from 'react-router-dom';

class LoginWindow extends Component {

    handleEmail = (email) => {
        this.props.store.setEmail(email)
    }

    handlePassword = (password) => {
        this.props.store.setPassword(password)
    }

    onPress = async() => {

        const {
            push
        } = this.props.history

        await this.props.store.login()
        push('./chat')
    }

    render (){

        const {
            email,
            password
        } = this.props.store

        return (
            <div
            className="Screen"
            >
                <TextInputComponent 
                placeholder={"email"}
                onChange={this.handleEmail}
                value={email}
                />
                <TextInputComponent 
                placeholder={"password"}
                onChange={this.handlePassword}
                value={password}
                />
                <ButtonComponent
                    title={'Login'}
                    onPress={this.onPress}
                />
            </div>
        )
    }
}

const Login = inject("store")(observer(LoginWindow));
const LoginScreen = withRouter(Login);

export { LoginScreen };