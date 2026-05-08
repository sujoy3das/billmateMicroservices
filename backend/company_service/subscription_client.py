import requests

PACKAGE_SERVICE_URL = "http://127.0.0.1:8002"

def get_allowed_companies(user_id: int) -> int:
    try:
        r = requests.get(f"{PACKAGE_SERVICE_URL}/check-limit", params={"user_id": user_id})
        if r.status_code == 200:
            return r.json().get("allowed_companies", 0)
    except Exception as e:
        print(f"Error fetching subscription limit: {e}")
    return 0
