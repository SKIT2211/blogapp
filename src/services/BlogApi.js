import axoisInstance from "../services/axoisInstance";
import { toast } from "react-toastify";
import { APIS } from "../constants/constant";

export const addBlog = async (data) => {
  try {
    const response = await axoisInstance.post(
      `${APIS.BLOGS_API}/addblog`,
      data
    );
    const blog = await response?.data;
    if (!blog) {
      toast.error("blog not added");
    } else {
      toast.success("blog created!");
    }
  } catch (e) {
    toast.error("Blog didn't add yet, try again!", e.message);
  }
};

// export const updateBlog = async(data) => {
//     let {fromData} = data
//     try{
//       const response = await axoisInstance.put(`${APIS.BLOGS_API}/allblogs/${fromData._id}`, data)
//       const blog = await response?.data
//       if(!blog){
//         toast.error("blog not updated.")
//       }else{
//         toast.success('blog updated!')
//       }
//     }catch(e){
//       toast.error("Blog didn't update yet, try again!", e.message)
//     }
// }

export const deleteBlog = async (_id) => {
  try {
    const response = await axoisInstance.delete(
      `${APIS.BLOGS_API}/allblogs/${_id}`
    );
    const blog = await response?.data;
    if (!blog) {
      toast.error("blog not deleted");
    } else {
      toast.success("blog deleted!");
    }
  } catch (e) {
    toast.error("Blog not Found.!", e.message);
  }
};
