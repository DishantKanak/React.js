import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [url, setUrl] = useState('http://localhost:3001/posts')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState('{}')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    try {
      const config = {
        method,
        url,
        headers: JSON.parse(headers),
        data: method !== 'GET' && method !== 'DELETE' ? JSON.parse(body) : undefined
      }
      const res = await axios(config)
      setResponse(JSON.stringify(res.data, null, 2))
    } catch (error) {
      setResponse(`Error: ${error.message}\n${error.response ? JSON.stringify(error.response.data, null, 2) : ''}`)
    }
    setLoading(false)
  }

  return (
    <div className="app">
      <h1>API Hunter</h1>
      <div className="form">
        <div className="field">
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
          />
        </div>
        <div className="field">
          <label>Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="field">
          <label>Headers (JSON):</label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Content-Type": "application/json"}'
          />
        </div>
        {(method === 'POST' || method === 'PUT') && (
          <div className="field">
            <label>Body (JSON):</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
            />
          </div>
        )}
        <button onClick={sendRequest} disabled={loading}>
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>
      <div className="response">
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  )
}

export default App
