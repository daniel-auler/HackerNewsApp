// import { useQuery } from '@tanstack/react-query';
// import { render, screen } from '@testing-library/react-native';

// import Home from './index';

// jest.mock('@tanstack/react-query');

// describe('Home', () => {
//   it('renders articles', async () => {
//     const articles = [
//       { id: 1, title: 'Article 1' },
//       { id: 2, title: 'Article 2' },
//       { id: 3, title: 'Article 3' },
//     ];

//     (useQuery as jest.Mock).mockReturnValue({
//       data: articles,
//       isLoading: false,
//       refetch: jest.fn(),
//     });

//     render(<Home />);

//     articles.forEach((article) => {
//       expect(screen.getByText(article.title)).toBeTruthy();
//     });
//   });
// });
