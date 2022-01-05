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
        // this.createCheckout()
        // this.fetchAllProducts()

        // Check if local storage has a checout_id saved
        if (localStorage.checkout_id) {
            this.fetchCheckout(localStorage.checkout_id)
        } else{
            this.createCheckout()
        }

        // if we have no checkout_id in a localStorage than we will create a new checkout
        

        // else fetch the checkout from shopify
    }

    fetchCheckout = async(checkoutID)=>{
        client.checkout.fetch(checkoutID).then((checkout) => {
            this.setState({ checkout : checkout }) 
        }).catch(err=>console.log(err))
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create()
        localStorage.setItem("checkout_id", checkout.id)
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

    removeItemFromCheckout = async (variantId)=>{
        client.checkout.removeLineItems(this.state.checkout.id, variantId).then((checkout) => {
            this.setState({ checkout: checkout });
        });
    }

    updateItemCount = async (variantId, quantity)=>{
        const lineItemsToUpdate = [
            {id: variantId, quantity: quantity}
        ];
          
        console.log(lineItemsToUpdate);

        client.checkout.updateLineItems(this.state.checkout.id, lineItemsToUpdate).then((checkout) => {
            this.setState({ checkout: checkout });
        });

    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        this.setState( { products : products } )
    }

    fetchProductWithHandle = async (handle) => {
        this.setState({ product: {} })
        const product = await client.product.fetchByHandle(handle)
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
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    addItemToCheckout: this.addItemToCheckout,
                    removeItemFromCheckout: this.removeItemFromCheckout,
                    updateItemCount : this.updateItemCount,
                    fetchProductWithHandle : this.fetchProductWithHandle
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