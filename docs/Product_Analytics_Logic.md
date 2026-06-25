# Product Analytics Logic

## Total Products

COUNT(products)

---

## Products Per Category

GROUP BY category

---

## Active Products

status = Active

---

## Inactive Products

status = Inactive

---

## Duplicate Products

Same SKU

OR

Same Product Name

---

## Products Without Images

image_url IS NULL

OR

image_url = ""

---

## Below Minimum Stock

stock < minimum_stock