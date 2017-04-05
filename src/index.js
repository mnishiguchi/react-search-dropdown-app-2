import React      from 'react'
import ReactDOM   from 'react-dom'
import AppLayout  from './layouts/AppLayout'
import SearchApp  from './SearchApp'

// Global stylesheets.
require('bulma/css/bulma.css')
require('./index.css')

const Root = () => (
  <AppLayout>
    <SearchApp />
  </AppLayout>
)

// Bootstrap the app.
ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
