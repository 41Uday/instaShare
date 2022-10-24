import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import PostItem from '../PostItem'

import './index.css'

const apiConstantSearches = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class SearchPosts extends Component {
  state = {apiStatus: apiConstantSearches.initial, searchesList: []}

  componentDidMount() {
    this.getSearchesList()
  }

  getSearchesList = async () => {
    this.setState({apiStatus: apiConstantSearches.progress})
    const {inputSearch} = this.props
    const url = `https://apis.ccbp.in/insta-share/posts?search=${inputSearch}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {posts} = data
      const fetchedData = posts.map(e => ({
        createdAt: e.created_at,
        likesCount: e.likes_count,
        postId: e.post_id,
        profilePic: e.profile_pic,
        userId: e.user_id,
        userName: e.user_name,
        postDetails: {
          caption: e.post_details.caption,
          imageUrl: e.post_details.image_url,
        },
        comments: e.comments.map(ei => ({
          comment: ei.comment,
          userId: ei.user_id,
          userName: ei.user_name,
        })),
      }))
      this.setState({searchesList: fetchedData})
      this.setState({apiStatus: apiConstantSearches.success})
    } else {
      this.setState({apiStatus: apiConstantSearches.failure})
    }
  }

  searchSuccess = () => {
    const {searchesList} = this.state
    const finalRes = searchesList.length === 0
    return (
      <>
        {finalRes ? (
          <div className="no-searches-cont">
            <img
              src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666512074/Group_7_m9mxef.png"
              alt="search not found"
              className="img-s-n"
            />
            <h1 className="s-hed-2">Search Not Found</h1>
            <p className="l-para-s">Try different keyword or search again</p>
          </div>
        ) : (
          <>
            <h1 className="search-hed">Search Results</h1>
            <div className="post-success">
              <ul className="posts-list-container">
                {searchesList.map(e => (
                  <PostItem key={e.postId} post={e} />
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    )
  }

  searchRender = () => (
    <div className="loader-searches-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  failureSearchButton = () => {
    this.getSearchesList()
  }

  searchFailure = () => (
    <div className="failure-stories-container">
      <img
        src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666370726/Group_7522_4_iabvky.png"
        alt="failure view"
        className="stories-failure-img"
      />
      <p className="h-last">Something went wrong. Please try again</p>
      <button
        type="button"
        className="nf-button"
        onClick={this.failureSearchButton}
      >
        Try again
      </button>
    </div>
  )

  searchMethods = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantSearches.success:
        return this.searchSuccess()
      case apiConstantSearches.failure:
        return this.searchFailure()
      case apiConstantSearches.progress:
        return this.searchRender()
      default:
        return null
    }
  }

  render() {
    return <div>{this.searchMethods()}</div>
  }
}

export default SearchPosts
