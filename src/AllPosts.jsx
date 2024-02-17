import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import Navbar from '../components/Navbar'

const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allPostsError, setAllPostsError] = useState(null)
    const [allPostsLoading, setAllPostsLoading] = useState(true)
    const [allComments, setAllComments] = useState([])
    const [allCommentsError, setAllCommentsError] = useState(null)
    const [allCommentsLoading, setAllCommentsLoading] = useState(true)
    const [likedState, setLikedState] = useState({})
    const [commentLikedState, SetCommentLikedState] = useState({})
    const [commentAdded, setCommentAdded] = useState(false)

    const fetchAllPosts = async () => {
        const url = 'http://localhost:3000/posts/all_posts'

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
            setAllPosts(data);
        }catch(error){
            setAllPostsError(error.message)
        }finally{
            setAllPostsLoading(false)
        }
    }

    const fetchAllComments =async () => {
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
            setAllComments(data);
        }catch(error){
            setAllCommentsError(error.message)
        }finally{
            setAllCommentsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllPosts()
        fetchAllComments()
    }, [likedState, commentLikedState, commentAdded])

    const handleLikePostClick = async (postID) => {
        if(likedState[postID] === undefined || likedState[postID] === false){
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
                setLikedState({...likedState, [postID]: true})
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
                setLikedState({...likedState, [postID]: false})
                return
            }catch(error){
                console.log(error.message)
            }
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
    



    if(allPostsError !== null || allCommentsError !== null){
        return <h1>A Network Error Has Occured</h1>
    }

    if(allPostsLoading !== false || allCommentsLoading !== false){
        return <h1>Loading...</h1>
    }

    return(
        <>
        <Navbar></Navbar>
        <h1 className='posts-title'>Posts</h1>
        {
            allPosts.length > 0 &&
            <ul className='posts-list'>
                {
                    allPosts.map((post) => {
                        const comments = allComments.filter(comment => comment.post_id === post._id)
                        return(
                            <PostCard key={post._id} post = {post} handleLikePostClick={handleLikePostClick} comments={comments} handleLikeCommentClick={handleLikeCommentClick} handleAddCommentClick={handleAddCommentClick}/>
                        )
                    })
                }
            </ul>
        }
        </>
    )
}

export default AllPosts