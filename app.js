function startApp() {
  alert("Let’s start building your expense tracker 💸");
}

let expenses = [];

function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (!amount) return;

  expenses.push({
    amount: Number(amount),
    category: category
  });

  document.getElementById("amount").value = "";

  updateUI();
}

function updateUI() {
  let total = 0;
  let list = document.getElementById("list");

  list.innerHTML = "";

  expenses.forEach(exp => {
    total += exp.amount;

    let li = document.createElement("li");
    li.textContent = `${exp.category} - KES ${exp.amount}`;
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