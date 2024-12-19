// Game state
const state = {
    wins: 0,
    ties: 0,
    losses: 0,
    history: [],
    botHistory: [],
    playerHistory: []
};

// Bot strategies (simplified versions of the Python implementations)
const bots = {
    quincy: () => {
        const choices = ["R", "R", "P", "P", "S"];
        return choices[state.history.length % choices.length];
    },
    abbey: (prevPlay) => {
        if (!prevPlay) return "R";
        const ideal = {"P": "S", "R": "P", "S": "R"};
        return ideal[prevPlay];
    },
    kris: (prevPlay) => {
        if (!prevPlay) return "R";
        const ideal = {"P": "S", "R": "P", "S": "R"};
        return ideal[prevPlay];
    },
    mrugesh: (prevPlay) => {
        if (!prevPlay) return "S";
        const ideal = {"P": "S", "R": "P", "S": "R"};
        return ideal[prevPlay];
    }
};

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const botChoice = document.getElementById('botChoice');
const botSelect = document.getElementById('botSelect');
const wins = document.getElementById('wins');
const ties = document.getElementById('ties');
const losses = document.getElementById('losses');
const gameHistory = document.getElementById('gameHistory');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute(
        'data-theme',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeToggle.textContent = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? '☀️ Light Mode' 
        : '🌙 Dark Mode';
});

// Choice mapping for emojis
const choiceEmojis = {
    'R': '✊',
    'P': '✋',
    'S': '✌️'
};

// Game logic
function playGame(playerChoice) {
    const prevPlay = state.playerHistory[state.playerHistory.length - 1];
    const botPlay = bots[botSelect.value](prevPlay);
    
    state.playerHistory.push(playerChoice);
    state.botHistory.push(botPlay);

    botChoice.textContent = choiceEmojis[botPlay];
    
    // Determine winner
    let result;
    if (playerChoice === botPlay) {
        result = 'tie';
        state.ties++;
    } else if (
        (playerChoice === 'R' && botPlay === 'S') ||
        (playerChoice === 'P' && botPlay === 'R') ||
        (playerChoice === 'S' && botPlay === 'P')
    ) {
        result = 'win';
        state.wins++;
    } else {
        result = 'lose';
        state.losses++;
    }

    // Update UI
    updateScores();
    addHistoryItem(playerChoice, botPlay, result);

    // Animate bot choice
    gsap.from(botChoice, {
        scale: 0,
        rotation: 360,
        duration: 0.5,
        ease: "back.out"
    });
}

function updateScores() {
    wins.textContent = state.wins;
    ties.textContent = state.ties;
    losses.textContent = state.losses;
}

function addHistoryItem(playerChoice, botChoice, result) {
    const item = document.createElement('div');
    item.className = `history-item ${result}`;
    item.textContent = `You: ${choiceEmojis[playerChoice]} vs Bot: ${choiceEmojis[botChoice]} - ${result.toUpperCase()}`;
    
    gameHistory.insertBefore(item, gameHistory.firstChild);
    
    gsap.from(item, {
        opacity: 0,
        y: -20,
        duration: 0.5
    });
}

// Event Listeners
document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const choice = e.target.dataset.choice;
        playGame(choice);
        
        gsap.from(e.target, {
            scale: 1.2,
            duration: 0.3,
            ease: "back.out"
        });
    });
});
