import React from 'react'
import createReactClass from 'create-react-class'
import { gql, graphql } from 'react-apollo'

export const posts = gql`
query {
  posts {
    _id
    title
    content
  }
}`

const Posts = createReactClass({
  displayName: 'Posts',

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    if (this.props.data.error) {
      console.error(this.props.data.error)
      return (
        <div>
          An unexpected error occurred
        </div>
      )
    }
    const {posts} = this.props.data
    return (
      <ul>
        {posts.map(post => <li key={post._id}> {post.title} {post.content} </li>)}
      </ul>
    )
  }
})

export default graphql(posts, {
  options: { pollInterval: 10000 }
})(Posts)
