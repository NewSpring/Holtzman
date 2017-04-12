// Removed import
import { danger, fail, warn, markdown } from "danger";
import { any } from "ramda";
import fs from "fs";

// Takes a list of file paths, and converts it into clickable links
const linkableFiles = paths => {
  const repoURL = danger.github.pr.head.repo.html_url;
  const ref = danger.github.pr.head.ref;
  const links = paths.map(path => {
    return createLink(`${repoURL}/blob/${ref}/${path}`, path);
  });
  return toSentence(links);
};

// ["1", "2", "3"] to "1, 2 and 3"
const toSentence = (array: Array<string>): string => {
  if (array.length === 1) {
    return array[0];
  }
  return array.slice(0, array.length - 1).join(", ") + " and " + array.pop();
};

// ("/href/thing", "name") to "<a href="/href/thing">name</a>"
const createLink = (href: string, text: string): string =>
  `<a href='${href}'>${text}</a>`;

// Raise about missing code inside files
const raiseIssueAboutPaths = (
  type: Function,
  paths: string[],
  codeToInclude: string,
) => {
  if (paths.length > 0) {
    const files = linkableFiles(paths);
    const strict = "<code>" + codeToInclude + "</code>";
    type(`Please ensure that ${strict} is enabled on: ${files}`);
  }
};

// make sure someone else reviews these changes
const someoneAssigned = danger.github.pr.assignee;
if (someoneAssigned === null) {
  warn(
    "Please assign someone to merge this PR, and optionally include people who should review.",
  );
}

// Make sure there are changelog entries
const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md") ||
  danger.git.created_files.includes("CHANGELOG.md");
if (!hasChangelog) {
  fail("No Changelog changes!");
}

// only look in the /imports/ folder
const jsModifiedFiles = danger.git.created_files
  .filter(path => any(x => x.includes("imports/"), path))
  .filter(path => path.endsWith("js"));
const hasAppChanges = jsModifiedFiles.length > 0;

const jsTestChanges = jsModifiedFiles.filter(filepath =>
  filepath.includes("__tests__"));
const hasTestChanges = jsTestChanges.length > 0;

// Warn when there is a big PR
const bigPRThreshold = 500;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(":exclamation: Big PR");
}

// XXX add in License header
// https://github.com/facebook/jest/blob/master/dangerfile.js#L58

// Warn if there are library changes, but not tests
if (hasAppChanges && !hasTestChanges) {
  warn(
    "There are library changes, but not tests. That's OK as long as you're refactoring existing code",
  );
}

// new js files should have `@flow` at the top
const unFlowedFiles = jsModifiedFiles.filter(filepath => {
  // don't required flow for tests
  if (filepath.match(/__tests__\/$/gmi)) return true;
  const content = fs.readFileSync(filepath);
  return !content.includes("@flow");
});

raiseIssueAboutPaths(warn, unFlowedFiles, "@flow");

// Be careful of leaving testing shortcuts in the codebase
const onlyTestFiles = jsTestChanges.filter(x => {
  const content = fs.readFileSync(x).toString();
  return content.includes("it.only") || content.includes("describe.only");
});
raiseIssueAboutPaths(fail, onlyTestFiles, "an `only` was left in the test");

// Politely ask for their name on the entry too
if (hasChangelog) {
  const changelogDiff = danger.git.diffForFile("changelog.md");
  const contributorName = danger.github.pr.user.login;
  if (changelogDiff && changelogDiff.indexOf(contributorName) === -1) {
    warn(
      'Please add your GitHub name ("' +
        contributorName +
        '") to the changelog entry.',
    );
  }
}

// Warns if there are changes to package.json without changes to yarn.lock.
const packageChanged = any(
  x => x.includes("package.json"),
  danger.git.modified_files,
);
const lockfileChanged = any(
  x => x.includes("yarn.lock"),
  danger.git.modified_files,
);
if (packageChanged && !lockfileChanged) {
  const message = "Changes were made to package.json, but not to yarn.lock";
  const idea = "Perhaps you need to run `yarn install`?";
  warn(`${message} - <i>${idea}</i>`);
}

// show release QA checklist if it be a release
const checklist = `
### QA Checklist\n\n
- [ ] do a thing\n
- [ ] probably do another thing\n
`;
console.log("GITHUB META", danger.github.issue.labels, Object.keys(danger.github.issue.labels));
console.log("LABELS", danger.github.prLabels);
if (danger.github.prLabels && danger.github.prLabels.includes("Release")) {
  console.log("INSIDE");
  markdown(checklist);
}
