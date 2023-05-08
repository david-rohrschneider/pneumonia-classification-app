# Frontend
The frontend for the pneumonia classification app.

Built with 
- Vite
- React
- Tailwindcss

## Setup
To start the local development server, the following steps have to be done:

1. Install npm packages with the following command:
    ```bash
    npm install
    ```
2. Configure the environment variable:
   ```
   VITE_API_URL=<BACKEND_URL>
   ```
3. Configure the hosting port in [vite.config.ts](vite.config.ts)
   ```typescript
   // ...
   server: {
        port: 3000
    }
   // ...
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   
## Usage
The frontend provides a simple Drag and Drop area, where the user can insert an image out of the chest X-Ray dataset or similar.
By clicking the predict button, the image is sent to the backend which provides the classifier based on a CNN, and returns the predicted class, as well as the confidence percentage.