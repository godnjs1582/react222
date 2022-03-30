import React from "react";
import styled from "styled-components"
import {useHistory,useState} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { createWord, createWordFB } from "./redux/modules/word";


const Create =(props) =>{
    const dispatch =useDispatch();
    const history=useHistory();
    const word = React.useRef(null);
    const pinyin = React.useRef(null);
    const meaning = React.useRef(null);
    const example = React.useRef(null);
    const translation = React.useRef(null);
    let count=0;
    const word_list =useSelector((state)=>state.word.list);
    for(let i=0;i<word_list.length;i++){
        count++;
    }
    const addWordList =()=>{
        const new_post={index:count,word:word.current.value,pinyin:pinyin.current.value,meaning:meaning.current.value,example:example.current.value,translation:translation.current.value,completed:false}
        dispatch(createWordFB(new_post));
        history.goBack()
    };
    return (
    <PlusPost>
        <h3>단어 추가하기</h3>
        <InputDiv>
            <p>단어</p>
            <input ref={word}></input>
        </InputDiv>
        <InputDiv>
            <p>병음</p>
            <input ref={pinyin}></input>
        </InputDiv>
        <InputDiv>
            <p>의미</p>
            <input ref={meaning}></input>
        </InputDiv>
        <InputDiv>
            <p>예문</p>
            <input ref={example}></input>
        </InputDiv>
        <InputDiv>
            <p>해석</p>
            <input ref={translation}></input>
        </InputDiv>
        <button onClick={addWordList}>저장하기</button>
    </PlusPost>
    
    );
}

const PlusPost =styled.div`
margin:0 auto;
margin-top:60px;
width:500px;
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
export default Create;