import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { increase, decrease, removeItem, clearCart, calculateTotals} from './app/cartSlice'
import {CartIcon} from './constants/icons';
import styled from 'styled-components'

const Background=styled.div`
    background-color:#DFF0F6;
    height:2000px
`
const Navbar=styled.div`
    color:white;
    background-color:#52C6FF;
    height:70px;
    display:flex;
    >h1{
        margin:10px 20%;
    }
    >span{
        width:50px;
        height:10px;
        margin:10px 20%;
    }
    >div{
        width:20px;
        height:20px;
        border-radius:50%;
        background-color:#A3E0FF;
        position:absolute;
        right:25%;
        top:10px;
        text-align:center;
    }
`
const Title=styled.h1`
    text-align:center;
    line-height:100px;
`
const Img=styled.img`
    width:100px;
    height:100px;
`
const Music=styled.div`
    display:flex;
    margin:20px 20%;
`
const Item=styled.div`
    line-height:40px;
    padding:0 20px;
    .price{
        color:#525252;
    }
`
const Count=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position:absolute;
    right:25%;
`
const Button=styled.button`
    background-color:#DFF0F6;
    border:#DFF0F6;
`
const Line=styled.div`
    width:1000px;
    position:absolute;
    left:300px;
    color:#525252;
`
const Total=styled.div`
    display: flex;
    >h4{
        margin:30px 20%;
    }
    >div{
        margin:30px 26%;
        font
    }
`
const AllClear=styled.button`
    position:absolute;
    right:50%;
    width:150px; height:35px;
    border:red 1px solid;
    color:red;
`
export default function Cart(){
    //데이터 추출
    const items=useSelector((state)=>state.cart.items);
    const amount= useSelector((state)=>state.cart.totalAmount)
    const price= useSelector((state)=>state.cart.totalPrice)
    //액션 추출
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(calculateTotals(items));
      }, [dispatch,items]);

;    return(
        <Background>
            <Navbar>
                <h1>UMC PlayList</h1>
                <span><CartIcon/></span>
                <div>{amount}</div>
            </Navbar>
            <Title>당신이 선택한 음반</Title>
            {items.map(item => (
                <div key={item.id}>
                    <Music>
                        <Img src={item.img} alt={item.title} />
                        <Item>
                            <div>{item.title} | {item.singer}</div>
                            <div className='price'>₩{item.price}</div>
                        </Item>
                        <Count>
                            <Button onClick={() => dispatch(increase({ id: item.id }))}>🔼</Button>
                            <span>{item.amount}</span>
                            <Button onClick={() => dispatch( item.amount===1 ? removeItem({ id: item.id }) : decrease({ id: item.id }))}>🔽</Button>
                        </Count>
                    </Music>
                </div>
            ))}
            <Line><hr/></Line>
            <Total>
                <h4>총 가격</h4>
                <div>₩{price}</div>
            </Total>
            <AllClear onClick={()=>dispatch(clearCart())}>장바구니 초기화</AllClear>
        </Background>
    )
}