

let expenses = [];
let chart;

function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (!amount) return;

  expenses.push({
    amount: Number(amount),
    category: category
  });

  // ✅ SAVE TO STORAGE
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("amount").value = "";

  updateUI();
  updateChart();
}

function updateUI() {
  let total = 0;
  let list = document.getElementById("list");

  list.innerHTML = "";

  expenses.forEach((exp, index) => {
    total += exp.amount;

    let li = document.createElement("li");

    li.innerHTML = `
      ${exp.category} - KES ${exp.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").textContent = total;

  showInsight(total);
}

function showInsight(total) {
  let msg = "";

  if (total > 5000) {
    msg = "⚠️ You are overspending!";
  } else if (total > 2000) {
    msg = "💡 Be careful with spending.";
  } else {
    msg = "✅ Good control!";
  }

  document.getElementById("insight").textContent = msg;
}

function updateChart() {
  let categories = {};

  expenses.forEach(exp => {
    if (!categories[exp.category]) {
      categories[exp.category] = 0;
    }
    categories[exp.category] += exp.amount;
  });

  let labels = Object.keys(categories);
  let data = Object.values(categories);

  let ctx = document.getElementById("pieChart");

  if (!ctx) return; // safety check

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          "#22c55e",
          "#06b6d4",
          "#f59e0b",
          "#ef4444"
        ]
      }]
    },
    options: {
      responsive: true
    }
  });
}

function loadExpenses() {
  let saved = localStorage.getItem("expenses");

  if (saved) {
    expenses = JSON.parse(saved);
    updateUI();
    updateChart();
  }
}

// run when page loads
loadExpenses();

function deleteExpense(index) {
  expenses.splice(index, 1);

  // update storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  updateUI();
  updateChart();
}