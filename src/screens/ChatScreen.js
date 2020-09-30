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
import MessageSubsriptionsComponent from '../Subscriptions/MessageSubsriptionsComponent';
import { gql } from "apollo-boost";

const newMessage = gql`
  subscription {
    message {
        _id
        text
    }
  }
`;

let unsubscribe = null;

class ChatWindow extends Component {

    renderItem = (data) => {
        const {
            setData
        } = this.props.store

        setData(data)
        return data.map((item) => <dl key={item._id}>{item.text}</dl>)
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
                            {({ loading, data, subscribeToMore }) => {
                                if (loading) {
                                    return null;
                                }

                                if (!unsubscribe) {
                                    unsubscribe = subscribeToMore({
                                        document: newMessage,
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
                <MessageSubsriptionsComponent />
            </div>
        )
    }
}

const ChatScreen = inject("store")(observer(ChatWindow));
export { ChatScreen };