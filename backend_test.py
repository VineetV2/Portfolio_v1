import requests
import sys
from datetime import datetime

class PortfolioBackendTester:
    def __init__(self, base_url="https://814dcffb-b0b2-4277-b585-2ce3b032ca8e.preview.emergentagent.com"):
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
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    print(f"   Response: {response.json()}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.content:
                    print(f"   Response: {response.text}")

            return success, response.json() if success and response.content else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timed out after 10 seconds")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test health endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        return success

    def test_analytics_track(self):
        """Test analytics tracking endpoint"""
        analytics_data = {
            "page": "/",
            "referrer": "test_referrer",
            "user_agent": "Test User Agent",
            "screen_width": 1920,
            "screen_height": 1080
        }
        success, response = self.run_test(
            "Analytics Track Visit",
            "POST",
            "api/analytics/track",
            200,
            data=analytics_data
        )
        return success

    def test_analytics_stats(self):
        """Test analytics stats endpoint"""
        success, response = self.run_test(
            "Analytics Stats",
            "GET",
            "api/analytics/stats",
            200
        )
        
        if success and response:
            # Check if response has expected fields
            expected_fields = ['total_visits', 'today_visits', 'total_messages', 'unread_messages', 'recent_visits', 'top_referrers', 'devices']
            missing_fields = [field for field in expected_fields if field not in response]
            if missing_fields:
                print(f"   ⚠️  Missing fields in response: {missing_fields}")
                return False
            else:
                print(f"   ✅ All expected fields present in analytics response")
        
        return success

    def test_contacts_endpoint(self):
        """Test contacts endpoint"""
        success, response = self.run_test(
            "Get Contacts",
            "GET",
            "api/contacts",
            200
        )
        return success

def main():
    """Run all backend tests"""
    print("=" * 60)
    print("PORTFOLIO BACKEND API TESTING")
    print("=" * 60)
    
    # Setup
    tester = PortfolioBackendTester()
    
    # Test all endpoints
    print("\n📋 TESTING BACKEND APIs...")
    
    # Health check
    if not tester.test_health_endpoint():
        print("❌ Health endpoint failed")
    
    # Analytics endpoints
    if not tester.test_analytics_track():
        print("❌ Analytics track endpoint failed")
        
    if not tester.test_analytics_stats():
        print("❌ Analytics stats endpoint failed")
        
    # Contacts endpoint  
    if not tester.test_contacts_endpoint():
        print("❌ Contacts endpoint failed")

    # Print final results
    print(f"\n📊 FINAL RESULTS:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"Success rate: {success_rate:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print("⚠️  Some backend tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())