import { faCloudArrowUp, faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadVideoApi } from '../services/allAPI';


function Add({setVideoUploadStatus}) {
    const [show, setShow] = useState(false);
    //state to store video details
    const [video, setVideo] = useState({
        caption:"",
        imageUrl:"",
        embedLink:""
    })

    console.log(video);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getEmbedlink = (e)=>{
        const text = e.target.value
       /* console.log(text);*/
       if(text.startsWith('https://youtu.be/')){
        // console.log(text.slice(-26,-15));
        const link = `https://www.youtube.com/embed/${text.slice(17,28)}`
        setVideo({...video,embedLink:link})
       }
       else{
        // console.log(text.slice(-11));
        const link = `https://www.youtube.com/embed/${text.slice(-11)}`
        setVideo({...video,embedLink:link})
       }
    }


    //function to upload video details
    const handleUpload = async()=>{
        const {caption, imageUrl, embedLink} = video

        if(!caption || !imageUrl || !embedLink){
            toast.info('Please fill the form completely!!!')
        }
        else{
            const response = await uploadVideoApi(video)
            console.log(response);
            if(response.status >=200 && response.status < 300){
                toast.success('Video Uploaded successfully') 
                setVideoUploadStatus(response.data)
                setVideo({
                    caption:"",
                    imageUrl:"",
                    embedLink:""
                })
                handleClose()
            }
            else{
                console.log(response);
                toast.error('Something went wrong')
            }
           
        }
    }


    return (
   <>
        <div>
          <h5>Upload New Video <FontAwesomeIcon onClick={handleShow} icon={faCloudArrowUp} className='ms-2'/></h5>
        </div>
        <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
             <Modal.Title><FontAwesomeIcon icon={faFilm} className='me-2 text-warning' /> Upload Videos</Modal.Title>
           </Modal.Header>
            <Modal.Body>
                <p>Please fill the following details</p>
                <form className='mt-3 border p-2 rounded'>
                    <div className='mb-3'>
                        <input type="text"  placeholder='Enter Video Caption' onChange={(e)=>setVideo({...video,caption:e.target.value})} className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <input type="text" placeholder='Enter Image URL' onChange={(e)=>setVideo({...video,imageUrl:e.target.value})} className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <input type="text" placeholder='Enter Youtube Video Link' className='form-control' onChange={(e)=>getEmbedlink(e)} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
             Cancel
             </Button>
             <Button variant="warning" onClick={handleUpload}>
              Upload
             </Button>
            </Modal.Footer>
       </Modal>

       <ToastContainer theme='colored' position='top-center' autoClose={3000}/>
    
    
   </>


    )
}

export default Add


// https://youtu.be/rR_2ti4l3nM?si=d0X669dGfq7h7hV-

// https://www.youtube.com/watch?v=rR_2ti4l3nM

// https://www.youtube.com/embed/rR_2ti4l3nM

//<iframe width="703" height="371" src="https://www.youtube.com/embed/rR_2ti4l3nM" title="Premalu Official Trailer | Naslen | Mamitha | Girish AD | Bhavana Studios" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>