# DevOps Debugging Analysis

## Part A: Working Pipeline Analysis

### Pipeline Overview

Our working pipeline consists of two jobs that run sequentially:

1. **test-job**:

   - Triggers on every push to main branch and pull requests
   - Sets up Node.js 18 environment
   - Installs dependencies with `npm ci` (clean install for CI environments)
   - Runs linting to check code quality
   - Builds the application to ensure it compiles correctly
   - Starts the server and tests if it responds correctly with a simple curl request

2. **build-job**:
   - Only runs if `test-job` succeeds (controlled by `needs: test-job`)
   - Builds a Docker image from our multi-stage Dockerfile
   - Tests the Docker container by running it and checking if it responds
   - Performs cleanup by stopping and removing the test container

### The `needs:` Keyword

The `needs: test-job` ensures that the build-job only runs after test-job completes successfully. This is a fundamental CI principle: we only build and package code that has passed all tests. This prevents broken code from being containerized and potentially deployed.

### Why This Approach Works

- **Fail Fast**: If tests fail, we don't waste time building Docker images
- **Resource Efficiency**: We only use build resources for verified code
- **Quality Gate**: Every build is guaranteed to have passed basic quality checks

## Part B: Break and Fix Challenge

_This section will be completed during Assignment 2 when we intentionally introduce and fix a bug._

### The Bug

_To be documented when we introduce the intentional error_

### Error Analysis

_Screenshot and error message analysis will be added here_

### The Fix

_Description of how the error was resolved_

### Lessons Learned

_Key takeaways from the debugging process_
