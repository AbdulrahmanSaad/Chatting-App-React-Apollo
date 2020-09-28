import React, { Component } from 'react';
import {
    ButtonComponent,
    TextInputComponent
} from '../components/Index';
import '../App.css';
import { inject, observer } from "mobx-react";
import {
    Query
} from 'react-apollo';
import MessagesQuery from '../Query/MessagesQuery';

class ChatWindow extends Component {

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
            messageText
        } = this.props.store

        return (
            <div>
                <div
                className="ChatList"
                >
                <dl
                ><Query
                query={MessagesQuery}
                >
                    {({data, loading}) => {
                        if(loading) return <h1>LOADING</h1>
                        this.props.store.setData(data.messages)
                        const {
                            messages
                        } = this.props.store
                        return messages.map((item) => {
                            return (
                            <dl key={item._id}>{item.text}</dl>
                            )
                        })
                    }}
                </Query>
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