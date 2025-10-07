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
   - Only runs if `test-job` succeeds
   - Builds a Docker image from our Dockerfile
   - Tests the Docker container by running it and checking if it responds
   - Performs cleanup by stopping and removing the test container

### The `needs:` Keyword

The `needs: test-job` makes sure that the build-job only runs after test-job completes successfully. We only build and package code that has passed all tests. This prevents broken code from being deployed.

### Perks of our implementation 🥰

- **Fail Fast**: If tests fail, we don't waste time building Docker images
- **Resource Efficiency**: We only use build resources for verified code
- **Quality Gate**: Every build is guaranteed to have passed basic quality checks

## Part B: Break and Fix Challenge

Here, like in the assignment doc, I changed the name of the base image in the Dockerfile.

### The Bug

In the Dockerfile, I changed the base image name to node:18-uzihero which is obviously incorrect, an image like that doesn't exist.

![Docker Base Image Name Changed](assets/wrong_base_image_name.png)

### Error Analysis

![Docker Base Image Error](assets/wrong_base_image_error.png)

**Error Message**: `failed to build: failed to solve: node:18-uzihero: failed to resolve source metadata for docker.io/library/node:18-uzihero: docker.io/library/node:18-uzihero: not found`

**Root Cause**: Docker tried to pull a base image with a non-existent tag. The tag `node:18-uzihero` doesn't exist in the official Node.js Docker repository on Docker Hub.

The link to the error run is: https://github.com/UzitheI/LSPP_cicd_assignment/actions/runs/18311683218

### The Fix

Changed the Dockerfile back to use a legitimate base image:

```dockerfile
FROM node:18-alpine AS base
```

This uses the official `node:18-alpine` image, which exists and provides a working Node.js 18 environment on Alpine Linux (a lightweight Linux distribution).

![Right Base Image Name](assets/right_base_image_name.png)

The Link to the Run is: https://github.com/UzitheI/LSPP_cicd_assignment/actions/runs/18311772295

### Results

You can check in the image that both of our jobs completed succesfully. You can also see in the logs that the build process went down smoothly, showing no base image error like above.

![Successfull Build](assets/successfull_build.png)

### Lessons Learned

1. **Always verify base image tags exist** - Check Docker Hub or the official registry before using custom tags
2. **Docker error messages are descriptive** - The error clearly indicated the repository doesn't exist
3. **CI/CD catches errors early** - The pipeline caught this error before any manual deployment attempt
4. **Fail fast principle works** - The build failed immediately, saving time and resources
5. **Documentation is crucial** - Having clear error logs makes debugging much faster
