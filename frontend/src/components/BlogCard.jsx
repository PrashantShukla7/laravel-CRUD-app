import React from 'react'
import { Link } from 'react-router-dom'
import '../pages/Blogs/BlogList.css'

const BlogCard = ({blogs}) => {
  return (
    <div className="blog-grid">
        {blogs.map(blog => (
          <Link to={`/read/${blog.id}`} key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p className="blog-description">{blog.description.length > 100 ? `${blog.description.slice(0, 100)}...` : blog.description}</p>
            <div className="blog-meta">
              By {blog.author} • {blog.created_at.slice(0, 10)}
            </div>
          </Link>
        ))}
      </div>
  )
}

export default BlogCard