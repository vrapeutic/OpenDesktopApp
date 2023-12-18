# Vraputic Pull Request & Troubleshooting

1. Create a New Branch:
   - Create a new branch for your changes using the `git checkout -b branch-name` command. Replace "branch-name" with a descriptive name for your branch.
2. Make and Commit Your Changes:
   - Make the necessary changes to the codebase using your preferred text editor or IDE.
   - Use the `git status` command to check the modified files.
   - Add the changes to the staging area using the `git add` command followed by the file names or `git add .` to add all changes.
   - Run ESLint to check your changes by running `npm run lint`.
   - Make sure your code is build by running this command `npm run make`.
   - Commit the changes using the `git commit -m "descriptive-message"` command. Replace "descriptive-message" with a brief and meaningful description of your changes.
3. Push Your Changes:
   - Push your branch to the remote repository using the `git push origin branch-name` command.
4. Create the Pull Request:
   - Go to the original repository on GitHub.
   - Click on the "Pull requests" tab.
   - Click on the "New pull request" button.
   - Select your branch `branch-name` and the target branch (ex: dev).
   - Write a clear and descriptive title for your pull request.
   - Add any additional comments or details in the comment box.
   - Click on the "Create pull request" button to submit your pull request.
5. Discuss and Review:
   - Engage in any discussion or feedback requested by the repository maintainers.
   - Make further changes to your branch if necessary based on the feedback received.
   - Discuss and address any conflicts or issues that may arise during the review process.
6. Merge Your Pull Request:
   - Once your pull request has been reviewed and approved, the repository maintainers will merge your changes into the main branch.
   - Congratulations! You have successfully made a proper pull request on GitHub.

## Troubleshooting

1. Before you make a PR, you need to merge the latest version of the dev branch to your local branch and you may encounter this issue

   ![Screen Shot 2023-11-12 at 8.06.46 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e5618611-0847-4bc6-beaa-439cf2d5322e/88c371e7-cf89-4c52-a211-d0c07d979867/Screen_Shot_2023-11-12_at_8.06.46_PM.png)

   To solve this issue, you need to execute this command `git merge dev --allow-unrelated-histories`
