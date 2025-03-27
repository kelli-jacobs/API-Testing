import { useState, useEffect } from "react";

function FetchExample(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching data", error))

    },[]);

    return(
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.slice(0, 5).map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
)

}
export default FetchExample;