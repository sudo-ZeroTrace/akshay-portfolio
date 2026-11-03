# Troubleshooting and Lessons Learned

This file records real issues encountered while building and deploying
the portfolio, plus useful checks.

## 1. GitHub Actions reported success, but the website showed old content

### Symptom

The workflow completed successfully, but the live site did not reflect
the latest title or website changes.

### Root cause

The Nginx document root and the GitHub Actions deployment destination
were different:

-   Nginx was configured to serve `/var/www/Project1`.
-   The workflow was deploying to `/var/www/html`.

The workflow was copying files successfully---but into the wrong
directory.

### Fix

Make both paths match:

``` nginx
root /var/www/Project1;
index index.html;
```

Workflow deployment destination:

``` bash
sudo rsync -av --delete /tmp/portfolio-dist/ /var/www/Project1/
```

### Lesson

A successful CI/CD workflow does not automatically prove that the
correct deployment target was updated. Always verify:

1.  The build output.
2.  The remote deployment directory.
3.  Nginx's active document root.
4.  The actual website response.

Useful checks:

``` bash
sudo nginx -T 2>/dev/null | grep -E "server_name|root "
sudo grep -i "<title>" /var/www/Project1/index.html
curl -sL https://akshaydr.site | grep -i "<title>"
```

## 2. SSH key load error: `error in libcrypto`

### Symptom

GitHub Actions reported an SSH key parsing error, such as:

``` text
Load key ".../.ssh/id_rsa": error in libcrypto
Permission denied (publickey)
```

### Root cause

The private key had been copied into the GitHub Actions secret without
its complete beginning and ending marker lines.

### Fix

Update `EC2_SSH_KEY` with the **entire private key**, including the
`BEGIN` and `END` lines. Preserve its formatting and line breaks.

### Security reminder

Never paste private keys into chat, issues, logs, or documentation. If a
private key is ever exposed, replace it and remove the old public key
from EC2's `authorized_keys`.

## 3. SSH host key verification failure

### Symptom

The deployment initially failed with:

``` text
Host key verification failed.
```

### Concepts

-   `ssh-keygen` generates an SSH key pair used for authentication.
-   `ssh-keyscan` collects a server's SSH host public key.
-   `known_hosts` stores host keys so SSH can recognize the server.

### Resolution

The workflow was adjusted to populate `known_hosts` and SSH
authentication was corrected. The current workflow uses runtime
`ssh-keyscan`.

### Security note

Runtime `ssh-keyscan` is convenient but does not verify the host's
identity independently. For a hardened setup, pin a verified host key in
GitHub Secrets.

## 4. Website title changed locally but not on the live site

### Diagnostic sequence

Check source HTML:

``` bash
grep -i "<title>" index.html
```

Check Vite build output:

``` bash
npm run build
grep -i "<title>" dist/index.html
```

Check deployed HTML on EC2:

``` bash
sudo grep -i "<title>" /var/www/Project1/index.html
```

Check the public response:

``` bash
curl -sL https://akshaydr.site | grep -i "<title>"
```

Search for React code that might set the title dynamically:

``` bash
grep -R "document.title" src/
```

### Lesson

Trace the content from source to build artifact to deployment target to
public response. Do not assume the browser cache is the cause until the
server response has been checked.

## 5. Nginx configuration checks

Always validate configuration before reloading:

``` bash
sudo nginx -t
```

Then:

``` bash
sudo systemctl reload nginx
```

Inspect the active configuration:

``` bash
sudo nginx -T
```

### Important Nginx detail

The `root` directive should point to a directory, for example:

``` nginx
root /var/www/Project1;
```

It should not point to an individual file such as:

``` nginx
root /var/www/Project1/index.html;
```

## 6. General deployment checklist

-   [ ] Source file contains the expected change.
-   [ ] `npm run build` succeeds.
-   [ ] `dist/` contains the expected files.
-   [ ] GitHub Actions checks out the intended branch/commit.
-   [ ] SSH authentication works.
-   [ ] `rsync` sends files to the intended staging directory.
-   [ ] Remote deployment copies to the Nginx document root.
-   [ ] Nginx configuration is valid.
-   [ ] The live HTTPS response contains the expected content.

## Lessons learned

-   Read the exact error message before changing configuration.
-   Check the active configuration, not just a file you think Nginx
    uses.
-   Keep the CI deployment destination and Nginx document root aligned.
-   Verify each stage of a pipeline independently.
-   A green pipeline can still deploy to the wrong location.
-   Preserve private keys and secrets carefully.
-   Document incidents and fixes---they demonstrate practical
    troubleshooting ability.
