// word.js
import {db} from "../../firebase";
import {collection,getDoc,getDocs,addDoc,updateDoc,doc,deleteDoc} from "firebase/firestore";
// Actions

const LOAD ='word/LOAD';
const CREATE = 'word/CREATE';
const DELETE = 'word/DELETE';
const COMPLETE ='word/COMPLETE';
const UPDATE ='word/UPDATE';

const initialState ={
    list:[
        // {index:0,word:"단어",pinyin:"병음",meaning:"의미",example:"예문",translation:"해석",completed:false},
        // {index:1,word:"단어2",pinyin:"병음2",meaning:"의미2",example:"예문2",translation:"해석2",completed:false},
        // {index:2,word:"단어3",pinyin:"병음3",meaning:"의미3",example:"예문3",translation:"해석3",completed:false},
        // {index:3,word:"단어4",pinyin:"병음4",meaning:"의미4",example:"예문4",translation:"해석4",completed:false}
      ],
};


// Action Creators

export function loadWord(word_list){
    return{type:LOAD, word_list}
}


export function createWord(word) {
return { type: CREATE, word};
}

export function deleteWord(word_index) {
    return { type: DELETE, word_index};
    }

export function completeWord (word_index) {
    return { type: COMPLETE, word_index};
}

export function updateWord(word) {
    return { type: UPDATE, word:word};
    }
//middlewares
export const loadWordFB =()=>{
    return async function(dispatch){
        const word_data = await getDocs(collection(db,"word"));
        // console.log(word_data);
        let word_list =[];
        word_data.forEach((w)=>{
            word_list.push({id:w.id,...w.data()});
        })
        // console.log(word_list);
        dispatch(loadWord(word_list));
    }
}


export const createWordFB =(word) =>{
    return async function(dispatch){
        const docRef= await addDoc(collection(db,"word"),word);
        // const _word =await getDoc(docRef);
        const word_data ={id:docRef.id,... word.data()};
        // console.log(word_data);
        dispatch(createWord(word_data));

    }
}
export const completeWordFB =(word_id,completed)=>{
    return async function(dispatch,getState){
        const docRef=doc(db,"word",word_id);//어떤 것을 잡아올 것인가
        if(completed==true){
            await updateDoc(docRef,{completed:false});
        }else{
            await updateDoc(docRef,{completed:true});
        }
        const _word_list=getState().word.list;
        const word_index =_word_list.findIndex((w)=>{
            return w.id===word_id
        })
        dispatch(completeWord(word_index));
    };
}

export const updateWordFB =(word_id,word)=>{
    return async function(dispatch,getState){
        const docRef=doc(db,"word",word_id);//어떤 것을 잡아올 것인가
        await updateDoc(docRef,word)
        const _word_list=getState().word.list;
        const word_index =_word_list.findIndex((w)=>{
            return w.id===word_id
        })
        dispatch(updateWord(word_index));
    }
    
}

export const deleteWordFB =(word_id)=>{
    return async function (dispatch,getState){
        const docRef=doc(db,"word",word_id);//어떤 것을 잡아올 것인가
        await deleteDoc(docRef);
        const _word_list=getState().word.list;
        const word_index =_word_list.findIndex((w)=>{
            return w.id===word_id
        })
        dispatch(deleteWord(word_index));

    }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case "word/LOAD":{
            // console.log(action.word_list.sort(function(a,b){return a.index-b.index}));
            return {list:action.word_list.sort(function(a,b){return a.index-b.index})};
            
        }

        case "word/CREATE":{
            const new_item_list=[...state.list,action.word];
            return {list:new_item_list};
        }

        case "word/UPDATE":{
            const new_item_list=state.list.map((e,idx)=>{
                if(parseInt(action.word.index)===idx){
                    return{...action.word}
                }else{
                    return e
                }
            })
            return {list:new_item_list};
        }
        case "word/COMPLETE":{
            const new_item_list =state.list.map((e,idx)=>{
                if(parseInt(action.word_index)===idx){
                   
                    if(state.list[idx].completed==false){
                        return{...e,completed:true}
                    }else{
                        return{...e,completed:false}
                    }
                    
                }else{
                    return e;
                }
            })
            return {list:new_item_list};
            
        }
        case "word/DELETE":{
            // console.log(state,action)
            const new_item_list=state.list.filter((e,idx)=>{
                return parseInt(action.word_index) !==idx;
            })
            return {list:new_item_list};
        }
        default:
             return state;
    }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget () {
// return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }