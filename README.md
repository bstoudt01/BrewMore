# BrewMore - Innovating Craft Beer Tools for Everyone
 <p>  | <p>
------------ | -------------
![Image of Cheers](https://github.com/bstoudt01/BrewMore/blob/demo/src/images/BeerThumbnail100.png?raw=true) | <h3> Created By Brett Stoudt  <br/> <h4>Front End Developemnt Capstone - Cohort 41, Nashville Software School</h4> </h3>

## About BrewMore
Designed as a safe place for breweries to easily store and view receipes for each of the brands of beer they brew.
Breweries can view all brands, or through a filtered view based on pre defined production statuses.

### Heres Why
-  Digitize paper records to create instant access for mulitple viewers
-  Easier to look at compared to 1 sheet of paper for each brand
-  Filtering Brands based on Production Status allows a focused view of brand options

### Built With
- [GitHub](http://github.com)</br>
- [Create-React-App](https://create-react-app.dev/)</br>
- [React Bootstrap](https://react-bootstrap.netlify.app/)</br>

## Getting Started

### Setup
1. Clone and enter the project directory
2. SampleJSON database information available below
3. npm required JSON.package dependancies
4. ```npm start```
5. ```json-server -p 8088 -w database.json```

### User Experience
1. Click Register New User 
- Enter Email, Username, Password, and Agree to Terms
    - Authentication is not secure, we are just holding user info in session storage
2. Login using email and password used during registration
3. Create a new brand
- Name is <b>Required</b>
- Declare Batch Size
- Pick One Style from list of official beer styles declared by The GABF guidelines
- Declare Yeast Strain Name or Number 
- Add grains and weights by clicking the ```Add Ingredients``` button in the form
    - select from available grains and enter weight
- Declare Hops used (as much detail as you want)
- Declare expected IBU's "International Bittering Units"
- Declare Estimated ABV "Alcohol By Volume"
- Create Tasting notes, great place to store descriptions for labels and menus
- Pick One Production Status based on current production rotation 
4. View brands on the brands list via the navigation bar
    - View a filitered brands list by selecting one of the status options on the brands view dropdown list
5. Delete brands via the delete button on each brand card
6. Edit brands via the edit button on each brand card
    - Remove previous ingredients by clicking the "x" next to the ingredients in the row
    - Create new ingredients or update other input fields
    - Click save to make changes
7. Logout via the navigation bar or the homepage.

## Sample JSON database
To start you off, here's an example of what the resources in your API should look like once it's populated with some data from your application.

### users

```json
{ "id": 1, "email": "me@me.com", "username": "Steve", "password": "x" }
```
### brands

```json
{
      "id": 1,
      "userId": 1,
      "name": "America’s Pale Ale",
      "yeast": "American Ale",
      "hop": "2lb simcoe in at flame out, 4lb mosaic for dryhop",
      "ibu": "25",
      "abv": "6.5",
      "tastingNote": "lots grapefruit in the nose, with additional orange flavor. body is to thin try higher mash temp",
      "batchSize": "4",
      "styleId": 1,
      "statusId": 2
    }
```
### grains

```json
    {
      "id": 1,
      "name": "Standard 2-Row",
      "maltster": "Rahr",
      "origin": "North America",
      "type": "base",
      "InventoryWeight": 0
    },
    {
      "id": 2,
      "name": "Kilned Caramel 30L",
      "maltster": "Rahr",
      "origin": "North America",
      "type": "specialty",
      "InventoryWeight": 0
    }
```
### ingredients

```json
"Ingredients":
    {
      "brandId": 1,
      "grainId": 1,
      "weight": 300,
      "id": 1
    },
    {
      "brandId": 1,
      "grainId": 2,
      "weight": 30,
      "id": 2
    }
```

### styles

```json
"styles":
{
      "id": 1,
      "style": "American Pale Ale",
    {
      "id": 2,
      "style": "American India Pale Ale"
    },
    {
      "id": 3,
      "style": "English Stout"
    },
    {
      "id": 4,
      "style": "English Porter"
    },
    {
      "id": 5,
      "style": "American Lager"
    }
    }
```
### statuses - used to filter view... use these exactly

```json
"statuses":
    {
      "id": 1,
      "status": "Staple"
    },
    {
      "id": 2,
      "status": "Seasonal"
    },
    {
      "id": 3,
      "status": "Experimental"
    },
    {
      "id": 4,
      "status": "Dead"
    }
```

## Contact
Brett Stoudt - BStoudt01@Gmail.com</br>
Project Link: [BrewMore](https://github.com/bstoudt01/BrewMore)

## Sources
- [Brewers Supply Group](www.BSGcraft.com)
- [Country Malt Group](www.CountryMaltGroup.com)
- [Great American Beer Festival](https://www.greatamericanbeerfestival.com/brewers/beer-styles/)
- [Grids, Rows, And Columns](https://medium.com/@julianajlk/grids-rows-and-columns-in-react-bootstrap-c36a703c3c45)
## Acknowledgements
Big Thanks to my instructor Brenda and TA's Rose, Sage, Maddie, and Audry 
...I feel that learning increases in group projects with the added benifit of bouncing around ideas and talk through logic. Cohort 41 has been an amazing group of people that I am luck to call Classmates, Cheers to Cohort 41!
