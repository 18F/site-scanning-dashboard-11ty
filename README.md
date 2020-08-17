# site-scanning-dashboard-11ty
Proof of concept for a simple yet customizable JS-based site scanner dashboard.

# Site Scanning Dashboard (11ty)

This repo contains a simple, easy-to-run [11ty-based](https://www.11ty.dev/) site tha will display
the output from
[site-scanning](https://github.com/18F/site-scanning) scans.

It can be built and viewed locally, pushed up to federalist, or deployed on cloud.gov.

This site currently is hardcoded to display the scan results for TTS domains, but
you can customize the domain list in the `config.yml` file, along with other site settings (see "Customization" below).

Note that it only pulls down scan results whenever
you build or serve the site, so if you are deploying this through CI/CD, you will want to build/deploy this once a day to ensure that it has the latest scan results.

## How to view it locally

* Go into the `site-scanning-dashboard-11ty` repo.
* Run the command `eleventy --serve`
* If you see a Node or NPM error, they're not installed on your machine. You can install Node from the command line, with installers such as Homebrew, or with a download. However you want to do it, once you've [installed Node](https://nodejs.org/en/download/), try again and eleventy should work.

Once it gets done building, you can look at 
[http://localhost:8080](http://localhost:8080) and see the site.

## How to deploy it to cloud.gov or some other Cloud Foundry instance

### TBD

## How to deploy it to Federalist

### TO-DO: Ensure this is working as described.

[Federalist](https://federalist.18f.gov) is a system that deploys static websites
for government.

* [Fork this repo](https://help.github.com/en/articles/fork-a-repo) and, if
  desired, edit the list of domains to display in your fork.
* Get authorized to use federalist.  [Contact](https://federalist.18f.gov/contact/)
  the Federalist using email or their google form on their [Contact page](https://federalist.18f.gov/contact/).
* Go to the [Sites](https://federalistapp.18f.gov/sites) page in the federalist app
  and click on `+Add site`, and add your forked github repo.
* Click on the site, and click on `Site settings` in the navbar on the left.  Click on
  `Advanced settings`, and add `schedule: nightly` to the Live site Site configuration
  text field.
  This will ensure that the site will be redeployed every day, so that it pulls down the
  latest and greatest scan data.
* You can consult the [Federalist Launch Checklist](https://federalist.18f.gov/documentation/launch-checklist/)
  for information on how to set up a custom domain name, or you can just go to
  the [sites](https://federalistapp.18f.gov/sites) page and click on `View site`
  to get to your site.

Viola!  The site should deploy and keep itself up to date.

## Customization

All settings live in `_data/config.yml` and can be modified as you please. Current settings include 

* agency: Your agency name
* site_title: The name you would like to give your dashboard
* description: A description of your dashboard
* scans: A list of which scans to perform
* domainlist: the domains you'd like to scan
* google_analytics_ua: Your Google analystics token, if you want analytics on your dashboard.

### How to edit the list of domains to display

The `_data/config.yml` file has a list of domains called `domainlist`.  Change
that list to suit your needs. 

Once you have updated these, you will need to do a build/deploy to see the
changes.

## How to edit where the site-scanner site lives

Right now this is hardcoded to a temporary location.  You can configure
this by editing the `_data/config.yml` file and setting the `scanner_url`
to be the new location.  Make sure there is a `/` at the end of the URL.

Once you have updated these, you will need to do a build/deploy to see the
changes.


Have fun!
