# 🚀 BlackBearPrintHouse — AWS Deployment Guide

## Architecture Overview

```
GitHub (main branch)
  ├── GitHub Actions CI/CD (lint → build → test)
  └── AWS Amplify Hosting (auto-deploy on push)
         ├── SSR + ISR (Lambda@Edge — managed)
         ├── CloudFront CDN (global edge)
         ├── ACM SSL (auto-provisioned)
         └── Route 53 DNS (print.blackbear.qa)
```

---

## 1. Prerequisites

- AWS Account with Amplify, Route 53, and ACM access
- GitHub repo: `https://github.com/hammamsawalma/blackbearprinthouse`
- Node.js 22+ installed locally
- AWS CLI installed: `brew install awscli`

---

## 2. AWS Amplify Setup

### 2.1 Create Amplify App

1. Go to **AWS Console → Amplify**
2. Click **"Host web app"** → Select **GitHub**
3. Authorize AWS to access your GitHub account
4. Select repository: `hammamsawalma/blackbearprinthouse`
5. Select branch: `main`
6. **Build settings**:
   - Framework: **Next.js - SSR**
   - App root: `app-src`
   - Build spec: will auto-detect `amplify.yml`
7. Click **"Save and deploy"**

### 2.2 Environment Variables

In Amplify Console → **Environment variables**, add:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `postgresql://...` | AWS RDS connection string |
| `AUTH_SECRET` | `openssl rand -base64 32` | Unique per environment |
| `NEXT_PUBLIC_BASE_URL` | `https://print.blackbear.qa` | — |
| `AWS_REGION` | `me-south-1` | Bahrain (closest to Qatar) |

> **⚠️ Important**: Never commit `.env` to Git. Use Amplify Console for secrets.

---

## 3. Custom Domain & SSL

### 3.1 Add Domain in Amplify

1. Amplify Console → **Domain management**
2. Click **"Add domain"**
3. Enter: `blackbear.qa`
4. Configure subdomain: `print` → branch `main`
5. Amplify will auto-provision an SSL certificate via ACM

### 3.2 DNS Configuration (Route 53)

If `blackbear.qa` is hosted on Route 53:

1. Go to **Route 53 → Hosted Zones → blackbear.qa**
2. Amplify will auto-create the required records. If manual setup:

```
Type: CNAME
Name: print.blackbear.qa
Value: <amplify-generated-domain>.amplifyapp.com
TTL: 300
```

3. For SSL validation, add the CNAME record Amplify provides
4. Wait ~10 minutes for SSL provisioning

### 3.3 Verify

```bash
curl -I https://print.blackbear.qa
# Should return HTTP/2 200 with valid SSL
```

---

## 4. CI/CD Pipeline

### How It Works

```
Developer pushes to main
       ↓
GitHub Actions runs:
  1. 🔍 Lint & Type-Check (tsc, eslint)
  2. 🏗️ Build & Test (prisma generate, next build)
  3. 🚀 Deploy notification
       ↓
AWS Amplify detects push and auto-deploys
       ↓
Live at https://print.blackbear.qa
```

### GitHub Actions runs on:
- **Push to `main`** → full pipeline + production deploy
- **Pull Requests** → lint + build only (preview deployments via Amplify)

---

## 5. Docker (Self-Hosting Backup)

If you ever need to run on EC2/ECS instead of Amplify:

```bash
cd app-src

# Build
docker build -t blackbear-print .

# Run
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e AUTH_SECRET="..." \
  blackbear-print

# Access at http://localhost:3000
```

---

## 6. Git Workflow

```bash
# Feature development
git checkout -b feature/my-feature
# ... make changes ...
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
# → Create PR → GitHub Actions validates → Merge to main → Auto-deploy

# Hotfix
git checkout -b hotfix/fix-issue
git commit -m "fix: resolve critical issue"
git push origin hotfix/fix-issue
# → Merge to main → deploys in ~3 minutes
```

---

## 7. Monitoring & Logs

### Amplify Logs
- **Build logs**: Amplify Console → App → Build details
- **Access logs**: Amplify Console → App → Access logs

### CloudWatch
- Lambda@Edge logs in the AWS region serving the request
- Set up alarms for 5xx error rates

---

## 8. Cost Estimate (Monthly)

| Service | Estimated Cost |
|---------|---------------|
| Amplify Hosting (SSR) | ~$5–15 |
| Route 53 (DNS) | $0.50 |
| ACM (SSL) | Free |
| CloudFront (CDN) | Included with Amplify |
| **Total (without DB/S3)** | **~$6–16/month** |

> DB (RDS PostgreSQL) and S3 storage are separate costs, estimated at ~$15–30/month for light usage.

---

## 9. Production Checklist

- [ ] Push code to GitHub
- [ ] Create Amplify app and link to GitHub
- [ ] Set environment variables in Amplify Console
- [ ] Add custom domain `print.blackbear.qa`
- [ ] Verify SSL certificate provisioned
- [ ] Test all pages in AR and EN
- [ ] Set up CloudWatch alarms for errors
- [ ] Migrate database to PostgreSQL (separate task)
- [ ] Configure AWS S3 for file uploads (separate task)
- [ ] Configure AWS SES for emails (separate task)
