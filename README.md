# 🧠 Med-Spire

📌 **Pinterest Clone — Built with the MERN Stack**

Med-Spire is a full-stack Pinterest Clone application developed using the **MERN**  stack: **MongoDB, Express.js, React, and Node.js**. It replicates core Pinterest features such as:

-   🔐 User authentication
    
-   📸 Image uploads via ImageKit
    
-   📌 Pinboard creation and browsing
    
-   📱 Fully responsive design
    

The project also includes **component testing using Vitest**  and utilizes various modern libraries to ensure clean, efficient, and scalable development.



## 🚀 Features

-   User Authentication (Register, Login, Logout)
    
-   Create and Save Pins
    
-   Upload Images 
    
-   Responsive Masonry Grid Layout
    
-   Like and Comment on Pins
    
-   User Profiles
    
-   Search Functionality
        
-   Fully Tested Components with Vitest


## 🛠️ Tech Stack

### Frontend

-   **React.js**
    
-   **Tailwind CSS** – for responsive and fast styling
    
-   **React Router DOM** – for routing

-   **React Query** - for state management
    
-   **Axios** – for API calls
    
-   **Material-UI** – for beautiful icons
    
-   **Imagekit.io** – for image uploading and download 
    
-   **Vitest + React Testing Library** – for unit/component testing
    

### Backend

-   **Node.js**
    
-   **Express.js**
    
-   **MongoDB with Mongoose**
        
-   **JWT (JSON Web Tokens)** – for authentication
    
-   **bcrypt** – for password hashing
    
-   **Sharp** – to convert large images in common formats to smaller


## 📂 Project Structure

    📦 clone-pinterest
    ├── clients
    │   ├── public
    │   ├── src
    │   │   ├── components
    │   │   ├── routes
    │   │   ├── utils
    │   │   └── main.jsx
    │   └── Dockerfile
    │
    ├── backend
    │   ├── controllers
    │   ├── models
    │   ├── routes
    │   ├── utils
    │   ├── Dockerfile
    │   └── index.js
    │
    ├── README.md
    └── docker-compose.yml



## 🧪 Testing

This project uses **Vitest**  along with **React Testing Library**  to verify that components function correctly and the UI renders as expected.

### ▶️ Run Tests from CLI

    cd client
    npm run test

This command runs all unit and component tests in the terminal.

### 🧭 Visual Test Dashboard (UI)

To open the Vitest UI dashboard:

    cd client
    npm run test:ui

This will launch a visual interface where you can explore test results interactively.


## 🧰 Installation & Setup

 1. **Clone the repository:**

	    git clone https://github.com/sekak/pinterest-clone.git
	    cd pinterest-clone
	    
	    
 2.  **Set up the frontend:**
	
		  cd client
		  npm install -f

	 

     
## 🌐 Frontend Environment Setup

To configure the frontend environment, you need to define two environment variables:

	VITE_URL_ENDPOINT_KIT=
	VITE_API_BASE_URL=http://localhost:3000/api

 

### 🔧 Step 1: Get the ImageKit URL Endpoint

1.  Go to [https://imagekit.io](https://imagekit.io)  and **log in**  to your account.
    
2.  On the **Dashboard**, click on the **“URL Endpoint”**  icon in the top-right corner.
    
3.  Navigate to:  
    **Configuration** → **URL Endpoint**
    
4.  You will see your existing URL endpoint. You can either:
    
    -   Use the existing one
        
    -   Or click **“Add New”**  to create a new endpoint
        

📌 Copy the full URL (e.g., `https://ik.imagekit.io/your_folder`) and paste it into your `.env`  file:

    VITE_URL_ENDPOINT_KIT=https://ik.imagekit.io/your_folder

### ▶️ Step 2: Start the Front-end

Once your `.env`  file is ready, run the development server:

`npm run dev` 

Your app will now use the correct **API base URL** and **ImageKit** endpoint for uploading and rendering images.


3: **Set up the Back-end:**

    cd backend
    npm install


## 🌐 Back-end Environment Setup

To configure the back-end environment, create a `.env`  file in the `/backend`  folder and add the following variables:


    MONGO=your_mongo_connection_string
    
    CORS_ORIGIN=http://localhost:5173
    
    JWT_SECRET=your_jwt_secret
    
    IK_URL_ENDPOINT=your_imagekit_url_endpoint
    
    IK_PUBLIC_KEY=your_imagekit_public_key
    
    IK_PRIVATE_KEY=your_imagekit_private_key
    
    PORT=3000

----------

### 🔍 Variable Descriptions & Setup

-   **`MONGO`** – MongoDB connection string
    
    -   Sign in to [MongoDB Atlas](https://cloud.mongodb.com).
        
    -   Follow this guide to set it up and get your connection string:  
        👉 [FreeCodeCamp MongoDB Setup Guide](https://www.freecodecamp.org/news/get-mongodb-url-to-connect-to-a-nodejs-application/)
        
    -   Replace `<password>`  in the string with your actual password, and paste it in the `.env`  file.
        
-   **`CORS_ORIGIN`** – Frontend origin allowed to access the backend
    
    -   Use `http://localhost:5173`  for development
        
    -   Use `http://localhost:4173`  when building for production
        
    -   This secures the connection between the client and server.
        
-   **`JWT_SECRET`** – A secret string used to sign JSON Web Tokens
    
    -   Choose a strong, unique string. Keep it secret.
        
-   **`IK_URL_ENDPOINT`** – ImageKit URL endpoint
    
    -   This should match the one used in the frontend.
        
    -   See the frontend setup section for steps to obtain it.
        
-   **`IK_PUBLIC_KEY`** & **`IK_PRIVATE_KEY`** – ImageKit API keys
    
    -   Log in to [ImageKit.io](https://imagekit.io)
        
    -   Go to the **Dashboard → Developer Options**
        
    -   Copy both the public and private keys and add them to your `.env`  file.
        
-   **`PORT`** – Server port (default: `3000`)
    
    -   Use this to define the port your Express app will run on. 3000.


### ▶️ Start the Back-end

Once your `.env`  file is ready, run the development server:

`npm start` 

### 🐳 Run the Project with Docker Compose

Instead of running the frontend and backend separately, you can run everything with Docker using the following command:

`sudo docker compose up --build` 

Once the containers are built and running, open your browser and visit:

👉 [http://localhost:4173](http://localhost:4173)

📸 Screenshots

![Screenshot from 2025-05-11 12-47-00](https://github.com/user-attachments/assets/067b6e75-9325-4154-8a5f-9440516fbe8f)
![Screenshot from 2025-05-11 12-48-16](https://github.com/user-attachments/assets/2e0bbc29-8bda-44b2-bf4e-4912d0480d69)
![Screenshot from 2025-05-11 12-48-36](https://github.com/user-attachments/assets/7acd2096-2bc0-413b-a1e2-26a93001818e)
![Screenshot from 2025-05-11 12-48-46](https://github.com/user-attachments/assets/c1b9389e-2c0f-4605-860e-25201fba5abb)
![Screenshot from 2025-05-11 12-48-53](https://github.com/user-attachments/assets/81373c9e-dfe1-4df4-9028-037d70fc11fb)
![Screenshot from 2025-05-11 12-48-04](https://github.com/user-attachments/assets/93d845d2-0aa9-4a5e-932b-81d8f503a7e2)

**Responsive**

![Screenshot from 2025-05-11 12-47-36](https://github.com/user-attachments/assets/5e95afae-4e39-4e1e-bcc8-79fdaad58f70)
![Screenshot from 2025-05-11 13-09-02](https://github.com/user-attachments/assets/7d711e15-0507-43c8-8230-9c810dcb89bf)
![Screenshot from 2025-05-11 13-08-50](https://github.com/user-attachments/assets/c585e28f-cf46-48cf-9cad-db7bd6c64390)
![Screenshot from 2025-05-11 13-08-42](https://github.com/user-attachments/assets/7033b332-b4f5-4f56-9c0e-b5efbebb14e6)
![Screenshot from 2025-05-11 13-08-31](https://github.com/user-attachments/assets/78609181-936a-4e39-bc97-2d5f4e9ee2a7)





