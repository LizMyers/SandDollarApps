import React, { useState, useEffect } from 'react'

export default function Keypad( {usedKeys} ) {
    const[letters, setLetters] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/data/db.json/letters')
        .then(res => res.json())
        .then(json => {
            setLetters(json)
        })
    }, [])


  return (
    <div className="keypad">
        {letters && letters.map((l) => {
            const color = usedKeys[l.key]
            if(l.key === 'delete'){
                return (
                    <div key={l.key} className="deleteKey">del</div>
                )
            }
            return (
                <div key={l.key} className={color}>{l.key}</div>    
            )
        })}
        <div className="enterKey">Enter</div>
    </div>
  )
}
