import {useState} from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})  
    const [errorMsg, setErrorMsg] = useState('')


    //format a guess into an arry of letter objects
    //e. g. [key: 'a', color: 'yellow' ]
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        })

        //find any green letters
        formattedGuess.forEach((l, i) => {
          if(isCorrect && solutionArray[i] === l.key){}
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

         //find any yellow letters
         formattedGuess.forEach((l, i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }
      
    //add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setHistory((prevHistory) => {
            return[...prevHistory, currentGuess]
        })
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key]
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green'
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow'
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey'
                return
              }
            })
      
            return prevUsedKeys
          })
          setCurrentGuess('')
        }

    // handle keyup event & track current guess
    // if the user presses enter, add the new guess
    const handleKeyUp = ({ key }) => {
        setErrorMsg('')
        if (key === 'Enter') {
            // only add guess if turn is less than 5
            if(turn > 5){
                console.log('You used all your guesses')
                setErrorMsg('You used all your guesses')
                return
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)){
                console.log('You already tried that word')
                setErrorMsg('You already tried that word')
                return
            }
            // check word is 5 chars long
            if(currentGuess.length !== 5){
                console.log('Word must be 5 chars long')
                setErrorMsg('Word must be 5 chars long')
                return
            }

          const formatted = formatGuess(); 
          addNewGuess(formatted);
        }
        if (key === 'Backspace') {
          setCurrentGuess(prev => prev.slice(0, -1))
          setErrorMsg('')
          return
        }
        if (/^[A-Za-z]$/.test(key)) {
          if (currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key)
            setErrorMsg('')
          }
        }
      }
      

      const handleClick = (e) => {
        let letterClicked = e.target.innerHTML

        if (letterClicked === 'Enter') {
            // only add guess if turn is less than 5
            if(turn > 5){
                console.log('You used all your guesses');
                return
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)){
                console.log('You already tried that word');
                return
            }
            // check word is 5 chars long
            if(currentGuess.length !== 5){
                console.log('word must be 5 chars long');
                return
            }

          const formatted = formatGuess(); 
        //   if(solutionArray.includes(formatted)){
        //     addNewGuess(formatted);
        //   } else {
        //     console.log("Word is not in the English Dictionary")
        //   }
          addNewGuess(formatted);
        }

         if (letterClicked === 'Del') {
            setCurrentGuess(currentGuess.slice(0, -1)) 
            return
        }
          
        if (/^[A-Za-z]$/.test(letterClicked)) {
            if (currentGuess.length < 5) {
              setCurrentGuess(currentGuess + letterClicked)
            }
            console.log("You clicked: " + letterClicked);
          }
      }
    

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        handleKeyUp,
        handleClick,
        usedKeys,
        errorMsg,
    }

}

export default useWordle