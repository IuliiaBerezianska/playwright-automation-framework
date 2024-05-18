import { test } from '@playwright/test';
import logger from '../utils/LoggerUtil';

test('API Monitoring test', async ({ page }) => {
    page.on('request', (request) => {
        logger.info(`Requested url is ${request.url()}`);
        logger.info(`Requested method is ${request.method()}`);
        logger.info(`Requested headers are:\n ${JSON.stringify(request.headers(), null, 2)}`);
    });
    page.on('response', (response) => {
        logger.info(`Response status is: ${response.status()}`);
    });

    await page.goto('/');

});

test('API Intercepting test', async ({ page }) => {
    // Enable request interception
    await page.route("**/*", async (route) => {
        // Get the original headers
        const headers = route.request().headers();
        // Add a custom header
        headers["X-Custom-Header"] = 'interception check';
        console.log(headers);
        // Continue the intercepted request with modified headers
        route.continue({ headers });
    });

    page.on('request', (request) => {
        logger.info(`Modified request headers is: ${JSON.stringify(request.headers()), null, 2}`)
    })

    await page.goto('/');
    await page.waitForLoadState('networkidle');
});

test('API Mocking test', async ({ page }) => {
    page.route('https://demo.playwright.dev/api-mocking/api/v1/fruits', async (route) => {
        const json = [
            { name: "Mandarin", id: 3 },
            { name: "Tangerine", id: 1 },
            { name: "Clementines", id: 5 },
        ];
        await route.fulfill({ json });
    });
    await page.goto("https://demo.playwright.dev/api-mocking/");
    await page.waitForLoadState('networkidle');
});