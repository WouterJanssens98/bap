import { default as React, Component  ,Fragment,useState,useEffect, useRef} from 'react';
import { useAuth, useApi } from '../../services';
import * as Routes from '../../routes';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {Fade,Slide} from 'react-reveal';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Quiz = () => {

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
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = huidigeVraag + 1;
		if (nextQuestion < vragen.length) {
			sethuidigeVraag(nextQuestion);
		} else {
			setToonScore(true);
		}
	};
  
  const handleClick = (ev) => {
    ev.preventDefault();
    const btn = document.getElementById('quiz-btn');
    const quiz = document.getElementById('quiz');
    btn.style.opacity =  0;
    btn.parentNode.removeChild(btn);
    quiz.style.display = 'block';
   
  }

  useEffect(() => {
      let el = document.querySelector('.page');
      el.classList.add('fade-in');
    });

    



  return (
       <Fragment>
            <div className="quiz-div">
            
            <Fade top>
              <div className="quiz-info">
                  <h1 className="complete-info-title">Hoe goed ken jij je Flandriens? Doe de test!</h1>
              </div>
            </Fade>
            <Fade delay={1000} top>
            <button id="quiz-btn" onClick={(ev) => handleClick(ev)} className="button quiz-btn">TEST MIJN KENNIS!</button>
            </Fade>
            <Fade delay={1000} top>
            <div id="quiz" className="quiz-vragen">
            {toonScore ? (
              <div className='score-section'>
                <p>Je beantwoordde {score} van de {vragen.length} vragen correct!</p>
              </div>
            ) : (
              <>
                <div className='question-section'>
                  <div className='question-count'>
                    <span>Vraag {huidigeVraag + 1}</span>/{vragen.length}
                  </div>
                  <div className='question-text'>{vragen[huidigeVraag].vraag}</div>
                </div>
                <div className='answer-section'>
                  {vragen[huidigeVraag].antwoordOpties.map((optie) => (
                    <button onClick={() => handleoptieClick(optie.isCorrect)}>{optie.antwoord}</button>
                  ))}
                </div>
              </>
            )}
            </div>
            </Fade>
                
            </div>
            </Fragment>
  );
};

export default Quiz;