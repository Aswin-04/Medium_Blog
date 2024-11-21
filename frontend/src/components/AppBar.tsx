import Avatar from "./Avatar"
import { Link, useNavigate } from "react-router-dom"

const AppBar = () => {
  const navigate = useNavigate()
  return (
    <div className="border-b flex justify-between items-center py-4 px-12 max-sm:px-4">
      <div className="font-semibold text-xl cursor-pointer" onClick={() => navigate("/blogs")}>
        Medium
      </div>
      <div>
        <div className="flex items-center">
          <Link to={"/publish"}>
            <button type="button" className="max-sm:text-xs text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-4">Create Blog</button>
          </Link>
          <div className="">
            <Avatar letter="S"></Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar