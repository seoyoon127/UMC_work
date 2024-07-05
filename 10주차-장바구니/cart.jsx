import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, removeItem, clearCart, calculateTotals} from './app/cartSlice'; 
import { fetchMusicList } from './app/cartSlice';
import { showModal, dropModal } from './app/modalSlice';   
import {CartIcon} from './constants/icons';
import LoadingBg from './Loading';
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
    >div{
        color:grey;
        font-size:18px;
    }
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
const Container=styled.div`
    display:${props => props.show ? 'block' : 'none'};
    position:fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(249, 249, 249, 0.7);
    z-index: 1;
`
const Modal=styled.div`
    display:${props => props.show ? 'block' : 'none'};
    position:fixed;
    top:40%;
    left:35%;
    width:500px;
    height:150px;
    background-color:white;
    z-index: 5;
    text-align:center;
    line-height:80px;
    .tf{
        display:flex;
        >button{
            background-color:white;
            border:none;
        }
    }
    .yes{
        color:blue;
        position:absolute;
        left:20%;
    }
    .no{
        color:red;
        position:absolute;
        left:70%;
    }
`
const Load=styled.h3`
    text-align:center;
`

export default function Cart(){
    //데이터 추출
    const items=useSelector((state)=>state.cart.entities);
    const amount= useSelector((state)=>state.cart.totalAmount)
    const price= useSelector((state)=>state.cart.totalPrice)
    const showModalState = useSelector((state) => state.modal.show);
    const musicsState = useSelector((state) => state.cart);

    //액션 추출
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(calculateTotals(items));
      }, [dispatch,items]);

    const handleButtonClick = () => {
        dispatch(clearCart());
        dispatch(dropModal());
    };
    
    useEffect(() => {
      dispatch(fetchMusicList());
    }, [dispatch]);
  
    useEffect(() => {
      if (musicsState && musicsState.entities) {
        dispatch(calculateTotals());
      }
    }, [musicsState, dispatch]);
  
    if (!musicsState || musicsState.loading === 'pending') {
      return <Load><LoadingBg></LoadingBg><br/>로딩 중 입니다.</Load>;
    }

    if (!musicsState.entities) {
        return <div>No items found.</div>; // entities가 없을 때 메시지 표시
    }
    return(
        <Background>
            <Navbar>
                <h1>UMC PlayList</h1>
                <span><CartIcon/></span>
                <div>{amount}</div>
            </Navbar>
            <Title>
                당신이 선택한 음반
                <div>{musicsState.loading === 'failed'? '고객님이 좋아하는 음반을 담아보세요~!':''}</div>
            </Title>
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
        {musicsState.loading !== 'failed' && (
            <>
            <Line><hr/></Line>
            <Total>
                <h4>총 가격</h4>
                <div>₩{price}</div>
            </Total>
            <Container className='modalBackground' show={showModalState} />
            <Modal className='modalBox' show={showModalState}>
                담아두신 모든 음반을 삭제하시겠습니까?
                <div className='tf'>
                <button className='yes' onClick={handleButtonClick}> 네 </button>
                <button className='no' onClick={() => dispatch(dropModal())}>아니오</button>
                </div>
            </Modal>
            <AllClear onClick={() => dispatch(showModal())}>장바구니 초기화</AllClear>
            </>
            )}
            </Background>
        )
    }