# Lost & Found API

A Node.js + Express + MongoDB API for managing lost and found items. This project allows users to report lost items, claim found items, and filter lost items by location.

## 🚀 Features

- Report lost items
- Claim found items
- Retrieve nearby lost items

## 🛠️ Setup Instructions

### 1️- Clone the Repository

Clone this repository to your local machine:
```bash
git clone https://github.com/<your-github-username>/lost-found-api
cd lost-found-api
```



### 2️- Install Dependencies

Make sure you have **Node.js** installed, then install the required dependencies:
```
npm install
```

### 3- Configure .env file
Kindly change the PORT , MONGO_URL and JWT_SECRET in the .env file according to your needs

### 4- Set Up MongoDB

You can either:

Use MongoDB Atlas (cloud-based solution) to create a MongoDB cluster and obtain the connection string.

Or, set up MongoDB locally on your machine.

Once you have the MongoDB URI, add it to the .env file in the MONGO_URI variable.

### 5-Start the server

Use nodemon index or node index to start the backend server.

## Contribute to the Project

- Take a look at the existing [Issues]<!--(https://github.com/Simandhar14/lost-found-api)--> or [create a new issue]<!--(https://github.com/Simandhar14/lost-found-api/issues/new/choose)-->!
- [Fork the Repo]<!--(https://github.com/Simandhar14/lost-found-api/fork)-->, create a branch for any issue that you are working on and commit your work.
- Create a **[Pull Request]<!--(https://github.com/Simandhar14/lost-found-api/compare)-->** (_PR_), which will be promptly reviewed and given suggestions for improvements by the community.
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes that are included in your commits.
## How to Contribute ?

**1.** Start by making a fork of the [**lost-found-api**]<!--(https://github.com/Simandhar14/lost-found-api)--> repository. Click on the fork  symbol at the top right corner.

**2.** Clone your new fork of the repository:

```bash
git clone https://github.com/<your-github-username>/lost-found-api
```

**3.** Set upstream command:

```bash
git remote add upstream https://github.com/Simandhar14/lost-found-api.git
```

**4.** Navigate to the new project directory:

```bash
cd lost-found-api
```

**5.** Create a new branch:

```bash
git checkout -b YourBranchName
```

**6.** Sync your fork or local repository with the origin repository:

- In your forked repository click on "Fetch upstream"
- Click "Fetch and merge".

### Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream
```

```bash
git merge upstream/main
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

**7.** Make your changes to the source code.

**8.** Stage your changes and commit:

```bash
git add .
```

```bash
git commit -m "<your_commit_message>"
```

**9.** Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

**10.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

**11.** **Congratulations!** You've made your first contribution! 🙌🏼
