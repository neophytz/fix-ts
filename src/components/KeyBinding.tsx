import React, { useEffect, useState } from 'react'

interface KeyBindingProps {
  children: JSX.Element | React.ReactNode
}

// HOC - High order component;
export const KeyBinding: React.FC<KeyBindingProps> = ({children}) => {
  const [globalSearchActive, setGlobalSearchActive] = useState(false);
  useEffect(() => {
    const shortcutListener = (e) => {
      if(e.ctrlKey && e.key === "k") {
        setGlobalSearchActive(true);
      } else if(e.key === "Escape") {
        setGlobalSearchActive(false);
      }
    }

    window.addEventListener("keydown", shortcutListener)
    return () =>{
      window.removeEventListener("keydown", shortcutListener);
    }
  }, [])
  
  return (
    <React.Fragment>
      {children}
      <section style={{visibility: globalSearchActive ? 'inherit' : "hidden"}} className='fixed top-0 z-20 h-screen w-screen bg-gray-900 opacity-75 grid place-items-center transition duration-500'>
        <div className='rounded w-[70rem] shadow-lg h-[40rem] bg-white'>
          <button className='border p-3 w-48 m-5 rounded hover:bg-gray-100 transition duration-150' onClick={() => setGlobalSearchActive(false)}>Close</button>
        </div>
      </section>
    </React.Fragment>
  )
}
