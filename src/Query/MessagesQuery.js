import { gql } from "apollo-boost";

const MessagesQuery = gql`
{
    messages{
    _id
    text
    }
}
`

export default MessagesQuery; 