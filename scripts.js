function compoundAmount(principal, rate, n, time) {
    return principal * Math.pow(1 + rate/n, n*time);
}

function calculateInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const time = parseInt(document.getElementById("time").value);
    const n = parseInt(document.getElementById("n").value);

    const resultsTable = document.getElementById("results");
    resultsTable.innerHTML = '<tr><th>Year</th><th>Amount</th></tr>';  // Clear and set headers
    
    for (let year = 1; year <= time; year++) {
        const amount = compoundAmount(principal, rate, n, year);
        
        // Append results to table
        const row = resultsTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = year;
        cell2.innerHTML = amount.toFixed(2);
    }
}

const API_URL = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=GDCUDJMS3MTAJKUG';

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // For demonstration purposes, we just stringify the JSON. You should properly process the data and display it.
        document.getElementById('data-container').textContent = JSON.stringify(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
    });
