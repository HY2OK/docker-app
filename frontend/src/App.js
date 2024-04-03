import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import logo from './logo.svg'
function App() {
  const [lists, setLists] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    axios.get('/api/values').then((response) => {
      setLists(response.data)
    })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    axios.post('/api/value', { value: value }).then((response) => {
      if (response.data.success) {
        setLists([...lists, response.data])
        setValue('')
      } else {
        alert('값을 DB에 넣는데 실패했습니다.')
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="container">
          {lists && lists.map((list, index) => <li key={index}>{list.value}</li>)}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  )
}

export default App
