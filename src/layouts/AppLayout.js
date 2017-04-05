import React      from 'react'

const Header = () => {
  return (
    <div className="App-header">
      <h1 className="title" style={{ color: '#ddd', fontSize: '1rem' }}>
        <span>
          React Search Dropdown App
        </span>
      </h1>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="contact-info">
        Masatoshi Nishiguchi
        {' '} &middot; {' '}
        <a href="http://www.mnishiguchi.com/">
          mnishiguchi.com
        </a>
      </div>
    </footer>
  )
}

// The root node of this react app.
const App = (props) => {
  return (
    <div className="App">
      <Header />

      <main>
        {props.children}
      </main>

      <Footer />
    </div>
  )
}

export default App
