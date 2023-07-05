import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export default function Capture() {
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
    // tagify.addTags([]);
    
  }, []);

  useEffect(() => {
    var output = document.querySelector('input[name=tags4]'),
    tagifyOutput = new Tagify(output);
    // tagify.addTags([]);
    
  }, []);

  const [todos, setTodos] = useState([{
    id: v4(),
    title: "test1",
    tags: ["test2", "test3"],
    completed: false,
  },
  {
    id: v4(),
    title: "test4",
    tags: ["test5", "test6"],
    completed: false,
  }]);

  const [tags, setTags] = useState([]);
  const goals = document.getElementById("capture-goal");
  const tagsInput = document.getElementById("input-custom-dropdown");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: v4(),
      title: goals.value,
      tags: tagsInput.value,
      completed: false,
    };
    setTodos([...todos, newTodo]);
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
          value="hi"
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
          <li>
            <div>
            <input type="checkbox" name="" id="" className="mx-2" />
            {todo.title}
            <input name='tags4' readonly value={todo.tags} className="mx-2"></input>
            </div>
          </li>
        ))}
      </ul>
    </>
  )}
