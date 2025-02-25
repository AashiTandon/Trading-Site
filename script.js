document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".myBtn");
    const defaultTimeFrame = "1D";

    function setActiveButton(selectedButton) {
        buttons.forEach(button => button.classList.remove("active")); 
        selectedButton.classList.add("active"); 
    }

    buttons.forEach(button => {
        if (button.getAttribute("data-timeframe") === defaultTimeFrame) {
            setActiveButton(button);
        }
        button.addEventListener("click", function () {
            setActiveButton(this);
            updateChart(this.getAttribute("data-timeframe"));
        });
    });
    updateChart(defaultTimeFrame);
});

const chart = document.getElementById('myChart').getContext('2d');

const stockData = {
    '1D': {
        labels: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM','4:00 PM' , '5:00 PM'],
        data: [150, 155, 159, 155,145,156,158,160],
        high: [153, 156, 160, 157, 159, 162,152,164],
        low: [148, 150, 145, 152, 155, 158,149,155],
        close: [151, 153, 147, 154, 156, 159,150,160]
    },
    '1W': {
        labels: ['Feb 3', 'Feb 4', 'Feb 5', 'Feb 6', 'Feb 7', 'Feb 8', 'Feb 9'],
        data: [150, 152, 148, 147, 157, 160, 158],
        high: [152, 154, 150, 157, 159, 162, 160],
        low: [148, 150, 145, 152, 155, 158, 156],
        close: [151, 153, 147, 154, 156, 159, 157]
    },
    '1M': {
        labels: ['Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Feb 1', 'Feb 5'],
        data: [140, 145, 148, 146, 155, 160],
        high: [142, 147, 150, 152, 157, 162],
        low: [138, 143, 146, 148, 153, 158],
        close: [141, 146, 149, 151, 156, 161]
    },
};

let selectedRange = '1D'; 

function updateChart(range) {
    selectedRange = range;
    let selectedData = stockData[selectedRange];

    stockChart.data.labels = selectedData.labels;
    stockChart.data.datasets[0].data = selectedData.data;
    stockChart.data.datasets[0].high = selectedData.high;
    stockChart.data.datasets[0].low = selectedData.low;
    stockChart.data.datasets[0].close = selectedData.close;
    
    stockChart.update();
}

const stockChart = new Chart(chart, {
    type: 'line',
    data: {
        labels: stockData[selectedRange].labels,
        datasets: [{
            label: 'Stock Price',
            data: stockData[selectedRange].data,
            borderColor: '#25BE98',
            borderWidth: 2,
            high: stockData[selectedRange].high,
            low: stockData[selectedRange].low,
            close: stockData[selectedRange].close
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let dataset = tooltipItem.dataset;
                        let index = tooltipItem.dataIndex;
                        let currentPrice = dataset.data[index];
                        let high = dataset.high[index];
                        let low = dataset.low[index];
                        let close = dataset.close[index];

                        return [
                            `Current: Rs.${currentPrice}`,
                            `High: Rs.${high}`,
                            `Low: Rs.${low}`,
                            `Close: Rs.${close}`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Stock Price'
                }
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".myBtn1");
    const details = "Revenue";

    function setActiveButton(selectedButton) {
        buttons.forEach(button => button.classList.remove("active")); 
        selectedButton.classList.add("active"); 
    }

    buttons.forEach(button => {
        if (button.getAttribute("data-details") === details) {
            setActiveButton(button);
        }
        button.addEventListener("click", function () {
            setActiveButton(this);
            updateGraph(this.getAttribute("data-details"));
        });
    });
});

const graph = document.getElementById('myGraph').getContext('2d');

const financeData = {
    'Revenue': {
        label: 'Revenue',
        labels: ['Dec 23', 'Mar 24', 'Jun 24', 'Sep 24', 'Dec 24'],
        data: [23, 34, 32, 21, 44]
    },
    'Profit': {
        label: 'Profit',
        labels: ['Dec 23', 'Mar 24', 'Jun 24', 'Sep 24', 'Dec 24'],
        data: [11097, 12502, 12105, 11955, 12444] 
    },
    'Net Worth': {
        label: 'Net Worth',
        labels: ['2020', '2021', '2022', '2023', '2024'],
        data: [84749, 87108, 89846, 91206, 91319] 
    }
}

let selectedButton = 'Revenue';

const myBarChart = new Chart(graph, {
    type: 'bar',
    data: {
        labels: financeData[selectedButton].labels,
        datasets: [{
            label: financeData[selectedButton].label,
            data: financeData[selectedButton].data,
            backgroundColor: '#25C1B0',
            barThickness: 20
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

updateGraph(selectedButton);

function updateGraph(range) {
    selectedButton = range;
    let selectedData = financeData[selectedButton];

    myBarChart.data.labels = selectedData.labels;
    myBarChart.data.datasets[0].data = selectedData.data;
    myBarChart.data.datasets[0].label = selectedData.label;
    myBarChart.update();
}
