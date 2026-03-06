# Developer Toolbox - Deployment Guide

Quick deployment instructions for the Developer Toolbox project.

## Prerequisites

- Docker installed ([Download](https://www.docker.com/products/docker-desktop))
- Port 3000 available (or change mapping in docker-compose.yml)

## Local Deployment

### Option 1: Docker (Fastest)

```bash
# Build the Docker image
docker build -t devtools .

# Run the container
docker run -p 3000:3000 devtools
```

Visit: `http://localhost:3000`

### Option 2: Docker Compose (Recommended)

```bash
# Start the application
docker-compose up

# In another terminal, view logs
docker logs -f <container-id>

# Stop the application
docker-compose down
```

Visit: `http://localhost:3000`

### Option 3: Local Node.js

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Start production server
pnpm start
```

Visit: `http://localhost:3000`

## Development

```bash
# Install dependencies
pnpm install

# Start development server with hot reload
pnpm dev
```

Visit: `http://localhost:3000`

## Docker Quick Commands

### Build Image
```bash
docker build -t devtools:latest .
```

### Run with Custom Port
```bash
docker run -p 8080:3000 devtools:latest
```

Access at: `http://localhost:8080`

### View Running Containers
```bash
docker ps
```

### Stop Container
```bash
docker stop <container-id>
```

### View Logs
```bash
docker logs <container-id>
docker logs -f <container-id>  # Follow logs
```

### Remove Image
```bash
docker rmi devtools:latest
```

## Performance Tips

1. **Multi-stage build**: The Dockerfile uses a multi-stage build to keep the final image small (~200MB)
2. **Minimal dependencies**: Only essential packages included
3. **Fast startup**: Ready within seconds of container start
4. **Production optimized**: Configured for production Node.js environment

## Troubleshooting

### Port Already in Use
```bash
# Change the port mapping
docker run -p 8080:3000 devtools:latest
```

### Out of Memory
Increase Docker's memory allocation in Docker Desktop settings.

### Container Won't Start
```bash
# Check logs for errors
docker logs <container-id>

# Rebuild the image
docker build --no-cache -t devtools:latest .
```

### CORS Issues with API Tester
This is expected behavior - not all APIs support CORS. Workarounds:
- Use a CORS proxy (not included by default)
- Test with public APIs that allow CORS
- Test with localhost APIs during development

## Deployment to Production

### Cloud Platforms

**Vercel** (Recommended for Next.js):
```bash
# Push to GitHub and connect to Vercel
# Automatic deployment on push
```

**AWS ECS/Fargate**:
```bash
# Build and push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
docker build -t devtools:latest .
docker tag devtools:latest <account>.dkr.ecr.<region>.amazonaws.com/devtools:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/devtools:latest
```

**Docker Hub**:
```bash
docker build -t <username>/devtools:latest .
docker push <username>/devtools:latest
```

**Google Cloud Run**:
```bash
gcloud builds submit --tag gcr.io/<project-id>/devtools
gcloud run deploy devtools --image gcr.io/<project-id>/devtools --platform managed
```

### Environment Variables

Currently, no environment variables are required. If needed in the future, add them to:
- `.env.local` (development)
- Docker: `docker run -e VAR_NAME=value ...`
- Docker Compose: Add to `environment:` section in `docker-compose.yml`

## Size & Performance

- **Build size**: ~200MB (Docker image)
- **Runtime memory**: ~80-150MB
- **Startup time**: ~3-5 seconds
- **Bundle size**: ~50KB (gzipped)

## Monitoring

Add health checks with:
```bash
docker run -p 3000:3000 --health-cmd="curl -f http://localhost:3000 || exit 1" devtools:latest
```

## Video Recording Tips

Perfect for demo videos due to:
- ✅ Fast startup (3-5 seconds)
- ✅ No database required
- ✅ Single container deployment
- ✅ Zero configuration
- ✅ Minimal resource usage

Example script:
```bash
docker build -t devtools .
docker run -p 3000:3000 devtools
# Now record your browser window at localhost:3000
```

## Support

For issues, check:
1. Docker logs: `docker logs <container-id>`
2. Port conflicts: `lsof -i :3000`
3. Rebuild without cache: `docker build --no-cache -t devtools .`
