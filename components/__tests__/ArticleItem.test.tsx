// import { render, screen } from '@testing-library/react-native';
// import { MMKV } from 'react-native-mmkv';

// import ArticleItem from '../ArticleItem';

// import { Article } from '~/types/article';
// import { formatDate } from '~/utils/utils';

// describe('ArticleItem', () => {
//   const item: Article = {
//     id: 1,
//     title: 'Test Article',
//     author: 'John Doe',
//     created_at: new Date('2022-01-01').toString(),
//     url: 'google.com',
//   };

//   const mmkv = new MMKV();

//   beforeEach(() => {
//     mmkv.clearAll();
//   });

//   it('renders article title and author', () => {
//     render(<ArticleItem item={item} />);
//     expect(screen.getByText(item.title)).toBeOnTheScreen();;
//     expect(screen.getByText(`${item.author} - ${formatDate(item.created_at)}`)).toBeOnTheScreen();;
//   });

//   it('renders favorite icon when isFavorite is true', () => {
//     jest.spyOn(mmkv, 'useMMKVBoolean').mockReturnValue(true);
//     render(<ArticleItem item={item} />);
//     expect(screen.getByTestId('favorite-icon')).toBeOnTheScreen();;
//   });

//   it('does not render favorite icon when isFavorite is false', () => {
//     jest.spyOn(window, 'useMMKVBoolean').mockReturnValue([false]);
//     render(<ArticleItem item={item} />);
//     expect(screen.queryByTestId('favorite-icon')).not.toBeOnTheScreen();;
//   });

//   it('navigates to article details when clicked', () => {
//     const pushMock = jest.fn();
//     const { container } = render(<ArticleItem item={item} />);
//     const link = container.querySelector('a');
//     link && userEvent.click(link, { button: 0 });
//     expect(pushMock).toHaveBeenCalledWith(`/(drawer)/home/article/${item.id}`);
//   });
// });
