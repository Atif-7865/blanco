# Contributing to blanco

Thank you for contributing to blanco! This document explains the recommended workflow for changes so contributions are reviewed and merged cleanly.

## Branching & workflow

- Always create a new branch for your work:
  ```bash
  git checkout -b feature/short-description
  ```
- Keep changes focused and small.
- Push your branch and open a Pull Request (PR) to merge into `main`.

## Commit messages

- Use short, descriptive messages. Format: `<type>: short summary`
- Example: `feat: add responsive header`
- Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`

## Creating a PR

- Push your branch:
  ```bash
  git push -u origin feature/short-description
  ```
- Open a PR on GitHub, describe the change, link issues, and add reviewers.

## Testing locally

- Serve the site locally to test changes:
  ```bash
  python3 -m http.server 8000
  # Open http://localhost:8000
  ```

## Code style

- This is a static site (HTML/CSS/JS). Please:
  - Keep CSS organized in `styles.css` and add comments for sections.
  - Use ES6+ syntax in `script.js` where appropriate.
  - Add small, focused changes and include notes in PRs.

## Pulling updates

- Before you start work:
  ```bash
  git fetch origin
  git checkout main
  git pull origin main
  git checkout -b feature/...
  ```

## Handling conflicts

- If you encounter conflicts when pulling, resolve them locally, then:
  ```bash
  git add <file>
  git commit
  git push
  ```

Thank you for helping improve this project!
