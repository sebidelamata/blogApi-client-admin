import { useState, useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import CommentLikeButton from './CommentLikeButton'
import Navbar from './Navbar'

const CommentDetail = () => {
    const [comment, setComment] = useState(null)
    const [commentLoading, setCommentLoading] = useState(true)
    const [commentError, setCommentError] = useState(false)
    const { id } = useParams();
    const [likedState, setLikedState] = useState(false)

    const handleLikeCommentClick = async (commentID) => {
        if(likedState === false){
            const url = `http://localhost:3000/comments/${commentID}/like`

            try{
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Accept': '*/*',
                    },
                });

                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setLikedState(true)
                return
            }catch(error){
                console.log(error.message)
            }
        } else {
            const url = `http://localhost:3000/comments/${commentID}/unlike`

            try{
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Accept': '*/*',
                    },
                });

                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setLikedState(false)
                return
            }catch(error){
                console.log(error.message)
            }
        }
    }

    const fetchComment =async (commentId) => {
        const url = `http://localhost:3000/comments/${commentId}`
        console.log(url)

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Accept': '*/*',
                },
              });

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setComment(data);
        }catch(error){
            setCommentError(error.message)
        }finally{
            setCommentLoading(false)
        }
    }
    useEffect(() => {
        fetchComment(id)
        },
        [id, likedState]
    )

    if(commentError !== false){
        return (
            <>
                <Navbar></Navbar>
                <h1>A Network Error Has Occured</h1>
            </>
        )
    }

    if(commentLoading !== false){
        return (
            <>
                <Navbar></Navbar>
                <h1>Loading...</h1>
            </>
        )
    }

    return(
        <div className='comment-detail'>
            <Navbar></Navbar>
            <div className='comment-body'>{comment.comment}</div>
            <div className='comment-publish-date' to={`/comments/${comment._id}`}>{comment.publish_date}</div>
            <CommentLikeButton comment={comment} handleLikeCommentClick={handleLikeCommentClick}/>
        </div>
    )
}

export default CommentDetail