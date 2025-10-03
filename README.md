# Complaint Management Portal

This is a full-stack web application designed to streamline the complaint registration and resolution process in a college environment. The system supports three distinct user roles—Student, Department, and Admin—each with a tailored dashboard and functionalities.

---

## Key Features

- **Multi-Role Authentication:** Secure login for three distinct user roles:
  - **Student:** Can submit complaints and track their status.
  - **Department:** Can manage complaints assigned to them and view analytics.
  - **Admin:** Has a global overview of the entire system.
- **Student Dashboard:** Students can submit new complaints via a simple form and view a history of their submissions with real-time status updates (Submitted, In Progress, Completed, Rejected).
- **Department Dashboard:** Department staff can view all complaints assigned to their specific department, update the status of each complaint, and analyze trends through interactive charts.
- **Admin Dashboard:** Admins have a comprehensive, high-level view of all system activity. This includes charts for complaints per department and status breakdowns, as well as tables listing all complaints.
- **Interactive Data Visualization:** The Department and Admin dashboards feature charts (powered by Chart.js) to provide at-a-glance insights into complaint data.

---

## Technology Stack

This project is built using a modern, robust technology stack.

#### Backend (Spring Boot)
- **Java 17+**
- **Spring Boot 3**
- **Spring Security** (for authentication and authorization)
- **Spring Data JPA & Hibernate** (for database interaction)
- **MySQL Database**
- **Maven** (for dependency management)

#### Frontend (Angular)
- **TypeScript**
- **Angular 18+**
- **`ng2-charts`** (wrapper for Chart.js)
- **Bootstrap 5** (for responsive UI components)
- **npm** (for package management)

---

## Getting Started

To run this project locally, you'll need to set up both the backend and frontend.

### Prerequisites
- Java JDK 17 or later
- Maven
- Node.js and npm
- A running MySQL server instance

### Backend Setup (Spring Boot)

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd demo
    ```
3.  **Configure the database:**
    Open `src/main/resources/application.properties` and update the database URL, username, and password to match your local MySQL setup.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password
    ```
4.  **Run the application:**
    You can run the `DemoApplication.java` file from your IDE or use Maven:
    ```bash
    mvn spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### Frontend Setup (Angular)

1.  **Navigate to the frontend directory:**
    ```bash
    cd complaint-portal 
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    ng serve
    ```
    The frontend will be available at `http://localhost:4200`.


## Developer

- **Name:** Karthi D
- **Course:** M.Tech Integrated Software Engineering
- **University:** VIT Chennai
- **Email:** karthi.d2022@vitstudent.ac.in
