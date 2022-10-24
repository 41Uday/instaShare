import {Component} from 'react'

import './index.css'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FcLike} from 'react-icons/fc'

import {BsHeart} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

class PostItem extends Component {
  constructor(props) {
    super(props)
    const {post} = props
    this.state = {postLikedStatus: false, postLikedCounts: post.likesCount}
  }

  likeCLicked = async () => {
    const {post} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify({like_status: true}),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${post.postId}/like`,
      options,
    )
    console.log(response)
    const data = await response.json()
    console.log(data)
    /* this.setState({postLikedStatus:true}) */
    this.setState(prevState => ({
      postLikedStatus: true,
      postLikedCounts: prevState.postLikedCounts + 1,
    }))
  }

  unlikeCLicked = async () => {
    const {post} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify({like_status: false}),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${post.postId}/like`,
      options,
    )
    console.log(response)
    const data = await response.json()
    console.log(data)

    this.setState(prevState => ({
      postLikedStatus: false,
      postLikedCounts: prevState.postLikedCounts - 1,
    }))
  }

  render() {
    const {postLikedCounts, postLikedStatus} = this.state

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

          <img src={postDetails.imageUrl} alt="post" className="post-img" />
          <div className="pi-card-2">
            {!postLikedStatus ? (
              <button
                type="button"
                className="like"
                onClick={this.likeCLicked}
                testid="likeIcon"
              >
                <div className="comment">
                  <FcLike className="comment-2" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="like"
                onClick={this.unlikeCLicked}
                testid="unLikeIcon"
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
          <p className="likes-count">{postLikedCounts} likes</p>
          <p className="caption">{postDetails.caption}</p>
          <ul className="comments-container">
            {comments.map(e => (
              <li key={e.userId}>
                <div className="com-users">
                  <span className="c-li-i">{e.userName}</span>
                  <p className="c-li-i-2">{e.comment}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="time">{createdAt}</p>
        </li>
      </>
    )
  }
}

export default PostItem
