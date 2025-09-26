# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page web application for QR code-based equipment scanning and inventory management, written in Hungarian. The application allows users to:
- Load equipment lists from Excel files
- Scan QR codes via camera, manual input, or image upload
- Track scanned items and export updated lists
- Restore previously scanned states from exported files

## Architecture

**Single File Application**: The entire application is contained in `index.html` with embedded CSS and JavaScript.

**Core Components**:
- File upload/processing using XLSX.js library
- QR code scanning using QR-Scanner library
- Equipment data management with scanned state tracking
- PWA (Progressive Web App) capabilities with offline support

**Key Data Structures**:
- `equipmentData[]`: Main equipment list with manufacturer, model, description, ACSG ID, and scan status
- `scannedItems[]`: List of successfully scanned items with timestamps and source information

## External Dependencies

The application uses CDN-hosted libraries:
- `qr-scanner` (v1.4.2) for QR code scanning functionality
- `xlsx` (v0.18.5) for Excel file reading/writing

## Key Features

**Multiple Scan Methods**:
- Camera scanning (requires HTTPS)
- Manual ACSG ID input
- QR code image upload

**State Persistence**:
- Exported Excel files include scan status, timestamps, and source information
- Previously exported files can be re-imported to restore scan progress

**Responsive Design**: Mobile-friendly interface with PWA installation support for Android devices.

## Development Notes

- The application is entirely client-side with no server dependencies
- HTTPS is required for camera access (localhost is exempt)
- All text and UI elements are in Hungarian
- The app includes PWA manifest embedded as base64 data URI
- Equipment data follows a specific column structure: Manufacturer, Model, Description, ACSG ID

## File Structure

Single file deployment - just serve `index.html` via any web server or open directly in browser for local use.