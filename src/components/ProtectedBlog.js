import BlogDetails from '../components/BlogDetails';
import Login from './pages/Login';

function ProtectedBlog() {
  let user = JSON.parse(localStorage.getItem("Loggedinuser"));

  return (
    <>
     {user ? <BlogDetails /> : < Login />}
    </>
  )
}

export default ProtectedBlog;
