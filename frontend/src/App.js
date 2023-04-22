import logo from './logo.svg';
import './App.css';
import LoginButton from './LoginButton';
import LogoutButton from './logoutButton';
import Profile from './Profile';


function App() {
  return (
    <div className="App">
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        <Profile></Profile>
    </div>

  );
}

export default App;
