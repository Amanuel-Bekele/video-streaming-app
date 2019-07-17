import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions'

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '375365236532-i79i5irsqq7tuq1ggkegftgfijikrjpf.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn)
            this.props.signIn(this.auth.currentUser.get().getId());
        else
            this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null)
            return null;
        if (this.props.isSignedIn)
            return (
                <button onClick={this.onSignOutClick}
                    className="ui red google button">
                    <i className="google icon" />
                    SIgn Out
                </button>
            )
        else
            return (
                <button onClick={this.onSignInClick}
                    className="ui red google button">
                    <i className="google icon" />
                    SIgn In with Google
                </button>
            )
    };

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    };
}

const mapStateToProps = ({ auth }) => {
    return { isSignedIn: auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);