import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [dbStatus, setDbStatus] = useState('Checking...');

  // The API URL comes from the Environment Variable (set by Terraform later)
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  const checkBackend = async () => {
    try {
      setDbStatus('Pinging Backend...');
      const response = await fetch(`${apiUrl}/api/health`);
      const data = await response.json();
      setMessage(data.message);
      setDbStatus(`Connected: ${data.database}`);
    } catch (error) {
      setMessage('Error connecting to backend');
      setDbStatus('Connection Failed');
      console.error(error);
    }
  };

  useEffect(() => {
    // Check connection on load
    checkBackend();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Gopal Cloud Project</h1>
        <p>Environment: {process.env.NODE_ENV}</p>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2>System Status</h2>
          <p><strong>Backend API:</strong> {apiUrl}</p>
          <p><strong>Message:</strong> {message}</p>
          <p><strong>Database:</strong> <span style={{color: dbStatus.includes('Failed') ? 'red' : 'green'}}>{dbStatus}</span></p>
          
          <button onClick={checkBackend} style={styles.button}>
            Refresh Status
          </button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', height: '100vh' },
  header: { backgroundColor: '#282c34', color: 'white', padding: '20px', textAlign: 'center' },
  main: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '400px' },
  button: { marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default App;