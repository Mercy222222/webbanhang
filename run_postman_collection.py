import json
import re
import time
import requests

def run_collection(collection_file):
    print("=" * 60)
    print("Starting Postman Collection Runner (Python simulation)")
    print("=" * 60)

    # Load collection
    with open(collection_file, 'r', encoding='utf-8') as f:
        collection = json.load(f)

    # Initialize environment variables
    env_vars = {
        "base_url": "http://localhost:8080",
        "created_product_id": ""
    }

    def replace_variables(text, variables):
        if not isinstance(text, str):
            return text
        # Find all placeholders like {{variable_name}}
        placeholders = re.findall(r'\{\{([^}]+)\}\}', text)
        for p in placeholders:
            if p in variables:
                text = text.replace(f"{{{{{p}}}}}", str(variables[p]))
        return text

    items = collection.get("item", [])
    total_passed = 0

    for idx, item in enumerate(items, 1):
        name = item.get("name")
        request_data = item.get("request", {})
        method = request_data.get("method", "GET")
        
        # Parse URL
        url_data = request_data.get("url", {})
        raw_url = url_data.get("raw", "")
        url = replace_variables(raw_url, env_vars)

        # Parse Headers
        headers = {}
        for h in request_data.get("header", []):
            headers[h.get("key")] = replace_variables(h.get("value"), env_vars)

        # Parse Body
        body_data = request_data.get("body", {})
        payload = None
        if body_data.get("mode") == "raw":
            raw_body = body_data.get("raw", "")
            interpolated_body = replace_variables(raw_body, env_vars)
            try:
                payload = json.loads(interpolated_body)
            except json.JSONDecodeError:
                payload = interpolated_body

        print(f"\n[{idx}/{len(items)}] {method} {name}")
        print(f"URL: {url}")
        if payload:
            print(f"Body: {json.dumps(payload, ensure_ascii=False, indent=2)}")

        # Send Request
        start_time = time.time()
        try:
            if method == "GET":
                response = requests.get(url, headers=headers)
            elif method == "POST":
                response = requests.post(url, headers=headers, json=payload if isinstance(payload, dict) else None, data=payload if isinstance(payload, str) else None)
            elif method == "PUT":
                response = requests.put(url, headers=headers, json=payload if isinstance(payload, dict) else None, data=payload if isinstance(payload, str) else None)
            elif method == "DELETE":
                response = requests.delete(url, headers=headers)
            else:
                print(f"Unsupported method: {method}")
                continue

            elapsed_ms = int((time.time() - start_time) * 1000)
            status_code = response.status_code
            
            # Print response info
            status_label = "[OK]" if 200 <= status_code < 300 else "[FAIL]"
            print(f"Time: {elapsed_ms}ms | Status: {status_label} {status_code}")
            
            try:
                resp_json = response.json()
                print(f"Response: {json.dumps(resp_json, ensure_ascii=False, indent=2)}")
            except Exception:
                print(f"Response: {response.text}")

            # Post-request Script Simulation (POST Create Product)
            if "Create Product" in name and 200 <= status_code < 300:
                try:
                    resp_json = response.json()
                    if resp_json.get("success") and "data" in resp_json and "id" in resp_json["data"]:
                        created_id = resp_json["data"]["id"]
                        env_vars["created_product_id"] = str(created_id)
                        print(f"Saved created_product_id = {created_id} (simulating Postman test script)")
                except Exception as e:
                    print(f"Failed to parse response for created_product_id: {e}")

            if 200 <= status_code < 300:
                total_passed += 1

        except Exception as e:
            print(f"Error sending request: {e}")

    print("\n" + "=" * 60)
    print(f"Results: {total_passed}/{len(items)} requests completed successfully.")
    print("=" * 60)

if __name__ == "__main__":
    run_collection("GearVN_API.postman_collection.json")
