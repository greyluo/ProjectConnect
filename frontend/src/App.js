import logo from './logo.svg';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';


function App() {
  return (
    <Auth0Provider
  domain="dev-dn2zbeg6ijoq3lqk.us.auth0.com"
  clientId="Il7nQ3EBk6uBiKPgw3R4QwD19qGle7QX"

  redirectUri={window.location.origin}>
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
    </div>
    </Auth0Provider>

  );
}

export default App;
