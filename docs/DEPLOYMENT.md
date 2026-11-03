# Deployment and GitHub Actions CI/CD

## Deployment flow

A push to the `main` branch triggers GitHub Actions:

``` text
GitHub push
  → checkout source
  → setup Node.js
  → npm ci
  → npm run build
  → SSH setup
  → rsync dist/ to EC2 staging
  → remote rsync into Nginx document root
```

## GitHub Actions secrets

Configure these in the repository's **Settings → Secrets and variables →
Actions**:

  Secret          Value
  --------------- ------------------------------------
  `EC2_HOST`      EC2 public IP or hostname
  `EC2_USER`      `ubuntu` for this Ubuntu EC2 setup
  `EC2_SSH_KEY`   Full private SSH key contents

Paste the entire private key, including its `BEGIN` and `END` lines,
into the secret. Never put the key in the repository, workflow logs, or
public documentation.

## Workflow

File: `.github/workflows/deploy.yml`

``` yaml
name: Deploy Portfolio to EC2

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build React application
        run: npm run build

      - name: Verify built title
        run: grep -i "<title>" dist/index.html

      - name: Configure SSH
        env:
          EC2_SSH_KEY: ${{ secrets.EC2_SSH_KEY }}
          EC2_HOST: ${{ secrets.EC2_HOST }}
        run: |
          mkdir -p ~/.ssh
          chmod 700 ~/.ssh

          printf '%s\n' "$EC2_SSH_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa

          ssh-keyscan -H "$EC2_HOST" >> ~/.ssh/known_hosts
          chmod 600 ~/.ssh/known_hosts

      - name: Upload website files
        env:
          EC2_HOST: ${{ secrets.EC2_HOST }}
          EC2_USER: ${{ secrets.EC2_USER }}
        run: |
          rsync -avz --delete \
            -e "ssh -i ~/.ssh/id_rsa" \
            dist/ \
            "$EC2_USER@$EC2_HOST:/tmp/portfolio-dist/"

      - name: Deploy website
        env:
          EC2_HOST: ${{ secrets.EC2_HOST }}
          EC2_USER: ${{ secrets.EC2_USER }}
        run: |
          ssh -i ~/.ssh/id_rsa \
            "$EC2_USER@$EC2_HOST" \
            "sudo mkdir -p /var/www/Project1 && sudo rsync -av --delete /tmp/portfolio-dist/ /var/www/Project1/"
```

### Important deployment configuration

Nginx serves this directory:

``` text
/var/www/Project1
```

The workflow's final rsync destination must match that root. If these
paths differ, the workflow may succeed while the website continues
serving old files.

### Deploy an update

``` bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Open the repository's **Actions** tab and check the workflow run.

## SSH key notes

-   The private key is stored in GitHub Actions Secrets.
-   The public key must be authorized for the EC2 user in
    `~/.ssh/authorized_keys`.
-   The private key secret must include the complete key, including its
    header and footer lines.
-   Never share the private key in chat or commit it to Git.

## SSH host key verification

This workflow uses `ssh-keyscan` to collect the EC2 host key at runtime.
This is convenient for a learning project, but it does not independently
authenticate the host key.

For a more secure workflow: 1. Retrieve the EC2 SSH host key through a
trusted channel. 2. Verify its fingerprint. 3. Store the verified host
key in a GitHub Actions secret. 4. Write that pinned key to
`known_hosts` during the workflow. 5. Remove runtime `ssh-keyscan` after
pinning is configured.

## Manual deployment (optional)

If you need to deploy manually from your local machine, build the app
first:

``` bash
npm ci
npm run build
```

Then transfer the build files using `scp` (as used in the manual
deployment process):

``` bash
scp -r dist/* ubuntu@EC2_PUBLIC_IP:/tmp/portfolio-dist/
```

This command assumes the remote staging directory exists and that SSH
authentication is configured. For a complete manual deployment, copy the
staging files into `/var/www/Project1/` using `sudo rsync` on EC2.

Do not confuse this manual `scp` flow with the automated GitHub Actions
workflow, which uses `rsync`.
