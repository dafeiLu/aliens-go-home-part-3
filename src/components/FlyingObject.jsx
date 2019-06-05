import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import FlyingObjectBase from './FlyingObjectBase';
// import FlyingObjectTop from './FlyingObjectTop';
import { gameHeight } from '../utils/constants';
//import ufo from '../img/ufo.png'

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`;

const Move = styled.g`
  animation: ${moveVertically} 8s linear;
`;

const FlyingObject = props => (
  <Move>
    {/* <img className="ufo" src="../img/ufo.png" position={props.position} alt="UFO"></img> */}
    <FlyingObjectBase position={props.position} />
    {/* <FlyingObjectTop position={props.position} /> */}
  </Move>
);

FlyingObject.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};

export default FlyingObject;
