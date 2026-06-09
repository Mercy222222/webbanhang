---
name: db-backend
description: "PHP, MySQL database administration, SQL schemas, migrations, security audits, and backend logic. ALWAYS use this skill when executing backend code changes, SQL mutations, or API design tasks."
---

# DB Backend — Development Guidelines

Use this skill when implementing, refactoring, or auditing PHP backend code or MySQL database schemas.

## Guidelines & Principles

### 1. Database Connections & SQL Security
- **ALWAYS use PDO** for database connections in PHP. Avoid using raw mysql or mysqli functions unless working with legacy code.
- **NEVER interpolate variables** directly in SQL statements. Always use prepared statements with parameter binding:
  ```php
  $stmt = $pdo->prepare('SELECT * FROM products WHERE category_id = :cat_id');
  $stmt->execute(['cat_id' => $categoryId]);
  $products = $stmt->fetchAll();
  ```
- **XSS Prevention**: Sanitize all output sent to the browser using `htmlspecialchars($data, ENT_QUOTES, 'UTF-8')`.

### 2. SQL Schema Integrity
- When writing SQL migration scripts, design schemas incrementally.
- Always check for existing constraints using clauses like `IF NOT EXISTS` or `DROP TABLE IF EXISTS`.
- Ensure all foreign keys have appropriate cascading rules (`ON DELETE CASCADE` / `ON UPDATE CASCADE`) to avoid orphaned records.

### 3. File Outputs
- Keep database setup code organized (e.g. `setup_db.php` or `fix_db.php`).
- Output intermediate SQL scripts or migration plans to `_workspace/` for QA verification before running modifications directly on the production database.

## Typical Workflows
1. **Analyze Requirements**: Check which database table mutations are needed.
2. **Draft Schema/SQL**: Create the SQL draft in `_workspace/` (e.g. `_workspace/01_backend_schema.sql`).
3. **Trigger QA Validation**: Notify the QA Tester to run the draft against a local test database.
4. **Deploy & Integrate**: Once approved, run the SQL script and update the corresponding PHP logic.
