import { Link } from "react-router";

export default function Blog() {
    return <h1>Here blog posts visualise! <Link to={'/blog/create'}>Go to create</Link></h1>
}