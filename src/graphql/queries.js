import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
query GetAllBooks($limit: Int!, $skip: Int!, $height: String, $width: String) {
  all_books(limit: $limit, skip: $skip) {
    total
    items {
      author
      description
      number_of_pages
      url
      buying_link {
        href
        title
      }
      title
      cover_imageConnection {
        edges {
          node {
            url(transform: {height: $height, width: $width, quality: 90})
            content_type
          }
        }
      }
    }
  }
}`;