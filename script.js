{\rtf1\ansi\ansicpg949\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 let salesChart, brandChart, costChart, rankingChart;\
\
// \uc0\u49892 \u51228  \u45936 \u51060 \u53552 \
const monthlyData = \{\
    labels: ['1\uc0\u50900 ', '2\u50900 ', '3\u50900 ', '4\u50900 ', '5\u50900 ', '6\u50900 ', '7\u50900 ', '8\u50900 '],\
    totals: [3.9, 3.7, 5.1, 5.2, 5.5, 5.2, 5.2, 5.7]\
\};\
\
const brandData = \{\
    '\uc0\u50724 \u53580 \u51060 \u48660 ': [1.46, 1.39, 1.80, 2.09, 2.30, 1.92, 1.73, 2.05],\
    '\uc0\u50724 \u51060 \u53448 \u47532 \u50504 ': [1.36, 1.28, 1.38, 1.19, 1.33, 1.27, 1.40, 1.46],\
    '\uc0\u53412 \u53440 \u50556 ': [1.08, 1.03, 1.32, 1.21, 1.31, 1.40, 1.38, 1.46],\
    '\uc0\u47336 \u48288 \u47476 \u45936 ': [0, 0, 0.57, 0.69, 0.60, 0.64, 0.71, 0.73]\
\};\
\
const costRateData = \{\
    '\uc0\u50724 \u53580 \u51060 \u48660 ': [35.83, 38.33, 34.30, 36.92, 36.77, 33.58, 38.39, 34.88],\
    '\uc0\u50724 \u51060 \u53448 \u47532 \u50504 ': [32.29, 36.84, 31.28, 31.65, 36.05, 33.31, 36.25, 32.65],\
    '\uc0\u53412 \u53440 \u50556 ': [34.36, 34.49, 32.62, 35.28, 34.04, 32.86, 35.03, 35.30],\
    '\uc0\u47336 \u48288 \u47476 \u45936 ': [null, null, 33.90, 36.44, 31.16, 33.63, 35.02, 31.44]\
\};\
\
// \uc0\u54788 \u51116  \u49884 \u44036  \u50629 \u45936 \u51060 \u53944 \
function updateTime() \{\
    const now = new Date();\
    document.getElementById('lastUpdate').textContent = \
        now.toLocaleString('ko-KR', \{\
            year: 'numeric',\
            month: '2-digit',\
            day: '2-digit',\
            hour: '2-digit',\
            minute: '2-digit'\
        \});\
\}\
\
// \uc0\u53485  \u51204 \u54872 \
function switchTab(tabName) \{\
    // \uc0\u53485  \u48260 \u53948  \u50629 \u45936 \u51060 \u53944 \
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));\
    event.target.classList.add('active');\
    \
    // \uc0\u53485  \u45236 \u50857  \u51204 \u54872 \
    document.querySelectorAll('[id$="-tab"]').forEach(tab => tab.style.display = 'none');\
    document.getElementById(tabName + '-tab').style.display = 'block';\
    \
    // \uc0\u52264 \u53944  \u49373 \u49457 /\u50629 \u45936 \u51060 \u53944 \
    setTimeout(() => \{\
        if (tabName === 'overview' && !salesChart) \{\
            createSalesChart();\
        \} else if (tabName === 'monthly') \{\
            createBrandChart();\
            createCostChart();\
        \} else if (tabName === 'comparison') \{\
            createRankingChart();\
        \}\
    \}, 100);\
\}\
\
// \uc0\u51204 \u52404  \u47588 \u52636  \u52264 \u53944 \
function createSalesChart() \{\
    const ctx = document.getElementById('salesChart').getContext('2d');\
    \
    if (salesChart) \{\
        salesChart.destroy();\
    \}\
    \
    salesChart = new Chart(ctx, \{\
        type: 'line',\
        data: \{\
            labels: monthlyData.labels,\
            datasets: [\{\
                label: '\uc0\u52509  \u47588 \u52636  (\u50613 \u50896 )',\
                data: monthlyData.totals,\
                borderColor: '#667eea',\
                backgroundColor: 'rgba(102, 126, 234, 0.1)',\
                borderWidth: 3,\
                fill: true,\
                tension: 0.4,\
                pointBackgroundColor: '#667eea',\
                pointBorderColor: '#fff',\
                pointBorderWidth: 2,\
                pointRadius: 5\
            \}]\
        \},\
        options: \{\
            responsive: true,\
            maintainAspectRatio: false,\
            plugins: \{\
                legend: \{ display: false \}\
            \},\
            scales: \{\
                y: \{\
                    beginAtZero: false,\
                    min: 3,\
                    max: 6,\
                    grid: \{ color: 'rgba(0,0,0,0.1)' \}\
                \},\
                x: \{\
                    grid: \{ display: false \}\
                \}\
            \}\
        \}\
    \});\
\}\
\
// \uc0\u48652 \u47004 \u46300 \u48324  \u52264 \u53944 \
function createBrandChart() \{\
    const ctx = document.getElementById('brandChart').getContext('2d');\
    \
    if (brandChart) \{\
        brandChart.destroy();\
    \}\
    \
    const datasets = Object.keys(brandData).map((brand, index) => \{\
        const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b'];\
        return \{\
            label: brand,\
            data: brandData[brand],\
            borderColor: colors[index],\
            backgroundColor: colors[index] + '20',\
            borderWidth: 2,\
            tension: 0.3\
        \};\
    \});\
    \
    brandChart = new Chart(ctx, \{\
        type: 'line',\
        data: \{\
            labels: monthlyData.labels,\
            datasets: datasets\
        \},\
        options: \{\
            responsive: true,\
            maintainAspectRatio: false,\
            plugins: \{\
                legend: \{\
                    display: true,\
                    position: 'top',\
                    labels: \{\
                        usePointStyle: true,\
                        padding: 15,\
                        font: \{ size: 11 \}\
                    \}\
                \}\
            \},\
            scales: \{\
                y: \{\
                    beginAtZero: true,\
                    grid: \{ color: 'rgba(0,0,0,0.1)' \}\
                \},\
                x: \{\
                    grid: \{ display: false \}\
                \}\
            \}\
        \}\
    \});\
\}\
\
// \uc0\u50896 \u44032 \u50984  \u52264 \u53944 \
function createCostChart() \{\
    const ctx = document.getElementById('costChart').getContext('2d');\
    \
    if (costChart) \{\
        costChart.destroy();\
    \}\
    \
    const datasets = Object.keys(costRateData).map((brand, index) => \{\
        const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b'];\
        return \{\
            label: brand,\
            data: costRateData[brand],\
            borderColor: colors[index],\
            backgroundColor: colors[index] + '20',\
            borderWidth: 2,\
            tension: 0.3,\
            spanGaps: true\
        \};\
    \});\
    \
    costChart = new Chart(ctx, \{\
        type: 'line',\
        data: \{\
            labels: monthlyData.labels,\
            datasets: datasets\
        \},\
        options: \{\
            responsive: true,\
            maintainAspectRatio: false,\
            plugins: \{\
                legend: \{\
                    display: true,\
                    position: 'top',\
                    labels: \{\
                        usePointStyle: true,\
                        padding: 15,\
                        font: \{ size: 11 \}\
                    \}\
                \}\
            \},\
            scales: \{\
                y: \{\
                    min: 25,\
                    max: 40,\
                    grid: \{ color: 'rgba(0,0,0,0.1)' \},\
                    ticks: \{\
                        callback: function(value) \{\
                            return value + '%';\
                        \}\
                    \}\
                \},\
                x: \{\
                    grid: \{ display: false \}\
                \}\
            \}\
        \}\
    \});\
\}\
\
// \uc0\u49692 \u50948  \u52264 \u53944 \
function createRankingChart() \{\
    const ctx = document.getElementById('rankingChart').getContext('2d');\
    \
    if (rankingChart) \{\
        rankingChart.destroy();\
    \}\
    \
    const rankingData = \{\
        labels: ['\uc0\u50724 \u51060 \u53448 \u47532 \u50504 \\n\u44305 \u44368 ', '\u50724 \u53580 \u51060 \u48660 \\n\u44305 \u44368 ', '\u47336 \u48288 \u47476 \u45936 \\n\u44305 \u44368 ', '\u53412 \u53440 \u50556 \\n\u49688 \u50896 \u50669 ', '\u53412 \u53440 \u50556 \\n\u44305 \u44368 ', '\u50724 \u53580 \u51060 \u48660 \\n\u54665 \u44417 ', '\u50724 \u51060 \u53448 \u47532 \u50504 \\n\u46041 \u53444 ', '\u53412 \u53440 \u50556 \\n\u54665 \u44417 ', '\u50724 \u53580 \u51060 \u48660 \\n\u47785 \u46041 '],\
        sales: [11063, 10926, 7277, 6349, 5455, 5373, 3496, 2755, 4230],\
        costRates: [32.65, 34.88, 31.44, 33.04, 35.30, null, 34.26, 37.56, null]\
    \};\
    \
    rankingChart = new Chart(ctx, \{\
        type: 'bar',\
        data: \{\
            labels: rankingData.labels,\
            datasets: [\{\
                label: '8\uc0\u50900  \u47588 \u52636  (\u47564 \u50896 )',\
                data: rankingData.sales,\
                backgroundColor: rankingData.sales.map((_, index) => \{\
                    const colors = ['#28a745', '#20c997', '#17a2b8', '#6f42c1', '#6c757d', '#fd7e14', '#ffc107', '#dc3545', '#e83e8c'];\
                    return colors[index] || '#6c757d';\
                \}),\
                borderRadius: 8,\
                borderSkipped: false\
            \}]\
        \},\
        options: \{\
            responsive: true,\
            maintainAspectRatio: false,\
            plugins: \{\
                legend: \{ display: false \}\
            \},\
            scales: \{\
                y: \{\
                    beginAtZero: true,\
                    grid: \{ color: 'rgba(0,0,0,0.1)' \},\
                    ticks: \{\
                        callback: function(value) \{\
                            return value.toLocaleString() + '\uc0\u47564 ';\
                        \}\
                    \}\
                \},\
                x: \{\
                    grid: \{ display: false \},\
                    ticks: \{\
                        maxRotation: 0,\
                        font: \{ size: 10 \}\
                    \}\
                \}\
            \}\
        \}\
    \});\
\}\
\
// \uc0\u45936 \u51060 \u53552  \u49352 \u47196 \u44256 \u52840 \
function refreshData() \{\
    const btn = document.querySelector('.refresh-btn');\
    btn.innerHTML = '\uc0\u55357 \u56580  \u50629 \u45936 \u51060 \u53944 ...';\
    btn.disabled = true;\
    \
    setTimeout(() => \{\
        updateTime();\
        btn.innerHTML = '\uc0\u55357 \u56580  \u49352 \u47196 \u44256 \u52840 ';\
        btn.disabled = false;\
        \
        // \uc0\u50528 \u45768 \u47700 \u51060 \u49496  \u54952 \u44284 \
        document.querySelectorAll('.kpi-card, .brand-card, .chart-container').forEach(card => \{\
            card.style.transform = 'scale(1.01)';\
            setTimeout(() => \{\
                card.style.transform = '';\
            \}, 150);\
        \});\
    \}, 1000);\
\}\
\
// \uc0\u52488 \u44592 \u54868 \
document.addEventListener('DOMContentLoaded', function() \{\
    updateTime();\
    createSalesChart();\
    \
    // \uc0\u51088 \u46041  \u50629 \u45936 \u51060 \u53944  (5\u48516 \u47560 \u45796 )\
    setInterval(updateTime, 300000);\
\});}
