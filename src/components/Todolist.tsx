import React, { useState,useEffect ,memo} from 'react'
import { compileFunction } from 'vm';

//1 todo gồm id,text,complete
interface item{
  id: number;
  text: string;
  complete: boolean;
}

export const Todolist = () => {
  var todo = localStorage.getItem('todo');
  const [notelist, setNotelist] = useState<item[]>(JSON.parse(todo||''))    //Lưu các mục todo
  const [title, setTitle] = useState<string>('')    //Lữu text khi nhập vào input
  const handClickAdd = ()=>{
    if(title.trim()!==''){   //không thêm khoảng trống
      const newTodo: item = {id: Date.now(), text: title,complete: false}
      setNotelist([...notelist,newTodo])
      setTitle('')
    }
  }

  //Cập nhật complete khi click vào mục todo đã hoàn thành
  const handleClickCheck = (id:number) =>{
    setNotelist(
      notelist.map((note)=>{
        if(note.id === id){
          return {...note, complete: !note.complete}
        }
        return note;
      })
    );
  };


  //lấy DL từ localStorage
  useEffect(() => {
    let note = localStorage.getItem('todo');
    // console.log(note)
    if(note){
      setNotelist(JSON.parse(note));
    }
  }, []);

  //Truyền dữ liệu vào LocalStorage
  useEffect(() => {
      const arrayTodo = JSON.stringify(notelist);
      // console.log(arrayTodo)
      localStorage.setItem('todo', arrayTodo);
  }, [notelist]);


  const handleClickExit = (id:number)=>{
    setNotelist(
      notelist.filter((note)=>{
        return note.id !== id
      })
    )
  }
  
  
  return (
    <div className='App w-10/12 m-auto h-[700px] bg-orange-200 '>
      <h1 className="text-3xl font-bold text-center w-full">
          Danh sách việc cần làm
        </h1>
      <div className='title flex justify-center mt-5'>

        <input className='pl-5 w-3/12 inputcv bg-gray border-2 border-neutral-700 p3' 
        placeholder=' Nhập công việc... ' 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}/>
        <button onClick={handClickAdd} className='w-1/12 border-2 border-neutral-700 bg-emerald-500 text-white p-3 font-bold'>Thêm</button>
      </div>

      <div className='w-4/12 todolist m-auto'>
      
        {notelist.map((note,key)=>(
          <div className='flex space-x-4' key={key}>
            <button className='todo p-3  w-10/12 my-3 bg-orange-300 ' key={note.id} 
            style={{textDecorationLine: note.complete ? 'line-through' : 'none'}}
            onClick={()=>handleClickCheck(note.id)}>{note.text}</button>
            {note.complete &&  <button onClick={()=>handleClickExit(note.id)} className='w-2/12 p-3 my-3 bg-red-400' >X</button>}
          </div>
        ))}
    </div>
    </div>
  )
}

export default Todolist