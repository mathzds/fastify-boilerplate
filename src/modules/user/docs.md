Okay, here's the documentation formatted for a Markdown (`.md`) file. This format is designed to be easily readable on platforms like GitHub, GitLab, and other Markdown viewers.

```markdown
# User Management API

This document describes the API endpoints for managing users.

## Base URL

All API endpoints are relative to the base URL of your application.

## Authentication

The `/user/me` endpoint requires authentication using a JWT (JSON Web Token) in the `Authorization` header. The token should be prefixed with `Bearer `. For example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsImlhdCI6MTY3ODg4MzIwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Endpoints

### 1. Get User by ID

*   **Method:** `GET`
*   **Path:** `/user/:id`
*   **Description:** Retrieves a user by ID.
*   **Parameters:**
    *   `id` (string, required): The ID of the user to retrieve (passed as a URL parameter).
*   **Request Example:**

    ```
    GET /user/123e4567-e89b-12d3-a456-426614174000
    ```
*   **Success Response (200 OK):**

    ```json
    {
      "message": "ok",
      "user": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "johndoe",
        "email": "john.doe@example.com"
      }
    }
    ```
*   **Error Response (404 Not Found):**

    ```json
    {
      "error": {
        "code": "USER_NOT_FOUND",
        "message": "User not found"
      }
    }
    ```

### 2. Create User

*   **Method:** `POST`
*   **Path:** `/user`
*   **Description:** Creates a new user.
*   **Body:**

    ```json
    {
      "username": "johndoe",
      "email": "john.doe@example.com",
      "password": "securePassword123"
    }
    ```
*   **Success Response (201 Created):**

    ```json
    {
      "message": "ok",
      "user": {
        "id": "456e789a-cdef-4567-b89a-426614174000",
        "username": "johndoe",
        "email": "john.doe@example.com"
      }
    }
    ```
*   **Error Response (400 Bad Request):**

    ```json
    {
      "errors": [
        {
          "field": "email",
          "message": "Invalid email format"
        }
      ]
    }
    ```

### 3. Delete User

*   **Method:** `DELETE`
*   **Path:** `/user/:id`
*   **Description:** Deletes a user by ID.
*   **Parameters:**
    *   `id` (string, required): The ID of the user to delete (passed as a URL parameter).
*   **Request Example:**

    ```
    DELETE /user/123e4567-e89b-12d3-a456-426614174000
    ```
*   **Success Response (200 OK):**

    ```json
    {
      "message": "ok"
    }
    ```
*   **Error Response (404 Not Found):**

    ```json
    {
      "error": {
        "code": "USER_NOT_FOUND",
        "message": "User not found"
      }
    }
    ```

### 4. Update User

*   **Method:** `PUT`
*   **Path:** `/user/:id`
*   **Description:** Updates a user by ID.
*   **Parameters:**
    *   `id` (string, required): The ID of the user to update (passed as a URL parameter).
*   **Body:**

    ```json
    {
      "username": "newusername",
      "email": "new.email@example.com"
    }
    ```
*   **Success Response (200 OK):**

    ```json
    {
      "message": "ok",
      "user": {
        "username": "newusername",
        "email": "new.email@example.com"
      }
    }
    ```
*   **Error Response (400 Bad Request):**

    ```json
    {
      "errors": [
        {
          "field": "email",
          "message": "Invalid email format"
        }
      ]
    }
    ```

### 5. Login User

*   **Method:** `POST`
*   **Path:** `/user/login`
*   **Description:** Logs in a user with email and password.
*   **Body:**

    ```json
    {
      "email": "john.doe@example.com",
      "password": "securePassword123"
    }
    ```
*   **Success Response (200 OK):**

    ```json
    {
      "message": "ok",
      "user": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsImlhdCI6MTY3ODg4MzIwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
    ```
*   **Error Response (401 Unauthorized):**

    ```json
    {
      "error": {
        "code": "USER_NOT_FOUND",
        "message": "User not found"
      }
    }
    ```

### 6. Get Current User Profile

*   **Method:** `GET`
*   **Path:** `/user/me`
*   **Description:** Retrieves the current user's profile based on the JWT token in the `Authorization` header.
*   **Headers:**
    *   `Authorization` (string, required): The JWT token (e.g., "Bearer eyJhbGciOiJIUzI1Ni...").
*   **Request Example:**

    ```
    GET /user/me
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsImlhdCI6MTY3ODg4MzIwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```
*   **Success Response (200 OK):**

    ```json
    {
      "message": "ok",
      "decoded": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "johndoe",
        "email": "john.doe@example.com"
      }
    }
    ```
*   **Error Response (401 Unauthorized):**

    ```json
    {
      "error": {
        "code": "INVALID_TOKEN",
        "message": "Invalid token"
      }
    }
    ```

## Data Transfer Objects (DTOs)

This section describes the structure of the data transfer objects used in the API.

### UserDTO

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### UserUpdateDTO

```json
{
  "username": "string",
  "email": "string"
}
```

## Error Codes

This section lists the common error codes used in the API.

*   `USER_NOT_FOUND`: The requested user was not found.
*   `INVALID_TOKEN`: The provided JWT token is invalid.
*   `WRONG_PASSWORD`: The provided password is incorrect.
*   (Add any other custom error codes you use)
```

**Key Changes and Explanations**

*   **Markdown Formatting:** The documentation is formatted using Markdown syntax, including headings, lists, code blocks, and emphasis.
*   **Clear Structure:** The document is organized into sections for easy navigation.
*   **Base URL and Authentication:** Added sections for the base URL and authentication requirements.
*   **Endpoint Descriptions:** Each endpoint is described with its method, path, description, parameters, request/response examples, and error codes.
*   **Code Blocks:** Request and response examples are enclosed in code blocks for better readability.
*   **DTO Definitions:** Added a section to define the structure of the DTOs used in the API.
*   **Error Code List:** Added a section to list the common error codes used in the API.

**How to Use This Documentation**

1.  **Copy and Paste:** Copy the entire Markdown code.
2.  **Create a `.md` File:** Create a new file named `api-documentation.md` (or a similar name) in your project.
3.  **Paste the Code:** Paste the Markdown code into the file.
4.  **View the Documentation:** Open the `.md` file in a Markdown viewer (e.g., GitHub, GitLab, VS Code with a Markdown extension).
5.  **Adjust as Needed:**
    *   **Update Examples:** Make sure the examples match the actual data structures and error codes used in your application.
    *   **Add More Detail:** Add more detail to the descriptions of the parameters and return values if needed.
    *   **Customize the Style:** Customize the Markdown formatting to match your project's style guidelines.

This Markdown documentation will provide a clear and comprehensive guide to your user management API, making it easy for developers to understand and use your endpoints. Remember to keep the documentation up-to-date as your API evolves.
