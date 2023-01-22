import React, { useState } from "react"
import {faCheckCircle, faTrashCan, faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { nanoid } from "nanoid"

function App() {

  const backgrounds = [
    'bg-gradient-to-br from-green-300 to-green-400',
    'bg-gradient-to-br from-yellow-300 to-yellow-400',
    'bg-gradient-to-br from-red-300 to-red-400',
  ]

  const [noteData, setNoteData] = useState(
    {
      note: '',
      priority: 'middle',
      id: nanoid(),
      done: false
    }
  )

  const [noteList, setNoteList] = useState([])

  const handleSubmit = event => {
    event.preventDefault()
    if (noteData.note === '' || 'undefined') {
      console.log('bke')
      setNoteData(oldData => ({
        ...oldData, 
        note: 'No title\nNo content'
      }))
    }
    console.log(noteData.note)
    setNoteList(prevNotes => ([
      noteData,
      ...prevNotes
    ]
    ))
    setNoteData({
        note: '',
        priority: 'middle',
        id: nanoid(),
        done: false
      }
      )
  }

  const handleChange = event => {
    event.preventDefault()
    const {name, value} = event.target
    setNoteData(oldData => ({
      ...oldData,
      [name]: value
    }))
  }

  const helpMeDisplayLines = string => {
    const linesArray = string.split('\n')
    linesArray.splice(0, 1)
    for (let i = 0; i < linesArray.length; i++) {
      linesArray[i] += '\n' // pls halp
    }
    return linesArray
  }

  const deleteNote = idInput => {
    const duplicateList = [...noteList]
    for (let i = 0; i < duplicateList.length; i++) {
      if (duplicateList[i].id === idInput) {
        duplicateList.splice(i, 1)
      }
    }
    setNoteList(duplicateList)
  }

  const setDone = idInput => {
    const duplicateList = [...noteList]
    for (let i = 0; i < duplicateList.length; i++) {
      if (duplicateList[i].id === idInput) {
        console.log(duplicateList[i].id, idInput)
        duplicateList[i].done = !duplicateList[i].done
      }
    }
    console.log(duplicateList)
    setNoteList(duplicateList)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full h-40 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-600 brightness-95">
          <div className="grid md:grid-cols-12 sm:grid-cols-4 gap-10 pt-8">
            <div className="md:col-span-3 md:block sm:hidden"></div>
            <div className="md:col-span-4 sm:col-span-2">
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="note">Type your note here</label>
                <textarea
                  className="resize-none rounded-lg p-2 bg-slate-100 appearance-none focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  autoFocus={true}
                  name='note'
                  placeholder="Title &#10;Contents"
                  value={noteData.body}
                  maxLength={140}
                  onChange={handleChange}
                  ></textarea>
              </div>
            </div>
          <div>
          <div className='grid grid-rows-4 gap-1'>
            <div><p>Priority</p></div>
            <div className="flex items-center flex-row gap-2">
              <input
                className="appearance-none bg-slate-100 border-2 border-slate-200 focus:opacity-100 checked:bg-red-400 focus:border-blue-300 focus:outline-none transition duration-200 rounded-full cursor-pointer w-4 h-4 my-1"
                type='radio'
                name='priority'
                value='high'
                onChange={handleChange}
                ></input>
              <label htmlFor="high">High</label>

            </div>

            <div className="flex items-center flex-row gap-2">
              <input
                className="appearance-none bg-slate-100 border-2 border-slate-200 focus:opacity-100 checked:bg-yellow-400 focus:border-blue-300 focus:outline-none transition duration-200 rounded-full cursor-pointer w-4 h-4 my-1"
                type='radio'
                name='priority'
                value='middle'
                onChange={handleChange}
                ></input>
              <label htmlFor="middle">Middle</label>

            </div>

            <div className="flex items-center flex-row gap-2">
              <input
                className="appearance-none bg-slate-100 border-2 border-slate-200 focus:opacity-100 checked:bg-green-400 focus:border-blue-300 focus:outline-none transition duration-200 rounded-full cursor-pointer w-4 h-4 my-1"
                type='radio'
                name='priority'
                value='low'
                onChange={handleChange}
                ></input>
              <label htmlFor="low">Low</label>

            </div>

          </div>
          </div>
          <div className="pt-12">
            <button type="submit" className="bg-gradient-to-br from-orange-300 to-orange-600 rounded-xl h-10 w-10 hover:bg-gradient-to-br hover:from-orange-300 hover:to-orange-500 transition duration-200 focus:border-2 focus:border-blue-300 appearance-none"><FontAwesomeIcon icon={faCheckCircle}/></button>
          </div>
          </div>
        </div>
      </form>
      <div className="flex flex-row flex-wrap justify-start gap-y-16 gap-x-10 p-10">
        {noteList.map(item => {
          return (
            <div className={`flex-none w-80 h-52 relative shadow-inner shadow-md brightness-95 ${item.done ? 'opacity-80' : 'opacity-95'} ${item.priority === 'high' ? backgrounds[2] : item.priority === 'middle' ? backgrounds[1] : backgrounds[0] } rounded-lg`}>
                <p className="px-8 py-2 text-xl">{item.note.split('\n')[0]}</p>
                <div className={`w-5/6 h-0.5 mx-auto -mt-2 opacity-95 brightness-95 rounded ${item.priority === 'high' ? 'bg-red-400' : item.priority === 'middle' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                <p className={`p-2 pl-4 whitespace-pre-wrap break-words ${item.done ? ' line-through' : ''}`}>{helpMeDisplayLines(item.note)}</p>
                <button className="absolute right-8 bottom-2 appearance-none focus:ring-2 focus:ring-blue-300" onClick={() => setDone(item.id)}>{item.done ? <FontAwesomeIcon icon={faCheckSquare}/> : <FontAwesomeIcon icon={faSquare}/>}</button>
                <button className="absolute right-2 bottom-2 appearance-none focus:ring-2 focus:ring-blue-300" onClick={() => deleteNote(item.id)}><FontAwesomeIcon icon={faTrashCan}/></button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
