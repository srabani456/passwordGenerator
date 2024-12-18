
import { useState,useCallback ,useEffect,useRef} from 'react'


function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  //useRef hooks : it is used for selection references 
  const passwordRef=useRef(null);

  //usecallback's [] is used to optimized and store in memory means in cache....
  // here without callback it also runs but using usecallBack it is optimized...means usecallback memorized the function 
  const passwordGenerator=useCallback(() => {
      let pass="";
      let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if(numberAllowed) str+="0123456789";
      if(charAllowed) str+="+=-_!@#%*(){[]}|/?~";
      for (let i = 1; i <=length; i++) {
        let chars=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(chars);
      }
      setPassword(pass);
    },
    [length,numberAllowed,charAllowed,setPassword],
  );
  const copyPaswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,40);//if we select in a range  then we use this 
    window.navigator.clipboard.writeText(password);
  },[password])

  //in useeffect if there is any change in the [ ] then again run the function
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md bg-gray-700 rounded-lg mx-auto shadow-md px-4 py-3 my-8 text-orange-400'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          placeholder='Password'
          className=' outline-none w-full py-1 px-4'
          readOnly
          ref={passwordRef}
          />
          <button 
            onClick={copyPaswordToClipBoard}
            className='bg-blue-700 text-white shrink-0 px-2 py-1 outline-none cursor-pointer hover:bg-blue-500'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={40}
              value={length}
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label >length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }} 
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }} 
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
       
    </>
  )
}

export default App
