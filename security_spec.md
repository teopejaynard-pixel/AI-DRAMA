# AI DRAMA Security Specification

## Data Invariants
1. A user can only access their own private data (profile, watch history, watchlist, subscriptions, payments).
2. Only admins can create/edit/delete dramas, seasons, and episodes.
3. Reviews can only be created/edited by the author.
4. AI Generation Jobs can only be created and viewed by admins.
5. All IDs must be valid strings matching regex.
6. Timestamps must be validated using `request.time`.
7. Subscription status determines access to premium episodes.

## Dirty Dozen Payloads (Rejections)
1. User trying to update someone else's profile.
2. User trying to create a drama.
3. User trying to delete a drama.
4. User trying to set their own `isPremium` field to true.
5. User trying to set their own `role` to 'admin'.
6. User trying to create a review with someone else's `userId`.
7. User trying to update a finished payment status.
8. User trying to inject a 1MB string into a `title` field.
9. User trying to bypass season numbering (e.g. season -1).
10. User trying to set `createdAt` to a past date (must be `request.time`).
11. User trying to update an immutable field like `dramaId` in a season.
12. User trying to list all payments (only own payments or admin list).

## Verification Strategy
- Use `isValidId()` for all path variables.
- Use `isValidUser()`, `isValidDrama()`, etc. helpers.
- Use `isAdmin()` check against `/admins/$(request.auth.uid)`.
- Use `isOwner(userId)` for private resources.
