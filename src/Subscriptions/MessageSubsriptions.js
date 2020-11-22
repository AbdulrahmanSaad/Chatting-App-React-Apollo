import { gql } from "apollo-boost";

const MessagesSubscription = gql`
  subscription {
    message {
        _id
        text
    }
  }
`;

export default MessagesSubscription;