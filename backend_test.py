import requests
import sys
import json
import time
import os
from datetime import datetime

class BitSafeAPITester:
    def __init__(self):
        # Get backend URL from frontend .env file
        self.base_url = self._get_backend_url()
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = {}

    def _get_backend_url(self):
        """Get the backend URL from the frontend .env file"""
        try:
            with open('/app/frontend/.env', 'r') as f:
                for line in f:
                    if line.startswith('REACT_APP_BACKEND_URL='):
                        return line.strip().split('=')[1].strip('"\'')
        except Exception as e:
            print(f"Error reading backend URL from .env: {str(e)}")
            # Fallback to the URL in the original code
            return "https://d6b0c07a-fe05-47c2-912c-c95aec9873e8.preview.emergentagent.com"

    def run_test(self, name, method, endpoint, expected_status, data=None, validate_func=None):
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
            elif method == 'OPTIONS':
                response = requests.options(url, headers=headers)

            success = response.status_code == expected_status
            
            # Additional validation if provided
            validation_result = True
            validation_message = ""
            if success and validate_func:
                try:
                    response_data = response.json()
                    validation_result, validation_message = validate_func(response_data)
                    success = success and validation_result
                except json.JSONDecodeError:
                    validation_result = False
                    validation_message = "Response is not valid JSON"
                    success = False
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if validation_message:
                    print(f"   {validation_message}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    self.test_results[name] = {
                        "status": "passed",
                        "response": response_data
                    }
                    return success, response_data
                except json.JSONDecodeError:
                    self.test_results[name] = {
                        "status": "passed",
                        "response": response.text[:100]
                    }
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if validation_message:
                    print(f"   {validation_message}")
                try:
                    print(f"   Response: {response.text[:200]}")
                except:
                    pass
                self.test_results[name] = {
                    "status": "failed",
                    "error": f"Expected {expected_status}, got {response.status_code}"
                }
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results[name] = {
                "status": "failed",
                "error": str(e)
            }
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        def validate_hello_world(data):
            if "message" in data and data["message"] == "Hello World":
                return True, "Response contains 'Hello World' message"
            return False, "Response does not contain expected 'Hello World' message"
            
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api",
            200,
            validate_func=validate_hello_world
        )

    def test_status_endpoint_get(self):
        """Test the GET status endpoint"""
        def validate_status_list(data):
            if isinstance(data, list):
                return True, f"Response contains a list of {len(data)} status checks"
            return False, "Response is not a list of status checks"
            
        return self.run_test(
            "GET Status Endpoint",
            "GET",
            "api/status",
            200,
            validate_func=validate_status_list
        )

    def test_status_endpoint_post(self):
        """Test the POST status endpoint"""
        client_name = f"BitSafe_Test_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        def validate_status_creation(data):
            if "id" in data and "client_name" in data and data["client_name"] == client_name:
                return True, f"Status check created with ID: {data['id']}"
            return False, "Response does not contain expected status check data"
            
        return self.run_test(
            "POST Status Endpoint",
            "POST",
            "api/status",
            200,
            data={"client_name": client_name},
            validate_func=validate_status_creation
        )

    def test_status_endpoint_post_then_get(self):
        """Test POST then GET to verify data persistence"""
        client_name = f"BitSafe_Persistence_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # First create a status check
        success, post_data = self.run_test(
            "POST Status for Persistence Test",
            "POST",
            "api/status",
            200,
            data={"client_name": client_name}
        )
        
        if not success:
            return False, {}
            
        # Wait a moment to ensure data is saved
        time.sleep(1)
        
        # Then get all status checks and verify our new one is there
        def validate_status_persistence(data):
            if not isinstance(data, list):
                return False, "Response is not a list of status checks"
                
            # Look for our specific client_name
            for status in data:
                if "client_name" in status and status["client_name"] == client_name:
                    return True, f"Found our status check with client_name: {client_name}"
                    
            return False, f"Could not find our status check with client_name: {client_name}"
            
        return self.run_test(
            "Status Data Persistence Test",
            "GET",
            "api/status",
            200,
            validate_func=validate_status_persistence
        )

    def test_cors_configuration(self):
        """Test CORS configuration by checking headers in response"""
        url = f"{self.base_url}/api"
        headers = {
            'Origin': 'http://example.com',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        
        self.tests_run += 1
        print(f"\n🔍 Testing CORS Configuration...")
        
        try:
            # Make a regular GET request and check CORS headers
            response = requests.get(url, headers=headers)
            
            # Check if CORS headers are present
            has_cors_headers = 'Access-Control-Allow-Origin' in response.headers
            
            if has_cors_headers:
                self.tests_passed += 1
                print(f"✅ Passed - CORS headers found in response")
                print(f"   Access-Control-Allow-Origin: {response.headers.get('Access-Control-Allow-Origin', 'N/A')}")
                self.test_results["CORS Configuration"] = {
                    "status": "passed",
                    "response": {
                        "cors_headers": dict([(k, v) for k, v in response.headers.items() if k.startswith('Access-Control')])
                    }
                }
                return True, {}
            else:
                print(f"❌ Failed - CORS headers not found in response")
                self.test_results["CORS Configuration"] = {
                    "status": "failed",
                    "error": "CORS headers not found in response"
                }
                return False, {}
                
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results["CORS Configuration"] = {
                "status": "failed",
                "error": str(e)
            }
            return False, {}

    def test_invalid_endpoint(self):
        """Test an invalid endpoint to verify error handling"""
        return self.run_test(
            "Invalid Endpoint",
            "GET",
            "api/nonexistent",
            404
        )

    def test_mongodb_integration(self):
        """Test MongoDB integration by creating and retrieving data"""
        # This test is covered by test_status_endpoint_post_then_get
        # but we'll add a specific test for MongoDB integration
        
        # Create a unique client name
        client_name = f"BitSafe_MongoDB_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # Create a status check
        success1, post_data = self.run_test(
            "MongoDB Integration - Create",
            "POST",
            "api/status",
            200,
            data={"client_name": client_name}
        )
        
        if not success1:
            return False, {}
            
        # Wait a moment to ensure data is saved
        time.sleep(1)
        
        # Verify we can retrieve it
        def validate_mongodb_retrieval(data):
            if not isinstance(data, list):
                return False, "Response is not a list of status checks"
                
            # Look for our specific client_name
            for status in data:
                if "client_name" in status and status["client_name"] == client_name:
                    return True, f"MongoDB integration verified - found status with client_name: {client_name}"
                    
            return False, f"MongoDB integration failed - could not find status with client_name: {client_name}"
            
        return self.run_test(
            "MongoDB Integration - Retrieve",
            "GET",
            "api/status",
            200,
            validate_func=validate_mongodb_retrieval
        )

def main():
    # Setup
    tester = BitSafeAPITester()
    
    print("\n🔒 BitSafe Crypto Insurance API Test Suite 🔒")
    print("=============================================")
    
    # Run tests
    tester.test_root_endpoint()
    tester.test_status_endpoint_get()
    tester.test_status_endpoint_post()
    tester.test_status_endpoint_post_then_get()
    tester.test_cors_configuration()
    tester.test_invalid_endpoint()
    tester.test_mongodb_integration()

    # Print results
    print("\n📊 Test Results Summary:")
    print("=============================================")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    # Print detailed results
    for name, result in tester.test_results.items():
        status = "✅" if result["status"] == "passed" else "❌"
        print(f"{status} {name}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())