const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const seedDatabase = async () => {
  try {
    // MongoDB Connection String
    const MONGO_URI =
      process.env.MONGODB_URI ||
      "mongodb+srv://ghimskewal:uaDlDPMjksGlMksI@cluster0.i60d0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    if (!MONGO_URI) {
      console.log("Error: MONGO_URI is not defined in .env file!");
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Create sample users
    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        isAdmin: false
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        isAdmin: false
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "password123",
        isAdmin: false
      },
      {
        name: "Alice Brown",
        email: "alice@example.com",
        password: "password123",
        isAdmin: false
      },
      {
        name: "Bob Wilson",
        email: "bob@example.com",
        password: "password123",
        isAdmin: false
      }
    ]);
    console.log("Sample users created");

    const sampleProducts = [
      {
        name: "Smartphone X",
        description: "Latest smartphone with advanced features",
        price: 999.99,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 50,
        rating: 4.5,
        numReviews: 3,
        reviews: [
          {
            user: users[0]._id,
            name: users[0].name,
            rating: 5,
            comment: "Great product, very satisfied!",
          },
          {
            user: users[1]._id,
            name: users[1].name,
            rating: 4,
            comment: "Good phone but a bit expensive",
          },
          {
            user: users[2]._id,
            name: users[2].name,
            rating: 4.5,
            comment: "Excellent camera quality",
          },
        ],
      },
      {
        name: "Laptop Pro",
        description: "High-performance laptop for professionals",
        price: 1499.99,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 30,
        rating: 4.8,
        numReviews: 2,
        reviews: [
          {
            user: users[3]._id,
            name: users[3].name,
            rating: 5,
            comment: "Perfect for my work needs",
          },
          {
            user: users[4]._id,
            name: users[4].name,
            rating: 4.6,
            comment: "Fast and reliable",
          },
        ],
      },
      {
        "name": "UltraBook X1",
        "description": "Premium lightweight laptop with long battery life",
        "price": 1299.99,
        "category": "Electronics",
        "imageUrl": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "stock": 25,
        "rating": 4.8,
        "numReviews": 2,
        "reviews": [
          {
            "user": users[3]._id,
            "name": users[3].name,
            "rating": 5,
            "comment": "Incredibly fast and sleek design"
          },
          {
            "user": users[4]._id,
            "name": users[4].name,
            "rating": 4.6,
            "comment": "Great performance for the price"
          }
        ]
      },
      {
        "name": "PowerStation Pro",
        "description": "High-end workstation for creative professionals",
        "price": 1899.99,
        "category": "Electronics",
        "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "stock": 15,
        "rating": 4.9,
        "numReviews": 2,
        "reviews": [
          {
            "user": users[3]._id,
            "name": users[3].name,
            "rating": 5,
            "comment": "Perfect for video editing and 3D work"
          },
          {
            "user": users[4]._id,
            "name": users[4].name,
            "rating": 4.8,
            "comment": "Handles everything I throw at it with ease"
          }
        ]
      },
      {
        "name": "ThinBook Air",
        "description": "Ultra-thin laptop for everyday productivity",
        "price": 999.99,
        "category": "Electronics",
        "imageUrl": "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "stock": 40,
        "rating": 4.7,
        "numReviews": 2,
        "reviews": [
          {
            "user": users[0]._id,
            "name": users[0].name,
            "rating": 4.5,
            "comment": "Lightweight and perfect for travel"
          },
          {
            "user": users[1]._id,
            "name": users[1].name,
            "rating": 4.9,
            "comment": "Battery lasts all day, very impressed"
          }
        ]
      }
    ];

     // Clear existing products
     await Product.deleteMany({});
     console.log("Cleared existing products");
 

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log("Sample products inserted successfully");

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
