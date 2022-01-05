import { Anchor, Button, Col, Image, Row, SideDrawer, Text } from 'atomize'
import Div from 'atomize/dist/atoms/div/Div'
import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'

const Cart = () => {
    const { checkout, closeCart, isCartOpen, removeItemFromCheckout, updateItemCount } = useContext(ShopContext)
    
    
    return (
        <SideDrawer isOpen={isCartOpen} onClose={closeCart}>
            <Text>Cart</Text>
            {checkout.lineItems==undefined ? <Text>Cart is empty</Text> : checkout.lineItems.map(el=>(
                <Row key={el.id}>
                    <Col>
                        <Image src={el.variant.image.src}/>
                    </Col>

                    <Col>
                        <Text>
                            Name: {el.title}
                        </Text>
                        <Text>
                            Quantity: <Div><Button onClick={()=>{updateItemCount(el.id, el.quantity+1)}} >+</Button>{el.quantity}
                                {el.quantity > 1 ? <Button onClick={()=>{updateItemCount(el.id, el.quantity-1)}} >-</Button> : ""}
                            </Div>
                        </Text>
                        <Text>
                            Price: {el.variant.price} {el.variant.priceV2.currencyCode}
                        </Text>
                        <Button onClick={()=>{removeItemFromCheckout(el.id)}} >Remove</Button>
                        
                    </Col>
                </Row>
            ))}

            <Anchor href={checkout.webUrl} >Checkout</Anchor>
        </SideDrawer>
    )
}



export default Cart

