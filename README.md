HBnB Evolution – Technical Documentation (Part 1)
📚 Project Overview
HBnB Evolution is a simplified AirBnB-like application.
This documentation presents the main architecture, core entities, and key workflows using UML diagrams.

🏗️ Architecture
The project uses a three-layer architecture:

Presentation Layer (APIs, user interaction)

Business Logic Layer (models, services)

Persistence Layer (database access)

![Package Diagram](./images/package_diagram Entities

User: Registers, updates profile, can be admin or regular user

Place: Listed by a user, with details and amenities

Review: User feedback on a place

Amenity: Features available at a place

![Class Diagram](./images/class_diagram.pngflows

User Registration
![User Registration](./images/user_registration**
![Place Creation](./images/place_creation**
![Add Review](./images/add_review.png**
![Fetch Places](./images/fetch_places.png View Diagrams
All diagrams are in docs/images/.
Edit or regenerate with the Mermaid source files in docs/diagrams/.



 #📁 HBNB  Project Structure

holbertonschool-hbnb/
├── part1/                        # 📖 Technical documentation & UML diagrams (Part 1)
│   └── docs/
│       ├── diagrams/
│       │   ├── package_diagram.mmd
│       │   ├── class_diagram.mmd
│       │   └── sequence_diagrams/
│       │       ├── user_registration.mmd
│       │       ├── place_creation.mmd
│       │       ├── add_review.mmd
│       │       └── fetch_places.mmd
│       ├── images/
│       │   ├── package_diagram.png
│       │   ├── class_diagram.png
│       │   ├── user_registration.png
│       │   ├── place_creation.png
│       │   ├── add_review.png
│       │   └── fetch_places.png
│       └── technical_guide.md
│
├── models/                       # 🏗️ Python classes for core entities (User, Place, Review, Amenity, etc.)
│   ├── __init__.py
│   ├── user.py
│   ├── place.py
│   ├── review.py
│   ├── amenity.py
│   └── base_model.py
│
├── api/                          # 🌐 API code (e.g., Flask app, endpoints)
│   ├── __init__.py
│   ├── app.py
│   └── routes/
│       ├── users.py
│       ├── places.py
│       ├── reviews.py
│       └── amenities.py
│
├── persistence/                  # 💾 Database setup, ORM, and data access
│   ├── __init__.py
│   ├── db.py
│   └── orm.py
│
├── web_static/                   # 🎨 HTML/CSS/JS for the web interface (optional)
│   ├── index.html
│   └── styles.css
│
├── tests/                        # 🧪 Unit and integration tests
│   ├── __init__.py
│   ├── test_user.py
│   ├── test_place.py
│   ├── test_review.py
│   └── test_amenity.py
│
├── requirements.txt              # 📦 Python dependencies
├── README.md                     # 📝 Project overview and instructions
└── .gitignore                    # 🚫 Files/folders to ignore in git

# THE DIAGRAMS 

    -- package_diagram.png
 ![Alt text](https://github.com/MOUSSA-info/holbertonschool-hbnb/blob/9c3e42e44d08b2343d4ff63bea08c31ac1e94543/package_diagram%20.png)
    
    ── class_diagram.png
![Alt text](https://github.com/MOUSSA-info/holbertonschool-hbnb/blob/024020f0aeb23c88b5fb4789b2813ca1be67a28b/class%20diagram.png.png)

    ── user_registration.png
![Alt text](.png)

    ── place_creation.png
![Alt text](.png)
    ── add_review.png
![Alt text](.png)
    ── fetch_places.png 
![Alt text](.png)
