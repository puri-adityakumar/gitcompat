# GitCompat Database Design

## Overview

The GitCompat database uses a simple, denormalized design with two independent tables for efficient data collection. This approach prioritizes simplicity and performance for basic analytics while keeping the schema easy to understand and maintain.

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│    FEEDBACK     │       │ CONTRIBUTION_   │
│                 │       │   SIGNUPS       │
├─────────────────┤       ├─────────────────┤
│ id (BIGSERIAL)  │       │ id (BIGSERIAL)  │
│ liked_project   │       │ email (TEXT)    │
│ helpful_for_devs│       │ time_of_response│
│ rating (1-5)    │       └─────────────────┘
│ suggestions     │       
│ wants_to_       │       
│   contribute    │       
│ email (TEXT)    │       
│ twitter (TEXT)  │       
│ user_agent      │       
│ page_url        │       
│ session_id      │       
│ created_at      │       
└─────────────────┘       
```

## Table Specifications

### 1. Feedback Table

**Purpose**: Store user feedback responses from the feedback form.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique feedback identifier |
| `liked_project` | BOOLEAN | - | Whether user liked the project |
| `helpful_for_devs` | BOOLEAN | - | If project helps developers |
| `rating` | INTEGER | CHECK (1-5) | Overall rating (1-5 stars) |
| `suggestions` | TEXT | - | User improvement suggestions |
| `wants_to_contribute` | BOOLEAN | - | Interest in contributing |
| `email` | TEXT | - | Optional user email |
| `twitter` | TEXT | - | Optional user twitter |
| `user_agent` | TEXT | - | Browser/device information |
| `page_url` | TEXT | - | Page where feedback was given |
| `session_id` | TEXT | - | Anonymous session tracking |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Feedback submission time |

**Indexes**:
- `idx_feedback_created_at` on `created_at`
- `idx_feedback_rating` on `rating`
- `idx_feedback_liked_project` on `liked_project`
- `idx_feedback_email` on `email`

### 2. Contribution Signups Table

**Purpose**: Simple email collection for contribution notifications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique signup identifier |
| `email` | TEXT | NOT NULL | Required email for notifications |
| `time_of_response` | TIMESTAMP | DEFAULT NOW() | When signup was submitted |

**Indexes**:
- `idx_contribution_signups_email` on `email`
- `idx_contribution_signups_time` on `time_of_response`

## Design Benefits

### 1. **Simplicity**
- Two independent tables with clear purposes
- No complex relationships or foreign keys
- Easy to understand and maintain

### 2. **Performance**
- Direct data access without joins
- Minimal indexes for fast queries
- Efficient for basic analytics needs

### 3. **Flexibility**
- Anonymous feedback collection supported
- Optional email collection in feedback
- Simple email list for contribution notifications

## Analytics Views

### 1. Feedback Analytics
```sql
CREATE VIEW feedback_analytics AS
SELECT 
  COUNT(*) as total_responses,
  AVG(rating::float) as average_rating,
  COUNT(*) FILTER (WHERE liked_project = true) as liked_count,
  COUNT(*) FILTER (WHERE helpful_for_devs = true) as helpful_count,
  COUNT(*) FILTER (WHERE wants_to_contribute = true) as contribute_count,
  COUNT(DISTINCT user_id) as unique_users,
  DATE_TRUNC('day', created_at) as date
FROM feedback
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;
```

### 2. Contribution Analytics
```sql
CREATE VIEW contribution_analytics AS
SELECT 
  COUNT(*) as total_signups,
  COUNT(DISTINCT email) as unique_emails,
  DATE_TRUNC('day', time_of_response) as date
FROM contribution_signups
GROUP BY DATE_TRUNC('day', time_of_response)
ORDER BY date DESC;
```

## Helper Functions

### get_or_create_user()
```sql
CREATE OR REPLACE FUNCTION get_or_create_user(
  p_email TEXT DEFAULT NULL,
  p_twitter TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
) RETURNS UUID
```

**Purpose**: Efficiently handle user creation/retrieval logic:
- Finds existing user by email if provided
- Updates `last_seen_at` for returning users
- Creates new user record if not found
- Returns user UUID for foreign key relationships

## Security

### Row Level Security (RLS)
- **Public INSERT** policies for feedback and signups
- **Authenticated SELECT** policies for admin access
- **User privacy** protected through proper access controls

### Data Privacy
- Email addresses stored securely with unique constraints
- Optional fields respect user privacy choices
- Session tracking for analytics without personal identification

## Usage Patterns

### 1. Feedback Submission Flow
```
User submits feedback → 
Check for existing user by email → 
Create/update user record → 
Insert feedback with user_id reference
```

### 2. Contribution Signup Flow
```
User signs up for notifications → 
Check for existing user by email → 
Create/update user record → 
Insert contribution signup with user_id reference
```

### 3. Analytics Queries
```
Daily feedback metrics → feedback_analytics view
Contribution signup trends → contribution_analytics view
User engagement patterns → user_engagement view
```

## Performance Considerations

### Indexing Strategy
- **Primary keys**: Automatic B-tree indexes
- **Foreign keys**: Indexed for JOIN performance
- **Filter columns**: Indexed for WHERE clause optimization
- **Timestamp columns**: Indexed for date-range queries

### Query Optimization
- Views pre-aggregate common analytics queries
- Proper JOIN strategies with indexed foreign keys
- Efficient date-based partitioning potential for large datasets

## Migration Notes

### From Previous Schema
If migrating from a denormalized schema:
1. Create `users` table first
2. Extract unique email/twitter combinations
3. Update feedback records with user_id references
4. Drop redundant email/twitter columns from feedback table

### Future Enhancements
- **User preferences** table for notification settings
- **Email verification** status tracking
- **Contribution history** tracking
- **Analytics events** table for detailed user journey tracking 