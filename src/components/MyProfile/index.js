import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import './index.css'

const apiConstantMyProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {apiStatus: apiConstantMyProfile.initial, myProfileList: {}}

  componentDidMount() {
    this.getMyProfileList()
  }

  getMyProfileList = async () => {
    this.setState({apiStatus: apiConstantMyProfile.progress})
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
      const {profile} = data
      const fetchedData = {
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        id: profile.id,
        postsCount: profile.posts_count,
        profilePic: profile.profile_pic,
        userBio: profile.user_bio,
        userId: profile.user_id,
        userName: profile.user_name,
        posts: profile.posts,
        stories: profile.stories,
      }
      this.setState({myProfileList: fetchedData})
      this.setState({apiStatus: apiConstantMyProfile.success})
    } else {
      this.setState({apiStatus: apiConstantMyProfile.failure})
    }
  }

  renderSuccess = () => {
    const {myProfileList} = this.state
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
    } = myProfileList
    const postsView = posts.length === 0
    return (
      <div className="myp-success-container">
        <div className="myp-card-1">
          <img src={profilePic} alt="my profile" className="myp-img-1" />
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

        <div className="myp-card-2">
          <ul className="myp-list-container-1">
            {stories.map(e => (
              <li key={e.id} className="li-myp">
                <img src={e.image} alt="my story" className="story-myp-img" />
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
                <img src={e.image} alt="my post" className="post-img-l" />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  failureMYPButton = () => {
    this.getMyProfileList()
  }

  renderFailure = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/ddxkcazf7/image/upload/v1666370726/Group_7522_4_iabvky.png"
        alt="failure view"
        className="stories-failure-img"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="nf-button"
        onClick={this.failureMYPButton}
      >
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-myp-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  myProfileMethods = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantMyProfile.success:
        return this.renderSuccess()
      case apiConstantMyProfile.failure:
        return this.renderFailure()
      case apiConstantMyProfile.progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.myProfileMethods()}
      </div>
    )
  }
}

export default MyProfile
