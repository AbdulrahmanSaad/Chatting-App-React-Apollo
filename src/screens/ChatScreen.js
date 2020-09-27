import React, { Component } from 'react';
import {
    ButtonComponent,
    TextInputComponent
} from '../components/Index';
import '../App.css';
import { inject, observer } from "mobx-react";

class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.props.store.getMessages()
    }

    renderItem = (item) => {
        return <h10>aaaaaaa</h10>
    }

    onChange = (message) => {
        this.props.store.setMessage(message);
    }

    onPress = () => {
        this.props.store.sendMessage()
    }

    render() {

        const {
            messages,
            messageText
        } = this.props.store

        return (
            <div>
                <div
                className="ChatList"
                >
                <dl
                >
                    {
                        messages ? messages.map((item) => {
                           return (
                           <dl key={item.id}>{item.message}</dl>
                           )
                        }) : null
                    }
                </dl>
                </div>
                <TextInputComponent
                    onChange={this.onChange}
                    value={messageText}
                    placeholder={'Message'}
                />
                <ButtonComponent
                    title={"Send"}
                    onPress={this.onPress}
                />
            </div>
        )
    }
}

const ChatScreen = inject("store")(observer(ChatWindow));
export { ChatScreen };