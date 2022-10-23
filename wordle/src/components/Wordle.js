import { useState, useEffect } from 'react'
import useWordle from '../hooks/useWordle'

//components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, handleClick, guesses, isCorrect, turn, usedKeys, errorMsg } = useWordle(solution)
  const [showModal, setShowModal] = useState(null)
 
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    document.addEventListener('click', handleClick)

    if(isCorrect){
        console.log('Congrats You Win')
        setTimeout(() => {
            setShowModal(true)
        }, 3000)
        window.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('click', handleClick)
    }
    if(turn > 5){
        console.log('Unlucky - out of guesses')
        setTimeout(() => {
            setShowModal(true)
        }, 2000)
        window.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('click', handleClick)
    }

    return () => {
        window.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('click', handleClick)
    }
  }, [handleKeyUp, handleClick, isCorrect, turn]);



  return (
    <>
    <div>{errorMsg}</div><br></br>
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    <Keypad usedKeys={usedKeys} />
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </>
  )
}
