import { default as React, Component  ,Fragment,useState,useEffect} from 'react';
import {Fade} from 'react-reveal';
import { useApi } from '../../services';
import * as Routes from '../../routes';
import { useHistory } from 'react-router';

const Quiz = () => {

	const { createScore,getScores } = useApi();
	const history = useHistory();
	const [huidigeVraag, sethuidigeVraag] = useState(0);
	const [toonScore, setToonScore] = useState(false);
	const [score, setScore] = useState(0);
	const [scorePosted,setScorePosted] = useState(false);
	const [visitorScores,setVisitorScores] = useState();


	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		  let c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	  }


	const handleScore = async () => {
		const name = getCookie('name');
		const location = getCookie('location');
		const age = getCookie('age');
		
		let data = {
			"name" : name,
			"location" : location,
			"age" : age,
			"score" : score
		};
		let response = await createScore(data);
		return response
	}

	const handleHome = ()  => {
		document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "location=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "age=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		history.push(Routes.HOME)
	}


	const vragen = [
			{
				vraag: 'What is the capital of France?',
				antwoordOpties: [
					{ antwoord: 'New York', isCorrect: false },
					{ antwoord: 'London', isCorrect: false },
					{ antwoord: 'Paris', isCorrect: true },
					{ antwoord: 'Dublin', isCorrect: false },
				],
			},
			{
				vraag: 'Who is CEO of Tesla?',
				antwoordOpties: [
					{ antwoord: 'Jeff Bezos', isCorrect: false },
					{ antwoord: 'Elon Musk', isCorrect: true },
					{ antwoord: 'Bill Gates', isCorrect: false },
					{ antwoord: 'Tony Stark', isCorrect: false },
				],
			},
			{
				vraag: 'The iPhone was created by which company?',
				antwoordOpties: [
					{ antwoord: 'Apple', isCorrect: true },
					{ antwoord: 'Intel', isCorrect: false },
					{ antwoord: 'Amazon', isCorrect: false },
					{ antwoord: 'Microsoft', isCorrect: false },
				],
			},
			{
				vraag: 'How many Harry Potter books are there?',
				antwoordOpties: [
					{ antwoord: '1', isCorrect: false },
					{ antwoord: '4', isCorrect: false },
					{ antwoord: '6', isCorrect: false },
					{ antwoord: '7', isCorrect: true },
				],
			},
		];


		const handleoptieClick = async (isCorrect) => {
			const fadeEffect = document.getElementsByClassName('quiz-vragen')[0];
			if (isCorrect) {
				setScore(score + 1);
			}

			const nextQuestion = huidigeVraag + 1;
			if (nextQuestion < vragen.length) {
				fadeEffect.style.opacity = 0;
				setTimeout(function(){ sethuidigeVraag(nextQuestion); }, 1500);
				setTimeout(function(){ fadeEffect.style.opacity = 1; }, 1500);
				
			} else {
				const questionSection = document.getElementsByClassName('question-section')[0];
				const info = document.getElementsByClassName('quiz-info')[0];
				const answerSection = document.getElementsByClassName('answer-section')[0];
				info.style.opacity = 0;
				questionSection.style.opacity = 0;
				answerSection.style.opacity = 0;
				await handleScore();
				const scores = await getScores();
				const lastScores = scores.slice(Math.max(scores.length - 5, 0))
				setVisitorScores(lastScores);
				const title = document.getElementById('quiz-info-title');
				title.style.opacity = 0;
				setTimeout(function(){ setToonScore(true); }, 1500);
				setTimeout(function(){ 	info.style.padding = '50px'; }, 1500);
				setScorePosted(true);
			}
		};
	
	const handleClick = (ev) => {
		const fadeEffect = document.getElementsByClassName('quiz-vragen')[0];
		ev.preventDefault();
		const btn = document.getElementById('quiz-btn');
		const quiz = document.getElementById('quiz');
		btn.style.opacity =  0;
		setTimeout(function(){ 	btn.parentNode.removeChild(btn); }, 1500);
		quiz.style.display = 'block';
		setTimeout(function(){ fadeEffect.style.opacity = 1; }, 1500);
	}

	useEffect(() => {
		let el = document.querySelector('.page');
		el.classList.add('fade-in');
		const btn = document.getElementById('quiz-btn');
		if(btn){
			setTimeout(function(){ 	btn.style.opacity = 1; }, 1000);
		}
		
		});

    



  return (
       <Fragment>
            <div className="quiz-div">
            
            <Fade top>
              <div className="quiz-info">
                  <h1 id="quiz-info-title" className="quiz-info-title">Hoe goed ken jij je Flandriens? Doe de test!</h1>
              </div>
            </Fade>

            <button id="quiz-btn" onClick={(ev) => handleClick(ev)} className="button quiz-btn">TEST MIJN KENNIS!</button>

            <div id="quiz" className="quiz-vragen">
            {toonScore ? (
			  <Fade>
              <div className='score-section'>
                <p>Je beantwoordde {score} van de {vragen.length} vragen correct!</p>
              </div>
			  {scorePosted ?
			  (	<div className="quiz-result">
				  	<p>Resultaten van recente bezoekers</p>
					<div className='quiz-results'>
						<table className="quiz-table">
							<tr>
								<th className="quiz-header">Naam</th>
								<th className="quiz-header">Afkomstig uit</th>
								<th className="quiz-header">Correcte vragen</th>							
								
							</tr>

							{visitorScores.map((item) => {
								return (
								<Fade top cascade>
								<tr >
									<td className="quiz-data">{item.name}</td>
									<td className="quiz-data">{item.location}</td>
									<td className="quiz-data"> {item.score}</td>							
									
								</tr>
								</Fade>
								)
							})}
							
							
						</table>
					</div>
					<a onClick={(ev) => handleHome(ev)} className="button quiz-end">RONDLEIDING AFLSUITEN</a>
				</div>
			  )
			 :
			(
				<p></p>	
			)}
			  </Fade>
            ) : (
              <>
                <div id="vragenDiv" className='question-section'>
                  <div className='question-count'>
                    <span className="question-title">Vraag {huidigeVraag + 1}</span>
                  </div>
                  <div className='question-text'>{vragen[huidigeVraag].vraag}</div>
                </div>
                <div className='answer-section'>
                  {vragen[huidigeVraag].antwoordOpties.map((optie) => (
                    <button className='answer-text' onClick={() => handleoptieClick(optie.isCorrect)}>{optie.antwoord}</button>
                  ))}
                </div>

				
              </>
            )}
            </div>
            
                
            </div>
            </Fragment>
  );
};

export default Quiz;