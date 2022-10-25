import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import SearchContext from '../../context/SearchContext'

import Header from '../Header'

import SearchPosts from '../SearchPosts'

import './index.css'

const apiConstantUserProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {apiStatus: apiConstantUserProfile.initial, userProfileList: []}

  componentDidMount() {
    this.getUserProfileList()
  }

  getUserProfileList = async () => {
    this.setState({apiStatus: apiConstantUserProfile.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
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
      const fetchedData = {
        userDetails: data.user_details,
      }
      const {userDetails} = fetchedData
      const fetchedArray = {
        followersCount: userDetails.followers_count,
        followingCount: userDetails.following_count,
        id: userDetails.id,
        postsCount: userDetails.posts_count,
        profilePic: userDetails.profile_pic,
        userBio: userDetails.user_bio,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        posts: userDetails.posts,
        stories: userDetails.stories,
      }
      this.setState({userProfileList: fetchedArray})
      this.setState({apiStatus: apiConstantUserProfile.success})
    } else {
      this.setState({apiStatus: apiConstantUserProfile.failure})
    }
  }

  userProfileSuccess = () => {
    const {userProfileList} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userName,
      posts,
      stories,
      userId,
    } = userProfileList
    const postsView = posts.length === 0
    return (
      <div className="myp-success-container">
        <h1 className="myp-head-1-a">{userName}</h1>
        <div className="myp-card-1">
          <img
            src={profilePic}
            alt="user profile"
            className="user-profile-img"
          />
          <div className="inner-myp-card-1-a">
            <p className="myp-para-1">
              {postsCount} <span className="myp-para-2">posts</span>
            </p>
            <p className="myp-para-1">
              {followersCount} <span className="myp-para-2">followers</span>
            </p>
            <p className="myp-para-1">
              {followingCount} <span className="myp-para-2">following</span>
            </p>
          </div>
          <div className="inner-myp-card-1">
            <h1 className="myp-head-1">{userName}</h1>
            <div className="inner-2-myp-card-1">
              <p className="myp-para-1">
                {postsCount} <span className="myp-para-2">posts</span>
              </p>
              <p className="myp-para-1">
                {followersCount} <span className="myp-para-2">followers</span>
              </p>
              <p className="myp-para-1">
                {followingCount} <span className="myp-para-2">following</span>
              </p>
            </div>
            <p className="myp-para-1">{userId}</p>
            <p className="myp-para-3">{userBio}</p>
          </div>
        </div>
        <div className="bio-mobile-user">
          <p className="myp-para-1">{userId}</p>
          <p className="myp-para-3">{userBio}</p>
        </div>
        <div className="myp-card-2">
          <ul className="myp-list-container-1">
            {stories.map(e => (
              <li key={e.id} className="li-myp">
                <img src={e.image} alt="user story" className="story-myp-img" />
              </li>
            ))}
          </ul>
        </div>
        <hr className="hr-myp" />
        <div className="myp-card-3">
          <BsGrid3X3 />
          <h1 className="l-head-myp">Posts</h1>
        </div>
        {postsView ? (
          <div className="no-posts-myp">
            <div className="camera-l">
              <BiCamera className="camera" />
            </div>
            <h1 className="no-posts-head ">No Posts Yet</h1>
          </div>
        ) : (
          <ul className="posts-list-container-myp">
            {posts.map(e => (
              <li key={e.id} className="li-l-myp">
                <img src={e.image} alt="user post" className="post-img-l" />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  userProfileSuccessDark = () => {
    const {userProfileList} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userName,
      posts,
      stories,
      userId,
    } = userProfileList
    const postsView = posts.length === 0
    return (
      <div className="myp-success-container">
        <h1 className="myp-head-1-a white">{userName}</h1>
        <div className="myp-card-1">
          <img
            src={profilePic}
            alt="user profile"
            className="user-profile-img"
          />
          <div className="inner-myp-card-1-a">
            <p className="myp-para-1 white">
              {postsCount} <span className="myp-para-2 wh-2">posts</span>
            </p>
            <p className="myp-para-1 white">
              {followersCount}{' '}
              <span className="myp-para-2 wh-2">followers</span>
            </p>
            <p className="myp-para-1 white">
              {followingCount}{' '}
              <span className="myp-para-2 wh-2">following</span>
            </p>
          </div>
          <div className="inner-myp-card-1">
            <h1 className="myp-head-1 white">{userName}</h1>
            <div className="inner-2-myp-card-1">
              <p className="myp-para-1 white">
                {postsCount} <span className="myp-para-2 wh-2">posts</span>
              </p>
              <p className="myp-para-1 white">
                {followersCount}{' '}
                <span className="myp-para-2 wh-2">followers</span>
              </p>
              <p className="myp-para-1 white">
                {followingCount}{' '}
                <span className="myp-para-2 wh-2">following</span>
              </p>
            </div>
            <p className="myp-para-1 white">{userId}</p>
            <p className="myp-para-3 wh-2">{userBio}</p>
          </div>
        </div>
        <div className="bio-mobile-user">
          <p className="myp-para-1 white">{userId}</p>
          <p className="myp-para-3 wh-2">{userBio}</p>
        </div>
        <div className="myp-card-2">
          <ul className="myp-list-container-1">
            {stories.map(e => (
              <li key={e.id} className="li-myp">
                <img src={e.image} alt="user story" className="story-myp-img" />
              </li>
            ))}
          </ul>
        </div>
        <hr className="hr-myp" />
        <div className="myp-card-3">
          <div className="white">
            <BsGrid3X3 />
          </div>

          <h1 className="l-head-myp white">Posts</h1>
        </div>
        {postsView ? (
          <div className="no-posts-myp">
            <div className="camera-l">
              <BiCamera className="camera" />
            </div>
            <h1 className="no-posts-head ">No Posts Yet</h1>
          </div>
        ) : (
          <ul className="posts-list-container-myp">
            {posts.map(e => (
              <li key={e.id} className="li-l-myp">
                <img src={e.image} alt="user post" className="post-img-l" />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  failureUPButton = () => {
    this.getUserProfileList()
  }

  userProfileFailure = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666350349/alert-triangle_3_rat0j9.png"
        alt="failure view"
        className="triangle"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="nf-button"
        onClick={this.failureUPButton}
      >
        Try again
      </button>
    </div>
  )

  userProfileFailureDark = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666350349/alert-triangle_3_rat0j9.png"
        alt="failure view"
        className="triangle"
      />
      <p className="white">Something went wrong. Please try again</p>
      <button
        type="button"
        className="nf-button"
        onClick={this.failureUPButton}
      >
        Try again
      </button>
    </div>
  )

  userProfileRender = () => (
    <div className="loader-up-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  userProfileRenderDark = () => (
    <div className="loader-up-container">
      <Loader type="TailSpin" color="white" height={50} width={50} />
    </div>
  )

  userProfileAllMethods = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantUserProfile.success:
        return this.userProfileSuccess()
      case apiConstantUserProfile.failure:
        return this.userProfileFailure()
      case apiConstantUserProfile.progress:
        return this.userProfileRender()
      default:
        return null
    }
  }

  userProfileAllMethodsDark = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantUserProfile.success:
        return this.userProfileSuccessDark()
      case apiConstantUserProfile.failure:
        return this.userProfileFailureDark()
      case apiConstantUserProfile.progress:
        return this.userProfileRenderDark()
      default:
        return null
    }
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {isDarkTheme, searchVal, isSearchValue} = value
          const res = searchVal.length !== 0 && isSearchValue
          return (
            <>
              {isDarkTheme ? (
                <>
                  {res ? (
                    <div className="cont-dark-theme">
                      <Header />
                      <SearchPosts inputSearch={searchVal} />
                    </div>
                  ) : (
                    <div className="dark-container">
                      <Header />
                      {this.userProfileAllMethodsDark()}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {res ? (
                    <div>
                      <Header />
                      <SearchPosts inputSearch={searchVal} />
                    </div>
                  ) : (
                    <div>
                      <Header />
                      {this.userProfileAllMethods()}
                    </div>
                  )}
                </>
              )}
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default UserProfile
