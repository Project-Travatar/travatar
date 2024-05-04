import { beforeEach, expect, test } from 'vitest';
import Register from '../../../client/components/Register';
import renderMaster from '../renderMaster';
// import { userEvent } from '@testing-library';
import userEvent from '@testing-library/user-event';

let registerPage;

beforeAll(() => {
  global.fetch = vi.fn().mockImplementation(() => {
    return Promise.resolve({json: () => {return}})
  });
});

beforeEach(async () => {
  registerPage = await renderMaster(Register);
  console.log(registerPage.debug());
});

afterAll(() => {
  vi.restoreAllMocks();
}); 

test('Register page should render', async () => {
  expect(registerPage.getByText('First Name:')).toBeInTheDocument();
  expect(registerPage.getByText('Last Name:')).toBeInTheDocument();
  expect(registerPage.getByText('Email:')).toBeInTheDocument();
  expect(registerPage.getByText('Password:')).toBeInTheDocument();
});

test('Register page should have a submit button', async () => {
  const user = userEvent.setup();
  await userEvent.click(registerPage.getByTitle('submit button'));
  await userEvent.click(registerPage.getByTitle('submit button'));
  await userEvent.click(registerPage.getByTitle('submit button'));

  expect(registerPage.getByTitle('submit button')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(3);
});