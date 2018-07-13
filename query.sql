SELECT 
  product.maker
FROM product
WHERE product.maker NOT IN (
  SELECT product.maker
  FROM product
  INNER JOIN printer
  ON product.model=printer.model
)
GROUP BY product.maker