---
title: Stock Management
summary: A full-stack inventory MVP with lot-based stock control, built on ASP.NET Core and React.
problem: Small businesses often track inventory, stock entries and exits in spreadsheets, which makes lot tracking and stock limits easy to get wrong.
stack:
  - C#
  - .NET 10
  - ASP.NET Core
  - EF Core
  - SQLite
  - React
  - Vite
  - Tailwind CSS
  - Docker
repo: https://github.com/crisnsz/stock-management
order: 3
featured: false
---

## Solution

A web application for managing inventory, stock entries and exits, and basic catalogs. It is a monorepo with an ASP.NET Core Minimal API backend (Entity Framework Core and SQLite) and a React single-page frontend built with Vite and Tailwind CSS. It runs locally or with Docker Compose.

- **Features:** login with demo users, a dashboard summary, and management of suppliers, units of measure, payment types, users and products.
- **Lot-based inventory:** stock is tracked per lot, with recorded entries and exits.
- **Business rules:** an exit cannot exceed the available stock, an expiry date cannot be earlier than the production date, and products can be disabled instead of physically deleted.
- **Backend layering:** separate Domain, Application, Infrastructure and Api projects. Migrations are applied automatically on startup.
- **Auth:** a simple session middleware where the frontend sends the user context in request headers.
