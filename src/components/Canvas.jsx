import React from 'react';
import PropTypes from 'prop-types';
// import Sky from './Sky';
//import Ground from './Ground';
// import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CurrentScore from './CurrentScore'
import FlyingObject from './FlyingObject';
import StartGame from './StartGame';
// import Title from './Title';
// import Leaderboard from './Leaderboard';
// import { signIn } from 'auth0-web';
import CannonBall from './CannonBall';
import Heart from './Heart';
//import RandomFocus from './RandomFocus';
import { generateRandomNumber } from '../utils/formulas';
import { skyAndGroundWidth } from '../utils/constants';
import { pathFromBezierCurve } from '../utils/formulas';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
  let score = 30;
  const lives = [];

  for (let i = 0; i < props.gameState.lives; i++) {
    const heartPosition = {
      x: -180 - (i * 70),
      y: 35
    };
    lives.push(<Heart key={i} position={heartPosition}/>);
  }
  
  const Sky = () => {
    const skyStyle = {
      fill: '#30abef',
    };
    const gameHeight = 1200;
    return (
      <rect
        style={skyStyle}
        x={skyAndGroundWidth / -2}
        y={100 - gameHeight}
        width={skyAndGroundWidth}
        height={gameHeight}
      />
    );
  };

  const Ground = () => {
    const groundStyle = {
      fill: '#59a941',
    };
    const division = {
      stroke: '#458232',
      strokeWidth: '3px',
    };
  
    return (
      <g id="ground">
        <rect
          id="ground-2"
          data-name="ground"
          style={groundStyle}
          x={skyAndGroundWidth / -2}
          y={0}
          width={skyAndGroundWidth}
          height={100}
        />
        <line
          x1={skyAndGroundWidth / -2}
          y1={0}
          x2={skyAndGroundWidth / 2}
          y2={0}
          style={division}
        />
      </g>
    );
  };

  const CannonBase = (props) => {
    const cannonBaseStyle = {
      fill: '#a16012',
      stroke: '#75450e',
      strokeWidth: '2px',
    };
  
    const baseWith = 80;
    const halfBase = 40;
    const height = 60;
    const negativeHeight = height * -1;
  
    const cubicBezierCurve = {
      initialAxis: {
        x: -halfBase,
        y: height,
      },
      initialControlPoint: {
        x: 20,
        y: negativeHeight,
      },
      endingControlPoint: {
        x: 60,
        y: negativeHeight,
      },
      endingAxis: {
        x: baseWith,
        y: 0,
      },
    };
  
    return (
      <g>
        <path
          style={cannonBaseStyle}
          d={pathFromBezierCurve(cubicBezierCurve)}
        />
        <line
          x1={-halfBase}
          y1={height}
          x2={halfBase}
          y2={height}
          style={cannonBaseStyle}
        />
      </g>
    );
  };

  const Title = () => {
    const textStyle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 120,
      fill: '#cbca62',
    };
  
    const aliensLineCurve = {
      initialAxis: {
        x: -190,
        y: -950,
      },
      initialControlPoint: {
        x: 95,
        y: -50,
      },
      endingControlPoint: {
        x: 285,
        y: -50,
      },
      endingAxis: {
        x: 380,
        y: 0,
      },
    };
  
    const goHomeLineCurve = {
      ...aliensLineCurve,
      initialAxis: {
        x: -250,
        y: -780,
      },
      initialControlPoint: {
        x: 125,
        y: -90,
      },
      endingControlPoint: {
        x: 375,
        y: -90,
      },
      endingAxis: {
        x: 500,
        y: 0,
      },
    };
  
    return (
      <g filter="url(#shadow)">
        <defs>
          <path
            id="AliensPath"
            d={pathFromBezierCurve(aliensLineCurve)}
          />
          <path
            id="GoHomePath"
            d={pathFromBezierCurve(goHomeLineCurve)}
          />
        </defs>
        <text {...textStyle}>
          <textPath xlinkHref="#AliensPath">
            Aliens,
          </textPath>
        </text>
        <text {...textStyle}>
          <textPath xlinkHref="#GoHomePath">
            Go Home!
          </textPath>
        </text>
      </g>
    );
  };

  const RandomFocus = (props) => {
    const scoreStyle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 80,
      fill: 'orange',
    };

    let score = generateRandomNumber();

    // setInterval(()=>{
    //     score = generateRandomNumber();
    // }, 2000);

    // console.log(score);
  
    return (
      <g filter="url(#shadow)">
        <text style={scoreStyle} x="300" y="-80">
          {score}
        </text>
      </g>
    );
  };

  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
      onClick={props.shoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      {Sky()}
      {Ground()}

      {props.gameState.cannonBalls.map(cannonBall => (
        <CannonBall
          key={cannonBall.id}
          position={cannonBall.position}
        />
      ))}

      <CannonPipe rotation={props.angle} />
      {CannonBase()}
      <CurrentScore score={props.gameState.kills} />

      { ! props.gameState.started &&
      <g>
        <StartGame onClick={() => props.startGame()} />
        {Title()}
        {/* <Leaderboard currentPlayer={props.currentPlayer} authenticate={signIn} leaderboard={props.players} /> */}
      </g>
      }

      {props.gameState.flyingObjects.map(flyingObject => (
        <FlyingObject
          key={flyingObject.id}
          position={flyingObject.position}
        />
      ))}
      {lives}
      {/* <RandomFocus score={score} /> */}
      {RandomFocus}
      </svg>
  );
};

// Canvas.propTypes = {
//   angle: PropTypes.number.isRequired,
//   gameState: PropTypes.shape({
//     started: PropTypes.bool.isRequired,
//     kills: PropTypes.number.isRequired,
//     lives: PropTypes.number.isRequired,
//   }).isRequired,
//   trackMouse: PropTypes.func.isRequired,
//   startGame: PropTypes.func.isRequired,
//   currentPlayer: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     maxScore: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     picture: PropTypes.string.isRequired,
//   }),
//   players: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     maxScore: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     picture: PropTypes.string.isRequired,
//   })),
//   shoot: PropTypes.func.isRequired,
// };

// Canvas.defaultProps = {
//   currentPlayer: null,
//   players: null,
// };

export default Canvas;
