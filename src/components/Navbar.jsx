import { Anchor, Container } from 'atomize'
import React, { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'

function Navbar() {

    const { openCart } = useContext(ShopContext)

    return (
        <Container d="flex" p="2rem" justify="space-between">
            <Link to="/">Shop</Link>
            <Anchor d="block" onClick={()=>openCart()}>Cart</Anchor>
        </Container>
    )
}

export default Navbar
