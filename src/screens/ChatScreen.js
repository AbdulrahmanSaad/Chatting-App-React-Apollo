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
import MessagesSubsription from '../Subscriptions/MessageSubsriptions';

let unsubscribe = null;

class ChatWindow extends Component {

    renderItem = () => {
        const {
            messages
        } = this.props.store

        if (messages) return messages.map((item) => <dl key={item._id}>{item.text}</dl>)
        return "No messages yet"
    }

    onChange = (message) => {
        this.props.store.setMessage(message);
    }

    onPress = (sendMessage) => {
        sendMessage().then(() =>{
            this.props.store.setMessage('')
        })
    }

    render() {

        const {
            messageText,
            setData
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
                            {({ loading, data, subscribeToMore }) => {
                                if (loading) {
                                    return null;
                                }

                                if (!unsubscribe) {
                                    unsubscribe = subscribeToMore({
                                        document: MessagesSubsription,
                                        updateQuery: (prev, { subscriptionData }) => {
                                            if (!subscriptionData.data) return prev;
                                            const { message } = subscriptionData.data;
                                            return {
                                                ...prev,
                                                messages: [...prev.messages, message]
                                            };
                                        }
                                    });
                                }
                                const {
                                    messages
                                } = data
                        
                                setData(messages)
                                return this.renderItem()
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