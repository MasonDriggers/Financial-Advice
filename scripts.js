
const API_URL = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=GDCUDJMS3MTAJKUG';

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })


    
    .then(data => {
       const gainersList = document.getElementById('top_gainers');
       const losersList = document.getElementById('top_losers');

       // stringifies the data for debugging
       // document.getElementById('data-container').textContent = JSON.stringify(data);
        
        data.top_gainers.forEach(stock => {
            let li = document.createElement('li');
            li.textContent = `Ticker:${stock.ticker}: Price:${stock.price}$ Amount Changed:${stock.change_amount} Change Percentage:${stock.change_percentage}`;
            gainersList.appendChild(li);
        });

        data.top_losers.forEach(stock => {
            let li = document.createElement('li');
            li.textContent = `Ticker:${stock.ticker}: Price:${stock.price}$ Amount Changed:${stock.change_amount} Change Percentage:${stock.change_percentage}`;
            losersList.appendChild(li);
        });

        let labels = data.top_gainers.map(stock => stock.ticker);
        let dataset = data.top_gainers.map(stock => parseFloat(stock.change_percentage));
    
        let ctx = document.getElementById('winChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Change Percentage',
                    data: dataset,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color of bars
                    borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

         labels = data.top_losers.map(stock => stock.ticker);
         dataset = data.top_losers.map(stock => parseFloat(stock.change_percentage));
    
         ctx = document.getElementById('loserChart').getContext('2d');
         chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Change Percentage',
                    data: dataset,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color of bars
                    borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
    });
