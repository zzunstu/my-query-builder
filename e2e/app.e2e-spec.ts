import { QueryBuilderDemoPage } from './app.po';

describe('query-builder-demo App', () => {
  let page: QueryBuilderDemoPage;

  beforeEach(() => {
    page = new QueryBuilderDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
