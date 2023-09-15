# Site Outage Reporter

## Description

The Site Outage Reporter is a TypeScript application designed to fetch outage information for specific sites and report these outages. The application interfaces with external APIs to retrieve outages and site-specific information. It then processes this data, filters outages based on a date threshold, and sends a report of the relevant outages.

## Features

-   **Fetch Outages:** Retrieves outage data from a predefined endpoint.
-   **Site-Specific Reporting:** Fetches device information for a specific site and matches it with the outages.
-   **Flexible Endpoint Handling:** Easily change the site for which you want to generate a report by passing the site name as a command-line argument.
-   **Robust Error Handling:** Integrated error handling mechanism with retries for specific error codes.
-   **Comprehensive Logging:** Features detailed logging of application events and errors for better traceability.

## Prerequisites

-   Node.js
-   TypeScript (as a development dependency)

## Setup & Installation

1. **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd [repository-directory]
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Transpile TypeScript to JavaScript:**
    ```bash
    npm run build
    ```

## Running the Application

To run the application and generate a report for a specific site:

```bash
node dist/app.js [site-name]
```

Replace `[site-name]` with the name of the site for which you want to generate the outage report. For example:

```bash
node dist/app.js norwich-pear-tree
```

## Development & Contribution

-   Ensure you have `TypeScript` installed globally or use the local development dependency.
-   Follow the coding conventions and error handling mechanisms in place.
-   Add unit tests for any new functionality or changes.
-   Use the integrated logger for any new logging requirements.

## Future Enhancements

-   Integration with more APIs to fetch additional data.
-   Automated scheduling of report generation.
-   Enhanced filtering options for outages based on more criteria.

## Development & Testing

### Running the Application in Development Mode:

To run the application in development mode, which features hot-reloading:

```bash
npm run dev [site-name]
```

Replace `[site-name]` with the name of the site for which you want to generate the outage report.

### Running Tests:

To execute the unit tests for the application:

```bash
npm run test
```
