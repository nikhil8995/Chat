# MsgApp - Django Chat Application

MsgApp is a simple, modern chat application built with Django. It allows registered users to chat with each other in a clean, dark-themed interface.

## Features
- User registration and authentication
- List of all users (except yourself)
- One-on-one chat rooms
- Real-time message updates (polling)
- Modern, responsive dark mode UI

## Project Structure
- `msgsite/` - Main Django project settings and URLs
- `chat/` - Chat app with models, views, templates, and static files
- `staticfiles/` - Collected static files for deployment
- `db.sqlite3` - SQLite database (default for development)
- `manage.py` - Django management script

## Setup Instructions

1. **Clone the repository**

2. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv myenv
   source myenv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (optional, for admin access):
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the app**
   - Visit [http://localhost:8000/](http://localhost:8000/) in your browser.

## Usage
- Register a new account or log in.
- See a list of other users and start a chat by clicking their name.
- Send and receive messages in real time (auto-refresh every 3 seconds).
- Log out from the home page.

## Admin Panel
- Visit `/admin/` to manage users and messages (requires superuser login).

## Customization
- Modify styles in `chat/static/chat/css/style.css`.
- Update templates in `chat/templates/chat/`.

## License
This project is for educational/demo purposes. 