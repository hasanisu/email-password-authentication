import './App.css';
import {getAuth} from 'firebase/auth'
import app from './firebase/firebase.init'
import RegisterReactBootstrap from './components/RegisterReactBootstrap';

const auth = getAuth(app);

function App() {

  const handleRegister=(event)=>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
  }

const handleEmailBlur =(e)=>{
  console.log(e.target.value)
}

const handlePasswordBlur=(e)=>{
  console.log(e.target.value)
}
  return (
    <div className="">
      <RegisterReactBootstrap></RegisterReactBootstrap>
    </div>
  );
}

export default App;
