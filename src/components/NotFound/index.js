import './index.css'

import {Link} from 'react-router-dom'

import SearchContext from '../../context/SearchContext'

const NotFound = () => (
  <SearchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      console.log(isDarkTheme)
      return (
        <>
          {isDarkTheme ? (
            <div className="nf-cont bg">
              <img
                src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666245105/erroring_1_3_scnjtz.png"
                alt="page not found"
                className="nf-img"
              />
              <h1 className="nf-head wh-f">Page Not Found</h1>
              <p className="nf-para wh-f">
                we are sorry, the page you requested could not be found. Please
                go back to the homepage.
              </p>
              <Link to="/">
                <button type="button" className="nf-button wh-f">
                  Home Page
                </button>
              </Link>
            </div>
          ) : (
            <div className="nf-container">
              <img
                src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666245105/erroring_1_3_scnjtz.png"
                alt="page not found"
                className="nf-img"
              />
              <h1 className="nf-head">Page Not Found</h1>
              <p className="nf-para">
                we are sorry, the page you requested could not be found. Please
                go back to the homepage.
              </p>
              <Link to="/">
                <button type="button" className="nf-button">
                  Home Page
                </button>
              </Link>
            </div>
          )}
        </>
      )
    }}
  </SearchContext.Consumer>
)

export default NotFound
