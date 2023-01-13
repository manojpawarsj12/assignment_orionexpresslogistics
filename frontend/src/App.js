import logo from './logo.svg';
import './App.css';
import { useState } from "react"
import axios from "axios"
function App() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [file, setFile] = useState([])
  const [res, setres] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (file && email && password) {
      const formdata = new FormData()
      formdata.append('image', file)
      formdata.append('email', email)
      formdata.append('password', password)
      const response = await axios.post('http://localhost:3001/signup', formdata)
      console.log(response)
      setres(response)
    }

  }
  return (

    <div>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} ></input>
        <input type="password" placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} ></input>
        <input type="file" placeholder='Upload Profile Picture' accept='image/jpeg,image/png' onChange={e => setFile(e.target.files[0])}></input>
        <button type='submit'>signup</button>
      </form>
      {res ? <h1>signup success</h1> : ''}
    </div>
  );
}

export default App;
