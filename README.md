# Candle Bags (JS Interview Exercise)

Pack candles into the **fewest number of bags**. Your store only has 3 different types of bag - Each bag can hold **exactly** `1`, `2`, or `3` candles. Unlimited supply of each size.

You’re given a list of candle types with required quantities.
Same-type candles are interchangeable, but keep type counts in the output. You may split a type across multiple bags.
Preserve the original input order when filling (earlier types fill space first).

---

## Input format
```json
{
  "batch_id": "batch_1",
  "items": [
    {"type": "white_candle", "quantity": 1},
    {"type": "red_candle", "quantity": 3}
  ]
}
```

## Output format

```json
[
  {
    "bag_id": "1",
    "size": 3,
    "items": [
      {"type": "white_candle", "quantity": 1},
      {"type": "red_candle", "quantity": 2}
    ]
  },
  {
    "bag_id": "2",
    "size": 1,
    "items": [
      {"type": "red_candle", "quantity": 1}
    ]
  }
]
```


- After you implement your code you can run `node runMySolution.js`
- To do the final check, and check if your code passes the test, run `npm test`
