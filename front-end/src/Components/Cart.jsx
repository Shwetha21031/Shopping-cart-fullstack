import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart, updateQuantity, updateTotal } from '../Redux/cartSlice'
function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state=>state.cart.cart)
    const total = useSelector(state=>state.cart.totalAmount)

    useEffect(()=>{
        dispatch(updateTotal())
        dispatch(updateQuantity())
        console.log(total)
    },[cartItems])
    const handlehome = () => {
        navigate('/homePage')
    }
    const handleDecrease = (item) => {
        dispatch(removeFromCart(item))
    }

  return (
    <div>
        <button className='home-btn' onClick={handlehome}>Back to home</button>
        <table border={1}>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>total</th>
                </tr>
            </thead>
            <tbody>
                {   (cartItems.length > 0) ? 
                   (cartItems?.map((item)=>{
                    return <tr key={item.id}>
                        <td style={{fontSize: '12px'}}><img src={item.image} />
                        <br></br>
                        {item.title}
                        </td>
                        <td className='changing-btns'>
                        <button onClick={()=>handleDecrease(item)}>-</button>
                            {item.itemQuantity}
                        <button onClick={()=>dispatch(addToCart(item))}>+</button>
                        </td>
                        <td>{item.price}</td>
                        <td>{Math.round(item.itemQuantity * item.price*100)/100}</td>
                    </tr>
                   }))
                   :
                   <tr><td colSpan={4}className='no-items'>No items in the cart</td>
                   </tr>
                }

                {
                    <div style={{fontWeight: 'bold'}}>
                        Net Total : {Math.round(total*100)/100}
                    </div>
                }
            </tbody>
        </table>
    </div>
  )
}

export default Cart