# Custom Order ID Implementation

## Overview
Changed order ID format from MongoDB ObjectId (e.g., `69941ef70b804e2d1d7c8d4a`) to a human-readable format: `YYYYMMDD-XXXX`

## Format
- **YYYYMMDD**: Year, Month, Day (e.g., 20260217 for February 17, 2026)
- **XXXX**: 4-digit incremental serial number (0001, 0002, 0003, etc.)

## Examples
- `20260217-0001` - First order on February 17, 2026
- `20260217-0002` - Second order on February 17, 2026
- `20260218-0001` - First order on February 18, 2026 (counter resets daily)

## Implementation Details

### Files Modified/Created:
1. **order.counter.model.ts** (NEW) - Tracks daily order counts
2. **order.model.ts** - Added `orderId` field
3. **order.interface.ts** - Added `orderId` to TOrder type
4. **order.service.ts** - Added `generateOrderId()` function

### How It Works:
1. When a new order is created, `generateOrderId()` is called
2. It gets today's date in YYYYMMDD format
3. It finds/creates a counter document for today
4. Increments the counter atomically (thread-safe)
5. Returns formatted ID: `YYYYMMDD-XXXX`

### Database Schema:
```typescript
OrderCounter Collection:
{
  date: "20260217",  // YYYYMMDD format
  count: 5           // Number of orders today
}
```

### Benefits:
- ✅ Human-readable order IDs
- ✅ Easy to identify order date
- ✅ Sequential numbering per day
- ✅ Thread-safe counter increment
- ✅ Automatic daily reset

### Response Format:
```json
{
  "_id": "69941ef70b804e2d1d7c8d4a",  // MongoDB internal ID (still exists)
  "orderId": "20260217-0001",          // NEW: Custom order ID
  "orderInfo": [...],
  "customerInfo": {...},
  ...
}
```

## Notes:
- The MongoDB `_id` field still exists for internal database operations
- The new `orderId` field is what should be displayed to users
- Counter resets automatically each day (based on date key)
- Format uses 4 digits, supporting up to 9999 orders per day
