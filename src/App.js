import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import { getAll, get, search, update } from './BooksAPI';
import { SHELVE_TITLE } from './helper';

class BooksApp extends React.Component {
  state = {
    item: '',
    searchBooks: [],
    books: [],
  };

  async componentDidMount() {
    const books = await getAll();
    const n = books.map((book) => {
      const {
        id,
        title,
        authors: author,
        imageLinks: { thumbnail: backgroundImage },
        shelf: selectedShelve,
      } = book;

      return { id, title, author, backgroundImage, selectedShelve };
    });
    this.setState({ books: n });
  }

  onSearchChange(ev) {
    // ev.preventDefault();
    const value = ev.target.value;
    const { books, ...rest } = this.state;
    this.setState({ item: value });

    search('' + value)
      .then((data) => {
        if (data) {
          const n = data
            .filter((book) => book.imageLinks)
            .map((book) => {
              const newBook = books.find((b) => b.id === book.id);
              if (newBook) {
                return newBook;
              }
              const {
                id,
                title,
                authors: author,
                imageLinks: { thumbnail: backgroundImage },
              } = book;

              return {
                id,
                title,
                author,
                backgroundImage,
                selectedShelve: SHELVE_TITLE.NONE,
              };
            });
          this.setState({ ...rest, searchBooks: n, item: value });
        } else {
          this.setState({ ...rest, searchBooks: [], item: value });
        }
      })
      .catch((err) => {
        this.setState({ ...rest, searchBooks: [], item: value });
      });
  }

  onSelectChange(ev, bookId) {
    ev.preventDefault();

    const value = ev.target.value;
    const { books, searchBooks, ...rest } = this.state;

    const book = books.find((book) => book.id === bookId);

    if (book) {
      update(book, value)
        .then((data) => console.log('update: ', data))
        .catch((err) => console.log(err.message));

      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          book.selectedShelve = value;
        }
        return book;
      });

      const n = updatedBooks.find((b) => b.id === bookId);

      this.setState({
        ...rest,
        books: updatedBooks,
        searchBooks: [
          ...searchBooks.map((book) => {
            if (book.id === bookId) {
              return n;
            }

            return book;
          }),
        ],
      });
    } else {
      get(bookId)
        .then((book) => {
          update(book, value)
            .then((data) => console.log('update: ', data))
            .catch((err) => console.log(err.message));
          const {
            id,
            title,
            authors: author,
            imageLinks: { thumbnail: backgroundImage },
          } = book;

          const newBook = {
            id,
            title,
            author,
            backgroundImage,
            selectedShelve: value,
          };

          books.push(newBook);

          this.setState({
            ...rest,
            books,
            searchBooks: [
              ...searchBooks.map((book) => {
                if (book.id === bookId) {
                  return newBook;
                }
                return book;
              }),
            ],
          });
        })
        .catch((err) => console.log(err.message));
    }
  }

  render() {
    const { books, searchBooks } = this.state;
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/">
            <Home
              onSelectChange={this.onSelectChange.bind(this)}
              books={books}
            />
          </Route>
          <Route path="/search">
            <Search
              onSearchChange={this.onSearchChange.bind(this)}
              onSelectChange={this.onSelectChange.bind(this)}
              searchBooks={searchBooks}
            />
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
