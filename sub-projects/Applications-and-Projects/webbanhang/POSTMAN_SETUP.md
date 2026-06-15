# 🚀 GearVN API Postman Setup Guide

This guide describes how to configure, import, and run the RESTful API endpoints for the **GearVN** e-commerce store using Postman.

---

## 🛠️ Step 1: Start the Local API Server

Make sure your local PHP server and MySQL server are running. 

1. Ensure MySQL is running on your system (e.g., via XAMPP, Laragon, or standalone MySQL).
2. Run the database setup script to initialize the database and seed the mock products:
   ```bash
   php setup_db.php
   ```
   *Alternatively, open `http://localhost:8080/setup_db.php` in your browser.*

3. Start the PHP development server on port `8080`:
   ```bash
   php -S localhost:8080
   ```

---

## 📥 Step 2: Import into Postman

We have prepared both the API Collection and the Environment files for you.

1. Open **Postman**.
2. Click the **Import** button in the top-left corner.
3. Drag & drop or browse to select the following files from the root of this project:
   * 📁 [GearVN_API.postman_collection.json](file:///c:/webbanhang/webbanhang/GearVN_API.postman_collection.json) — *Contains the RESTful requests.*
   * 📁 [GearVN_API.postman_environment.json](file:///c:/webbanhang/webbanhang/GearVN_API.postman_environment.json) — *Contains environment configuration (e.g., base URL).*

---

## ⚙️ Step 3: Select the Environment

1. In the top-right corner of Postman, click the Environment dropdown (it might say "No Environment" initially).
2. Select **"GearVN Local Development"** from the list.
3. This sets `{{base_url}}` to `http://localhost:8080`. If your local server runs on a different port, you can edit this variable inside Postman without changing the request configurations.

---

## 🧪 Step 4: Run the Requests

The collection is designed to run in a logical sequence. It has built-in scripting to automatically pass values between requests:

1. **`GET List Products`**
   * **Method:** `GET`
   * **URL:** `{{base_url}}/index.php?url=api/products`
   * Retrieves all product items from the database.

2. **`GET Single Product`**
   * **Method:** `GET`
   * **URL:** `{{base_url}}/index.php?url=api/products/1`
   * Retrieves details of the product with ID `1`.

3. **`POST Create Product (JSON)`**
   * **Method:** `POST`
   * **URL:** `{{base_url}}/index.php?url=api/products`
   * **Body:** JSON object representing the product details.
   * **Automation:** Contains a Postman **Test Script** that automatically extracts the created product's ID from the response and saves it as `{{created_product_id}}` in your active environment variables:
     ```javascript
     var jsonData = pm.response.json();
     if (jsonData.success && jsonData.data && jsonData.data.id) {
         pm.collectionVariables.set("created_product_id", jsonData.data.id);
     }
     ```

4. **`PUT Update Product (JSON)`**
   * **Method:** `PUT`
   * **URL:** `{{base_url}}/index.php?url=api/products/{{created_product_id}}`
   * Updates details of the product you just created in the previous step.

5. **`DELETE Product`**
   * **Method:** `DELETE`
   * **URL:** `{{base_url}}/index.php?url=api/products/{{created_product_id}}`
   * Cleans up the database by deleting the test product.

---

## 💡 Troubleshooting

* **Request Hangs / Connection Refused:** Make sure your PHP server is running and accessible at `http://localhost:8080`.
* **Database Errors:** Make sure `setup_db.php` completed successfully and your credentials in `app/config/database.php` match your local MySQL configuration.
