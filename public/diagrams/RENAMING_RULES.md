# Diagram Renaming Rules

This document defines the rules for renaming diagram files in the `public/diagrams` directory.

## Core Rule
**ONLY rename a file to include the `done-` prefix when the user EXPLICITLY approves the diagram.**

## Protocol
1.  **User Approval**: Wait for the user to say "This is good", "Approved", "Perfect", or explicitly ask to rename it to "done-...".
2.  **Renaming**:
    *   Original: `filename.svg`
    *   Renamed: `done-filename.svg`
3.  **Constraint**:
    *   **NEVER** rename a file to `done-` status without the user's explicit permission.
    *   If the user has not given permission, leave the filename as is.

## AI Assistant Instructions
When working on files in this directory, always check this rule. If a user expresses satisfaction but hasn't explicitly asked for a rename, you may ask: *"Since you are satisfied with this diagram, should I rename it to 'done-[filename].svg' to mark it as complete?"*

