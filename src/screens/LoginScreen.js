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
import LoginMutation from '../Mutations/LoginMutation';
import {
    Mutation
} from 'react-apollo';

class LoginWindow extends Component {

    handleEmail = (email) => {
        this.props.store.setEmail(email)
    }

    handlePassword = (password) => {
        this.props.store.setPassword(password)
    }

    onPress = async(getResult) => {

        const {
            push
        } = this.props.history
        
        await getResult().then(res => {
            this.props.store.setToken(res.data.login.token)
        })
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
                 <Mutation
                variables={{
                    email,
                    password
                }}
                mutation={LoginMutation}
            >
                {mutate => {
                    return (
                        <ButtonComponent
                            title={'Login'}
                            onPress={() => this.onPress(mutate)}
                        />
                    )
                }}
            </Mutation>
            </div>
        )
    }
}

const Login = inject("store")(observer(LoginWindow));
const LoginScreen = withRouter(Login);

export { LoginScreen };