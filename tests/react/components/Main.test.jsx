import Main from '../../../client/components/Main';
import renderMaster from '../renderMaster';

beforeAll(() => {
  global.fetch = vi.fn().mockImplementation(() => {
    return Promise.resolve({json: () => {return}})
  });
});

afterAll(() => {
  vi.restoreAllMocks();
}); 

test('Main page should render', async () => {
  const mainPage = renderMaster(Main);
  console.log(mainPage.debug())
  expect(mainPage.getByText('Register or login to get started...')).toBeInTheDocument();
});