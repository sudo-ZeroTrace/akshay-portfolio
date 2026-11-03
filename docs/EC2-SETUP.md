# EC2 Setup from Scratch

This guide describes the general steps to recreate the EC2 hosting
environment for this project.

> AWS console labels and Ubuntu AMI versions can change. Confirm current
> AWS options before creating resources.

## 1. Create an EC2 instance

1.  Open the AWS EC2 console.
2.  Launch an instance using an Ubuntu Server LTS AMI.
3.  Select an instance type appropriate for a small portfolio site and
    your budget.
4.  Create or select an SSH key pair. Download and securely store the
    private key.
5.  Configure the Security Group:
    -   SSH (`TCP 22`): allow only your trusted IP where possible.
    -   HTTP (`TCP 80`): allow public traffic.
    -   HTTPS (`TCP 443`): allow public traffic.
6.  Launch the instance.
7.  Record the public IPv4 address or configure a stable address if
    appropriate.

**Cost note:** EC2, public IPv4 addresses, storage, and data transfer
may incur charges. Check AWS pricing and billing before launching.

## 2. Connect over SSH

From your local Linux machine, use the private key and the EC2 public
address:

``` bash
chmod 400 /path/to/ec2-key.pem
ssh -i /path/to/ec2-key.pem ubuntu@EC2_PUBLIC_IP
```

Replace the placeholder with your actual key path and public IP. Never
publish the private key.

## 3. Update the server

On EC2:

``` bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
```

## 4. Install and start Nginx

``` bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

Test the default Nginx page by opening the EC2 public IP in a browser
while HTTP access is allowed.

## 5. Create the project web root

The Nginx site for this project uses:

``` text
/var/www/Project1
```

Create it:

``` bash
sudo mkdir -p /var/www/Project1
```

## 6. Configure Nginx

The project site configuration is:

``` text
/etc/nginx/sites-available/Project1
```

A basic HTTP configuration before HTTPS setup can look like:

``` nginx
server {
    listen 80;
    listen [::]:80;

    server_name akshaydr.site www.akshaydr.site;

    root /var/www/Project1;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

This `try_files` rule supports frontend routes by falling back to
`index.html`.

Enable the site:

``` bash
sudo ln -s /etc/nginx/sites-available/Project1 /etc/nginx/sites-enabled/Project1
```

If the link already exists, do not create a duplicate. Review the active
configuration first.

Check configuration and reload:

``` bash
sudo nginx -t
sudo systemctl reload nginx
```

After setting up HTTPS with Certbot, Certbot may modify the Nginx
configuration to add TLS settings and HTTP-to-HTTPS redirection. Inspect
the active configuration rather than replacing it blindly.

## 7. Configure DNS

At your domain registrar or DNS provider, configure the domain's DNS
records to point to the EC2 public IP. Commonly this means:

-   An `A` record for the apex domain.
-   An `A` record or appropriate alias for `www`.

DNS record names and values depend on the provider. Confirm resolution
before requesting a certificate:

``` bash
dig +short akshaydr.site
dig +short www.akshaydr.site
```

Both names should resolve to the intended server (or intended DNS
target).

## 8. Configure HTTPS with Certbot

The project used Certbot / Let's Encrypt to configure HTTPS.

A common Ubuntu + Nginx installation flow is:

``` bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d akshaydr.site -d www.akshaydr.site
```

Follow Certbot's prompts. Confirm the names requested match your DNS
configuration and intended site.

Test renewal configuration:

``` bash
sudo certbot renew --dry-run
```

## 9. Verify the server

``` bash
sudo nginx -t
sudo systemctl status nginx
curl -I http://akshaydr.site
curl -I https://akshaydr.site
```

HTTP should redirect to HTTPS if the redirect was configured. HTTPS
should return a successful response.

## Notes

-   The exact EC2 IP, instance type, AMI ID, and Security Group ID are
    intentionally not included in this public guide.
-   Do not publish private SSH keys or sensitive AWS information.
-   The `root` directive must point to a **directory**, such as
    `/var/www/Project1`, not to `index.html`.
