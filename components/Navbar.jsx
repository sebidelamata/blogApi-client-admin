import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="navbar">
            <Link to={'/posts/all_posts'}>Feed</Link>
        </div>
    )
}

export default Navbar