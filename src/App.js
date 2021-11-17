import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "./page/index.jsx"
import Error from "./page/error.jsx"
import "./css/main.css"
import {
  ApolloClient,
  HttpLink, ApolloLink, InMemoryCache, concat,
  ApolloProvider
} from "@apollo/client";
import Book from "./page/book.jsx"
import Header from "./components/header";
import Footer from "./components/footer";

const httpLink = new HttpLink({
  uri: `https://graphql.contentstack.com/stacks/${process.env.REACT_APP_APIKEY}?environment=${process.env.REACT_APP_ENVIRONMENT}`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      access_token: process.env.REACT_APP_DELIVERY_TOKEN,
    }
  }));
  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(renderProps) => <Home {...renderProps} />}
          />
          <Route
            path="/book/:bookUrl"
            render={(renderProps) => <Book {...renderProps} />}
          />
          <Route path="*" render={(renderProps) => <Error {...renderProps} />} />
        </Switch>
        <Footer />
      </div>
    </ApolloProvider>
  )
}

export default App
