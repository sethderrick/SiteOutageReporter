/**
 * Represents an outage event with its unique identifier and duration.
 */
export interface Outage {
    id: string;     // Unique identifier for the outage
    begin: string;  // Start date-time of the outage in ISO format
    end: string;    // End date-time of the outage in ISO format
}
