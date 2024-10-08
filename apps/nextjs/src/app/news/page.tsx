import Post from './post'
import { fetchPost } from './store'

const Page = async () => <Post initialPost={await fetchPost()} />

export default Page
