const sections = [
  {
    topic: "Arrays",
    level: "Foundation",
    questions: `Two Sum
Best Time to Buy and Sell Stock
Contains Duplicate
Product of Array Except Self
Maximum Subarray
Maximum Product Subarray
Find Minimum in Rotated Sorted Array
Search in Rotated Sorted Array
3Sum
Container With Most Water
Move Zeroes
Majority Element
Sort Colors
Rotate Array
Merge Sorted Array
Find All Duplicates in an Array
Missing Number
Set Matrix Zeroes
Spiral Matrix
Next Permutation`,
  },
  {
    topic: "Strings",
    level: "Foundation",
    questions: `Valid Anagram
Valid Palindrome
Longest Substring Without Repeating Characters
Longest Repeating Character Replacement
Minimum Window Substring
Group Anagrams
Encode and Decode Strings
Longest Palindromic Substring
Palindromic Substrings
String to Integer Atoi
Implement Strstr
Roman to Integer
Integer to Roman
Zigzag Conversion
Reverse Words in a String
Compare Version Numbers
Multiply Strings
Valid Parenthesis String
Repeated String Match
Find the Index of the First Occurrence`,
  },
  {
    topic: "Linked List",
    level: "Foundation",
    questions: `Reverse Linked List
Merge Two Sorted Lists
Linked List Cycle
Linked List Cycle II
Remove Nth Node From End of List
Reorder List
Add Two Numbers
Copy List with Random Pointer
Merge K Sorted Lists
Palindrome Linked List
Intersection of Two Linked Lists
Sort List
Rotate List
Swap Nodes in Pairs
Reverse Nodes in K Group
Remove Duplicates from Sorted List
Odd Even Linked List
Flatten a Multilevel Doubly Linked List
Design Linked List
Delete Node in a Linked List`,
  },
  {
    topic: "Stack and Queue",
    level: "Foundation",
    questions: `Valid Parentheses
Min Stack
Evaluate Reverse Polish Notation
Generate Parentheses
Daily Temperatures
Car Fleet
Largest Rectangle in Histogram
Next Greater Element I
Next Greater Element II
Online Stock Span
Implement Queue using Stacks
Implement Stack using Queues
Design Circular Queue
Sliding Window Maximum
Asteroid Collision
Remove K Digits
Simplify Path
Decode String
Number of Recent Calls
132 Pattern`,
  },
  {
    topic: "Binary Search",
    level: "Foundation",
    questions: `Binary Search
Search Insert Position
First Bad Version
Find First and Last Position of Element
Search a 2D Matrix
Koko Eating Bananas
Find Peak Element
Median of Two Sorted Arrays
Capacity To Ship Packages Within D Days
Split Array Largest Sum
Find K Closest Elements
Single Element in a Sorted Array
Search in Rotated Sorted Array II
Find Minimum in Rotated Sorted Array II
Sqrtx
Guess Number Higher or Lower
Arranging Coins
Successful Pairs of Spells and Potions
Minimized Maximum of Products
Magnetic Force Between Two Balls`,
  },
  {
    topic: "Two Pointers and Sliding Window",
    level: "Core",
    questions: `Two Sum II Input Array Is Sorted
Trapping Rain Water
Valid Palindrome II
Squares of a Sorted Array
Backspace String Compare
Remove Duplicates from Sorted Array
Minimum Size Subarray Sum
Permutation in String
Find All Anagrams in a String
Longest Subarray of Ones After Deleting One Element
Max Consecutive Ones III
Fruit Into Baskets
Subarrays with K Different Integers
Longest Turbulent Subarray
Maximum Average Subarray I
Count Number of Nice Subarrays
Binary Subarrays With Sum
Longest Continuous Subarray With Absolute Diff
Minimum Operations to Reduce X to Zero
Maximum Erasure Value`,
  },
  {
    topic: "Hashing",
    level: "Core",
    questions: `Top K Frequent Elements
Subarray Sum Equals K
Longest Consecutive Sequence
Find Duplicate File in System
Isomorphic Strings
Word Pattern
Happy Number
Design HashMap
Design HashSet
Ransom Note
Valid Sudoku
Number of Good Pairs
Intersection of Two Arrays
Find Common Characters
Contiguous Array
4Sum II
Longest Harmonious Subsequence
Minimum Index Sum of Two Lists
Jewels and Stones
Find Players With Zero or One Losses`,
  },
  {
    topic: "Recursion and Backtracking",
    level: "Core",
    questions: `Subsets
Subsets II
Combination Sum
Combination Sum II
Permutations
Permutations II
Letter Combinations of a Phone Number
Palindrome Partitioning
N Queens
N Queens II
Sudoku Solver
Word Search
Restore IP Addresses
Combinations
Combination Sum III
Generate Parentheses Backtracking
Beautiful Arrangement
Matchsticks to Square
Partition to K Equal Sum Subsets
Expression Add Operators`,
  },
  {
    topic: "Trees",
    level: "Core",
    questions: `Invert Binary Tree
Maximum Depth of Binary Tree
Diameter of Binary Tree
Balanced Binary Tree
Same Tree
Subtree of Another Tree
Lowest Common Ancestor of a Binary Tree
Binary Tree Level Order Traversal
Binary Tree Right Side View
Count Good Nodes in Binary Tree
Validate Binary Search Tree
Kth Smallest Element in a BST
Construct Binary Tree from Preorder and Inorder
Binary Tree Maximum Path Sum
Serialize and Deserialize Binary Tree
Path Sum
Path Sum II
Sum Root to Leaf Numbers
Flatten Binary Tree to Linked List
Populating Next Right Pointers`,
  },
  {
    topic: "Binary Search Tree",
    level: "Core",
    questions: `Search in a Binary Search Tree
Insert into a Binary Search Tree
Delete Node in a BST
Trim a Binary Search Tree
Convert Sorted Array to Binary Search Tree
Recover Binary Search Tree
Convert BST to Greater Tree
Range Sum of BST
Minimum Absolute Difference in BST
Find Mode in Binary Search Tree
Two Sum IV Input is a BST
Lowest Common Ancestor of a BST
Validate Binary Search Tree Iterative
Kth Largest Element in a BST
Balance a Binary Search Tree
Increasing Order Search Tree
All Elements in Two Binary Search Trees
Closest Binary Search Tree Value
Unique Binary Search Trees
Unique Binary Search Trees II`,
  },
  {
    topic: "Heap and Priority Queue",
    level: "Core",
    questions: `Kth Largest Element in an Array
Last Stone Weight
K Closest Points to Origin
Task Scheduler
Design Twitter
Find Median from Data Stream
Reorganize String
Smallest Range Covering Elements from K Lists
IPO
Minimum Cost to Connect Sticks
Meeting Rooms II
Process Tasks Using Servers
Maximum Performance of a Team
Seat Reservation Manager
Single Threaded CPU
The Skyline Problem
Ugly Number II
Super Ugly Number
Top K Frequent Words
Reduce Array Size to The Half`,
  },
  {
    topic: "Graphs",
    level: "Advanced",
    questions: `Number of Islands
Clone Graph
Max Area of Island
Pacific Atlantic Water Flow
Surrounded Regions
Rotting Oranges
Walls and Gates
Course Schedule
Course Schedule II
Redundant Connection
Number of Connected Components
Graph Valid Tree
Word Ladder
Alien Dictionary
Evaluate Division
Network Delay Time
Cheapest Flights Within K Stops
Min Cost to Connect All Points
Reconstruct Itinerary
Critical Connections in a Network`,
  },
  {
    topic: "Dynamic Programming 1D",
    level: "Advanced",
    questions: `Climbing Stairs
Min Cost Climbing Stairs
House Robber
House Robber II
Longest Palindromic Substring DP
Palindromic Substrings DP
Decode Ways
Coin Change
Maximum Product Subarray DP
Word Break
Longest Increasing Subsequence
Partition Equal Subset Sum
Combination Sum IV
Perfect Squares
Integer Break
Paint Fence
Arithmetic Slices
Delete and Earn
Domino and Tromino Tiling
Minimum Cost For Tickets`,
  },
  {
    topic: "Dynamic Programming 2D",
    level: "Advanced",
    questions: `Unique Paths
Unique Paths II
Minimum Path Sum
Longest Common Subsequence
Best Time to Buy and Sell Stock with Cooldown
Coin Change II
Target Sum
Interleaving String
Longest Increasing Path in a Matrix
Distinct Subsequences
Edit Distance
Burst Balloons
Regular Expression Matching
Scramble String
Wildcard Matching
Triangle
Maximal Square
Dungeon Game
Cherry Pickup
Stone Game`,
  },
  {
    topic: "Greedy",
    level: "Advanced",
    questions: `Maximum Subarray Greedy
Jump Game
Jump Game II
Gas Station
Hand of Straights
Merge Triplets to Form Target
Partition Labels
Valid Parenthesis String Greedy
Candy
Queue Reconstruction by Height
Non Overlapping Intervals
Minimum Number of Arrows to Burst Balloons
Monotone Increasing Digits
Dota2 Senate
Boats to Save People
Minimum Deletions to Make Character Frequencies Unique
Remove Duplicate Letters
Wiggle Subsequence
Maximum Length of Pair Chain
Video Stitching`,
  },
  {
    topic: "Trie",
    level: "Advanced",
    questions: `Implement Trie Prefix Tree
Design Add and Search Words Data Structure
Word Search II
Replace Words
Map Sum Pairs
Maximum XOR of Two Numbers in an Array
Palindrome Pairs
Stream of Characters
Concatenated Words
Longest Word in Dictionary
Word Squares
Search Suggestions System
Camelcase Matching
Prefix and Suffix Search
Count Prefix and Suffix Pairs
Design In Memory File System
Shortest Unique Prefix
Sum of Prefix Scores of Strings
Extra Characters in a String
Implement Magic Dictionary`,
  },
  {
    topic: "Bit Manipulation",
    level: "Advanced",
    questions: `Single Number
Number of One Bits
Counting Bits
Reverse Bits
Missing Number Bitwise
Sum of Two Integers
Reverse Integer
Power of Two
Power of Three
Power of Four
Bitwise AND of Numbers Range
Maximum Product of Word Lengths
UTF 8 Validation
Hamming Distance
Total Hamming Distance
Find the Difference
Binary Watch
Minimum Flips to Make A OR B Equal C
Bitwise ORs of Subarrays
Minimum Number of Operations to Make Array XOR Equal K`,
  },
  {
    topic: "Math and Number Theory",
    level: "Advanced",
    questions: `Plus One
Add Binary
Powx n
Excel Sheet Column Number
Factorial Trailing Zeroes
Count Primes
Ugly Number
Happy Number Math
Fraction to Recurring Decimal
Integer to English Words
Basic Calculator
Basic Calculator II
Basic Calculator III
Rectangle Area
Valid Number
Random Pick with Weight
Shuffle an Array
Line Reflection
Mirror Reflection
Poor Pigs`,
  },
  {
    topic: "Intervals",
    level: "Core",
    questions: `Merge Intervals
Insert Interval
Non Overlapping Intervals Interval
Meeting Rooms
Meeting Rooms II Interval
Employee Free Time
Interval List Intersections
My Calendar I
My Calendar II
My Calendar III
Remove Covered Intervals
Summary Ranges
Data Stream as Disjoint Intervals
Range Module
Car Pooling
Corporate Flight Bookings
Amount of New Area Painted Each Day
Describe the Painting
Count Ways to Group Overlapping Ranges
Minimum Number of Arrows to Burst Balloons Interval`,
  },
  {
    topic: "Advanced Mixed",
    level: "Boss Level",
    questions: `LRU Cache
LFU Cache
Design Browser History
Design Underground System
All O One Data Structure
Find All People With Secret
Swim in Rising Water
Minimum Window Subsequence
Longest Duplicate Substring
Shortest Palindrome
Basic Calculator IV
Count of Smaller Numbers After Self
Reverse Pairs
Range Sum Query Mutable
Count of Range Sum
Falling Squares
Sliding Window Median
Max Points on a Line
Shortest Path Visiting All Nodes
Minimum Difficulty of a Job Schedule`,
  },
  {
    topic: "DP Bonus",
    level: "Mastery",
    questions: `Best Time to Buy and Sell Stock III
Best Time to Buy and Sell Stock IV
Best Time to Buy and Sell Stock with Transaction Fee
Maximum Length of Repeated Subarray
Uncrossed Lines
Minimum ASCII Delete Sum for Two Strings
Delete Operation for Two Strings
Longest Palindromic Subsequence
Minimum Insertion Steps to Make a String Palindrome
Count Different Palindromic Subsequences
Palindrome Partitioning II
Palindrome Partitioning III
Number of Longest Increasing Subsequence
Russian Doll Envelopes
Largest Divisible Subset
Longest Arithmetic Subsequence
Longest Arithmetic Subsequence of Given Difference
Number of Music Playlists
Knight Dialer
Out of Boundary Paths
Minimum Falling Path Sum
Minimum Falling Path Sum II
Maximal Rectangle
Count Square Submatrices with All Ones
Number of Ways to Stay in the Same Place
Minimum Score Triangulation of Polygon
Largest Sum of Averages
Frog Jump
Remove Boxes
Strange Printer
Student Attendance Record II
Profitable Schemes
Tallest Billboard
Minimum Cost to Cut a Stick
Number of Ways to Paint N by 3 Grid
Count Vowels Permutation
Maximum Profit in Job Scheduling
Reducing Dishes
Form Largest Integer With Digits That Add up to Target
Number of Ways to Earn Points`,
  },
  {
    topic: "Graph Bonus",
    level: "Mastery",
    questions: `Shortest Path in Binary Matrix
Path With Minimum Effort
Path With Maximum Probability
Find the City With the Smallest Number of Neighbors
Accounts Merge
Most Stones Removed with Same Row or Column
Satisfiability of Equality Equations
Possible Bipartition
Is Graph Bipartite
Find Eventual Safe States
Keys and Rooms
All Paths From Source to Target
Shortest Bridge
As Far from Land as Possible
Number of Enclaves
Minimum Genetic Mutation
Open the Lock
Jump Game III
Jump Game IV
Snakes and Ladders
Bus Routes
Minimum Height Trees
Find if Path Exists in Graph
Detonate the Maximum Bombs
Maximum Total Importance of Roads
Minimum Score of a Path Between Two Cities
Count Unreachable Pairs of Nodes
Shortest Path with Alternating Colors
Number of Ways to Arrive at Destination
Modify Graph Edge Weights`,
  },
  {
    topic: "Tree Bonus",
    level: "Mastery",
    questions: `Binary Tree Zigzag Level Order Traversal
Binary Tree Vertical Order Traversal
Vertical Order Traversal of a Binary Tree
Boundary of Binary Tree
Binary Tree Cameras
House Robber III
Delete Nodes and Return Forest
Find Duplicate Subtrees
Maximum Width of Binary Tree
Complete Binary Tree Inserter
Check Completeness of a Binary Tree
All Nodes Distance K in Binary Tree
Binary Tree Pruning
Smallest Subtree with all the Deepest Nodes
Deepest Leaves Sum
Longest Univalue Path
Recover a Tree From Preorder Traversal
Construct Binary Tree from Inorder and Postorder
Construct Binary Tree from Preorder and Postorder
Validate Binary Tree Nodes
Find Leaves of Binary Tree
Count Complete Tree Nodes
Binary Search Tree Iterator
Inorder Successor in BST
Closest Binary Search Tree Value II
Split BST
Maximum Sum BST in Binary Tree
Delete Leaves With a Given Value
Step By Step Directions From a Binary Tree Node
Create Binary Tree From Descriptions`,
  },
];

const topicLabelOverrides = {
  "Two Pointers and Sliding Window": "Two Pointers + Window",
  "Recursion and Backtracking": "Recursion + BT",
  "Stack and Queue": "Stack + Queue",
  "Heap and Priority Queue": "Heap + PQ",
  "Dynamic Programming 1D": "DP 1D",
  "Dynamic Programming 2D": "DP 2D",
  "Binary Search Tree": "BST",
  "Math and Number Theory": "Math + Number Theory",
};

const directUrlOverrides = {
  "Implement Strstr": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/",
  "Find the Index of the First Occurrence": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/",
  "Maximum Subarray Greedy": "https://leetcode.com/problems/maximum-subarray/description/",
  "Maximum Product Subarray DP": "https://leetcode.com/problems/maximum-product-subarray/description/",
  "Longest Palindromic Substring DP": "https://leetcode.com/problems/longest-palindromic-substring/description/",
  "Palindromic Substrings DP": "https://leetcode.com/problems/palindromic-substrings/description/",
  "Generate Parentheses Backtracking": "https://leetcode.com/problems/generate-parentheses/description/",
  "Happy Number Math": "https://leetcode.com/problems/happy-number/description/",
  "Missing Number Bitwise": "https://leetcode.com/problems/missing-number/description/",
  "Meeting Rooms II Interval": "https://leetcode.com/problems/meeting-rooms-ii/description/",
  "Minimum Number of Arrows to Burst Balloons Interval": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/",
  "Non Overlapping Intervals Interval": "https://leetcode.com/problems/non-overlapping-intervals/description/",
  "Valid Parenthesis String Greedy": "https://leetcode.com/problems/valid-parenthesis-string/description/",
  "Validate Binary Search Tree Iterative": "https://leetcode.com/problems/validate-binary-search-tree/description/",
  "Meeting Rooms": "https://leetcode.com/problems/meeting-rooms/description/",
  "Employee Free Time": "https://leetcode.com/problems/employee-free-time/description/",
  "Closest Binary Search Tree Value": "https://leetcode.com/problems/closest-binary-search-tree-value/description/",
  "Closest Binary Search Tree Value II": "https://leetcode.com/problems/closest-binary-search-tree-value-ii/description/",
  "Inorder Successor in BST": "https://leetcode.com/problems/inorder-successor-in-bst/description/",
  "Vertical Order Traversal of a Binary Tree": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/description/",
  "Binary Tree Vertical Order Traversal": "https://leetcode.com/problems/binary-tree-vertical-order-traversal/description/",
  "Boundary of Binary Tree": "https://leetcode.com/problems/boundary-of-binary-tree/description/",
  "Shortest Unique Prefix": "https://www.geeksforgeeks.org/dsa/find-all-shortest-unique-prefixes-to-represent-each-word-in-a-given-list/",
  "Word Squares": "https://leetcode.com/problems/word-squares/description/",
};

function normalizeQuestionTitle(title) {
  return title
    .replace(/\s+(DP|Greedy|Math|Interval|Iterative|Bitwise)$/i, "")
    .replace(/\s+Backtracking$/i, "")
    .replace(/\s+II Interval$/i, " II")
    .replace(/\s+Interval$/i, "")
    .replace(/\s+Math$/i, "")
    .trim();
}

function slugifyLeetCodeTitle(title) {
  return normalizeQuestionTitle(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatTopicLabel(topic) {
  return topicLabelOverrides[topic] || topic;
}

export function buildQuestionUrl(title) {
  if (directUrlOverrides[title]) {
    return directUrlOverrides[title];
  }

  const slug = slugifyLeetCodeTitle(title);
  return `https://leetcode.com/problems/${slug}/description/`;
}

export function buildQuestionFallbackUrl(title) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${normalizeQuestionTitle(title)} DSA problem`)}`;
}

export const levelOrder = ["Foundation", "Core", "Advanced", "Boss Level", "Mastery"];
export const topicBlueprints = sections.map((section) => ({
  ...section,
  questions: section.questions.split("\n"),
}));

export const questions = topicBlueprints
  .flatMap((section) =>
    section.questions.map((title) => ({
      title,
      topic: section.topic,
      level: section.level,
    }))
  )
  .map((question, index) => {
    const id = index + 1;
    return {
      id,
      ...question,
      url: buildQuestionUrl(question.title),
    };
  });
