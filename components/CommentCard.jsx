import { useEffect, useState } from 'react'
import CommentLikeButton from "./CommentLikeButton"
import { Link } from 'react-router-dom'

const CommentCard = ({comment, handleLikeCommentClick}) => {

    return(
        <li key={comment._id} className='comment-card'>
            <div className='comment-body'>{comment.comment}</div>
            <Link className='comment-publish-date' to={`/comments/${comment._id}`}>{comment.publish_date}</Link>
            <CommentLikeButton comment={comment} handleLikeCommentClick={handleLikeCommentClick}/>
        </li>
    )
}

export default CommentCard