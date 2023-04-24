const { readFileSync, writeFileSync } = require("fs");
const dateID = require("date.id")
const { v4: UUID } = require('uuid')

const { capitalize } = require('./other')

class Poem {

  // Créer un nouveau poème (id_auteur, text)
  static createPoem(author_id, text) {
    return {
      id: dateID(),
      author: author_id,
      text: capitalize(text),
      created_at : new Date()
    }
  }

  // Retourne la liste des poèmes
  static getPoems() {
    return JSON.parse(readFileSync("./ressources/poems.json")).poems;
  }

  static getPoemsByAuthor(id = 0) {
    return this.getPoems().filter( (poem) => {
      return poem.author == id
    })
  }

  // Retourne un poème
  static getPoem(id = 0) {
    let poems = this.getPoems();
    let data = undefined;

    poems.forEach((poem) => {
      if (poem.id == id) data = poem;
    });

    return data;
  }

  // Ajoute le poème au document JSON
  static addPoem(poem) {
    let authors = this.getAuthors()
    let poems = this.getPoems()

    poems.push(poem)

    writeFileSync('./ressources/poems.json', JSON.stringify({authors : authors, poems : poems}))
  }





  // Créer un auteur
  static createAuthor(firstname, lastname, birthday = "", age = 0, adr_number = "", adr_street = "", adr_city = "", adr_cde = "", adr_country = "", phone = "") {
    return {
      id: UUID(),
      name: {
        first : capitalize(firstname),
        last: capitalize(lastname)
      },
      birthday: birthday,
      age: age,
      address: {
        number: adr_number,
        street: adr_street,
        city: adr_city,
        postal_code: adr_cde,
        country: adr_country.toUpperCase()
      },
      phone: phone
    }
  }

  // Retourne la liste des auteurs
  static getAuthors() {
    return JSON.parse(readFileSync("./ressources/poems.json")).authors;
  }

  // Retourne un auteur
  static getAuthor(id = 0) {
    let authors = this.getAuthors();
    let data = undefined;

    authors.forEach((author) => {
      if (author.id == id) data = author;
    });

    return data;
  }

  static addAuthor(author) {
    let authors = this.getAuthors()
    let poems = this.getPoems()

    authors.push(author)

    writeFileSync('./ressources/poems.json', JSON.stringify({authors : authors, poems : poems}))
  }
}

module.exports = Poem;
