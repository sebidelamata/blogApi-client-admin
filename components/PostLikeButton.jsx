import { useEffect, useState } from 'react'

const PostLikeButton = ({post, handleLikePostClick}) => {

    const [liked, setLiked] = useState(false)

    return(
        <div className='post-likes-container'>
            <button className='likes-button' onClick={() => handleLikePostClick(post._id)}>
                    <i className="fas fa-thumbs-up"></i>
                <div className='like-count'>{post.likes}</div>
            </button>
        </div>
    )
}

export default PostLikeButton