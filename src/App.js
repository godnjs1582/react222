import './App.css';
import React from "react";
import styled,{keyframes} from"styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Link} from "react-router-dom";
import Load from "./Load";
import Create from "./Create";
import plus_icon from './plus_icon.png';
import Update from './Update';
import { useSelector } from "react-redux";
import {db} from "./firebase";
import {collection,getDoc,getDocs,addDoc,updateDoc,doc,deleteDoc} from "firebase/firestore";

function App() {
  let list=[];
  const word_list =useSelector((state)=>state.word.list);
  // React.useEffect(
  //   async()=>{
    
  //     // const query =await getDocs(collection(db,"word")); 데이터 가져오기
  //     // query.forEach((doc)=>{
  //     //   console.log(doc.id, doc.data())
  //     addDoc(collection(db,"word"),{text:})
  //     console.log(db);
  //     });
  //   },[]);
  return (
    <div className="App">
      <Header>
        <h1>MY WORD LIST</h1>
      </Header>
      <Route path="/" exact>
        <Load>
        </Load>
          <Link to ="/create">
            <PlusBtn>
              <img src={plus_icon}/>
            </PlusBtn>
          </Link>   
      </Route>
          <Route path="/update/:index" exact>
            <Update/>
          </Route>
      <Route path="/create" exact>
        <Create list={word_list}/>
      </Route>
    </div>
  );
}

const Header=styled.div`
  width:100%;
  background:rgba(255,255,255,0.9);
  height:50px;
  position:fixed;
  top:0;
  left:0;
  z-index:3;
   h1{
     color:#161616;
     font-family: 'Noto Sans', sans-serif;
     font-weight:900;
     font-size:20px;
     line-height:20px;
     margin-top:15px;
   }
`
const PlusBtn =styled.div`
  width:50px;
  height:50px;
  background:linear-gradient(128deg,#eb83fe,#a5c1ff);
  border-radius:50%;
  position:fixed;
  bottom:20px;
  right:20px;
  cursor:pointer;
  z-index:5;
  box-shadow:2px 4px 4px hsl(0deg 0% 0%/0.2);
  img{
    margin-top:15px;
    width:20px;
    height:20px;
  }
  img:hover{
    transform:rotate(45deg);
  }
  &:hover{
    background:linear-gradient(128deg,#ef33b1,#f6E6bc);
  }
  `
  
export default App;
