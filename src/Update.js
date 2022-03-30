import React from "react";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch} from "react-redux";
import { updateWordFB } from "./redux/modules/word";


const Update =(props)=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const word = React.useRef(null);
    const pinyin = React.useRef(null);
    const meaning = React.useRef(null);
    const example = React.useRef(null);
    const translation = React.useRef(null);
    const params=useParams();
    const index=params.index;
    const target_word =useSelector((state)=>state.word.list[index]);
    const updateWordList =()=>{
        const new_post={index:index,word:word.current.value,pinyin:pinyin.current.value,meaning:meaning.current.value,example:example.current.value,translation:translation.current.value,completed:false}
        dispatch(updateWordFB(target_word.id,new_post));
        history.goBack()
    };
    
        return (
            <PlusPost>
                <h3>단어 수정하기</h3>
                <InputDiv>
                    <p>단어</p>
                    <input ref={word} placeholder={target_word.word}></input>
                </InputDiv>
                <InputDiv>
                    <p>병음</p>
                    <input ref={pinyin} placeholder={target_word.pinyin}></input>
                </InputDiv>
                <InputDiv>
                    <p>의미</p>
                    <input ref={meaning} placeholder={target_word.meaning}></input>
                </InputDiv>
                <InputDiv>
                    <p>예문</p>
                    <input ref={example} placeholder={target_word.example}></input>
                </InputDiv>
                <InputDiv>
                    <p>해석</p>
                    <input ref={translation} placeholder={target_word.translation}></input>
                </InputDiv>
                <button onClick={updateWordList}>수정하기</button>
                {/* <button onClick={()=>history.goBack()}>수정하기</button> */}
            </PlusPost>
            
            );
        }

        const PlusPost =styled.div`
        margin:0 auto;
        margin-top:70px;
        max-width:500px;
        height:600px;
        h3{
            font-size:20px;
            padding-top:20px;
            color:white;
        }
        button{
            width:200px;
            height:50px;
            background:linear-gradient(128deg,#eb83fe,#a5c1ff);
            color:white;
            border:none;
            border-radius:50px;
            margin-top:10px;
        }
        button:hover{
            background:linear-gradient(128deg,#ef33b1,#f6E6bc);
            border:1px solid #E75480;
        }
        `
        const InputDiv =styled.div`
        width:100%;
        margin-top:10px;
        padding:10px;
            input{
                background:transparent;
                width:100%;
                border:none;
                border-bottom:1px solid #ebe1fe;
                color:white;
            }
            input::placeholder{
                color:white;
            }
            input:focus{
                outline:none;
            }
            input:hover{
                border-bottom:1px solid #eb83fe;
            }
            p{
                width:100%;
                text-align:left;
                color:white;
            }
        `       
export default Update;