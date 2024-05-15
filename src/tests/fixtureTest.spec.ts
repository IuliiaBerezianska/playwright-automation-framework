import { test } from '../fixtures/logginFixture';

test('Fixture test', async ({homePage}) => {
    await homePage.expectServiceTitleToBeVisible();
})