import React from 'react';
import PropTypes from 'prop-types';
import { generateRandomNumber } from '../utils/formulas';
//     constructor() {
//       super()
//       this.randomNumber = 0
  
//       this.generateRandomNumber = this.generateRandomNumber.bind(this)
      
  
//     }

    
  
//     newRandomNumber(min, max){
//       return Math.floor(Math.random() * (max - min + 1)) + min; 
//     }
  
//     generateRandomNumber(){
//       setTimeout(() => {
//         this.randomNumber = this.newRandomNumber(1, 1000)
//       }, 20000)
//     }
  
  
  
//     myview = () => {
  
//       return (
//         <View>
//           <Text>{this.randomNumber}</Text>
//         </View>
//       );
//     };
  
//     render() {
//       return(
//         <View>
//           {this.myview()}
//         </View>
//       )
//     }
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
  
  RandomFocus.propTypes = {
    score: PropTypes.number.isRequired,
  };
  
export default RandomFocus;