import requests
import sys
import json

class BitSafeAPITester:
    def __init__(self, base_url="https://d6b0c07a-fe05-47c2-912c-c95aec9873e8.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except json.JSONDecodeError:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                except:
                    pass
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api",
            200
        )

    def test_status_endpoint_get(self):
        """Test the GET status endpoint"""
        return self.run_test(
            "GET Status Endpoint",
            "GET",
            "api/status",
            200
        )

    def test_status_endpoint_post(self):
        """Test the POST status endpoint"""
        return self.run_test(
            "POST Status Endpoint",
            "POST",
            "api/status",
            200,
            data={"client_name": "test_client"}
        )

def main():
    # Setup
    tester = BitSafeAPITester()
    
    # Run tests
    tester.test_root_endpoint()
    tester.test_status_endpoint_get()
    tester.test_status_endpoint_post()

    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())