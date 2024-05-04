import { beforeEach, expect, test } from 'vitest';
import Manager from '../../../client/components/Manager';
import renderMaster from '../renderMaster';
// import { userEvent } from '@testing-library';
import userEvent from '@testing-library/user-event';

let managerPage;

beforeAll(() => {
  global.fetch = vi.fn().mockImplementation(() => {
    return Promise.resolve({json: () => {return}})
  });
});

beforeEach(async () => {
  managerPage = await renderMaster(Manager, {user: {user: {firstName: 'John', lastName: 'Doe'} } });
  console.log(managerPage.debug());
});

afterAll(() => {
  vi.restoreAllMocks();
}); 

test('Manager page should render', async () => {
  expect(managerPage.getByText('Plan your first trip, what are you waiting for?!')).toBeInTheDocument();
  
});