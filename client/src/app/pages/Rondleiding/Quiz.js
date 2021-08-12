import { default as React, Component  ,Fragment,useState,useEffect} from 'react';
import {Fade,Slide} from 'react-reveal';
import { useApi } from '../../services';

const Quiz = () => {

	const { addScore } = useApi();

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
			"age" : age
		};
		let response = await addScore(data);
		console.log(response)
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

		const [huidigeVraag, sethuidigeVraag] = useState(0);
		const [toonScore, setToonScore] = useState(false);
		const [score, setScore] = useState(0);

		const handleoptieClick = (isCorrect) => {
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
				setToonScore(true);
				const title = document.getElementById('quiz-info-title');
				title.style.opacity = 0;
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


            {/* <Fade delay={1000} top> */}
            <button id="quiz-btn" onClick={(ev) => handleClick(ev)} className="button quiz-btn">TEST MIJN KENNIS!</button>
            {/* </Fade> */}


            <div id="quiz" className="quiz-vragen">
            {toonScore ? (
              <div className='score-section'>
                <p>Je beantwoordde {score} van de {vragen.length} vragen correct!</p>
              </div>
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
            {/* </Fade> */}
                
            </div>
            </Fragment>
  );
};

export default Quiz;