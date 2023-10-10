import React from 'react';

interface Item {
  id: number;
  text: string;
  complete: boolean;
}

interface TodolistProps {
  notelist: Item[];
  handleClickCheck: (id: number) => void;
  handleClickExit: (id: number) => void;
}

const Todolist = ({ notelist, handleClickCheck, handleClickExit }:TodolistProps) => {
  return (
    <div className='w-4/12 todolist m-auto'>
      {notelist.map((note: Item) => (
        <div className='flex space-x-4' key={note.id}>
          <button
            className='todo p-3  w-10/12 my-3 bg-orange-300'
            style={{ textDecorationLine: note.complete ? 'line-through' : 'none' }}
            onClick={() => handleClickCheck(note.id)}
          >
            {note.text}
          </button>
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
    </div>
  );
};

export default Todolist;