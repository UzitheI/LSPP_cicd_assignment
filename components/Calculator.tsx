'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstOperand: number, secondOperand: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : 0;
      case '=':
        return secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value" data-testid="calculator-display">
          {display}
        </div>
      </div>
      
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button 
              className="key-clear" 
              onClick={clear}
              data-testid="clear-button"
            >
              AC
            </button>
          </div>
          
          <div className="digit-keys">
            <button className="key-0" onClick={() => inputNumber('0')} data-testid="number-0">0</button>
            <button className="key-dot" onClick={inputDecimal} data-testid="decimal-button">●</button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button 
                key={num} 
                className={`key-${num}`} 
                onClick={() => inputNumber(String(num))}
                data-testid={`number-${num}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        
        <div className="operator-keys">
          <button 
            className="key-divide" 
            onClick={() => performOperation('/')}
            data-testid="divide-button"
          >
            ÷
          </button>
          <button 
            className="key-multiply" 
            onClick={() => performOperation('*')}
            data-testid="multiply-button"
          >
            ×
          </button>
          <button 
            className="key-subtract" 
            onClick={() => performOperation('-')}
            data-testid="subtract-button"
          >
            −
          </button>
          <button 
            className="key-add" 
            onClick={() => performOperation('+')}
            data-testid="add-button"
          >
            +
          </button>
          <button 
            className="key-equals" 
            onClick={handleEquals}
            data-testid="equals-button"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}