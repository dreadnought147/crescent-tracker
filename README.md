# crescent-tracker
# Smart Issue Flow Tracker

This is a simple web app built to help student residence teams collect and manage student issues more efficiently. It's designed to replace scattered messages and unstructured reports with a centralized system that keeps everything organized.

---

## Problem

In student buildings, people report issues through all sorts of channels—WhatsApp, emails, or just telling someone in person. Things get missed, there's no way to track progress, and it’s hard for staff to respond properly or analyze what’s going wrong most often.

---

## What This App Does

This app gives students a way to log in and submit issues directly. It also gives admins a dashboard to view all the reports in one place, update their statuses (like marking them as resolved), and export everything to a CSV for analysis later on.

---

## Main Features

- Students can log in (based on a basic user list in the database)
- Students can submit an issue with details like urgency, category, and description
- Admins can see all issues in a table view and update their status
- Admins can download all issues as a CSV file
- Basic logic to auto-categorize issues based on keywords

---

## Built With

- Node.js + Express
- EJS for templating
- SQLite for storage
- Basic HTML/CSS
- `fs` module for generating CSVs

---

## Planned Features

These are things that still need to be added, or ideas for where the app can go next:

- A smarter system for auto-categorizing issues using a language model (instead of just `if` statements)
- Admin panel to upload a CSV of all student users and populate the login database automatically
- Proper login security (hashed passwords, sessions, role checking)
- Dashboard analytics to see things like most common issue types or busiest floors
- Mobile-friendly version of the UI

---

## How to Run the App

```bash
git clone <repo-url>
cd smart-issue-tracker
npm install
node app.js
