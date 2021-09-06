module.exports = async function(Book) {
  const allBooks = await Promise.all([
    Book.create({
      title: "The Hunger Games",
      author: "Suzanne Collins",
      genre: "Fantasy",
      year: 2008
    }),
    Book.create({
      title: "Catching Fire",
      author: "Suzanne Collins",
      genre: "Fantasy",
      year: 2009
    }),
    Book.create({
      title: "Mockingjay",
      author: "Suzanne Collins",
      genre: "Fantasy",
      year: 2010
    }),
    Book.create({
      title: "The Ballad of Songbirds and Snakes",
      author: "Suzanne Collins",
      genre: "Fantasy",
      year: 2020
    }),
    Book.create({
      title: "The Memory Police",
      author: "Yoko Ogawa",
      genre: "Science Fiction",
      year: 1994
    }),
    Book.create({
      title: "Nickel Boys",
      author: "Colson Whitehead",
      genre: "Historical Fiction",
      year: 2019
    }),
    Book.create({
      title: "The Book of Unknown Americans",
      author: "Cristina Henriquez",
      genre: "Fiction",
      year: 2014
    }),
    Book.create({
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      genre: "Non Fiction",
      year: 1988
    }),
    Book.create({
      title: "Armada",
      author: "Ernest Cline",
      genre: "Science Fiction",
      year: 2015
    }),
    Book.create({
      title: "Emma",
      author: "Jane Austen",
      genre: "Classic",
      year: 1815
    }),
    Book.create({
      title: "Frankenstein",
      author: "Mary Shelley",
      genre: "Horror",
      year: 1818
    }),
    Book.create({
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Classic",
      year: 1813
    }),
    Book.create({
      title: "Ready Player One",
      author: "Ernest Cline",
      genre: "Science Fiction",
      year: 2011
    }),
    Book.create({
      title: "The Martian",
      author: "Andy Weir",
      genre: "Science Fiction",
      year: 2014
    }),
    Book.create({
      title: "The Universe in a Nutshell",
      author: "Stephen Hawking",
      genre: "Non Fiction",
      year: 2001
    }),
  ]);
}