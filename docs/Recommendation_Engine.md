# Recommendation Engine

## Purpose

The Recommendation Engine analyzes inventory, sales, and purchase data to provide actionable business recommendations that help improve inventory management and operational efficiency.

---

## 1. Products to Reorder

### Logic

If:

Current Stock < Minimum Stock

### Recommendation

Suggest reordering the product.

### Example

Product: Wireless Mouse

Current Stock: 8

Minimum Stock: 20

**Recommendation:**
Reorder 40 units.

---

## 2. Products to Discontinue

### Logic

If:

- No sales in the last 90 days
- Overstock exists

### Recommendation

Consider discontinuing the product or offering discounts to clear inventory.

---

## 3. Overstock Reduction

### Logic

If:

Current Stock > Maximum Stock

### Recommendation

Reduce future purchase orders or launch promotional offers.

---

## 4. Warehouse Stock Balancing

### Logic

Compare stock levels across all warehouses.

### Recommendation

Transfer stock from overstocked warehouses to warehouses with low inventory.

---

## 5. Supplier Suggestions

### Logic

Analyze supplier performance based on:

- Purchase volume
- Delivery reliability
- Pending orders

### Recommendation

Recommend suppliers with the best overall performance.

---

## 6. Restocking Priority

### Priority Levels

### High Priority

- Out of stock
- High sales demand

### Medium Priority

- Low stock
- Moderate sales demand

### Low Priority

- Adequate stock available

---

## Example AI Recommendations

- Reorder 40 units of Wireless Mouse.
- Transfer 25 Keyboards from Warehouse A to Warehouse B.
- Reduce purchases of USB Cables due to overstock.
- Prioritize Laptop restocking because demand is high.
- Preferred supplier: ABC Electronics based on delivery performance.