# API Documentation

This is a RESTful API server that wraps the official [Brawl Stars API](https://developer.brawlstars.com/#/documentation), making it easier to interact with using HTTP requests.

Docs written with help of [Markdown Guide](https://www.markdownguide.org/) and Markdown readmem maker [readme.so](https://readme.so/).

---

## **Table of Contents**
1. [Installation](#installation)
2. [Running the Server](#running-the-server)
3. [API Endpoints](#api-endpoints)
    - [Players](#players)
    - [Clubs](#clubs)
    - [Events](#events)
    - [Rankings](#rankings)
    - [Brawlers](#brawlers)
4. [Example Usage](#example-usage)
5. [Error Handling](#error-handling)

---

## **1. Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/brawlstars-api-server.git
   cd brawlstars-api-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder and add your **Brawl Stars API Token**:
   ```env
   BRAWL_API_TOKEN=your_brawlstars_api_token_here
   PORT=3000
   ```

4. Start the server:
   ```bash
   node server.js
   ```
   - Or use `nodemon` for development:
     ```bash
     npx nodemon server.js
     ```

---

## **2. Running the Server**

Once the server is running, it will be available at:

```
http://localhost:3000
```

You can test the endpoints using tools like **Postman**, **Insomnia**, or **curl**.

---

## **3. API Endpoints**

Below are all available endpoints grouped by functionality.

### **Players**
1. **Get Player Information**
   - **URL:** `/api/players/:tag`
   - **Method:** `GET`
   - **Description:** Fetches player information by their tag.
   - **Example Request:**
     ```bash
     curl http://localhost:3000/api/players/%23PLAYER_TAG
     ```
   - **Response:**
     ```json
     {
       "tag": "#PLAYER_TAG",
       "name": "PlayerName",
       "trophies": 15000,
       "expLevel": 150
     }
     ```

2. **Get Player Battle Log**
   - **URL:** `/api/players/:tag/battlelog`
   - **Method:** `GET`
   - **Description:** Fetches the battle log of a player.
   - **Example Request:**
     ```bash
     curl http://localhost:3000/api/players/%23PLAYER_TAG/battlelog
     ```

---

### **Clubs**
1. **Get Club Information**
   - **URL:** `/api/clubs/:tag`
   - **Method:** `GET`
   - **Description:** Fetches information about a club by its tag.
   - **Example Request:**
     ```bash
     curl http://localhost:3000/api/clubs/%23CLUB_TAG
     ```

2. **Get Club Members**
   - **URL:** `/api/clubs/:tag/members`
   - **Method:** `GET`
   - **Description:** Fetches a list of club members.
   - **Example Request:**
     ```bash
     curl http://localhost:3000/api/clubs/%23CLUB_TAG/members
     ```

---

### **Events**
1. **Get Event Rotation**
   - **URL:** `/api/events`
   - **Method:** `GET`
   - **Description:** Fetches the current event rotation.
   - **Example Request:**
     ```bash
     curl http://localhost:3000/api/events
     ```

---

### **Rankings**
1. **Get Rankings**
   - **URL:** `/api/rankings/:type`
   - **Method:** `GET`
   - **Query Parameters:**
     - `country` (optional, default: `global`): Country code or "global".
     - `brawlerId` (optional): Brawler ID for specific rankings.
   - **Description:** Fetches rankings for players, clubs, or brawlers.
   - **Example Request:**
     ```bash
     curl "http://localhost:3000/api/rankings/players?country=global"
     ```

---

### **Brawlers**
1. **Get All Brawlers**
   - **URL:** `/api/brawlers`
   - **Method:** `GET`
   - **Description:** Fetches a list of all brawlers.
   - **Example Request:**
     ```bash
     curl http://localhost:3000/api/brawlers
     ```

2. **Get Specific Brawler**
   - **URL:** `/api/brawlers/:id`
   - **Method:** `GET`
   - **Description:** Fetches information about a specific brawler by their ID.
   - **Example Request:**
     ```bash
     curl http://localhost:3000/api/brawlers/16000000
     ```

---

## **4. Example Usage**

Here are examples of how to interact with the API:

### Get Player Information
```bash
curl http://localhost:3000/api/players/%23PLAYER_TAG
```

### Get Club Information
```bash
curl http://localhost:3000/api/clubs/%23CLUB_TAG
```

### Get Event Rotation
```bash
curl http://localhost:3000/api/events
```

---

## **5. Error Handling**

The API provides clear error messages with status codes.

### Example Error Response:
```json
{
  "error": {
    "reason": "accessDenied",
    "message": "Invalid authentication token."
  }
}
```

- **Common Errors:**
  - `400` Bad Request: Invalid tag or parameter.
  - `403` Access Denied: Missing or invalid API token.
  - `404` Not Found: Requested resource does not exist.
  - `500` Internal Server Error: Something went wrong on the server.

---

## **6. Notes**
- Replace `#` with `%23` when using player or club tags in the URL.
- Make sure your API token is valid and added to the `.env` file.

---

## **7. Example Response**

### **Request**
```bash
curl http://localhost:3000/api/players/%23PLAYER_TAG
```

### **Response**
```json
{
  "tag": "#PLAYER_TAG",
  "name": "PlayerName",
  "trophies": 15000,
  "highestTrophies": 16000,
  "expLevel": 150,
  "brawlers": [
    {
      "id": 16000000,
      "name": "Shelly",
      "power": 10,
      "trophies": 500
    }
  ]
}
```

---

## **8. Contributions**

Contributions are welcome! Feel free to submit a pull request or raise an issue if you find bugs or improvements.

---

## **9. License**

This project is licensed under the **MIT License**.

---