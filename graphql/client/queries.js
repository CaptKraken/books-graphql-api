const { gql } = require("@apollo/client");

/**
 * @variable bookid: String
 * @return book: book object
 */
export const getBook = gql`
  query ExampleQuery($bookid: ID!) {
    book: getBook(bookid: $bookid) {
      id
      title
      published
      page_count
      authors {
        id
        name
      }
      categories {
        id
        name_english
        name_khmer
      }
      description
      image_url
    }
  }
`;

/**
 * get related books
 * @variable categoryid: String
 * @variable limit: Int default: 50
 * @return book: [book object]
 */
export const GET_RELATED_BOOKS = gql`
  query ExampleQuery($categoryid: ID!, $limit: Int!) {
    books: getBooksByCategory(category_id: $categoryid, limit: $limit) {
      id
      title
      authors {
        id
        name
      }
      image_url
    }
  }
`;

/**
 * get one author by id
 * @variable authorid: String
 * @return author: author object
 */
export const GET_SINGLE_AUTHOR = gql`
  query Query($authorid: ID!) {
    author: getAuthor(authorid: $authorid) {
      id
      name
      book_count
      books {
        id
        title
        authors {
          id
          name
        }
        page_count
        published
        image_url
      }
    }
  }
`;
/**
 * get all authors
 * @return authors: author object {id, name, book_count}
 */
export const GET_ALL_AUTHORS = gql`
  query Query {
    authors: getAuthors {
      id
      name
      book_count
    }
  }
`;
/**
 * get all categories
 * @return categories: category object {id, name_english, name_khmer}
 */
export const GET_ALL_CATEGORIES = gql`
  query Query {
    categories: getCategories {
      id
      name_english
      name_khmer
      book_count
    }
  }
`;

/**
 * get one category by id
 * @variable categoryid: String
 * @return category: category object
 */
export const GET_SINGLE_CATEGORY = gql`
  query Query($categoryid: ID!) {
    category: getCategory(category_id: $categoryid) {
      id
      name_english
      name_khmer
      book_count
      books {
        id
        title
        published
        page_count
        image_url
        authors {
          id
          name
        }
      }
    }
  }
`;

/**
 * get one category by id
 * @variable searchterm: String
 * @return result: book object
 */
export const SEARCH_FOR_BOOKS = gql`
  query Query($searchterm: String, $limit: Int, $offset: Int) {
    result: searchBooks(
      searchTerm: $searchterm
      limit: $limit
      offset: $offset
    ) {
      id
      title
      image_url
      authors {
        id
        name
      }
    }
  }
`;
