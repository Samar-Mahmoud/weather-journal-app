/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '5811913d78dd7b768c05d2b2b15ebf11';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', async () => {
    const code = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    if (!code || !feeling) return alert("Please enter the required data!");
    getTemp(code, feeling);
});

const getTemp = async (code, feeling) => {
    const response = await fetch(baseURL + code + '&appid=' + key + '&units=metric');
    if (response.status !== 200) throw new Error('cannot fetch the data');
    const data = await response.json();

    postData('/save', { temp: data.main.temp, date: newDate, userResponse: feeling });

    const req = await fetch('/get', { credentials: "same-origin" });
    const theData = await req.json();
    updateUI(theData);
}

const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
}

const updateUI = (data) => {
    document.getElementById('date').textContent = `Date : ${data.date}`;
    document.getElementById('temp').textContent = `Temperature : ${data.temp} Celsius`;
    document.getElementById('content').textContent = `Feeling : ${data.userResponse}`;
}