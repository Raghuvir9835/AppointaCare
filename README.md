# AppointaCare  - Doctor Appointment Web App

**AppointaCare ** is a full-stack web application designed to make healthcare more accessible by simplifying the process of booking doctor appointments. It offers three levels of login: **Patient**, **Doctor**, and **Admin**, each with distinct features tailored to their roles. The app integrates **online payment gateways (Stripe and Razorpay)** to facilitate seamless and secure payments. Built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js), AppointaCare  provides an efficient, user-friendly experience for both patients and healthcare providers.
## 💻 Running Locally

Follow the setup instructions below to run the application on your computer:
- **Patient Web App**: `http://localhost:5173` (or `http://localhost:5175`)
- **Admin / Doctor Dashboard**: `http://localhost:5174` (or `http://localhost:5176`)
- **Backend API**: `http://localhost:4000`
## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateways**: Stripe, Razorpay
- **Authentication**: JSON Web Token (JWT)

## 🔑 Key Features

### 1. Three-Level Authentication

- **Patient Login**:

  - Patients can sign up, log in, and book appointments with doctors.
  - Manage appointments (view, cancel, or reschedule).
  - Secure online payment options available (cash, Stripe, Razorpay).
  - User profile with editable information (name, email, address, gender, birthday, profile picture).
- **Doctor Login**:

  - Doctors can log in and manage appointments.
  - Dashboard displays earnings, number of patients, number of appointments, and latest bookings.
  - Update profile details (description, fees, address, availability status).
  - View appointment details (patient info, payment mode, appointment status).
- **Admin Login**:

  - Admins can create and manage doctor profiles.
  - Dashboard with analytics: total doctors, total appointments, total patients, and recent bookings.
  - Add new doctors (image, specialty, degree, experience, address, fees, etc.).
  - View and manage all appointments (cancel or mark as completed).

## 🏠 Home Page

- Features a user-friendly layout where users can:
  - **Search for doctors** based on specialties.
  - **View top doctors** and their profiles.
  - Explore additional sections: About Us, Delivery Information, Privacy Policy, and Get in Touch.
- **Footer** includes navigation links: Home, About Us, Delivery Info, Privacy Policy, Contact Us.

## 🩺 All Doctors Page

- Lists all available doctors.
- Users can **filter doctors by specialty**.
- Clicking on a doctor's profile redirects to the **Doctor Appointment Page**.

## 📄 About Page

- Provides information about **AppointaCare ’s vision** and mission.
- **Why Choose Us** section highlights:
  - **Efficiency**: Streamlined appointment process.
  - **Convenience**: Online booking and payment.
  - **Personalization**: Tailored experience based on user preferences.
- Footer section with additional links.

## 📞 Contact Page

- Contains **office address** and contact details.
- Section to explore job opportunities.
- Footer navigation links.

## 📅 Doctor Appointment Page

- Displays detailed information about the selected doctor:
  - **Profile picture, qualification, experience**, and a brief description.
  - **Appointment booking form**: Choose date, time, and payment method.
  - Online payment options: **Cash, Stripe, or Razorpay**.
  - **Related doctors** section at the bottom.
- Users need to **create an account or log in** before booking an appointment.

## 👤 User Profile

- Accessible after login.
- Users can view and edit their profile:
  - **Upload profile picture**.
  - Update **name, email, address, gender, and birthday**.
- View list of upcoming and past appointments.
- **Logout** option available.

## 🗄️ Admin Panel

- **Dashboard**:
  - Displays statistics: **Number of doctors**, **appointments**, **patients**, and **latest bookings**.
  - Option to **cancel bookings** if needed.
- **Add Doctor**:
  - Form to add a new doctor profile (image, specialty, email, password, degree, address, experience, fees, description).
- **Doctor List**:
  - View all registered doctors with options to edit or delete profiles.
- **Appointments**:
  - List of all appointments including patient name, age, date, time, doctor name, fees.
  - Admin actions: **Cancel** or **Mark as Completed**.

## 🩺 Doctor Dashboard

- **Earnings Overview**:
  - Total earnings from completed appointments.
- **Appointments List**:
  - View detailed list of patient appointments (name, age, date, time, payment mode, status).
  - Actions: **Mark appointment as completed** or **Cancel appointment**.
- **Profile Management**:
  - Doctors can update their **profile information**, including description, fees, address, and availability status.

## 💳 Payment Integration

- Supports multiple payment methods:
  - **Stripe Integration**
  - **Razorpay Integration**
- Ensures a secure and smooth payment experience for users.

## 🩹 Health Tracker Feature

- **Track Health Metrics**: Patients can log daily health data such as blood pressure, glucose, symptoms, mood, medications, and personal notes.
- **Share with Doctors**: Patients can securely share selected health entries with doctors they have upcoming appointments with, enabling better, personalized care.
- **Doctor View**: Doctors can view shared health tracker entries from their patients, helping them monitor trends and make informed decisions.
- **Modern UI**: Features a card-based, responsive interface with charts, dark mode, and smooth animations for an engaging experience.
- **Privacy & Control**: Patients have full control over which entries to share and can edit or delete their health logs at any time.

## 🌐 Project Setup

To set up and run this project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/AppointaCare .git
   ```
2. **Install Dependencies**:

   ```bash
   cd backend
   npm install
   cd frontend
   npm install
   cd admin
   npm install
   ```
3. **Environment Variables**:

   - Create a `.env` file in the root directory and add the following:
     ```env
     MONGO_URI='mongodb://127.0.0.1:27017/appointacare'// CAN BE REPLACED WITH MONGO_URI
     VITE_BACKEND_URL='http://localhost:4000'
     VITE_CURRENCY='Rs'
     JWT_SECRET
     STRIPE_API_KEY
     STRIPE_SECRET_KEY
     RAZORPAY_API_KEY
     VITE_RAZORPAY_KEY_ID
     RAZORPAY_SECRET
     ADMIN_EMAIL
     ADMIN_PASSWORD
     cloud_name
     api_key //for cloudinary
     api_secret  //for cloudinary


     ```
4. **Run the Application**:

   ```bash
   frontend=>  npm run dev
   backend=>   npm start
   admin=>     npm run dev
   ```

## 📦 Folder Structure

```plaintext
AppointaCare /
├── client/          # Frontend (React.js)
├── server/          # Backend (Node.js, Express.js)
├── models/          # MongoDB Schemas
├── controllers/     # API Controllers
├── routes/          # API Routes
├── middleware/      # Authentication and Error Handling
├── config/          # Configuration Files
├── utils/           # Utility Functions
├── public/          # Static Files
└── .env             # Environment Variables
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, fork the repository, and open pull requests.

## 🌟 Acknowledgements

- Thanks to the developers and contributors of MongoDB, Express.js, React.js, Node.js, Stripe, and Razorpay for their fantastic tools and libraries.

---
