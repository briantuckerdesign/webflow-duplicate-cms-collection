# webflow-duplicate-cms-collection

CLI tool to easily duplicate CMS collections. This does not duplicate items, only the collection/fields.

Also note, if you are duplicating from a site with a higher field limit (i.e. business plan) to a lower limit (i.e. CMS plan), it will fail if over the limit.

## Setup

### Install dependencies

You need Bun to run this project. You can install it [here](https://bun.sh/install).

```bash
bun install
```

### Add API keys

Run setup which will create a .env file.

```bash
bun setup
```

Paste your API keys in the .env file before running the program.

## Run

```bash
bun start
```
