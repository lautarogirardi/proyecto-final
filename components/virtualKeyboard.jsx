import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const VirtualKeyboard = ({ inputName, onChange }) => {
  const [input, setInput] = useState('');

  const handleChange = (input) => {
    setInput(input);
    onChange(input, inputName);
  };

  const handleKeyPress = (button) => {
    console.log("Button pressed", button);
  };

  return (
    <Keyboard
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default VirtualKeyboard;
