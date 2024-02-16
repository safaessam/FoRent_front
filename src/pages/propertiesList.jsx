import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../MyStore/actions/fetchProperties';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import LoadingScreen from './loadingScreen'
import './propertiesList.css';
import Pagination from 'react-js-pagination';

const PropertiesList = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.properties.error);
  const loading = useSelector((state) => state.properties.loading);
  const properties = useSelector((state) => state.properties.properties.products);
  // console.log(properties)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(10);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties && properties.slice(indexOfFirstProperty, indexOfLastProperty);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  if (error) {
    return <div className='error-page text-danger'>{error}</div>;
  }

  if (!properties) {
    return <div>No properties found.</div>;
  }

  return (
    <Container fluid className='mt-3'>
      <h3 className='mb-2'><b><span style={{ color: '#008f97' }}>NEWLY</span> ADDED</b></h3>
      <Row>
        {currentProperties.map(product => (
          <Col key={product.id} xs={12} lg={6}>

            <Card className='mb-3'>
              <Card.Body>
                <Row>

                  <Col xs={12} md={6}>
                    <div className="card-img-container position-relative">
                      <img className='prop-image' src={product.thumbnail} alt={product.title} />
                      <div className="favorites-icon position-absolute">
                        <i className="far fa-heart text-light"></i>
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} md={6}>
                    <Card.Title className='mt-2 prop-title d-flex justify-content-between'>
                      <span>{product.title}</span>
                      <span>55408</span>
                    </Card.Title>
                    <Card.Text className='price d-flex justify-content-between'>
                      <span>Price: ${product.price}</span>
                      <span>7.25% CAP</span>
                    </Card.Text>
                    {/* <Card.Text>Rating: {product.rating} <i className="fas fa-star text-warning"></i></Card.Text> */}
                    <Card.Text className='mx-2 since'>4 days ago</Card.Text>
                    <Button className='more-details'><b>More Details</b></Button>
                  </Col>

                </Row>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>
      <div className='d-flex justify-content-center'>
        <Pagination
          className="pagination"
          activePage={currentPage}
          itemsCountPerPage={propertiesPerPage}
          totalItemsCount={properties.length}
          onChange={handlePageChange}
          itemClass='page-item'
          linkClass='page-link'
        />
      </div>
    </Container>
  );
};

export default PropertiesList;