
Build a complete frontend for a Subscription Module that integrates with my backend APIs (ref : backend\package_service\routes.py).

🔐 Auth

Assume user is already authenticated.

JWT token is stored (cookies storage).

All API calls must send Authorization header:
Authorization: Bearer <token>

📦 Features to implement
1. Wallet System

    Show wallet balance.

    Allow user to redeem coupon code.

    Show wallet transaction history.

    Wallet balance can ONLY be increased by coupon code.

    UI:

        Wallet card with balance

        Coupon input box + Redeem button

        Transaction list (credit/debit)

2. Subscription Plans

    Fetch and display available plans.

    Each plan has:

        name

        plan_type

        price

        duration_days

        Group plans by plan_type.

    UI:

        Plan cards

        Buy button

        Show disabled button if same plan_type is already active

3. Active Subscriptions

Show all user subscriptions.

Display:

    plan name

    plan type

    start date

    end date

    status (active / expired / upgraded / downgraded)

    carried days (if any)

4. Buy Subscription (Wallet Only)

When user clicks Buy:

    Check wallet balance

    Call subscription API

    Update wallet balance

    Refresh subscriptions list

5. Upgrade / Downgrade (Prorated)

Allow changing plan only within same plan_type.

Show:

    remaining days

    extra days added

    new end date

    wallet deduction (if any)

    Confirm modal before upgrade/downgrade.

🧠 Business Rules (must enforce in UI)

    User can have multiple active subscriptions of different plan_type.

    User cannot have more than one active subscription of the same plan_type.

    Payment is only through wallet.

    Wallet top-up is only through coupon.

    Upgrade/downgrade uses prorated logic.

🧩 Pages / Components

* Dashboard

* Wallet section

* Coupon redeem form

* Plan list

* Active subscriptions list

* Upgrade/Downgrade modal

* Transaction history table

⚙
🔗 API Integration
Use the API from the below reference file:
backend\package_service\routes.py