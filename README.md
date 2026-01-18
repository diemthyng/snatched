# WWW-design

## Setup

We are using the following three core technologies: **VSCode, Git, and Vercel**. You are free to experiment with other services or tools, but for the sake of consistency and easier troubleshooting with your peers, we recommend sticking with this shared environment.

This page references official guides and installation resources. If you encounter problems, always consult the official documentation first and carefully follow the provided instructions.

### VSCode

Visual Studio Code is our primary code editor. The following guide explains how to install and set up VSCode on Windows, macOS, and Linux:
[VSCode Setup Guide](https://code.visualstudio.com/docs/setup/setup-overview)

We will also use the **Live Server** extension, which allows us to run HTML files locally in the browser with automatic reload on changes. Install it here:
[Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

After installing, you can access it from the bottom status bar in VSCode.

### Git

Git is required for version control and for interacting with GitHub. Install it using the instructions provided in the official guide:
[How to Install Git](https://github.com/git-guides/install-git)

#### GitHub

Our course repository is hosted on GitHub. To work independently, you will need your own copy of the repository. This is done by **forking** the main repository:

1. Open the course repository link: [www-design](https://github.com/maaaaaaaaaaaaaaaax/www-design)
2. Click the **Fork** button in the top right corner – this creates a copy of the repository under your account.
3. Clone your forked repository locally using Git: [https://docs.github.com/de/repositories/creating-and-managing-repositories/cloning-a-repository](https://docs.github.com/de/repositories/creating-and-managing-repositories/cloning-a-repository)

### Vercel

[--]

## Running

1. Open your local cloned version of the course repository in VSCode.
2. Open the integrated terminal and navigate into the `src` directory. Run:

   `
   ./generate-file-array.sh
   `
3. Navigate to the `index.html` file in the file explorer.
4. Click the **Go Live** button in the VSCode bottom bar.

Your browser should now open and display the running app.

## Developing

Most of the rendering logic is located in `modules/render`. Only make changes here if you are confident in what you are doing.

Development workflow:

* Add new assets and content into their dedicated folders: `/assets`, `/content`.
* Always run `./generate-file-array.sh` after updating content to refresh the file index.
* Write your own custom CSS classes and animations 
* Manually integrate HTML or JavaScript into your app

## Deploying

[--]

## In case of updates
In case the original repository needs to be updated, you need to sync your forked version with the original. Run the following in your console:

1. Add the original repository to your version: `git remote add upstream https://github.com/your-username/y2k-swag-webdesign-course.git`
2. Collect all recent updates: `git fetch upstream`
3. Integrate the updates into your main branch: `git merge upstream/main`

Find more information here: [https://docs.github.com/de/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork](https://docs.github.com/de/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)

## Further Resources

If you encounter problems, consider the following resources:

* **VSCode Documentation**: [VSCode Docs](https://code.visualstudio.com/docs)
* **Git Documentation**: [Git Docs](https://git-scm.com/doc)
* **GitHub Docs**: [GitHub Documentation](https://docs.github.com/)
* **Vercel Documentation**: [Vercel Docs](https://vercel.com/docs)
* **General Troubleshooting**:

  * [MDN Web Docs](https://developer.mozilla.org/) – Reference for HTML, CSS, and JavaScript.
