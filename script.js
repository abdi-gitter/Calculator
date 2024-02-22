document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById("display");
    let currentInput = "0";
    let previousInput = null;
    let currentOperator = null;
    let shouldResetInput = false;

    const updateDisplay = () => {
        display.textContent = currentInput;
    };

    const inputNumber = (number) => {
        if (currentInput === "0" || shouldResetInput) {
            currentInput = number;
            shouldResetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    const inputDecimal = () => {
        if (shouldResetInput) {
            currentInput = "0.";
            shouldResetInput = false;
        } else if (!currentInput.includes(".")) {
            currentInput += ".";
        }
        updateDisplay();
    };

    const inputOperator = (operator) => {
        if (currentOperator && !shouldResetInput) {
            performCalculation();
        }
        previousInput = currentInput;
        currentOperator = operator;
        shouldResetInput = true;
    };

    const performCalculation = () => {
        if (previousInput == null || !currentOperator) {
            return;
        }

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (currentOperator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    alert("You cannot divide by zero.");
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        currentOperator = null;
        updateDisplay();
    };

    const clearAll = () => {
        currentInput = "0";
        previousInput = null;
        currentOperator = null;
        shouldResetInput = false;
        updateDisplay();
    };

    const deleteLastDigit = () => {
        if (currentInput.length === 1) {
            currentInput = "0";
        } else {
            currentInput = currentInput.substring(0, currentInput.length - 1);
        }
        updateDisplay();
    };

    // Event listeners for number buttons
    document.querySelectorAll(".number").forEach(button => {
        button.addEventListener("click", () => inputNumber(button.textContent));
    });

    // Event listener for the decimal button
    document.getElementById("decimal").addEventListener("click", inputDecimal);

    // Event listeners for operator buttons
    document.querySelectorAll(".operator").forEach(button => {
        button.addEventListener("click", () => inputOperator(button.id));
    });

    // Event listener for the equals button
    document.getElementById("equals").addEventListener("click", performCalculation);

    // Event listener for the clear button
    document.getElementById("clear").addEventListener("click", clearAll);

    // Event listener for the backspace button
    document.getElementById("backspace").addEventListener("click", deleteLastDigit);

    // Initializing the display
    updateDisplay();
});
