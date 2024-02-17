import { useEffect, useState } from 'react'

const CommentLikeButton = ({comment, handleLikeCommentClick}) => {

    return(
        <div className='comment-likes-container'>
            <button className='likes-button' onClick={() => handleLikeCommentClick(comment._id)}>
                    <i className="fas fa-thumbs-up"></i>
                <div className='like-count'>{comment.likes}</div>
            </button>
        </div>
    )
}

export default CommentLikeButton