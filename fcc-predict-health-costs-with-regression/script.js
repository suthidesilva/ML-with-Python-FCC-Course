// Handle title switch when tab loses focus
const originalTitle = "Health Tracker";
document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "Come back! ⛑️" : originalTitle;
});

// Update slider values dynamically
const sliders = ["age", "bmi", "children"];
sliders.forEach(slider => {
    const input = document.getElementById(slider);
    const valueDisplay = document.getElementById(`${slider}-value`);

    input.addEventListener("input", () => {
        valueDisplay.textContent = input.value;
        updatePlot();
    });
});

// Generate 3D data based on slider values
const generateData = () => {
    const age = parseInt(document.getElementById("age").value, 10);
    const bmi = parseFloat(document.getElementById("bmi").value);
    const children = parseInt(document.getElementById("children").value, 10);

    const x = Array.from({ length: 20 }, (_, i) => age + i);
    const y = Array.from({ length: 20 }, (_, i) => bmi + i / 10);
    const z = x.map((xi, idx) => xi * y[idx] * (1 + children / 10));

    return { x, y, z };
};

// Render 3D Plot
const updatePlot = () => {
    const data = generateData();
    const trace = {
        x: data.x,
        y: data.y,
        z: data.z,
        type: "scatter3d",
        mode: "markers",
        marker: {
            size: 5,
            color: data.z,
            colorscale: "Viridis",
        },
    };

    const layout = {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
            xaxis: { title: "Age" },
            yaxis: { title: "BMI" },
            zaxis: { title: "Expenses" },
        },
    };

    Plotly.newPlot("3d-plot", [trace], layout);
};

// Initialize the plot on load
updatePlot();
