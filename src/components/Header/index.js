import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import SearchContext from '../../context/SearchContext'

import './index.css'

class Header extends Component {
  state = {mobileView: false, showSearch: false, first: true}

  logoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  threeDots = () => {
    this.setState({mobileView: true})
    this.setState({showSearch: false})
  }

  crossButton = () => {
    this.setState({mobileView: false})
  }

  searchButton = () => {
    this.setState({showSearch: true})
    this.setState({mobileView: false})
  }

  render() {
    const {mobileView, showSearch, first} = this.state

    const firstName = first ? 'first-name' : ''
    return (
      <SearchContext.Consumer>
        {value => {
          const {toggleSearch, searchValMethod, searchVal, toggleEnter} = value
          const searchIcon = () => {
            toggleSearch()
          }

          const enterButton = event => {
            if (event.key === 'Enter') {
              toggleEnter()
            }
          }

          const onChangeValue = event => {
            searchValMethod(event.target.value)
          }
          return (
            <>
              <nav className="header-container">
                <div className="card-1-header">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666241657/Standard_Collection_8_2_wuq96n.png"
                      alt="website logo"
                      className="login-website-header"
                    />
                  </Link>
                  <h1 className="header-head">Insta Share</h1>
                </div>
                <div className="card-2-header">
                  <div className="card-1-header">
                    <input
                      type="search"
                      className="input-header"
                      placeholder="Search Caption"
                      onChange={onChangeValue}
                      onKeyDown={enterButton}
                    />

                    <button
                      type="button"
                      className="search-button"
                      onClick={searchIcon}
                      testid="searchIcon"
                    >
                      <FaSearch className="col" />
                    </button>
                  </div>
                  <ul className="list-header-container">
                    <Link to="/" className="li-item-h">
                      <li>Home</li>
                    </Link>
                    <Link to="/my-profile" className="li-item-h">
                      Profile
                    </Link>
                  </ul>
                  <button
                    type="button"
                    className="head-butt"
                    onClick={this.logoutButton}
                  >
                    Logout
                  </button>
                </div>
                <div className="menu-container">
                  <img
                    src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666438550/menu_5_yh6ay7.png"
                    alt=""
                    className="menu-img"
                    onClick={this.threeDots}
                  />
                </div>
              </nav>

              {mobileView && (
                <ul className="header-mobile-view-container">
                  <Link to="/" className={`li-m ${firstName}`}>
                    <li>Home</li>
                  </Link>
                  <li className="li-m" onClick={this.searchButton}>
                    Search
                  </li>
                  <Link to="/my-profile" className="li-m">
                    Profile
                  </Link>
                  <li>
                    <button
                      type="button"
                      className="head-butt"
                      onClick={this.logoutButton}
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <img
                      src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666450736/Shape_6_ulzxqm.png"
                      alt=""
                      className="cross"
                      onClick={this.crossButton}
                    />
                  </li>
                </ul>
              )}
              {showSearch && (
                <div className="mobile-search">
                  <div className="card-1-header">
                    <input
                      type="search"
                      className="input-header"
                      placeholder="Search Caption"
                      onChange={onChangeValue}
                      onKeyDown={enterButton}
                    />
                    <button
                      type="button"
                      className="search-button"
                      onClick={searchIcon}
                      testid="searchIcon"
                    >
                      <FaSearch className="col" />
                    </button>
                  </div>
                </div>
              )}
              <hr />
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
