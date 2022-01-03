import { Button, Col, Container, Div, Image, Row, Text } from 'atomize';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/shopContext';


const ProductPage = () => {

    let { id } = useParams();

    const {fetchProductWithId, addItemToCheckout, product} = useContext(ShopContext)

    useEffect(() => {
        fetchProductWithId(id)
        return () => {

        }
    }, [fetchProductWithId, id])

    

    if(!product.title) return <div>Loading...</div>
    return (
        <Container>
            <Row>
                <Col>
                    <Div>
                        {product.images.map((img)=>{
                            return <Image src={img.src} />
                        })}
                        
                    </Div>
                </Col>
                <Col>
                    <Text>{product.title}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.variants[0].priceV2.currencyCode} {product.variants[0].price}</Text>
                    <Button onClick={()=>addItemToCheckout(product.variants[0].id, 1)} >Add To Cart</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductPage
