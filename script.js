document.addEventListener('DOMContentLoaded', () => {
    const secretNumber = generateRandomNumber();
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const feedback = document.getElementById('feedback');
    const celebration = document.getElementById('celebration');

    submitGuess.addEventListener('click', () => {
        const guess = guessInput.value;
        if (guess.length !== 4 || isNaN(guess)) {
            alert('Please enter a 4-digit number.');
            return;
        }

        const result = getFeedback(secretNumber, guess);
        displayFeedback(result);

        if (guess === secretNumber) {
            celebrate();
        }
    });

    function generateRandomNumber() {
        let number;
        do {
            number = Math.floor(1000 + Math.random() * 9000).toString();
        } while (new Set(number).size < 4); // Ensure all digits are unique
        return number;
    }

    function getFeedback(secret, guess) {
        const result = [];
        for (let i = 0; i < 4; i++) {
            if (guess[i] === secret[i]) {
                result.push({ digit: guess[i], status: 'correct' });
            } else if (secret.includes(guess[i])) {
                result.push({ digit: guess[i], status: 'correct-position' });
            } else {
                result.push({ digit: guess[i], status: 'wrong' });
            }
        }
        return result;
    }

    function displayFeedback(result) {
        feedback.innerHTML = '';
        result.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item.digit;
            span.className = item.status;
            feedback.appendChild(span);
        });
    }

    function celebrate() {
        celebration.classList.remove('hidden');
    }
});

