import React, { Component } from 'react';
import {
    ButtonComponent,
    TextInputComponent
} from '../components/Index';
import '../App.css';
import { inject, observer } from "mobx-react";
import {
    Query,
    Mutation
} from 'react-apollo';
import MessagesQuery from '../Query/MessagesQuery';
import MessageMutation from '../Mutations/MessageMutation';

class ChatWindow extends Component {

    renderItem = (messages) => messages.map((item) => <dl key={item._id}>{item.text}</dl>)

    onChange = (message) => {
        this.props.store.setMessage(message);
    }

    onPress = (sendMessage) => {
        sendMessage().then(res => {
            console.log(res)
        })
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
                    <dl>
                        <Query
                            query={MessagesQuery}
                        >
                            {({ data, loading }) => {
                                if (loading) return <h1>LOADING</h1>
                                this.props.store.setData(data.messages)
                                const {
                                    messages
                                } = this.props.store
                                return this.renderItem(messages)
                            }}
                        </Query>
                    </dl>
                </div>
                <TextInputComponent
                    onChange={this.onChange}
                    value={messageText}
                    placeholder={'Message'}
                />
                <Mutation
                    variables={{
                        text: messageText
                    }}
                    mutation={MessageMutation}
                >
                    {
                        mutate => <ButtonComponent
                            title={"Send"}
                            onPress={() => this.onPress(mutate)}
                        />
                    }
                </Mutation>
            </div>
        )
    }
}

const ChatScreen = inject("store")(observer(ChatWindow));
export { ChatScreen };