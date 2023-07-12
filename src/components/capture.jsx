import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export default function Capture() {
  const [todos, setTodos] = useState([{id: v4(), title: "test4", tags: ["test2", "test3"], completed: false},
  {id: v4(), title: "test5", tags: ["test4", "test5"], completed: false}]);
  
  const [todoEditing, setTodoEditing] = useState(null);
  const [editText, setEditText] = useState("")
  function addGoal(text, tag) {
    setTodos([...todos, {id: v4(), title: text, tags: [tag], completed: false}])

  }



  var index = 0;
  useEffect(() => {

    const input = document.querySelector('input[name="input-custom-dropdown"]');
    const tagify = new Tagify(input, 
      {
        whitelist: [],
        dropdown: {
          enabled: 1,
          maxItems: 5,
          classname: "tags-look",
          closeOnSelect: false,
          }},)

    
  }, []);

  useEffect(() => {
    var output = document.querySelector('input[name=tags4]'),
    tagifyOutput = new Tagify(output);


  }, []);



  

  const [tags, setTags] = useState([]);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const goals = document.querySelector("#capture-goal").value;
    const tagsInput = document.querySelector("#input-custom-dropdown").value;
    const newTodo = {
      id: v4(),
      title: goals,
      tags: tagsInput,
      completed: false,
    };
    setTodos([newTodo, ...todos ]);
    document.querySelector("#capture-goal").value = ""
    document.querySelector("#input-custom-dropdown").value = ""
  }




  function popTodo(id) {
    
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {

          todos.pop()
      }
    }
    console.log("pop!")
  }


  function deleteGoal(id) {
    setTodos(todos.filter(t => t.id !== id ))
  }

  function handleUpdateGoal(id) {

    setTodos(
      todos.map((t) => {
        if (t.id === todos.id) {
          return todos;
        } else {
          return t;
        }
      })
    );
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((t) => {
      if (t.id === id) {
        t.title = editText
      }
      return t
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditText("")
  }


  return (
    <>
      <form className="flex flex-col justify-center pt-4 pb-0" onSubmit={handleSubmit}>
        <textarea
          type="text"
          className=" w-9/12 h-24 outline outline-offset-2 outline-1 pb-16 text-3xl"
          placeholder="Capture what is on your mind..."
          required="required"
          id="capture-goal"
          name="capture-goal"

        />

        <input
          name="input-custom-dropdown"
          className="tags-look"
          placeholder="write some tags"
          id="input-custom-dropdown"
        ></input>
        
        <button
          type="submit"
          className="bg-cyan-400 text-white font-bold py-2 px-4 rounded-full mt-4"
          id="capture-submit"
          name="capture-submit"

        >
          Submit
        </button>
        
      </form>



      <ul id="goalList">
        
        {todos.map((todo) => (
          
          <li key={todo.id}>
            
            

            <div>
            <input type="checkbox" name="" className="mx-2"/>
            
            {todoEditing === todo.id ?  <input type="text" onChange={(e) => setEditText(e.target.value)} value={editText} />
             :  <div>{todo.title}</div> }
            
            {/* <input name='tags4' readOnly className="mx-2"></input> */}
            <button className="border border-1 border-blue-400 rounded-md hover:bg-gray-600 hover:text-white transition ease-in-out delay-50 p-1 mx-1" onClick={() => setTodoEditing(todo.id)}>Edit</button>

            <button className="border border-1 border-blue-400 rounded-md hover:bg-red-600 hover:text-white transition ease-in-out delay-50 p-1" onClick={() => deleteGoal(todo.id)}>Delete</button>
            <button onClick={() => editTodo(todo.id)} className="border border-1 border-blue-400 rounded-md hover:bg-gray-600 hover:text-white transition ease-in-out delay-50 p-1">Save</button>
            </div>
          </li>
        ))}
      </ul>
      
    </>
  )}