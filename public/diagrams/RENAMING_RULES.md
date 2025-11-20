# Diagram Management Rules

This document defines the rules for managing diagram files in the `public/diagrams` directory.

## Core Rule
**ONLY move a file to the `done` subdirectory when the user EXPLICITLY approves the diagram.**

## Protocol
1.  **User Approval**: Wait for the user to say "This is good", "Approved", "Perfect", or explicitly ask to mark it as done.
2.  **Moving**:
    *   Move the approved file from `public/diagrams/` to `public/diagrams/done/`.
    *   **Do NOT change the filename**. Keep the original name (e.g., `customer-journey.svg`).
    *   If the file currently has a `done-` prefix, remove it when moving.
3.  **Constraint**:
    *   **NEVER** move a file to the `done` directory without the user's explicit permission.
    *   Working files should remain in the root of `public/diagrams/`.

## AI Assistant Instructions
When working on files in this directory, always check this rule. If a user expresses satisfaction but hasn't explicitly asked to finalize it, you may ask: *"Since you are satisfied with this diagram, should I move it to the 'done' folder to mark it as complete?"*
