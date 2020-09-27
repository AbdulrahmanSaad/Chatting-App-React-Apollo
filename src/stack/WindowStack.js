import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    LoginScreen,
    ChatScreen
} from "../screens/Index";

class WindowStack extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/chat">
                            <ChatScreen />
                        </Route>
                        <Route path="/">
                            <LoginScreen />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export {WindowStack};
