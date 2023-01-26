
# Elevated

Simplistic yet modern e-commerce site designed with the user in mind.

## Authors

[Aristotle Jalalianfard](https://github.com/n0kam1)\
[Evan OShea](https://github.com/evanoshea21)\
[Kimberly Cheung](https://github.com/kimberlywycheung)\
[Ryan Gehris](https://github.com/RyanGehris)

## Built With

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Overview

#### Features

- Interactive image gallery with zoom-in features
- Details page describing product attributes and pricing
- Styles selector along with a user-friendly size guide

![fec-overview-readme](./client/dist/images/OLight.png)
![fec-overview-readme](./client/dist/images/Odark.png)

## Related Products & Your Outfit

#### Features

##### Product Cards:
* Each product card highlights the product’s default image, category, name, price (and sale price, when applicable), and star ratings.
* Each product card is clickable, and will update the product page when clicked.
* Each card and its corresponding action button (in the top right corner) have hover states so the user has immediate feedback on clickability.

##### Related Products Carousel:
* Shows a scrollable list of related products similar related products to the one the user is currently viewing
* Each card has a star icon that indicates whether the product has already been added to the user’s ”Your Outfit” section.
* The user can access a scrollable comparison modal from the product card that allows the user to compare the features of the related product to the currently viewed product. It highlights each product’s feature characteristics if applicable.

##### Your Outfits Carousel:
* Scrollable list of products the user has saved.
* Users can manage their outfit by adding or deleting products from their favorites via the Add to Outfit or delete buttons.
* The Add to Outfit card adds the currently viewed product to the “Your Outfit” list.
* Allows for persistence of list across different sessions, as long as the relevant cookies exist.
* Maintains a saved list of unique products only.

<img width="1176" alt="rlight" src="https://user-images.githubusercontent.com/37416800/214944738-a343ef15-e5cc-4f4e-99b0-72afd00b0486.png">
<img width="1178" alt="rdark" src="https://user-images.githubusercontent.com/37416800/214944746-354772f2-a170-4214-8e42-dc402b4b944a.png">


<details>
    <summary>See Comparison Details</summary>

<img width="1175" alt="rcomparison" src="https://user-images.githubusercontent.com/37416800/214944755-e31d33b3-6662-493d-8cac-7736b0f3cd57.png">


</details>

## Questions & Answers

#### Features

- Search functionality to filter questions by title
- Question and Answers lists with Load More functionality
- Question and Answer modals for adding to the list

![fec-qa-readme](./client/dist/images/QALight.png)
![fec-qa-readme](./client/dist/images/QAdark.png)

<details>
    <summary>See Q&A Forms</summary>

![fec-qa-forms-readme](./client/dist/images/QAmodal.png)

</details>

## Ratings & Reviews

#### Features

- Filter reviews by rating, or sort using the dropdown
- Visual represention of the breakdown of product ratings and characteristics
- A custom form for adding reviews

![fec-rr-readme](./client/dist/images/rrLight.png)
![fec-rr-readme](./client/dist/images/rrdark.png)

<details>
    <summary>See R&R Form</summary>

![fec-rr-form-readme](./client/dist/images/rrmodal.png)

</details>

## Getting Started

Installation

- Clone the repository
  ```
      git clone https://github.com/atelier-front-end/elevated.git
  ```
- Install the dependencies
  ```
      npm install
  ```
- Create a new .env file with the following within

  ```
      GITHUB_TOKEN='Insert API token'
  ```

- Run the following script
  ```
      npm run build
      npm run start
  ```
