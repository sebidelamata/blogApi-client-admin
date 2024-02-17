import { useState, useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import PostLikeButton from './PostLikeButton'
import Navbar from './Navbar'
import CommentCard from './CommentCard'

const CommentDetail = () => {
    const [post, setPost] = useState(null)
    const [postLoading, setPostLoading] = useState(true)
    const [postError, setPostError] = useState(false)
    const [postComments, setPostComments] = useState(null)
    const [postCommentsLoading, setPostCommentsLoading] = useState(true)
    const [postCommentsError, setPostCommentsError] = useState(false)
    const { id } = useParams();
    const [likedState, setLikedState] = useState(false)
    const [commentLikedState, SetCommentLikedState] = useState({})
    const [commentAdded, setCommentAdded] = useState(false)

    const handleLikePostClick = async (postID) => {
        if(likedState === false){
            const url = `http://localhost:3000/posts/${postID}/like`

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
            const url = `http://localhost:3000/posts/${postID}/unlike`

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

    const fetchPost =async (postID) => {
        const url = `http://localhost:3000/posts/${postID}`
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
            setPost(data);
        }catch(error){
            setPostError(error.message)
        }finally{
            setPostLoading(false)
        }
    }

    const fetchAllComments =async (postID) => {
        const url = 'http://localhost:3000/comments/all_comments'

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
            const filteredData = data.filter((data) => data.post_id === postID)
            console.log(filteredData)
            setPostComments(filteredData);
        }catch(error){
            setPostCommentsError(error.message)
        }finally{
            setPostCommentsLoading(false)
        }
    }

    const handleLikeCommentClick = async (commentID) => {
        if(commentLikedState[commentID] === undefined || commentLikedState[commentID] === false){
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
                SetCommentLikedState({...commentLikedState, [commentID]: true})
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
                SetCommentLikedState({...commentLikedState, [commentID]: false})
                return
            }catch(error){
                console.log(error.message)
            }
        }
    }

    const handleAddCommentClick = async (event) => {
        event.preventDefault();
        const post_id = event.target.post_id.value;
        const comment = event.target.comment.value;
        const commentData = {
            comment: comment,
            post_id: post_id
        }
        console.log(commentData)
        const url = `http://localhost:3000/comments/create`

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            setCommentAdded(!commentAdded)
            return
        }catch(error){
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchPost(id)
        },
        [id, likedState]
    )

    useEffect(() => {
        fetchAllComments(id)
    }, [id, commentLikedState, commentAdded]
    )

    if(postError !== false || postCommentsError !== false){
        return (
            <>
                <Navbar></Navbar>
                <h1>A Network Error Has Occured</h1>
            </>
        )
    }

    if(postLoading !== false || postCommentsLoading !== false){
        return (
            <>
                <Navbar></Navbar>
                <h1>Loading...</h1>
            </>
        )
    }
    return(
        <div className='post-detail'>
            <Navbar></Navbar>
            <div className='post-body'>{post.post}</div>
            <div className='post-publish-date' to={`/posts/${post._id}`}>{post.publish_date}</div>
            <PostLikeButton post={post} handleLikePostClick={handleLikePostClick}/>
            {
                postComments.length > 0 &&
                <ul className='comments-list'>
                    {
                        postComments.map((comment) => {
                            return(
                                <CommentCard key={comment._id} comment={comment} handleLikeCommentClick={handleLikeCommentClick}/>
                            )
                        })
                    }
                </ul>
            }
            <form method='POST' className='new-comment-form' onSubmit={(e) => handleAddCommentClick(e)}>
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" id="new-comment-comment" cols="30" rows="10" placeholder='write your thoughts here...'>

                </textarea>
                <input type="hidden" value={post._id} name='post_id'/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CommentDetail