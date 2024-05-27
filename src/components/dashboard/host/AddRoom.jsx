import React, { useState } from 'react'
import AddRoomFrom from '../../from/AddRoomFrom'
import { addDays } from 'date-fns'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../ReUseFuntion'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function AddRoom() {

  const {user} = useAuth()
  const [imagePreview,setImagePreview] = useState()
  const [imageText,setImageText] = useState(" image upload")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  //date range pikker
  const [dates,setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date()),
      key: 'selection'
    }
  ])

  // handleImage
  const handleImage = (image) =>{
    // setImageText(image)
    setImageText(image.name)
    setImagePreview(URL.createObjectURL(image))
  }

 //set data mongodb database
 //set data mongodb database
 //set data mongodb database
 const {mutateAsync} = useMutation({
  mutationFn: async(roomData) =>{
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/room`,roomData,{withCredentials:true})
  return data;
  },
  onSuccess: ()=>{
    toast.success("room added successful")
    navigate('/dashboard/my-listings')
  },
  onError:()=>{
    toast.error(error.message)
  }
  })
  // from submit
  const handleSubmit = async(e) =>{
    setLoading(true)
    e.preventDefault()
    const form = e.target
    const location = form.location.value;
    const category = form.category.value;
    const startDate  = dates[0].startDate;
    const endDate = dates[0].endDate;
    const title = form.title.value;
    const price = form.price.value;
    const total_guest = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const bedrooms = form.bedrooms.value;
   const image = form.image.files[0]

   const host = {
    name : user?.displayName,
    images: user?.photoURL,
    email: user?.email
   }
  // image url
  const image_url = await imageUpload(image)
  console.log(image_url)
  try {
     //add room data
   const roomData = {
    location,category,title,startDate,endDate,price,total_guest,bathrooms,description,bedrooms,image:image_url,host
   } 
   console.table(roomData)

   //post request to server
  await mutateAsync(roomData)
  // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/room`,roomData,{withCredentials:true})
  setLoading(false)
  } catch (error) {
    toast.error(error)
    console.log(error)
    setLoading(false)
  }
  }
  return (
    <div>
    <AddRoomFrom 
    dates={dates} 
    setDates={setDates}
    handleSubmit={handleSubmit}
    handleImage={handleImage}
    setImagePreview={setImagePreview}
    imagePreview={imagePreview}
    imageText={imageText}
    loading={loading}
    ></AddRoomFrom>
    </div>
  )
}

export default AddRoom
