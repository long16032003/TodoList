import React, { useState, useEffect, memo } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './components/Todolist';


interface item {
  id: number;
  text: string;
  complete: boolean;
}

function App() {
  var todo = localStorage.getItem('todo');
  const [notelist, setNotelist] = useState<item[]>(JSON.parse(todo || ''))    //Lưu các mục todo
  const [title, setTitle] = useState<string>('')    //Lữu text khi nhập vào input
  const handClickAdd = () => {
    if (title.trim() !== '') {   //không thêm khoảng trống
      const newTodo: item = { id: Date.now(), text: title, complete: false }
      setNotelist([...notelist, newTodo])
      setTitle('')
    }
  }

  //Cập nhật complete khi click vào mục todo đã hoàn thành
  const handleClickCheck = (id: number) => {
    setNotelist(
      notelist.map((note) => {
        if (note.id === id) {
          return { ...note, complete: !note.complete }
        }
        return note;
      })
    );
  };


  //lấy DL từ localStorage
  useEffect(() => {
    let note = localStorage.getItem('todo');
    // console.log(note)
    if (note) {
      setNotelist(JSON.parse(note));
    }
  }, []);

  //Truyền dữ liệu vào LocalStorage
  useEffect(() => {
    const arrayTodo = JSON.stringify(notelist);
    // console.log(arrayTodo)
    localStorage.setItem('todo', arrayTodo);
  }, [notelist]);


  const handleClickExit = (id: number) => {
    setNotelist(
      notelist.filter((note) => {
        return note.id !== id
      })
    )
  }

  return (
    <>
      <div className='App w-10/12 m-auto h-[700px] bg-orange-200 '>
        <h1 className="text-3xl font-bold text-center w-full">
          Danh sách việc cần làm
        </h1>
        <div className='title flex justify-center mt-5'>

          <input className='pl-5 w-3/12 inputcv bg-gray border-2 border-neutral-700 p3'
            placeholder=' Nhập công việc... '
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handClickAdd} className='w-1/12 border-2 border-neutral-700 bg-emerald-500 text-white p-3 font-bold'>Thêm</button>
        </div>
        <Todolist notelist={notelist} handleClickCheck={handleClickCheck} handleClickExit={handleClickExit}/>
      </div>
    </>
  )
}

export default App;
