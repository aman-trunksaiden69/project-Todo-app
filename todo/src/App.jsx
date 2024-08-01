import React, {useState} from 'react';
import './style.css'; 

function App() {
 
  const [title, settitle] = useState("");
  const [tasks, settasks] = useState([]);

  const submithandler = (e) => {
    e.preventDefault();
    
    const copytasks = [...tasks]//copy the tasks array value in the copytasks array through spread operator.
    copytasks.push({title, completed: false});
    settasks(copytasks);

    //settasks([...tasks, newtask])

    settitle("");

  }

  const FuncTaskToggel = (e, i) => {
    e.target.classList.toggle("bg-red-500");
    e.target.classList.toggle("border");
    e.target.nextSibling.classList.toggle("line-through");

    const copytasks = [...tasks];
    copytasks[i].completed = !tasks[i].completed;
    settasks(copytasks)
  };

  const DeleteHandler = (i) => {
  
    const updatetask = [...tasks];
    let isValid = false;

    if(!updatetask[i].completed){
       
       isValid = confirm("Do you really want to delete the task?")
    }
    if(isValid || updatetask[i].completed){
      updatetask.splice(i, 1)
      settasks(updatetask)
    }
    
    console.log(updatetask)
  }

  console.log(tasks)

  let taskrender = (
    <h1 className='text-center z-[2] mr-2 text-purple-900 font-semibold font-["gilroy"] text-2xl'>
      No Pending Tasks...
    </h1>
  );
  if(tasks.length > 0){
    taskrender = tasks.map((task, index) => {
      return(
        <li key={index} className="tod mb-4 flex justify-between items-center border rounded-xl py-1 px-2">
              <div className="tog flex items-center">
                <div onClick={(e) => FuncTaskToggel(e, index)} className={`mr-4 rounded-full w-[30px] h-[30px] border border-purple-600`}>
                </div>
                  <h1 className={`text-[1.4rem] font-extrabold pb-1 text-yellow-200`}>
                      {task.title}
                  </h1>
              </div>
                    
              <div className="flex gap-3 text-2xl font-light text-yellow-100">
                 <i className="ri-file-edit-line"></i>
                 <i className="delete ri-delete-bin-4-line" onClick={() => DeleteHandler(index)}></i>
              </div>
        </li>
       );
    })

  };

  return (
    <>
    <div className='main w-screen h-screen flex items-center justify-center relative'>
      <h1 className='text-3xl font-["Magic_Retro"] text-white absolute top-[3%] left-[3%]'><span className='text-purple-500 mr-2'>Todo</span>App</h1>
      
      <form onSubmit={submithandler} className='form w-[50%] h-[90%] rounded-[5%] border border-white flex items-center justify-evenly flex-col'>
      <div className="box w-[65%] flex items-center justify-center gap-24 h-[30%] bg-black border-2 border-purple-900 rounded-[30px]">
        <h1 className='text-white w-[45%] text-4xl pb-5 font-["gilroy"] font-semibold'>Todo Done</h1>
        <h2 className='text-white absolute top-[58%] left-[4%] text-xl font-semibold font-[gilroy]'>Keep doing things...</h2>
        <div className="circle text-2xl font-semibold text-black flex items-center justify-center w-[9vmax] h-[9vmax] rounded-full bg-purple-900">
        {tasks.filter((t) => t.completed === true).length}/
        {tasks.length}
        </div>
      </div>

      <div className="inp flex items-center justify-center gap-3">
          <input className='pl-2 px-20 py-1 text-sm font-["gilroy"] text-white rounded-full placeholder border-none bg-zinc-700' type="text" placeholder='Write Your Next Task...' value={title} onChange={(e) => settitle(e.target.value)}/>
          <button className="btn outline-none text-lg font-bold flex justify-center text-center items-center w-[2.2vmax] h-[2.2vmax] rounded-full bg-purple-900 pt-1">
            <i className="il ri-add-fill"></i>
          </button>
      </div>
      <ul className="list-none mb-28 w-[50%] ">{taskrender}</ul>
      </form>
    </div>

    </>
  )
}

export default App