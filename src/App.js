import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state={
    fbStatus: null,
    fbAuth: null,
    fbAccounts: null,
  }

  componentDidMount () {
    this.FB = window.FB;
  }

  render() {
    return (
      <div>
        <h2>Facebook login</h2>
        <button
          onClick={this.fbCheckStatus}
        >
          Войти в Fb
         </button>
         <div>Status: {this.state.fbStatus}</div>
         <div>Auth: {JSON.stringify(this.state.fbAuth)}</div>
         {this.state.fbAuth && 
           <div>
             <h3>Accounts</h3>
             <div>{JSON.stringify(this.state.fbAccounts)}</div>
           </div>
         }
      </div>
    )
  }

  fbCheckStatus = () => {
    this.FB.getLoginStatus((response) => {
      this.setState({fbStatus: response.status});
      if (response.status === 'connected') {
        this.setState({fbAuth: response.authResponse});
        this.fbListAccounts();
      } else if (response.status === 'not_authorized') {
        this.fbLogin();
      }
    });
  }

  fbLogin = () => {
    this.FB.login(
      (response) => {
        console.log(response);
        this.setState({fbAuth: response.authResponse})
        this.fbListAccounts();
      },
      {scope: 'public_profile,ads_management'}
    );
  }

  fbListAccounts = () => {
    this.FB.api('me/adaccounts?fields=["account_id","account_status","is_direct_deals_enabled","business{id,name}","name"]', (response) => {
      this.setState({fbAccounts: response.data});
    })
  }
}

export default App;
