import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'

import NotFound from './components/NotFound'

import Home from './components/Home'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import ProtectedRoute from './components/ProtectedRoute'

import SearchContext from './context/SearchContext'

import './App.css'

class App extends Component {
  state = {isSearchValue: false, searchVal: ''}

  toggleSearch = () => {
    this.setState(prevState => ({isSearchValue: !prevState.isSearchValue}))
  }

  toggleEnter = () => {
    this.setState(prevState => ({isSearchValue: !prevState.isSearchValue}))
  }

  searchValMethod = val => {
    this.setState({searchVal: val})
  }

  render() {
    const {isSearchValue, searchVal} = this.state
    return (
      <SearchContext.Provider
        value={{
          isSearchValue,
          searchVal,
          toggleSearch: this.toggleSearch,
          searchValMethod: this.searchValMethod,
          toggleEnter: this.toggleEnter,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
