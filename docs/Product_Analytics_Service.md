# Product Analytics Service

## Metrics

### Total Products
Count of all products in the inventory.

Formula:
COUNT(products)

---

### Products per Category
Count products grouped by category.

Formula:
GROUP BY category

---

### Active vs Inactive Products

Active:
status = Active

Inactive:
status = Inactive

---

### Products without Images

Products where:

image_url IS NULL

or

image_url = ""

---

### Products below Minimum Stock

Placeholder until inventory module is completed.

Formula:

stock < minimum_stock