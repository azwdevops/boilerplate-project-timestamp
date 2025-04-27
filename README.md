# Timestamp Microservice

This is a simple API that handles date parsing and returns the date in both Unix timestamp and UTC string formats.

## API Endpoints

### `GET /api/:date?`

- `:date` is an **optional** parameter. It can be:
  - A valid date string (e.g., `2024-04-27`)
  - A valid Unix timestamp (milliseconds) (e.g., `1451001600000`)
  - Empty (no date provided)

---

### Behavior

- If a **valid date** is provided:

  - Returns a JSON object with:
    - `unix`: Unix timestamp in **milliseconds** (Number)
    - `utc`: UTC formatted string (e.g., `Thu, 01 Jan 1970 00:00:00 GMT`)

- If the input is a **valid Unix timestamp** (e.g., `/api/1451001600000`):

  - Returns:
    ```json
    {
      "unix": 1451001600000,
      "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
    }
    ```

- If the input **cannot** be parsed into a valid date:

  - Returns an error JSON:
    ```json
    {
      "error": "Invalid Date"
    }
    ```

- If the **date parameter is empty** (`/api/`):
  - Returns the **current** time:
    ```json
    {
      "unix": 1706452310921,
      "utc": "Sat, 28 Jan 2024 13:38:30 GMT"
    }
    ```

---

## Example Requests

- `/api/2015-12-25`  
  → `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`

- `/api/1451001600000`  
  → `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`

- `/api/invalid-date`  
  → `{ "error": "Invalid Date" }`

- `/api/`  
  → Returns the **current** timestamp in both Unix and UTC formats.

---

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/azwdevops/boilerplate-project-timestamp.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Visit the API in your browser or via tools like Postman:
   ```
   http://localhost:3000/api/
   ```
