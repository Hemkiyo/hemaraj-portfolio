# Python Budget Tracker (CLI)

A beginner-friendly command-line application built in Python to record daily expenses and export them to a CSV file for later review.

---

## Why this project exists

Managing expenses manually is error-prone and unstructured.  
This project was built to practice Python fundamentals while solving a simple, real-world problem.

---

## What the program does

- Allows users to add expenses from the terminal
- Stores amount, category, and notes
- Saves all data to a CSV file on exit
- Runs entirely in the command line (no GUI)

---

## How it works (high level)

1. User selects an option from a menu
2. Input is validated before being stored
3. Expenses are kept in memory during runtime
4. On exit, data is written to `expenses.csv`

---

## Technologies used

- Python
- CSV file handling
- Functions and control flow
- Input validation

---

## What I learned

- How to structure a Python program cleanly
- Why validating user input is important
- How CSV files can be used as simple data storage

---

## How to run locally

1. Make sure Python 3 is installed
2. Open a terminal in this folder
3. Run:

```bash
python main.py
