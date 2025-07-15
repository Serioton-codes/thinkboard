import React, { useEffect,useState } from 'react'
import toast from "react-hot-toast";


import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

export default function HomePage() {
  const [isRateLimited,setisRateLimited]=useState(false);
  const [notes,setNotes]=useState([]);
  const [isloading,setIsLoading]=useState(true);

  useEffect(()=>{
    const fetchNotes= async ()=>{
      try {
        const res= await api.get("/notes");
        setNotes(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching Notes",error);
        if(error.response?.status===429){
          setisRateLimited(true);
        }
        else{
          toast.error("failed to fetch notes");
        }
      }
      finally{
        setIsLoading(false);
      }
    }

    fetchNotes();
  },[])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited&&<RateLimitedUI/>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>

      {isloading&&<div className='text-center text-primary py-10'>Loading your Notes...</div>}
      {notes.length===0&&!isRateLimited&& <NotesNotFound/>}
      {notes.length>0&&!isRateLimited&&(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {notes.map((note)=>(
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      )}

      </div>
    </div>
  )
}
