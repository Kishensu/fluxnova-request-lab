# BPMN Models

This folder contains a beginner-friendly BPMN 2.0 workflow model for the request-learning app.

## File

- `advisor-request-workflow.bpmn`

## Process Key

- `advisor_request_workflow`

## What Each Step Teaches

- `Start Event`: Shows where a new process instance begins.
- `Submit Request`: Introduces a user task where a person enters the initial business data.
- `Validate Request`: Demonstrates a service task that checks request completeness or business rules.
- `Is Request Complete?`: Teaches an exclusive gateway that branches based on a process variable such as `requestComplete`.
- `Request More Info`: Shows how a workflow loops back to the requester when required data is missing.
- `Manager Approval`: Introduces a human approval step that often appears in business processes.
- `Approved?`: Teaches a second exclusive gateway that routes to success or rejection using a variable such as `approved`.
- `Complete Request`: Demonstrates a final service task that performs the last system action before closing the workflow.
- `Completed`: Shows a successful end event.
- `Rejected`: Shows an alternate end event for a declined request.

## Engine Compatibility Notes

- The model uses standard BPMN 2.0 elements and sequence flows.
- The process is marked `isExecutable="true"` for Camunda/Fluxnova-style engines.
- Condition expressions use common expression-style variables:
  - `${requestComplete}`
  - `${approved}`
- BPMN diagram coordinates are included so the model should open with a readable layout in BPMN tools.
