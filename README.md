<h2 align="center"> 
   <img alt="logo" width="98%" src="public/images/logo.svg" />
</h1>

<p align="center">
  <a href="https://www.linkedin.com/in/frank-laercio/">
    <img alt="Made by franklaercio" src="https://img.shields.io/badge/Linkedin-Made%20by%20franklaercio-blue">
  </a>
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/franklaercio/spacetraveling?color=%2304D361">
  
  <a href="https://github.com/franklaercio/ig-news/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/franklaercio/spacetraveling">
  </a>
  
  <img alt="Code size" src="https://img.shields.io/github/languages/code-size/franklaercio/spacetraveling">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/franklaercio/spacetraveling/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/franklaercio/spacetraveling?style=social">
  </a>
</p>

## :bookmark_tabs: Resume of application

This application is a blog, in it you can publish your posts in a CMS tool and it will be quickly available to users. On the home page, there is a listing of posts, title, publication date and the author's name. In posts it is possible to find a pattern of first appearing the banner, then the title, publication date, author's name and estimated reading time. In addition, this project was developed during the Ignite of [Rocketseat](https://rocketseat.com.br/).

<p align="center">
  <img alt="Home" width="96.5%" src="screenshots/screenshot-localhost_3000-2021.06.07-23_17_40.png" />
  <img alt="Modal" width="48%" src="screenshots/screenshot-localhost_3000-2021.06.07-23_18_10.png" />
  <img alt="Modal" width="48%" src="screenshots/project.gif" />
</p>

## 🎲 Running the project

```bash
# Clone this repository
$ git clone https://github.com/franklaercio/spacetraveling

# Access the project folder in the terminal/cmd
$ cd spacetraveling

# Create a new env local and adding your prismic url
$ cp .env.example .env.local

# Run the application
$ yarn dev
```

## :books: Prismic Configuration

1. Create a new account if you don't have it.
2. Create a new repository in Prismic.
3. Create a new custom type in this model:
- API ID: type UID.
- TITLE: type Key Text.
- SUBTITLE: type Key Text.
- AUTHOR: type Key Text.
- BANNER: type Image.
- CONTENT: type Group.
   - In group adding the follow items bellow:
   - HEADING: type Key Text.
   - BODY: type Rich Text.
4. Publish news posts using your custom type.

## :man_technologist: Authors

* **Frank Laércio** - [franklaercio](https://github.com/franklaercio)

See also the list of [contributors](https://github.com/franklaercio/restaurant-react/contributors) who participated in this project.

## :clipboard: License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## :newspaper: Acknowledgments

- Next.js
- Prismic
- Sass
- Typescript

Feito com :hearts: by Frank Laércio :wave:!
