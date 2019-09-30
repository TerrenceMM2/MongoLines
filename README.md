# coursework14-news-scrape
Vanderbilt Coding Boot Camp - Coursework 14 - News Scrape (MongoDB/Mongoose/Cheerio)  
Live Link: https://mongolines.herokuapp.com

- - -

## Purpose  
MongoLines pulls the latest headlines and allows user to quickly view and add/view comments. For this app, https://newyorker.com is being scraped. The purpose of this app is to demonstrate the use of NPM Cheerio for web scraping, MVC app structuring, and utilizing MongoDB/Mongoose to store and relate data ("collections").

- - - 

## Instructions  

1. Navigate to [MongoLines](https://mongolines.herokuapp.com).  
2. To pull the latest headlines from the New Yorker
   - A modal box will pop up stating how many articles were scraped.
3. To view the recently pulled articles, click the "View" button.
4. For each article, three actions are available:
   1. Read - Navigates to the full New Yorker article in a new tab.
   2. Delete - Deletes the article from the database.
   3. Comments - A modal box will show previous comments on the article and/or make a new comment.

- - - 

## Screenshot
![MongoLines Screenshot](../media/mongolines-screenshot.png?raw=true)

- - -

### Contribute  

To get started ...

**Step 1**

- **Option 1** - 🍴 Fork this repo!

- **Option 2** - 👯 Clone this repo to your local machine using `https://github.com/TerrenceMM2/coursework14-news-scrape.git`

**Step 2** - **HACK AWAY!** 🔨🔨🔨

**Step 3** - 🔃 Create a new pull request using [https://github.com/TerrenceMM2/coursework14-news-scrape/compare](https://github.com/TerrenceMM2/coursework14-news-scrape/compare)

- - -

### Built With
1. [node](https://nodejs.org/en/)
2. [express](https://www.npmjs.com/package/express)
3. [MongoDB](https://www.mongodb.com/)
4. [handlebars](https://www.npmjs.com/package/express-handlebars)
5. [mongoose](https://mongoosejs.com/)
6. [moment](https://momentjs.com/)
7. [axios](https://www.npmjs.com/package/axios)
8. [cheerio](https://www.npmjs.com/package/cheerio)
9. [Bootstrap](https://getbootstrap.com/)
10. [jQuery](https://jquery.com/)
11. [Font Awesome](https://fontawesome.com/)
12. [Google Fonts](https://fonts.google.com/)

- - -

### Author
* **Terrence Mahnken** - [LinkedIn](https://www.linkedin.com/in/terrencemahnken/) | [Twitter](https://twitter.com/TerrenceMahnken) | [Personal Portfolio](https://terrencemm2.github.io/)

- - -

#### Helpful Sources
MVC structuring for a Node/Express app:  
https://dev.to/bananabrann/express-routing-for-noobs-pretend-youre-a-computer-walkthrough-1ma4  
  
Using Mongoose to find all collections from a given array of IDs:  
https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array  
  
Convert Mongoose BSON to JSON objects:  
https://stackoverflow.com/questions/9952649/convert-mongoose-docs-to-json  
