import {Component} from 'react'

import './index.css'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FcLike} from 'react-icons/fc'

import {BsHeart} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import SearchContext from '../../context/SearchContext'

class PostItem extends Component {
  state = {isLiked: false, likeStatus: true, count: 0}

  componentDidMount() {
    this.getLikeApi()
  }

  getLikeApi = async () => {
    const {likeStatus} = this.state
    const {post} = this.props
    const {postId} = post
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likeDetails = {like_status: likeStatus}
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likeDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  likeButton = () => {
    this.setState({isLiked: false})
    this.setState({likeStatus: false}, this.getLikeApi)
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  unLikeButton = () => {
    this.setState({isLiked: true})
    this.setState({likeStatus: true}, this.getLikeApi)
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    const {isLiked, count} = this.state
    const {post} = this.props
    const {
      createdAt,
      likesCount,
      profilePic,
      userName,
      postDetails,
      comments,
      userId,
    } = post
    return (
      <SearchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              {isDarkTheme ? (
                <>
                  <li className="post-list-item">
                    <div className="pi-card-1">
                      <img
                        src={profilePic}
                        alt="post author profile"
                        className="pi-profile-img"
                      />
                      <Link to={`users/${userId}`} className="l-pii-l">
                        <p className="pi-para-1 wh">{userName}</p>
                      </Link>
                    </div>
                    <img
                      src={postDetails.imageUrl}
                      alt="post"
                      className="post-img"
                    />
                    <div className="pi-card-2">
                      {isLiked ? (
                        <button
                          type="button"
                          className="like"
                          onClick={this.likeButton}
                        >
                          <div className="comment">
                            <FcLike className="comment-2" />
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="like"
                          onClick={this.unLikeButton}
                        >
                          <div className="comment wh">
                            <BsHeart className="comment-2" />
                          </div>
                        </button>
                      )}

                      <div className="comment wh">
                        {' '}
                        <FaRegComment />
                      </div>
                      <div className="comment wh">
                        {' '}
                        <BiShareAlt />
                      </div>
                    </div>
                    <p className="likes-count wh">{likesCount + count} likes</p>
                    <p className="caption wh">{postDetails.caption}</p>
                    <ul className="comments-container">
                      {comments.map(e => (
                        <li key={e.userId}>
                          <div className="com-users">
                            <p className="c-li-i wh">{e.userName}</p>
                            <p className="c-li-i-2 wh-2">{e.comment}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="time">{createdAt}</p>
                  </li>
                </>
              ) : (
                <>
                  <li className="post-list-item">
                    <div className="pi-card-1">
                      <img
                        src={profilePic}
                        alt="post author profile"
                        className="pi-profile-img"
                      />
                      <Link to={`users/${userId}`} className="l-pii-l">
                        <p className="pi-para-1">{userName}</p>
                      </Link>
                    </div>

                    <img
                      src={postDetails.imageUrl}
                      alt="post"
                      className="post-img"
                    />
                    <div className="pi-card-2">
                      {isLiked ? (
                        <button
                          type="button"
                          className="like"
                          onClick={this.likeButton}
                        >
                          <div className="comment">
                            <FcLike className="comment-2" />
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="like"
                          onClick={this.unLikeButton}
                        >
                          <div className="comment">
                            <BsHeart className="comment-2" />
                          </div>
                        </button>
                      )}

                      <div className="comment">
                        {' '}
                        <FaRegComment />
                      </div>
                      <div className="comment">
                        {' '}
                        <BiShareAlt />
                      </div>
                    </div>
                    <p className="likes-count">{likesCount + count} likes</p>
                    <p className="caption">{postDetails.caption}</p>
                    <ul className="comments-container">
                      {comments.map(e => (
                        <li key={e.userId}>
                          <div className="com-users">
                            <p className="c-li-i">{e.userName}</p>
                            <p className="c-li-i-2">{e.comment}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="time">{createdAt}</p>
                  </li>
                </>
              )}
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default PostItem
