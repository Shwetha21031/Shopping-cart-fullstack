import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, filterByCategory, sortAsc, sortDsc ,getAllProducts} from '../Redux/ProductsSlice'
import { addToCart, updateQuantity } from '../Redux/cartSlice'
import { search } from '../Redux/ProductsSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {BsSearch ,BsCart3} from 'react-icons/bs'

const HomePage = () => {
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const userName = useSelector(state=>state.login.userName)
    let items = useSelector(state=>state.products.temp)
    let load = useSelector(state=>state.products.status)
    let itemsQuantity = useSelector(state=>state.cart.quantity)
    const [searchTxt,setSearchTxt] = useState('')

    useEffect(()=>{
        dispatch(fetchProducts())
        dispatch(getAllProducts())
    },[])

    const handleSearch = () => {
        let txt = searchTxt.toLowerCase()
        dispatch(search(txt))
    }

    const handleLogout =()=>{
        navigate('/')
        toast.error("logged out",{
            position: "top-right",
            autoClose: 1000,
        })
    }
  
    const handleCart = () => {
        navigate('/homePage/Cart')
    }
    const handleAddtoCart = (item) => {
        console.log(item)
        dispatch(addToCart(item))
        dispatch(updateQuantity())
    }

  return (
   <>
   <div className='home-main'>

    <div className='header'>
    <div className='welcome'><p>Welcome {userName}</p></div>
    
    <div>
   <input type='text' placeholder='search for products here' onChange={(e)=>setSearchTxt(e.target.value)} />
   <button onClick={handleSearch} className='search-btn'>< BsSearch/></button>
   </div>

   <div>
    <button onClick={handleCart} className='cart'>< BsCart3 /> <span className='quantity'>{itemsQuantity}</span></button>
   <button onClick={handleLogout} className='logout-btn'>Logout</button>
   </div>
   </div>

   <div className='sortContainer'>
    <p>Sort by price</p>
    <button onClick={()=>dispatch(sortAsc())}>Low to High</button>
    <button onClick={()=>dispatch(sortDsc())}>High to Low</button>
    </div>

    <div className='productsCategory'>
        <button onClick={()=>dispatch(getAllProducts())} >Get all products</button>
        <button onClick={()=>dispatch(filterByCategory(`men's clothing`))}>Mens Clothing</button>
        <button onClick={()=> dispatch(filterByCategory(`jewelery`))}>Jewellery</button>
        <button onClick={()=>dispatch(filterByCategory('electronics'))}>Electronics</button>
        <button onClick={()=>dispatch(filterByCategory(`women's clothing`))}>Womens Clothing</button>

    </div>

   <div className='product-container'>
    {   
        (load==='pending') 
        ?
        (<h1 className='loading'>...loading</h1>) 
        :
        (items.length>0)
        ?
        items.map((item)=>{
            return <div className='product-card' key={item.id}>

                <p className='title'>{item.title}</p>
                <img src={item.image} />

                <div>
                    <span className='desc'>
                    {item.description}</span>
                    <br>
                    </br>
                    <span className='price'>
                    $ {item.price}
                    </span>
                    <span className='cart-btn' onClick={()=>handleAddtoCart(item)}><button>Add to Cart</button></span>
                    </div>
                </div>
            
        })  
        :
        <div className='no-items'>No items available</div>
    }
   </div>
   </div>
   </>
  )
}

export default HomePage