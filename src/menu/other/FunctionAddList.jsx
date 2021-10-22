import React, {useState} from "react";
import './App.css';

const List = () => {
const [listItems,setListItems] = useState([])
const [userInput,setUserInput] = useState()

const submitHandler = (e) =>{
    e.preventDefault()
   setListItems(([...listItems, userInput]).sort())
   //console.log("🚀 ~ file: FunctionAddList.jsx ~ line 10 ~ submitHandler ~ listItems", listItems)
   setUserInput("")
} 

const inputChangeHandler = (e) =>  setUserInput(e.target.value)


return (
    <div>
      
      <form onSubmit={submitHandler}>
        <input value={userInput} onChange={inputChangeHandler} />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          listItems.map((li,key) => <li {...{key}}>{li}<input type="checkbox" /></li>)
        }
      </ul>
    </div>
  )

  
}

export default List;





