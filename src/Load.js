import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { deleteWordFB ,completeWordFB,loadWordFB} from "./redux/modules/word";
import update_icon from"./update_icon.png";
import delete_icon from"./delete_icon.png";
import complete_icon from"./complete_icon.png";
const Load =(props) =>{
    const params=useParams(); 
    const dispatch=useDispatch();
    const history =useHistory();
    const word_list =useSelector((state)=>state.word.list);
    React.useEffect(()=>{
      dispatch(loadWordFB());
    },[]);
    
    // console.log(word_list);
    // console.log(word_list[index]);
    // const [list, setList] = React.useState(word_list);
    // console.log(useSelector(state));
    // const word_list = useSelector((state)=>state.word.list);
    // console.log(word_list)
    return (
        <PostWrap>
          {word_list.map((e,i)=>{
            return(
              <Post key={i} completed={word_list[i].completed}>
                <h3>{e.word}</h3>
                <div className="btns">
                  <button onClick={()=>{dispatch(completeWordFB(word_list[i].id,word_list[i].completed))}}><img src={delete_icon}/></button>
                  <button onClick={() => {history.push("update/"+i)}}><img src={update_icon}/></button>
                  <button onClick={()=>{dispatch(deleteWordFB(word_list[i].id))}}><img src={complete_icon}/></button>
                </div>
                <SubText>
                  <p>[{e.pinyin}]</p>
                  <p>{e.meaning}</p>
                  <p style={{color:"#187bcd"}}>{e.example}</p>
                  <p style={{color:"#187bcd"}}>{e.translation}</p>
                </SubText>
             </Post>
            )
          })}
        </PostWrap>
        )

}
const PostWrap=styled.div`
  width:98%;
  margin:0 auto;
  margin-top:60px;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
`
const SubText=styled.div`
  margin-top:15px;
  width:100%;
  background:yellow;
  p{
    float:left;
    display:inline-block;
    width:100%;
    height:16px;
    line-height:16px;
    font-size:16px;
    font-family: 'Noto Sans KR', sans-serif;
    text-align:left;
  }

`
const Post=styled.div`
  position:relative;
  background:${(props)=>props.completed? "linear-gradient(128deg,#eb83fe,#a5c1ff)":"linear-gradient(128deg,#ebe1fe,#e5f1ff)"};
  color:${(props)=>props.completed? "white":"#323232"};
  // margin-right: auto;
  box-shadow:
      0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075)
    ;
  margin-top:11px;
  width:23.5%;
  min-width:350px;
  border-radius:10px;
  padding:20px;
  padding-bottom:5px;
  box-sizing:border-box;
  .title{
    width:100%;
    display:flex;
    align-items:center;
  }
  h3{
    font-weight:600;
    overflow:hidden;
    display:inline-block;
    width:70%;
    font-size:30px;
    line-height:30px;
    float:left;
    text-align:left;
  }
 
  .btns{
    position:absolute;
    right:15px;
    top:15px;
    img{
      width:24px;
      height:24px;
      filter:${(props)=>props.completed? "brightness(100)":"none"};;
    }
    button{
      color:${(props)=>props.completed? "white":"#323232"};
      border:none;
      background:transparent;
      padding:3px;
      font-size:12px;
    }
    }
  }
`
export default Load;