# Lighthouse Auditing

This project uses [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) to automate performance, accessibility, best practices, and SEO audits.

## How to Run Lighthouse Locally

To run Lighthouse against your local build, use the following command:

```
npm run lighthouse
```

## Understanding Pass/Fail Criteria

Lighthouse CI is configured to enforce certain quality thresholds. Your build will **pass** or **fail** based on the following criteria (see `lighthouserc.js` for details):

### Pass/Fail Rules

-   **Performance**:
    -   _Warning_ if the score is below **0.8** (80%).
-   **Accessibility**:
    -   _Error_ (build fails) if the score is below **0.9** (90%).
-   **Best Practices**:
    -   _Warning_ if the score is below **0.8** (80%).
-   **SEO**:
    -   _Warning_ if the score is below **0.8** (80%).

### What Causes a Build to Fail?

-   The build will **fail** if the **Accessibility** score is below 0.9.  
    (This is enforced as an "error" in the config.)
-   The build will **not fail** for low Performance, Best Practices, or SEO scores, but you will see warnings in the output.

### What Causes a Build to Pass?

-   The build will **pass** if the Accessibility score is **0.9 or higher**.
-   Warnings for other categories (Performance, Best Practices, SEO) will not block the build, but you should address them for optimal site quality.

### Where to Adjust Thresholds

You can change these thresholds in the [`lighthouserc.js`](../lighthouserc.js) file under the `assert.assertions` section.

**Tip:**  
If you want to enforce stricter or looser requirements, edit the `minScore` values or change `"warn"` to `"error"` as needed.
