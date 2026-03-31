import { useState, useEffect } from 'react'
import './App.css'
import DataTable from './components/DataTable'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()
      
      const transformedData = users.map((user, index) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address?.city || 'Not Available',
        salary: 45000 + (index * 2500)
      }))
      
      setData(transformedData)
      setError(null)
    } catch (err) {
      setError('Failed to fetch data from API')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'city', label: 'City' },
    {
      key: 'salary',
      label: 'Salary',
      render: (value) => `₹${value.toLocaleString('en-IN')}`
    }
  ]

  return (
    <>
      <div className="app-header">
        <h1>📊 Data Table</h1>
        <p>बेहतरीन डेटा टेबल React में - Professional Data Table in React</p>
      </div>
      
      {loading && <div style={{textAlign: 'center', padding: '20px', fontSize: '18px'}}>Loading data...</div>}
      {error && <div style={{textAlign: 'center', padding: '20px', color: 'red', fontSize: '18px'}}>Error: {error}</div>}
      {!loading && !error && <DataTable data={data} columns={columns} />}
    </>
  )
}

export default App
