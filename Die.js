export default function Die(props){
	
	
	return(
	
		<div onClick={props.holdDice} className={props.isHeld? "dice-grid-held" : "dice-grid"}>
		
			<h2>{props.value}</h2>
		
		</div>
	)
}