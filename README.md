# Event Management System

A basic Event Management System built using Next.js, designed for admins to manage events and users to view and book events without needing an account.

## Features

### 1. Admin Capabilities
- **Authentication**: Admins are required to log in to perform the following actions:
  - **Event Creation**: Admins can create events by providing a title, description, date, and available seats.
  - **Edit Events**: Admins can update details of existing events.
  - **Delete Events**: Admins can remove events from the system.

### 2. User Capabilities
- **Event Viewing and Booking**:
  - Users can view all available events without logging in.
  - Users can book available seats for events, with seat availability updating in real-time.

## Tech Stack

- **Frontend**: Next.js with server-side rendering (SSR)
- **Backend**: Next.js API routes to manage event and booking data
- **Database**: (PostgreSQL)

## Installation and Setup

Follow the steps below to set up and run the project locally.

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Database** (Choose and configure your preferred SQL or NoSQL database)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sabinn12/event-management-system
   cd your-repo-name
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Create a .env file**:
   ```bash
   DATABASE_URL=your-database-connection-string
   JWT_SECRET=your-jwt-secret
   ```
4.  **generate prisma client**:
    ```bash
    npx prisma generate
    ```

5. **Start the Server**
    ```bash
    npm run build
    ```
