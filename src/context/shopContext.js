import React, { Component } from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
    domain: 'danaesstore-test.myshopify.com',
    storefrontAccessToken: 'a0215eb5bedb99c7d3ad901d7a147106'
});
  
const ShopContext = React.createContext()

export default class ShopProvider extends Component {

    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false,
        test: "test"
    }

    componentDidMount(){
        this.createCheckout()
        this.fetchAllProducts()
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create()
        this.setState({ checkout : checkout }) 
    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
          {
            variantId,
            quantity: parseInt(quantity, 10),
          },
        ];
        const checkout = await client.checkout.addLineItems(
          this.state.checkout.id,
          lineItemsToAdd
        );
        this.setState({ checkout: checkout });
    
      };

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        this.setState( { products : products } )
    }

    fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id)
        this.setState({ product: product })
    }

    closeCart = () => {
        this.setState( { isCartOpen : false } )
    }

    openCart = () => {
        this.setState( { isCartOpen : true } )
    }



    render() {
        return (
            <ShopContext.Provider 
                value={{
                    ...this.state,
                    fetchAllProducts : this.fetchAllProducts,
                    fetchProductWithId : this.fetchProductWithId,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    addItemToCheckout: this.addItemToCheckout
                }}
            >
                {this.props.children}
            </ShopContext.Provider>                
        )
    }
}

const ShopConsumer = ShopContext.Consumer

export {
    ShopConsumer, 
    ShopContext
}