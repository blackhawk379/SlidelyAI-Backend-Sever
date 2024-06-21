# Backend Server

## Description

Express server in TypeScript for handling submissions. Endpoints include:
- **GET /ping**: Returns `true`
- **POST /submit**: Save submission
- **GET /read**: Retrieve submission by index
- **DELETE /delete**: Delete submission
- **GET /search**: Search by email
- **PUT /update**: Edit submission

## Getting Started

### Prerequisites
- Node.js and npm

### Installation
1. Clone the repository:
    ```bash
    git clone <backend-repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <repository-directory>
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Compile TypeScript:
    ```bash
    npx tsc
    ```
5. Run the server:
    ```bash
    npm start
    ```
