import React, { useState } from 'react';

interface Item {
  id: number;
  text: string;
  complete: boolean;
}

interface TodolistProps {
  notelist: Item[];
  setNotelist: any
  handleClickCheck: (id: number) => void;
  handleClickExit: (id: number) => void;
  // updateText:(dsNote:Item[]) => void;
}

const Todolist = ({ notelist, setNotelist, handleClickCheck, handleClickExit}: TodolistProps) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  const [id_modify, setId_modify] = useState(0);

  const handleDoubleClick = (text: string,id:number) => {
    // if(event.target.key === id){
      setEditing(true);
      setId_modify(id);
      setEditedText(text)
    // }
    
  };

  const handleTextSave = (id: number) => {
    handleClickCheck(id);
    setEditing(false);
    const updatedNoteList = notelist.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          text: editedText,
        };
      }
      return note;
    });
    setNotelist(updatedNoteList)
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };
  
  return (
    <>

      <div className='w-4/12 todolist m-auto' >
        {notelist.map((note: Item) => (
          <div className='flex space-x-4' key={note.id}>
            {editing&&(id_modify===note.id) ? (
              <span style={{ display: 'block' }}>
                <input className='p-3   w-full my-3'
                  type="text"
                  value={editedText}
                  onChange={handleTextChange}
                  onBlur={() => handleTextSave(id_modify)}
                />
              </span>
            ) : (
              <button key={note.id}
                className='todo p-3  w-10/12 my-3 bg-orange-300'
                style={{ textDecorationLine: note.complete ? 'line-through' : 'none' }}
                onClick={() => handleClickCheck(note.id)}
                onDoubleClick={(e) => handleDoubleClick(note.text,note.id)}
              >
                {note.text}
              </button>)}


            {note.complete && (
              <button
                onClick={() => handleClickExit(note.id)}
                className='w-2/12 p-3 my-3 bg-red-400'
              >
                X
              </button>
            )}
          </div>
        ))}
      </div >
    </>
  );
};

export default Todolist;