import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE} from '../actions';

const initialState = {
	feedback: "Make your Guess!",
	guesses: [],
	auralStatus: '', 
	correctAnswer: Math.round(Math.random() * 100) + 1
};

export default (state=initialState, action) => {
	switch(action.type) {

		case RESTART_GAME:
			return Object.assign({}, state,  {
				feedback: "Make your Guess!",
				guesses: [],
				auralstatus: '',
				correctAnswer: Math.floor(Math.random() * 100) + 1
			});

		case MAKE_GUESS:
			let feedback, guess;

			guess = parseInt(action.guess, 10);
			if (isNaN(guess)) {
				feedback = 'Please enter a valid number';
				return Object.assign({}, state, {
				feedback,
				guesses: [...state.guesses, action.guess] //should be action.guess or guess? And why are we using the same Object.assign twice?
				});
			}

			const difference = Math.abs(guess - state.correctAnswer);

			if (difference >= 50) {
				feedback = "You\'re Ice Cold...";
			} 

			else if (difference >=30) {
				feedback = "You\'re Cold...";
			}

			else if (difference >= 10) {
				feedback = "You\'re Warm.";
			}

			else if (difference >= 1) {
				feedback = "You got it!";
			}

			document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';


			return Object.assign({}, state, {
				feedback, 
				guesses: [...state.guesses, action.guess] //should be action.guess or guess? And why are we using the same Object.assign twice?
			});

		case GENERATE_AURAL_UPDATE:
			const {guesses} = state; //removed feedback inside the curly brackets, as it was giving an error but it was tehir in the solution

			//If there's not exactly 1 guess, we want to pluralize the nouns in this
			// aural update.

			const pluralize = guesses.length != 1; 

			let auralStatus = `Here's the status of the game right now: ${feedback}. You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

			if (guesses.length > 0) {
				auralStatus += `${pluralize ? 'In order of most- to least-recent, they are': 'It was'}: {{guesses.reverse().join(', ')}`;
			}
			
			return Object.assign({}, state, {
				auralStatus: [...state.auralStatus, action.auralstatus]
			});	

		default:
			return state;		
	}

	return state;
}