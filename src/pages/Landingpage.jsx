import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <>
      <div className='row p-5 my-5'>
        <div className="col-md-1"></div>
        <div className="col-md-5 p-3">
          <h3>Welcome to <span className='text-warning'>Media Player</span></h3>
          <p style={{ textAlign: 'justify' }} className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio suscipit at cumque sed, quis repudiandae dolore. Nam assumenda incidunt, earum id similique quisquam blanditiis maiores impedit unde, aut quo ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus commodi quam autem nemo dolores similique ratione molestias. Fuga sapiente eligendi voluptatem unde rem ut, consequuntur provident, vitae, architecto facilis quod?</p>

          <Link to={'/home'}><button className='btn btn-warning mt-4'>Get Started</button></Link>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5 p-3 d-flex justify-content-center align-items-center">
          <img src="https://i.pinimg.com/originals/33/a4/6f/33a46f727dbe790d436616a1f56fce9c.gif" alt="image" className='w-75' />
        </div>

      </div>

      <div className='mb-5 mt-5 py-5'>
      <h3 className='my-5 text-center'>Features</h3>
        <Row className='mb-5'>
          
          <Col md={1}></Col>
          <Col md={3} className='p-5 p-md-0'>
            <Card style={{ width: '100%' }} className='p-4'>
              <Card.Img variant="top" src="https://i.pinimg.com/originals/6f/5f/f3/6f5ff36fd8ffefa40bf466df6c693ef1.gif" style={{width:'100%',height:'300px'}}/>
              <Card.Body>
                <Card.Title>Managing Video</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
  
          <Col md={4} className='d-flex justify-content-center'>
          <Card style={{ width: '80%' }} className='p-4'>
        <Card.Img variant="top" src="https://i.pinimg.com/originals/62/0c/5a/620c5a819f8b8fa2a75575edf1d155ec.gif" style={{width:'100%',height:'300px'}} />
        <Card.Body>
          <Card.Title>Categorized Video</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
          </Col>
  
          <Col md={3} className='p-5 p-md-0'>
          <Card style={{ width: '100%' }} className='p-4'>
        <Card.Img variant="top" src="https://cdn.shopify.com/s/files/1/0025/5888/5997/files/Rainbow_Soundwave_mobile_750x600_optimised_x800.gif?v=1655295517" style={{width:'100%',height:'300px'}} />
        <Card.Body>
          <Card.Title>Watch History</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
          </Col>
          <Col md={1}></Col>
        </Row>
  
      </div>

      <div className='row pt-0 pt-md-5 pb-5'>
         <div className="col-md-1"></div>
         <div className="col-md-10 border p-4 rounded border-2">
          <Row>
            <Col md={6} className='p-3'>
              <h2 className='text-warning'>Simple fast and Powerful</h2>

              <p style={{textAlign:"justify"}}><span className='fs-4'>Play Everything </span>: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit placeat, nisi minima hic distinctio soluta veniam perferendis ea perspiciatis facilis esse iusto consectetur tempora suscipit eaque accusamus dolor cum quaerat?</p>
              <p style={{textAlign:"justify"}}><span className='fs-4'>Play Everything </span>: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit placeat, nisi minima hic distinctio soluta veniam perferendis ea perspiciatis facilis esse iusto consectetur tempora suscipit eaque accusamus dolor cum quaerat?</p>
              <p style={{textAlign:"justify"}}><span className='fs-4'>Play Everything </span>: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit placeat, nisi minima hic distinctio soluta veniam perferendis ea perspiciatis facilis esse iusto consectetur tempora suscipit eaque accusamus dolor cum quaerat?</p>
            </Col>
            <Col md={6} className='p-4'>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tYSrY4iPX6w" title="Tum Tum - Video Song | Enemy (Tamil) | Vishal,Arya | Anand Shankar | Vinod Kumar | Thaman S" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </Col>
          </Row>
         </div>
         <div className="col-md-1"></div>

      </div>
    </>
  )
}

export default Landingpage
