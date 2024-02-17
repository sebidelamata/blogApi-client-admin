import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import App from './App'
import AllPosts from './AllPosts'
import CommentDetail from '../components/CommentDetail'
import PostDetail from '../components/PostDetail'


const Router = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />
        },
        {
            path: "/posts/all_posts",
            element: <AllPosts />
        },
        {
            path: "/posts/:id",
            element: <PostDetail />
        },
        {
            path: "/comments/:id",
            element: <CommentDetail />
        },
    ])

    return <RouterProvider router={router}/>
}

export default Router