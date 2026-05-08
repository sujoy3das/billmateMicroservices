// Configuration
const API_BASE_URL = "http://127.0.0.1:8002"; // Adjust port if necessary

// State
let state = {
    wallet: null,
    plans: [],
    subscriptions: [],
    transactions: []
};

// Initialization
document.addEventListener('DOMContentLoaded', function () {
    initSubscriptionPage();
});

function initSubscriptionPage() {
    fetchWallet();
    fetchTransactions();
    // Fetch plans and subscriptions together to ensure UI renders correctly based on active subs
    Promise.all([fetchPlansData(), fetchSubscriptionsData()]).then(() => {
        renderSubscriptions();
        renderPlans();
    });
}

// --- API Helpers ---

async function authFetch(endpoint, options = {}) {
    const token = getCookie("auth_key");
    if (!token) {
        window.location.href = "auth-login.html";
        return;
    }

    const defaultHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    options.headers = { ...defaultHeaders, ...options.headers };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "An error occurred");
        }
        return data;
    } catch (error) {
        toastr.error(error.message);
        throw error;
    }
}

// --- Data Fetching ---

async function fetchWallet() {
    try {
        const data = await authFetch('/wallet');
        state.wallet = data;
        document.getElementById('wallet-balance').textContent = `₹${data.balance.toFixed(2)}`;
    } catch (e) {
        console.error("Failed to fetch wallet", e);
    }
}

async function fetchTransactions() {
    try {
        const data = await authFetch('/wallet-transactions');
        state.transactions = data.transactions;
        renderTransactions();
    } catch (e) {
        console.error("Failed to fetch transactions", e);
    }
}

async function fetchPlansData() {
    try {
        const data = await authFetch('/plans');
        state.plans = data;
    } catch (e) {
        console.error("Failed to fetch plans", e);
    }
}

async function fetchSubscriptionsData() {
    try {
        const data = await authFetch('/subscriptions');
        state.subscriptions = data.subscriptions;
    } catch (e) {
        console.error("Failed to fetch subscriptions", e);
    }
}

// --- Rendering ---

function renderTransactions() {
    const container = document.getElementById('transaction-list');
    container.innerHTML = '';

    if (state.transactions.length === 0) {
        container.innerHTML = '<div class="list-group-item">No transactions found.</div>';
        return;
    }

    state.transactions.slice(0, 5).forEach(txn => {
        const isCredit = txn.amount > 0;
        const colorClass = isCredit ? 'text-green' : 'text-red';
        const sign = isCredit ? '+' : '';
        const date = new Date(txn.created_at).toLocaleDateString();

        const html = `
            <div class="list-group-item">
                <div class="row align-items-center">
                    <div class="col text-truncate">
                        <a href="#" class="text-reset d-block">${txn.type}</a>
                        <div class="d-block text-muted text-truncate mt-n1">${date}</div>
                    </div>
                    <div class="col-auto">
                        <strong class="${colorClass}">${sign}₹${txn.amount.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

function renderSubscriptions() {
    const tbody = document.getElementById('active-subscriptions-body');
    tbody.innerHTML = '';

    if (state.subscriptions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No active subscriptions.</td></tr>';
        return;
    }

    state.subscriptions.forEach(sub => {
        // Find plan name
        const plan = state.plans.find(p => p.id === sub.plan_id);
        const planName = plan ? plan.name : `Plan #${sub.plan_id}`;
        
        const endDate = new Date(sub.end_date).toLocaleDateString();
        const statusBadge = sub.status === 'active' 
            ? '<span class="badge bg-green">Active</span>' 
            : `<span class="badge bg-secondary">${sub.status}</span>`;

        const row = `
            <tr>
                <td>${planName}</td>
                <td>${sub.plan_type}</td>
                <td>${statusBadge}</td>
                <td>${endDate}</td>
                <td>${sub.carried_days}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function renderPlans() {
    const container = document.getElementById('plans-container');
    container.innerHTML = '';

    // Group plans by plan_type
    const groupedPlans = state.plans.reduce((acc, plan) => {
        if (!acc[plan.plan_type]) acc[plan.plan_type] = [];
        acc[plan.plan_type].push(plan);
        return acc;
    }, {});

    if (Object.keys(groupedPlans).length === 0) {
        container.innerHTML = '<div class="text-center">No plans available.</div>';
        return;
    }

    for (const [type, plans] of Object.entries(groupedPlans)) {
        // Check if user has an active subscription for this type
        const activeSub = state.subscriptions.find(s => s.plan_type === type && s.status === 'active');

        const sectionHtml = `
            <div class="mb-4">
                <h3 class="mb-3 text-uppercase text-muted">${type} Plans</h3>
                <div class="row row-cards">
                    ${plans.map(plan => renderPlanCard(plan, activeSub)).join('')}
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', sectionHtml);
    }
}

function renderPlanCard(plan, activeSub) {
    let buttonHtml = '';
    let cardClass = '';

    if (activeSub) {
        if (activeSub.plan_id === plan.id) {
            // Current Plan
            buttonHtml = `<button class="btn btn-secondary w-100" disabled>Current Plan</button>`;
            cardClass = 'active-plan';
        } else {
            // Upgrade/Downgrade
            buttonHtml = `<button class="btn btn-primary w-100" onclick="openChangePlanModal(${plan.id}, ${activeSub.id})">Switch to this Plan</button>`;
        }
    } else {
        // New Subscription
        buttonHtml = `<button class="btn btn-success w-100" onclick="openBuyModal(${plan.id})">Buy Subscription</button>`;
    }

    return `
        <div class="col-sm-6 col-lg-4">
            <div class="card card-md ${cardClass}">
                <div class="card-body text-center">
                    <div class="text-uppercase text-muted font-weight-medium">${plan.name}</div>
                    <div class="h1 my-3">₹${plan.price.toFixed(2)}</div>
                    <ul class="list-unstyled lh-lg my-3">
                        <li>Type: <strong>${plan.plan_type}</strong></li>
                        <li><strong>${plan.duration_days}</strong> Days Validity</li>
                        <li><strong>${plan.max_companies}</strong> Companies</li>
                        <li><strong>${plan.max_users}</strong> Users</li>
                        <li><strong>${plan.max_sites}</strong> Sites</li>
                    </ul>
                    ${buttonHtml}
                </div>
            </div>
        </div>
    `;
}

// --- Actions ---

async function redeemCoupon() {
    const codeInput = document.getElementById('coupon-code');
    const code = codeInput.value.trim();

    if (!code) {
        toastr.warning("Please enter a coupon code");
        return;
    }

    try {
        const result = await authFetch('/wallet/redeem-coupon', {
            method: 'POST',
            body: JSON.stringify({ code: code })
        });
        
        toastr.success(result.message);
        codeInput.value = '';
        fetchWallet();
        fetchTransactions();
    } catch (e) {
        // Error handled in authFetch
    }
}

// --- Buy Modal ---

let selectedPlanIdForBuy = null;

function openBuyModal(planId) {
    selectedPlanIdForBuy = planId;
    const plan = state.plans.find(p => p.id === planId);
    
    const details = `
        <p>You are about to subscribe to <strong>${plan.name}</strong>.</p>
        <p>Price: <strong>₹${plan.price}</strong></p>
        <p>Duration: <strong>${plan.duration_days} days</strong></p>
        <p>Limits: <strong>${plan.max_companies} Companies, ${plan.max_users} Users, ${plan.max_sites} Sites</strong></p>
    `;
    
    document.getElementById('modal-buy-details').innerHTML = details;
    const modal = new bootstrap.Modal(document.getElementById('modal-confirm-buy'));
    modal.show();
}

document.getElementById('btn-confirm-buy').addEventListener('click', async function() {
    if (!selectedPlanIdForBuy) return;

    try {
        const result = await authFetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify({ plan_id: selectedPlanIdForBuy })
        });

        toastr.success(result.message);
        bootstrap.Modal.getInstance(document.getElementById('modal-confirm-buy')).hide();
        
        // Refresh everything
        fetchWallet();
        fetchTransactions();
        fetchSubscriptionsData().then(renderSubscriptions);
        renderPlans(); // To update buttons
    } catch (e) {
        // Error handled in authFetch
    }
});

// --- Change Plan Modal (Proration Logic) ---

let selectedPlanIdForChange = null;

function openChangePlanModal(newPlanId, currentSubId) {
    selectedPlanIdForChange = newPlanId;
    
    const newPlan = state.plans.find(p => p.id === newPlanId);
    const currentSub = state.subscriptions.find(s => s.id === currentSubId);
    const oldPlan = state.plans.find(p => p.id === currentSub.plan_id);

    // --- Proration Logic (Replicating Backend) ---
    const now = new Date();
    const endDate = new Date(currentSub.end_date);
    
    // Calculate remaining days
    const diffTime = endDate - now;
    let remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (remainingDays < 0) remainingDays = 0;

    const oldDailyPrice = oldPlan.price / oldPlan.duration_days;
    const remainingValue = remainingDays * oldDailyPrice;

    const newDailyPrice = newPlan.price / newPlan.duration_days;
    const extraDays = Math.floor(remainingValue / newDailyPrice);

    let walletDeduction = 0;
    if (newPlan.price > oldPlan.price) {
        walletDeduction = newPlan.price - oldPlan.price;
    }

    const totalDays = newPlan.duration_days + extraDays;
    const newEndDate = new Date(now.getTime() + (totalDays * 24 * 60 * 60 * 1000));

    // --- Render Details ---
    const html = `
        <p>Switching from <strong>${oldPlan.name}</strong> to <strong>${newPlan.name}</strong>.</p>
        <ul class="list-unstyled">
            <li>Remaining days on old plan: <strong>${remainingDays}</strong></li>
            <li>Extra days added (prorated): <strong>${extraDays}</strong></li>
            <li><strong>New End Date: ${newEndDate.toLocaleDateString()}</strong></li>
        </ul>
        <div class="alert alert-${walletDeduction > 0 ? 'warning' : 'info'}">
            ${walletDeduction > 0 
                ? `You will be charged <strong>₹${walletDeduction.toFixed(2)}</strong> immediately.` 
                : `No immediate charge for downgrading.`}
        </div>
    `;

    document.getElementById('modal-change-details').innerHTML = html;
    const modal = new bootstrap.Modal(document.getElementById('modal-confirm-change'));
    modal.show();
}

document.getElementById('btn-confirm-change').addEventListener('click', async function() {
    if (!selectedPlanIdForChange) return;

    try {
        const result = await authFetch('/change-plan', {
            method: 'POST',
            body: JSON.stringify({ new_plan_id: selectedPlanIdForChange })
        });

        toastr.success(result.message);
        bootstrap.Modal.getInstance(document.getElementById('modal-confirm-change')).hide();
        
        // Refresh everything
        fetchWallet();
        fetchTransactions();
        fetchSubscriptionsData().then(renderSubscriptions);
        renderPlans();
    } catch (e) {
        // Error handled in authFetch
    }
});