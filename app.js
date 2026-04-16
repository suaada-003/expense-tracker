let expenses = [];
let chart;

// ➕ ADD EXPENSE
function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let date = document.getElementById("date").value;

  if (!amount || !date) return;

  expenses.push({
    id: Date.now(),
    amount: Number(amount),
    category: category,
    date: date // ✅ from calendar
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";

  updateUI();
  updateChart();
}

// 📊 UPDATE UI (ALL EXPENSES)
function updateUI() {
  let total = 0;
  let list = document.getElementById("list");

  list.innerHTML = "";

  expenses.forEach((exp) => {
    total += exp.amount;

    let li = document.createElement("li");
    li.innerHTML = `
      ${exp.category} - KES ${exp.amount} (${exp.date})
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").textContent = total;

  showInsight(total);
}

// 🧠 INSIGHTS
function showInsight(total) {
  let msg = "";

  if (total > 50000) {
    msg = "⚠️ You are overspending!";
  } else if (total > 30000) {
    msg = "💡 Be careful with spending.";
  } else {
    msg = "✅ Good control!";
  }

  document.getElementById("insight").textContent = msg;
}

// 🗑 DELETE
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  updateUI();
  updateChart();
}

// 📈 PIE CHART (ALL DATA)
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

  if (!ctx) return;

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

// 💾 LOAD DATA
function loadExpenses() {
  let saved = localStorage.getItem("expenses");

  if (saved) {
    expenses = JSON.parse(saved);

    // ✅ Fix old data (no date)
    expenses = expenses.map(exp => ({
      ...exp,
      date: exp.date || new Date().toISOString().split("T")[0]
    }));

    updateUI();
    updateChart();
  }
}

// 🚀 START APP
loadExpenses();