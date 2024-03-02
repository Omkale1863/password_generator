import { useCallback } from 'react'; //bina use callback ke bhi bana sakte hai
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
//import './App.css'

function App() {
  const [length , setlength] = useState(8)
  //Number ya toh lo ya mat lo
  const [NumberAllowed , setNumberAllowed] = useState(false);  //for Numbers
  const [CharacterAllowed , setCharacterAllowed] = useState(false);
  //for password Generation 
  const [password , setpassword] = useState("")
  //use ref hook
  const passwordRef = useRef(null)
  //
  const passwordGenerator = useCallback(() => { 
    //ismei javascript kam mei aati hai
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(NumberAllowed) str+="0123456789"
    if(CharacterAllowed) str+="~!@#$%^&*()_-+={[}]|\:;'<,>.?/"

    for (let i = 1; i < length; i++) {
      //const element = array[i];
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
    }
    //useEffect
    //learn documentation of useEffect Hook

    setpassword(pass)


  }, [length, NumberAllowed, CharacterAllowed, setpassword])
  //useCallback is a React Hook that lets you cache a function definition between re-renders.
  //useCallback(fn, dependencies)
  //Number aur Characters ye dependencies hai 

  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writetext(password)
  } , [password])

 useEffect(() => {passwordGenerator()} , [length , NumberAllowed , CharacterAllowed , passwordGenerator])  //callback aur dependencies
  return (
    <>
    {/*max width is 448 pixels*/}
    <div className="min-h-screen bg-black ">
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 
    bg-gray-800'>
      <h1 className='text-white text-center my-7'> Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password} 
        className='outline-none w-full px-1 py-3'
        placeholder='Password'
        readonly //ki changes na kar paye
        Ref= {passwordRef}
        />
        <button
        onClick={copypasswordtoclipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink -0
        '>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
           type="range"
           min={6}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange={(e) => {setlength(e.target.value)}}
            />
            <label >length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked={NumberAllowed}
           id="numberinput"
           onChange={
            () => {
              setNumberAllowed((prev) => !(prev));
            }
           }
           />
           <label htmlFor="numbersinput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={CharacterAllowed}
           id="Characterinput"
           onChange={
            () => {
              setCharacterAllowed((prev) => !(prev));
            }
           }
           />
           <label htmlFor="Characterinput">Characters</label>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default App
