// const content = [
//   {
//     _id: "664d9990d9173927e7160f56",
//     userId: "606a7b23b2b90c0864f28293",
//     quotes: "Hey developers..!",
//     color: "#dd1313",
//     likes: Array(3),

//     postAt: "2024-05-22T07:06:56.451+00:00",
//   },
//   {
//     _id: "606a7b23b2b90c0864f28293",
//     userId: "664cac106e7b9dad499abed7",
//     quotes: "Here's a more dynamic approach to generate 10 random user data objects, including unique _id, userId, random quotes, random colors, random likes, and random past dates. This will ensure each data entry is unique and has a realistic structure:.!",
//     color: "#dd1313",
//     likes: Array(3),

//     postAt: "2024-05-22T07:06:56.451+00:00",
//   },
//   {
//     _id: "606a7b24b2b90c0864f28294",
//     userId: "664cac106e7b9dad499abed7",
//     quotes: "This code ensures that each content object is unique and follows a consistent structure, suitable for testing or demonstration purposes.",
//     color: "#dd1313",
//     likes: Array(3),

//     postAt: "2024-05-22T07:06:56.451+00:00",
//   },
// ];
// module.exports = { data: content };













const { faker } = require('@faker-js/faker');

const mongoose = require('mongoose');

// Helper function to generate a random ObjectId
const generateRandomId = () => new mongoose.Types.ObjectId().toString();

// Helper function to generate a random array of likes
const generateRandomLikes = () => {
  const numLikes = Math.floor(Math.random() * 10); // Random number of likes between 0 and 9
  const likes = [];
  for (let i = 0; i < numLikes; i++) {
    likes.push(generateRandomId());
  }
  return likes;
};

// Helper function to generate a random quote
// const generateRandomQuote = () => faker.lorem.sentence();
const generateRandomQuote = () => {
  return faker.lorem.sentences(10); // Generate 20 sentences
};

// Helper function to generate a random color
const generateRandomColor = () => faker.internet.color();

// Helper function to generate a random past date
const generateRandomPastDate = () => faker.date.past();

// Helper function to create a single user data object
const generateUserData = () => ({
  _id: generateRandomId(),
  userId: generateRandomId(),
  quotes: generateRandomQuote(),
  color: generateRandomColor(),
  likes: generateRandomLikes(),
  postAt: generateRandomPastDate(),
});

// Generate an array of 10 user data objects
const content = [];
for (let i = 0; i < 10; i++) {
  content.push(generateUserData());
}

// Export the generated data
module.exports = { data: content };
