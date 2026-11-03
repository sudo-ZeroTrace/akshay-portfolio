# ⚡ D R AKSHAY --- IT Support & Security Engineer

A futuristic portfolio website for **D R Akshay**, built with
React and Vite and deployed to AWS EC2 using Nginx, HTTPS, and GitHub
Actions CI/CD.

**Live portfolio:** https://akshaydr.site

This repository demonstrates both the frontend portfolio and the DevOps
workflow used to build, deploy, and maintain it.

------------------------------------------------------------------------

## 🌐 Project Overview

The portfolio combines a futuristic cybersecurity-inspired interface
with a real cloud deployment pipeline.

### Frontend Highlights

-   **Animated name and decryption glitch effect**
    -   Matrix-style glyph scrambling and neon effects.
    -   Chromatic aberration / RGB split styling.
    -   Tactical HUD framing and interactive re-decryption effects.
-   **3D cyber-defense visuals**
    -   Three-dimensional Torus Knot and Icosahedron elements.
    -   Animated firewall-style rings and cyber grid.
    -   Matrix-style code rain and simulated terminal logs.
-   **Interactive project armory**
    -   3D interactive project divisions.
    -   Canvas-based visual elements and click-to-inspect interactions.
-   **Cyber-themed terminal**
    -   Simulated terminal interface with commands such as `help`,
        `whoami`, `skills`, `projects`, `exp`, `edu`, `contact`, and
        `cat resume`.
    -   Terminal interactions are part of the portfolio UI; they are not
        a real system shell.

> Visual effects and terminal output are portfolio simulations, not live
> security monitoring or real exploit activity.

------------------------------------------------------------------------

## 🛠️ Frontend Technology Stack

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  React 19                            Frontend UI

  Vite                                Development server and production
                                      build

  Three.js                            3D/WebGL graphics, geometries,
                                      canvas textures, raycasting

  Tailwind CSS v4                     Styling

  Google Fonts                        Rajdhani, Fira Code, Space Grotesk

  Lucide React                        Icons

  Web Audio API                       Procedural UI sound effects
  -----------------------------------------------------------------------

The original frontend was created with assistance from **Google
Antigravity**. You can use Antigravity, another AI coding assistant,
build your own React/Vite frontend, or use an existing website. The
deployment walkthrough is not tied to a particular AI tool.

------------------------------------------------------------------------

## 🚀 Run Locally

### Prerequisites

-   Node.js (the CI workflow currently uses Node.js 22)
-   npm

Clone the repository and enter the project directory:

``` bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Install dependencies:

``` bash
npm ci
```

Start the development server:

``` bash
npm run dev
```

Build for production:

``` bash
npm run build
```

Preview the production build:

``` bash
npm run preview -- --port 4173
```

Open the local URL printed by Vite. For the preview server, visit:

``` text
http://localhost:4173
```

> The original README used Windows PowerShell commands (`npm.cmd`). On
> Ubuntu/Linux/macOS, use `npm` as shown above.

------------------------------------------------------------------------

## ☁️ DevOps: AWS EC2 Deployment

The portfolio is deployed as a static Vite build to an **AWS EC2 Ubuntu
instance**, served by **Nginx**.

### Infrastructure and tools

  Component                 Role
  ------------------------- ----------------------------------------
  AWS EC2                   Cloud virtual machine
  Ubuntu                    Server operating system
  Nginx                     Serves the built frontend
  GitHub                    Source control
  GitHub Actions            CI/CD automation
  SSH                       Secure connection to EC2
  rsync                     Transfers and synchronizes build files
  DNS                       Maps the domain to the EC2 instance
  Let's Encrypt / Certbot   HTTPS certificate

### Architecture

``` text
Developer workstation
        |
        | git push to main
        v
      GitHub
        |
        | GitHub Actions
        | - checkout source
        | - install dependencies
        | - build Vite app
        v
 GitHub-hosted runner
        |
        | SSH + rsync
        v
 AWS EC2 (Ubuntu)
        |
        | /var/www/Project1
        v
      Nginx
        |
        v
 https://akshaydr.site
```

### CI/CD workflow

A push to the `main` branch triggers the workflow at:

``` text
.github/workflows/deploy.yml
```

The workflow:

1.  Checks out the repository.
2.  Sets up Node.js.
3.  Installs dependencies using `npm ci`.
4.  Builds the frontend using `npm run build`.
5.  Configures SSH using GitHub Actions Secrets.
6.  Uploads `dist/` to an EC2 staging directory.
7.  Synchronizes the build to Nginx's document root.

**Important:** Nginx's active document root and the workflow's
deployment destination must match. This project uses:

``` text
/var/www/Project1/
```

### GitHub Actions secrets

Set these in **GitHub → Repository Settings → Secrets and variables →
Actions**:

  Secret          Description
  --------------- -------------------------------------------
  `EC2_HOST`      EC2 public IP or hostname
  `EC2_USER`      SSH username (`ubuntu` for this instance)
  `EC2_SSH_KEY`   Full SSH private key contents

Never commit private keys, AWS credentials, or secrets to the
repository.

### Deploy an update

Make a code change, then:

``` bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Actions should automatically build and deploy the latest version.

------------------------------------------------------------------------

## 📚 Deployment Documentation

Detailed walkthroughs are available in the `docs/` directory:

-   [EC2 setup from scratch](docs/EC2-SETUP.md)
-   [GitHub Actions and deployment](docs/DEPLOYMENT.md)
-   [Troubleshooting and lessons learned](docs/TROUBLESHOOTING.md)

These guides cover server setup, Nginx, domain/DNS, HTTPS, SSH, CI/CD,
and deployment debugging.

------------------------------------------------------------------------

## ✅ Verification

After deployment, verify:

-   [ ] The website loads at `https://akshaydr.site`.
-   [ ] HTTP redirects to HTTPS.
-   [ ] The latest code change appears on the website.
-   [ ] GitHub Actions completes successfully.

Useful commands on EC2:

``` bash
sudo nginx -t
sudo systemctl status nginx
sudo grep -i "<title>" /var/www/Project1/index.html
```

Check the public HTML from your local machine:

``` bash
curl -sL https://akshaydr.site | grep -i "<title>"
```

------------------------------------------------------------------------

## 🧰 Troubleshooting Highlights

### GitHub Actions succeeds but the website remains outdated

The deployment workflow initially copied files to `/var/www/html`, while
Nginx served `/var/www/Project1`. The pipeline succeeded but deployed to
the wrong directory.

**Fix:** Align the CI deployment destination with the active Nginx
document root.

### SSH private key parsing error

An SSH key error (`error in libcrypto`) occurred because the private key
secret did not include the complete key marker lines.

**Fix:** Store the entire private key in GitHub Actions Secrets,
including the `BEGIN` and `END` lines. Never expose the key in logs or
documentation.

More details: [Troubleshooting guide](docs/TROUBLESHOOTING.md).

------------------------------------------------------------------------

## 🔐 Security Notes

-   Do not commit private SSH keys, AWS credentials, or passwords.
-   Restrict SSH (`TCP 22`) to trusted IP addresses where practical.
-   Allow public HTTP (`80`) and HTTPS (`443`) traffic as needed.
-   Use HTTPS for public traffic.
-   The current workflow uses runtime `ssh-keyscan` to populate
    `known_hosts`. For stronger host authentication, verify and pin the
    EC2 SSH host key.
-   Use least-privilege permissions for deployment.

------------------------------------------------------------------------

## 🎯 What This Project Demonstrates

-   React/Vite frontend build and deployment
-   Linux and Ubuntu server administration
-   AWS EC2 provisioning and configuration
-   Nginx web server configuration
-   DNS and HTTPS setup
-   SSH key-based authentication
-   GitHub Actions CI/CD
-   Automated deployment using rsync
-   Troubleshooting real deployment failures

------------------------------------------------------------------------

## 🔮 Future Improvements

-   Dockerize the application.
-   Pin the SSH host key in GitHub Actions.
-   Add deployment health checks and rollback support.
-   Add monitoring and alerting.
-   Explore infrastructure as code using Terraform.

------------------------------------------------------------------------

## 🙌 Acknowledgements

-   **Google Antigravity** --- AI-assisted frontend creation.
-   React, Vite, Three.js, Tailwind CSS, and the open-source ecosystem.
