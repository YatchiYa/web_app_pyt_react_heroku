import React, { Component } from 'react'
import axios from 'axios'
import '../styles/chat.scss';
import logo from '../c.gif';

import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';


import 'react-chat-widget/lib/styles.css';

export class chat extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hide : true
        };
      }
      
      
    componentDidMount() {
        addResponseMessage("Welcome, i'm Yatchi, and i'll do my best to help you");
        addResponseMessage("this Beta version can understand only english :) ");
    }
    
    async handleNewUserMessage(newMessage) {

        var myParams = {
            data: newMessage
        }
        await axios.post('/api/query', myParams)
            .then(function(response){
                addResponseMessage(response.data);
            })
            .catch(function(error){
                addResponseMessage("Sorry... don t know the answer yet...");
            })
    }

    render() {
        return (
            <div id="chat_tex">
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    profileAvatar={logo}
                    title="Covid Simulation"
                    subtitle={NamedNodeMap}
                    {...this.props}
                />
            </div>
        )
    }
}

export default chat
