import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import VideoCard from './VideoCard';
import { addCategoryApi, deleteCategoryApi, getAVideoApi, getAllCategoryApi, updateCategoryApi } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Category({dragOutVideoStatus , setVideoDragOutStatus}) {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("")
  const [allCategory, setAllCategory] = useState([])
  const [addCategoryStatus, setAddCategoryStatus] = useState(false)
  const [deleteCategoryStatus, setDeleteCategoryStatus] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(categoryName);

  //function to add category
  const handleAddCategory = async () => {
    let reqBody = {
      category: categoryName,
      allVideos: []
    }

    if (allCategory.length == 0) {
      const result = await addCategoryApi(reqBody)
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        toast.success('Category added successfully')
        setCategoryName("")
        setAddCategoryStatus(true)
        handleClose()
      }
      else {
        toast.error('Something went wrong')
      }
    }
    else {
      const existingCategory = allCategory.find(item => item.category == categoryName)
      if (existingCategory) {
        toast.warning('Category Already exists')
        setCategoryName("")
        handleClose()
      }
      else {
        const result = await addCategoryApi(reqBody)
        console.log(result);
        if (result.status >= 200 && result.status < 300) {
          toast.success('Category added successfully')
          setCategoryName("")
          setAddCategoryStatus(true)
          handleClose()
        }
        else {
          toast.error('Something went wrong')
        }
      }
    }


    /*const result = await addCategoryApi(reqBody)
    console.log(result);
    if(result.status>=200 && result.status<300){
      toast.success('Category added successfully')
      setCategoryName("")
      setAddCategoryStatus(true)
      handleClose()
    }
    else{
      toast.error('Something went wrong')
    }*/
  }

  //function to get all category
  const getAllCategory = async () => {
    const result = await getAllCategoryApi()

    setAllCategory(result.data)
  }

  //function to delete category
  const handleDelete = async (id) => {
    const result = await deleteCategoryApi(id)
    console.log(result);
    if (result.status >= 200 && result.status < 300) {
      setDeleteCategoryStatus(true)
    }
    else {
      toast.error('Something went wrong')
    }
  }

  //function to prevent data loss
   const dragOver = (e)=>{
    e.preventDefault() // avoid refresh ,so prevent data loss
   }

   //function to drop
   const videoDrop = async(e, categoryId)=>{
    console.log('inside drop function');
    console.log(`category id is ${categoryId}`);
    const videoId = e.dataTransfer.getData("videoId")
    console.log(videoId);
    //api to get details of video that is dragged
    const {data} = await getAVideoApi(videoId)
    console.log(data);

    const selectedCategory = allCategory.find(item=>item.id==categoryId)

    if(selectedCategory.allVideos.find(item=>item.id==data.id)){
      toast.error('Video already exists')
    }
    else{
      selectedCategory.allVideos.push(data)
    }
    await updateCategoryApi(categoryId,selectedCategory)
    getAllCategory() //to automatically update category after dragging a card into it ,without refreshing

   }
   
   //function to send the details of card to view
    const dragStart = (e,categoryId,videoId)=>{
      console.log(categoryId);
      console.log(videoId);
      let sharedData = {
        categoryId,
        videoId
      }
      e.dataTransfer.setData("sharedData",JSON.stringify(sharedData))
    }


  console.log(allCategory);

  useEffect(() => {
    getAllCategory()
    setAddCategoryStatus(false)
    setDeleteCategoryStatus(false)
    setVideoDragOutStatus(false)
  }, [addCategoryStatus, deleteCategoryStatus, dragOutVideoStatus])

  return (
    <>
      <div className='d-flex justify-content-center align-items-center mt-5 mt-md-0'>
        <button className='btn-warning w-100 rounded' onClick={handleShow}><span style={{ color: "white" }}>Add New Category</span></button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><FontAwesomeIcon className='text-warning' icon={faPen} />Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='my-3 border rounded p-4'>
            <label htmlFor="cname" className='mb-3'>Category Name</label>
            <input id='cname' type="text" placeholder='Enter Category name' className='form-control' onChange={(e) => setCategoryName(e.target.value)} />

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddCategory} >
            Add
          </Button>
        </Modal.Footer>
      </Modal>


      {allCategory?.length > 0 ?
        allCategory?.map((cat) => (
          <div className="border border-secondary w-100 p-3 rounded mt-3" droppable="true" onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,cat.id)} >
            <div className='d-flex justify-content-between align-items-center'>
              <p>{cat.category}</p>
              <button className='btn btn-danger' onClick={() => handleDelete(cat.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            <Row>
              {cat.allVideos.length>0?
              cat.allVideos.map((card)=>( <Col sm={12} draggable onDragStart={(e)=>dragStart(e,cat.id,card.id)} >
                <VideoCard displayVideo={card} isPresent = {true} />
               </Col>))
              :null
              }
            </Row>
          </div>
        ))

        :

        <p className='mt-5 text-warning'>No category added yet..</p>}

      <ToastContainer theme='colored' position='top-center' autoClose={3000} />
    </>
  )
}

export default Category
