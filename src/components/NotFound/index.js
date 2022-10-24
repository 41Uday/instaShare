import './index.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="nf-container">
    <img
      src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666245105/erroring_1_3_scnjtz.png"
      alt="page not found"
      className="nf-img"
    />
    <h1 className="nf-head">Page Not Found</h1>
    <p className="nf-para">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="nf-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
