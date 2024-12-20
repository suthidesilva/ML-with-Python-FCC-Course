// Change the title when the user leaves the tab
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "Come back! 📚";
    } else {
        document.title = "Asta's Book Recommendations";
    }
});


// Static list of books with their genres
const books = [
    // Fiction
    { title: "To Kill a Mockingbird", genre: "Fiction" },
    { title: "1984", genre: "Fiction" },
    { title: "Pride and Prejudice", genre: "Fiction" },
    { title: "The Great Gatsby", genre: "Fiction" },
    { title: "The Catcher in the Rye", genre: "Fiction" },
    { title: "Beloved", genre: "Fiction" },
    { title: "The Road", genre: "Fiction" },
    { title: "Life of Pi", genre: "Fiction" },
    { title: "A Thousand Splendid Suns", genre: "Fiction" },
    { title: "The Book Thief", genre: "Fiction" },
    // Additional Fiction Books
    // ...

    // Science Fiction
    { title: "Dune", genre: "Science Fiction" },
    { title: "Neuromancer", genre: "Science Fiction" },
    { title: "The Left Hand of Darkness", genre: "Science Fiction" },
    { title: "Ender’s Game", genre: "Science Fiction" },
    { title: "The Hitchhiker’s Guide to the Galaxy", genre: "Science Fiction" },
    { title: "Foundation", genre: "Science Fiction" },
    { title: "I, Robot", genre: "Science Fiction" },
    { title: "Do Androids Dream of Electric Sheep?", genre: "Science Fiction" },
    { title: "Ubik", genre: "Science Fiction" },
    { title: "The Man in the High Castle", genre: "Science Fiction" },
    // Additional Science Fiction Books
    // ...

    // Fantasy
    { title: "The Hobbit", genre: "Fantasy" },
    { title: "The Lord of the Rings", genre: "Fantasy" },
    { title: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy" },
    { title: "Harry Potter and the Chamber of Secrets", genre: "Fantasy" },
    { title: "The Name of the Wind", genre: "Fantasy" },
    { title: "Mistborn: The Final Empire", genre: "Fantasy" },
    { title: "The Lies of Locke Lamora", genre: "Fantasy" },
    { title: "Good Omens", genre: "Fantasy" },
    { title: "The Priory of the Orange Tree", genre: "Fantasy" },
    { title: "The Night Circus", genre: "Fantasy" },
    // Additional Fantasy Books
    // ...

    // Romance
    { title: "Pride and Prejudice", genre: "Romance" },
    { title: "The Notebook", genre: "Romance" },
    { title: "Me Before You", genre: "Romance" },
    { title: "It Ends With Us", genre: "Romance" },
    { title: "The Hating Game", genre: "Romance" },
    { title: "The Kiss Quotient", genre: "Romance" },
    { title: "The Flatshare", genre: "Romance" },
    { title: "Beach Read", genre: "Romance" },
    { title: "Red, White & Royal Blue", genre: "Romance" },
    { title: "The Love Hypothesis", genre: "Romance" },
    // Additional Romance Books
    // ...

    // Mystery/Thriller
    { title: "Gone Girl", genre: "Mystery/Thriller" },
    { title: "The Girl with the Dragon Tattoo", genre: "Mystery/Thriller" },
    { title: "The Silent Patient", genre: "Mystery/Thriller" },
    { title: "Big Little Lies", genre: "Mystery/Thriller" },
    { title: "In the Woods", genre: "Mystery/Thriller" },
    { title: "Sharp Objects", genre: "Mystery/Thriller" },
    { title: "The Woman in the Window", genre: "Mystery/Thriller" },
    { title: "Behind Closed Doors", genre: "Mystery/Thriller" },
    { title: "The Couple Next Door", genre: "Mystery/Thriller" },
    { title: "An Anonymous Girl", genre: "Mystery/Thriller" },
    // Additional Mystery/Thriller Books
    // ...

    // Historical Fiction
    { title: "All the Light We Cannot See", genre: "Historical Fiction" },
    { title: "The Nightingale", genre: "Historical Fiction" },
    { title: "The Book Thief", genre: "Historical Fiction" },
    { title: "The Alice Network", genre: "Historical Fiction" },
    { title: "The Huntress", genre: "Historical Fiction" },
    { title: "The Paris Library", genre: "Historical Fiction" },
    { title: "Homegoing", genre: "Historical Fiction" },
    { title: "The Secret Life of Bees", genre: "Historical Fiction" },
    { title: "The Invention of Wings", genre: "Historical Fiction" },
    { title: "Memoirs of a Geisha", genre: "Historical Fiction" },
    // Additional Historical Fiction Books
    // ...

    // Horror
    { title: "Dracula", genre: "Horror" },
    { title: "Frankenstein", genre: "Horror" },
    { title: "The Haunting of Hill House", genre: "Horror" },
    { title: "The Shining", genre: "Horror" },
    { title: "Pet Sematary", genre: "Horror" },
    { title: "Carrie", genre: "Horror" },
    { title: "Mexican Gothic", genre: "Horror" },
    { title: "Bird Box", genre: "Horror" },
    { title: "House of Leaves", genre: "Horror" },
    { title: "The Southern Book Club’s Guide to Slaying Vampires", genre: "Horror" },
    // Additional Horror Books
    // ...
];

// Recommend books based on input
function recommendBooks(query) {
    query = query.toLowerCase();
    return books.filter(
        book =>
            book.title.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
    ).slice(0, 5);
}

// Search functionality
document.getElementById("search").addEventListener("click", () => {
    const query = document.getElementById("query").value.trim();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (query) {
        const recommendations = recommendBooks(query);
        if (recommendations.length === 0) {
            resultsContainer.innerHTML = "<li>No recommendations found. Try a different query!</li>";
        } else {
            recommendations.forEach(book => {
                const li = document.createElement("li");
                li.textContent = `${book.title} (${book.genre})`;
                resultsContainer.appendChild(li);
            });
        }
    } else {
        resultsContainer.innerHTML = "<li>Please enter a book title or genre.</li>";
    }
});

// Particle effect
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ffffff', '#FF5733', '#33FF57', '#3357FF'];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 5 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.dx = Math.random() * 4 - 2;
        this.dy = Math.random() * 4 - 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy *= -1;
        }

        this.draw();
    }
}

for (let i = 0; i < 150; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', event => {
    const { clientX, clientY } = event;
    particles.forEach(particle => {
        const dx = clientX - particle.x;
        const dy = clientY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            particle.dx = dx / 20;
            particle.dy = dy / 20;
        }
    });
});

animate();
