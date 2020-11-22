import { decorate, observable, action } from "mobx";

class UserStore {

    email = ''
    password = ''
    messages = null
    messageText = ''

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

    setMessage = (data) => {
        this.messageText = data
    }
}

decorate(UserStore, {
    email: observable,
    password: observable,
    messages: observable,
    setEmail: action,
    setPassword: action,
    setData: action,
    messageText: observable,
    sendMessage: action
})

export default new UserStore()