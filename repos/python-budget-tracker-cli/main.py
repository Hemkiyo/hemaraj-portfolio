print("Python Budget Tracker (CLI)")
print("----------------------------")

import csv

expenses = []


while True:
    print("\n1. Add expense")
    print("2. View expenses")
    print("3. Exit")

    choice = input("Choose an option: ")

    if choice == "1":
        amount = input("Amount: ")
        category = input("Category: ")
        note = input("Note: ")
        expenses.append((amount, category, note))
        print("Expense added.")

    elif choice == "2":
        if not expenses:
            print("No expenses yet.")
        else:
            for e in expenses:
                print(f"Amount: {e[0]}, Category: {e[1]}, Note: {e[2]}")

    elif choice == "3":
        with open("expenses.csv", "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["Amount", "Category", "Note"])
            writer.writerows(expenses)

        print("Expenses saved to expenses.csv")
        print("Goodbye!")
        break


    else:
        print("Invalid choice. Try again.")
