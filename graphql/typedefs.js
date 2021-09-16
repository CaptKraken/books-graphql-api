import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  directive @isCurrentUser on FIELD_DEFINITION
  directive @authenticated on FIELD_DEFINITION
  directive @permission(role: String) on FIELD_DEFINITION

  type Query {
    # AUTHENTICATION
    login(email: String!, password: String!): User!

    # GET SINGLE
    me: User! @authenticated
    getUser(id: ID! = 1): User!
    getBook(bookid: ID! = 1): Book!
    getAuthor(authorid: ID! = 1): Author!

    # GET MULTIPLE
    getUsers(
      sortBy: String = "id"
      sortDirection: String = "asc"
      limit: Int = 50
      offset: Int = 0
    ): [User!]!
    getAuthors(
      sortBy: String = "author_id"
      sortDirection: String = "asc"
      limit: Int = 50
      offset: Int = 0
    ): [Author!]!
    getBooks(
      sortBy: String = "book_id"
      sortDirection: String = "asc"
      limit: Int = 50
      offset: Int = 0
    ): [Book!]!

    # SEARCH
    searchBooks(searchTerm: String): [Book!]!
  }

  type Mutation {
    # AUTHENTICATION
    signUp(input: SignUpInput!): User!

    # ADD
    addUser(input: UserInput!): User! @permission(role: "admin")
    addAuthor(name: String!): Author! @authenticated @permission(role: "editor")
    addBook(input: BookInput): Book! @permission(role: "editor")

    # EDIT
    editMe(input: UserInput!): User! @authenticated
    editUser(id: ID!, input: UserInput!): User! @permission(role: "admin")
    editAuthor(authorid: ID!, authorname: String!): Author!
      @permission(role: "editor")
    editBook(bookid: ID!, input: BookInput): Book! @permission(role: "editor")

    # DELETE
    deleteUser(userid: ID!): DeleteResponse! @permission(role: "admin")
    deleteAuthor(authorid: ID!): DeleteResponse! @permission(role: "editor")
    deleteBook(bookid: ID!): DeleteResponse! @permission(role: "editor")
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input UserInput {
    name: String
    email: String
    password: String
    role: String
    profile_image: String
  }

  input BookInput {
    title: String!
    published: Int
    page_count: Int
    authors: [ID!]
    description: String
    image_url: String
  }

  type DeleteResponse {
    deleted: Boolean!
    deletedUser: [User]
    deletedBook: [Book]
    deletedAuthor: [Author]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    profile_image: String
  }

  type Book {
    id: ID!
    title: String!
    published: Int
    page_count: Int
    authors: [Author]
    description: String
    image_url: String
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]!
  }
`;
