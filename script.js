let display = document.getElementById('display');

function appendNumber(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;``
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length === 1 || display.value === 'Error') {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        // Replace display symbols with JavaScript operators
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        const result = eval(expression);

        if (result === Infinity || isNaN(result)) {
            display.value = 'Error';
        } else {
            // Round to avoid floating point issues
            display.value = Math.round(result * 100000000) / 100000000;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});
