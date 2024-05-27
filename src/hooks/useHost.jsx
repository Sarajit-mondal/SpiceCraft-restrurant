import axios from "axios"
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"


function useHost() {
const axiosSequare = useAxiosSecure()
const {user,loding} = useAuth()
 
// Queries
const {data : role, isLoading} = useQuery({ 
    queryKey: ['host'], 
    enabled: !loding && !!user?.email,
    queryFn: async()=>{
   const {data} =await axiosSequare.get(`/host/${user?.email}`)
   return data.role;
    } })
  return [role,isLoading]
}

export default useHost
