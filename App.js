import Die from './Die'
import React from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App(props){
	
	const [diceArray, setDiceArray] = React.useState(allNewDice())
	
	const [tenzies, setTenzies] = React.useState(false)
	
	React.useEffect(()=>{
		
		
		if (diceArray.every(die => die.isHeld && die.value)){
			 setTenzies(true)
		} else {setTenzies(false)}
		
		
		
		
	}, [diceArray])
	
	const diceElement = diceArray.map(theDice => <Die value={theDice.value} 
													  key={theDice.id} 
													  isHeld={theDice.isHeld}
													  holdDice={()=>holdDice(theDice.id)}/>
	)
		
	
	function holdDice(id){
		
		setDiceArray(prevDice => prevDice.map(preDie => {
			return preDie.id === id? {...preDie, isHeld: !preDie.isHeld}
		 : {...preDie}}))	
	
	}
	
	function newGame(id){
		setDiceArray(die => die.map(dies => {
			return {...dies, 
				 
				value: Math.floor(Math.random() * 6),
				isHeld: false
				}
				
		}))
	}
	
	
	function allNewDice(){
		
		const newArray = []
		for (let i=0; i<10; i++){
		newArray.push({value: Math.floor(Math.random()* 6), isHeld: false, id: nanoid()} )
		}
		
		return newArray
		
	}
	
	
	function rollDice(id){
		
		setDiceArray(prevDice => prevDice.map(dice =>{
			return dice.isHeld? dice: {value: Math.floor(Math.random()* 6), isHeld: dice.isHeld, id: nanoid()}
		}))
	}
	
	return(
		<main className="main-container">
		{tenzies && <Confetti />  }
		
			<div className="game-container">
			
			<div className="die-grid">
			
			{diceElement}
				
				
				
			
			</div>	

				<button className="roll-dice" onClick={tenzies? newGame : rollDice}>
					{tenzies? "New Game" : "Roll Dice"}
				</button>
				
			</div>
		
		</main>
	)
}