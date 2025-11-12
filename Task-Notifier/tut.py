import time
from plyer import notification

def show_startup_notification():
    title = "HArvard CS50 AI"
    message = "Have to give Assignment of CS50 this week + tic-tac-toe."
    notification.notify(title=title, message=message, timeout=10)

def close_notification():
    print("Notification closed by user.")

if __name__ == "__main__":
    show_startup_notification()

    time.sleep(15)  # Adjust the time as needed
    close_notification()
