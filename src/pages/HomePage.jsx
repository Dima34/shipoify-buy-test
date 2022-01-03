import { Col, Container, Div, Row, Text } from 'atomize'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'

const HomePage = () => {

    const { fetchAllProducts, products } = useContext(ShopContext)

    useEffect(() => {
        fetchAllProducts()
        return () => {
            
        }
    }, [fetchAllProducts])

    
    if (!products) {
        return <div>Loading</div>
    }
    return (
        <Container>
            <Row>
                {products.map(product => (
                    <Col key={product.id} size="3">
                        <Link to={`/product/${product.id}`}>
                            <Div p="2rem">
                                <Div h="20rem"
                                    bgImg={product.images[0].src}
                                    bgSize="cover"
                                    bgPos="center center"
                                ></Div>
                                <Text>
                                    {product.title}
                                </Text>
                                <Text>{product.variants[0].price} {product.variants[0].priceV2.currencyCode}</Text>
                            </Div>
                            
                        </Link>                        
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomePage
