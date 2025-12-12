import shutil
from pathlib import Path

# ==================================================
# DOWNLOADS FOLDER FILE ORGANISER
# ==================================================
# Purpose:
# - Automatically organise files in Downloads folder
# - Group files by type (Documents, Images, Scripts, etc.)
# - Safe by design (no deletion)
# ==================================================

# -----------------------------
# CONFIGURATION
# -----------------------------

# Target folder
DOWNLOADS_FOLDER = Path.home() / "Downloads"

# IMPORTANT:
# Set to False to ACTUALLY move files
DRY_RUN = False

# File category rules
FILE_TYPES = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    "Documents": [".pdf", ".docx", ".txt"],
    "Spreadsheets": [".xlsx", ".csv"],
    "Archives": [".zip", ".rar"],
    "Scripts": [".py", ".java"],
    "Others": []
}

# -----------------------------
# HELPER FUNCTIONS
# -----------------------------

def get_category(extension):
    for category, extensions in FILE_TYPES.items():
        if extension.lower() in extensions:
            return category
    return "Others"


def organise_files():
    print("Downloads Folder File Organiser")
    print("--------------------------------")

    if not DOWNLOADS_FOLDER.exists():
        print("Downloads folder not found.")
        return

    files_moved = 0

    for item in DOWNLOADS_FOLDER.iterdir():
        if item.is_file():
            category = get_category(item.suffix)
            target_folder = DOWNLOADS_FOLDER / category

            if DRY_RUN:
                print(f"[DRY RUN] Would move: {item.name} → {category}/")
            else:
                target_folder.mkdir(exist_ok=True)
                shutil.move(str(item), target_folder / item.name)
                print(f"Moved: {item.name} → {category}/")
                files_moved += 1

    print("\nCompleted.")
    if DRY_RUN:
        print("No files were moved (dry-run mode).")
    else:
        print(f"Total files moved: {files_moved}")


# -----------------------------
# RUN PROGRAM
# -----------------------------

if __name__ == "__main__":
    organise_files()
