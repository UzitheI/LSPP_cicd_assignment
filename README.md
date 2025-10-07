# Calculator App - DevOps CI/CD Showcase

![Build Status](https://github.com/UzitheI/LSPP_cicd_assignment/workflows/Build%20%26%20Test/badge.svg)
![Release](https://github.com/UzitheI/LSPP_cicd_assignment/workflows/Release/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

## 🧮 About

A calculator application built with Next.js, showcasing DevOps practices including automated testing, security scanning, and release automation.

## ✨ Features

- **Calculator Operations**: Addition, subtraction, multiplication, division
- **Production Ready**: Dockerized with multi-stage builds for optimal security and performance
- **TypeScript**: Full type safety and modern development experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 DevOps Pipeline

### Continuous Integration (CI)

- **Automated Testing**: Runs on every push to main branch
- **Code Quality**: ESLint validation and TypeScript checking
- **Docker Build**: Multi-stage containerization with health checks
- **Dependency Management**: Reproducible builds with npm ci
- **Parallel Jobs**: Test and build jobs run efficiently with dependency management

### Continuous Deployment (CD) & Release Automation

- **Semantic Versioning**: Git tag-based releases (v1.0.0, v1.1.0, etc.)
- **Security Scanning**: Trivy vulnerability assessment (fails on HIGH/CRITICAL)
- **Container Registry**: Automated publishing to GitHub Container Registry (ghcr.io)
- **Release Notes**: Auto-generated changelogs from commit history
- **Multi-tag Strategy**: Version-specific and latest tags for flexible deployment

## 📦 Usage

### Quick Start with Docker

```bash
# Pull and run the latest release
docker pull ghcr.io/uzithei/lspp_cicd_assignment:latest
docker run -p 3000:3000 ghcr.io/uzithei/lspp_cicd_assignment:latest

# Open your browser to http://localhost:3000
```

### Development

```bash
# Clone the repository
git clone https://github.com/UzitheI/LSPP_cicd_assignment.git
cd LSPP_cicd_assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Multi-Stage Docker Build

1. **Base Stage**: Node.js 18 Alpine with security dependencies
2. **Dependencies Stage**: Install only production dependencies
3. **Builder Stage**: Compile and build the application with dev dependencies
4. **Runner Stage**: Minimal production image with security hardening

**Security Features:**

- Non-root user execution
- Minimal Alpine Linux base
- Health check monitoring
- Dependency vulnerability scanning
- Telemetry disabled for privacy

### Release Workflow Architecture

#### Git Tagging Strategy

Project is made to follow [Semantic Versioning](https://semver.org/):

- `v1.0.0` - Major release (breaking changes)
- `v1.1.0` - Minor release (new features, backward compatible)
- `v1.0.1` - Patch release (bug fixes, backward compatible)

#### Release Automation Process

**Research: `softprops/action-gh-release`**

After researching various GitHub Actions for release automation, `softprops/action-gh-release` was chosen for its:

- **Comprehensive Features**: Auto-generated release notes, file attachments, pre-release support
- **Community Trust**: 10k+ stars, actively maintained, widely used
- **Flexibility**: Supports custom release body, multiple file types, and conditional releases
- **Integration**: Seamless GitHub API integration with proper permissions handling

**Workflow Stages:**

1. **Trigger**: Push tags matching `v*` pattern (e.g., `git push origin v1.0.0`)
2. **Validation**: Run full test suite, linting, and build verification
3. **Security**: Trivy vulnerability scanning (CRITICAL/HIGH severity failures)
4. **Publishing**: Push validated images to GitHub Container Registry
5. **Documentation**: Auto-generate release notes from commit history
6. **Notification**: Create GitHub release with artifacts and usage instructions

#### Container Registry Integration

**Research: GitHub Container Registry (ghcr.io)**

Selected GitHub Container Registry for:

- **Native Integration**: Built-in GitHub Actions support with `GITHUB_TOKEN`
- **Security**: Image vulnerability scanning and access control
- **Performance**: Fast, global CDN distribution
- **Cost**: Free for public repositories
- **Tagging Strategy**:
  - Version tags: `ghcr.io/uzithei/lspp_cicd_assignment:v1.0.0`
  - Latest tag: `ghcr.io/uzithei/lspp_cicd_assignment:latest`

## 🔒 Security

### Vulnerability Management

- **Automated Scanning**: Every release is scanned with Trivy
- **Fail-Fast**: Pipeline fails on HIGH/CRITICAL vulnerabilities
- **Transparency**: Security scan results uploaded to GitHub Security tab
- **Regular Updates**: Dependabot for dependency management

### Container Security

- **Non-root Execution**: All containers run as unprivileged user (nextjs:1001)
- **Minimal Base**: Alpine Linux reduces attack surface
- **Health Monitoring**: Built-in health checks for container orchestration
- **Build Optimization**: Multi-stage builds remove unnecessary dependencies

## 📊 Monitoring & Observability

- **Build Status**: Real-time pipeline status via GitHub Actions badges
- **Security Alerts**: Automated vulnerability notifications
- **Release Tracking**: Version history and changelog generation
- **Container Health**: Built-in health check endpoints

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with Server Components
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5+ with strict mode
- **Build Tool**: Turbopack for fast development

### DevOps & Infrastructure

- **Containerization**: Docker with multi-stage builds
- **CI/CD**: GitHub Actions with reusable workflows
- **Registry**: GitHub Container Registry (ghcr.io)
- **Security**: Trivy vulnerability scanner
- **Monitoring**: Docker health checks

### Development Tools

- **Linting**: ESLint with Next.js config
- **Code Quality**: TypeScript strict mode
- **Package Manager**: npm with lock file integrity
- **Version Control**: Git with semantic versioning

## 🚦 Creating a Release

### Manual Release Process

```bash
# Ensure your code is ready
npm run lint
npm run build

# Commit your changes
git add .
git commit -m "feat: add new calculator feature"

# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0

# This automatically triggers:
# ✅ Build and test validation
# ✅ Security vulnerability scanning
# ✅ Docker image publishing to ghcr.io
# ✅ GitHub release creation with changelog
```

### What Happens During Release

1. **GitHub Actions detects the version tag**
2. **Pipeline validates code quality and security**
3. **Docker image is built and scanned for vulnerabilities**
4. **Image is published to GitHub Container Registry**
5. **GitHub Release is created with auto-generated changelog**
6. **Notifications are sent to repository watchers**

## 📝 Assignment Context

This project was created for the **LSPP 2025 DevOps CI/CD Assignment**, demonstrating:

### Assignment 1: Build Verifier ✅

- Multi-job GitHub Actions workflow
- Docker containerization
- Automated testing and validation

### Assignment 2: Debugging Detective ✅

- Pipeline failure analysis
- Error documentation and resolution
- DevOps troubleshooting skills

### Assignment 3: Release Architect ✅

- Professional release automation
- Security-first approach
- Industry-standard practices


## 🙏 Acknowledgments

Thank you Suichhya Didi for the awesome session

