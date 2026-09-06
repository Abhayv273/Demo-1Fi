# 1Fi Marketplace - SDE Assignment (Demo)

A recruiter-ready frontend implementation of the **1Fi Marketplace** section for the 1Fi SDE Intern Assignment.

The project extends the existing **Shop** experience with a complete marketplace journey where users can browse products, view product details, select product variants, choose an EMI plan, add the selected configuration to the cart, and proceed through a demo checkout flow.

---
## Deployed 
https://1fi-marketplace.netlify.app/

## 📌 Project Overview

The objective of this project is to implement the **1Fi Marketplace** inside the Shop experience while maintaining a clean, responsive and consistent user experience.

The implementation focuses on:

- Product discovery
- Product listing
- Product details
- Product variants
- Variant-specific pricing
- EMI plan discovery
- EMI plan selection
- Selected-plan CTA
- Cart management
- Checkout
- Demo order confirmation
- Responsive UI
- Reusable React components
- Mock API/data handling
- Loading and error states

The implementation intentionally keeps **Top Brands** and **Nearby Stores** as placeholders because no implementation is required for those sections in the assignment.

---

# 🎯 Assignment Requirements

The Marketplace implementation covers the required functionality:

| Requirement | Implementation |
|---|---|
| Product listing | ✅ |
| Product image | ✅ |
| Product name | ✅ |
| Product pricing | ✅ |
| Product variants | ✅ |
| EMI options/plans | ✅ |
| Product details | ✅ |
| EMI plan selection | ✅ |
| CTA to proceed with selected plan | ✅ |
| Responsive UI | ✅ |
| Dynamic/mock data structure | ✅ |
| Loading state | ✅ |
| Error state | ✅ |
| Retry handling | ✅ |
| Reusable components | ✅ |
| State management | ✅ |

---

# 🔄 Complete Application Flow

```text
┌───────────────────────┐
│        Login          │
│  Name + Mobile Number │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│         Shop          │
│                       │
│  ┌─────────────────┐  │
│  │   Top Brands    │  │
│  │  Coming Soon    │  │
│  └─────────────────┘  │
│                       │
│  ┌─────────────────┐  │
│  │ Nearby Stores   │  │
│  │  Coming Soon    │  │
│  └─────────────────┘  │
│                       │
│  ┌─────────────────┐  │
│  │ 1Fi Marketplace │  │
│  │     Explore     │  │
│  └────────┬────────┘  │
└───────────┼───────────┘
            │
            ▼
┌────────────────────────────┐
│     1Fi Marketplace        │
│                            │
│ Search                     │
│ Category Filter            │
│                            │
│ ┌──────┐ ┌──────┐ ┌──────┐│
│ │Product│ │Product│ │Product│
│ └───┬──┘ └──────┘ └──────┘│
└─────┼──────────────────────┘
      │
      ▼
┌────────────────────────────┐
│      Product Details       │
│                            │
│ Product Image              │
│ Product Information        │
│ Price                      │
│ Rating & Reviews           │
│                            │
│ Select Variant             │
│ ┌──────┐ ┌──────┐          │
│ │Color │ │Storage│         │
│ └──────┘ └──────┘          │
│                            │
│ Select EMI Plan            │
│                            │
│ ○ 3 Months                 │
│ ○ 6 Months                 │
│ ○ 9 Months                 │
│ ○ 12 Months                │
│                            │
│ [Proceed with Selected     │
│          Plan]             │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│           Cart             │
│                            │
│ Product                    │
│ Selected Variant            │
│ Selected EMI               │
│ Quantity                   │
│                            │
│ [+] Quantity [-]           │
│ Remove                     │
│                            │
│ [Proceed to Checkout]      │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│         Checkout           │
│                            │
│ Full Name                  │
│ Mobile Number              │
│ Delivery Address           │
│                            │
│ 1Fi Pay Later              │
│ Selected EMI Plan          │
│ Monthly EMI                │
│                            │
│ [Place Demo Order]         │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│      Order Confirmation    │
│                            │
│ ✓ Order Placed             │
│                            │
│ Order ID                   │
│ Order Date                 │
│ Total Amount               │
│ Selected EMI               │
│                            │
│ [Continue Shopping]        │
└────────────────────────────┘
