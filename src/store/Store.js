import { decorate, observable, action } from "mobx";
import axios from 'axios';

class UserStore {

    email = ''
    password = ''
    messages = null
    messageText = ''
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDYwMDA0ZDk1MGEwOWQ5ZTE3NDBiMWQzZDUyNDhiYzE4ZGRhMGZlZDQ5NWNhNGRmYTQwNGY1MmY3MDhjZGY0M2Y1MjgxZGIxNDU1MzQwMjUiLCJpYXQiOjE1OTMwMTEzMjcsIm5iZiI6MTU5MzAxMTMyNywiZXhwIjoxNjI0NTQ3MzI3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ZuslrK5mR-fnPueAJTqmG1igWyoBA2DmKqntT0Lpf6qVSqPzq3vinD1DJMnGL_OXIqz4NYbJ_bhSLN6E7hCA94w8Ss-dAvTAzD1ODSgvFamEX1uaE-AiktqHLmTSQToAdMmnG3u1wgIAdsC1Fv6PxObalVlk4Ss9nVnapnlwuvqjcbtqJgDsJj_SGv0h41tAjCRF0qlkRjwshkPROFHZtkofQtDD6gOG9fcGPwuuOBnMSs1Pryjqh_5YvXcYjWl-oRD6OtZmwB7_GycuteB1nspSz6jyHcJgGqqfZU2A1YilTyUxvqwtvY8xnozV944THECng6RMFLM7ItLIZYH67iIp7P0CiO8T5GaQW9h4SSMLM5NH3OF5Wn9pUcb8DXxg5pW17TLeDi_y4MoWcN4PurhB6XazB7KJ8GrAuOfThrnzr_oBDFbHdqEd0sq9UOTwKyGCZUDOrIx5vOBvClcUWm4fOfpxZ5ynH034kHdUcOyScbo3QsS8N6DzETylRnYgNkxCkRq1YcGTJDmc-C_hadfBhw1MuDo1NsjnF4ITbdkQjKhAbuvHSU9hQdT69uvUoNHhehveFVVSLiDvk7fzKWI8-HlG4-Q9_Q1wxRzy9ryrwHfHjr3EDgwNF6SATwnJHKffVaUYe_m7nD2RWbhcKRTx5ZN_lO8GdykSh23RBAU'

    setEmail = (data) => {
        this.email = data
    }

    setPassword = (data) => {
        this.password = data
    }

    login = () => {
        axios.post('http://127.0.0.1:8000/api/login',{
            email: this.email,
            password: this.password
        }).then((response) => {this.setToken(response.data)})
    }

    setToken = async (value) => {
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