import { decorate, observable, action } from "mobx";
import axios from 'axios';

class UserStore {

    email = ''
    password = ''
    messages = null
    messageText = ''
    token = ''

    setEmail = (data) => {
        this.email = data
    }

    setPassword = (data) => {
        this.password = data
    }

    setToken = (value) => {
        this.token = value
    }

    setData = (data) => {
        this.messages = data
    }

    getMessages = () => {
        axios.get('http://127.0.0.1:8000/api/fetchMessages', {
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).then((response) => { this.setData(response.data) })
    }

    setMessage = (data) => {
        this.messageText = data
    }

    sendMessage = () => {
        axios({
            method: 'Post',
            url: 'http://127.0.0.1:8000/api/sendMessages',
            data: {
                message: this.messageText
            },
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        })
    }
}

decorate(UserStore, {
    email: observable,
    password: observable,
    messages: observable,
    setEmail: action,
    setPassword: action,
    login: action,
    getMessages: action,
    setData: action,
    messageText: observable,
    sendMessage: action
})

export default new UserStore()