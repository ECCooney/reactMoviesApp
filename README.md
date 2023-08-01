# Full Stack Development 2 - Assignment.

**Name:** Ellen Cooney

## Features.

**Complete**

- Top Rated Movies List.
- Tv Shows List.
- Filter by Release Year
- Cast list added to Movie Details in card form
- Actor Details hyperlinked from cast card
- Pagination on Movies, Tv Shows, and Upcoming Movies
- Favourite TV shows - adding and deleting, and page to display
- Sign up and login functionality supported by Supabase
- Two site headers based on whether user is logged in
- Protected routes for logged in users

**Incomplete/Partially implemented**

- Filter by Certification
- Fantasy movie form

## Feature Design.

#### Tv Shows List.

> Lists movies from the Upcoming movies endpoint of TMDB.

![][image1]

#### Top Rated Movies.

> Lists all the reviews for a particular movie (shows text extract only).

![][image2]

#### Filter By Release Year.

> Click the 'Full Review' link of a review extract to see the review's full text.

![][image3]

#### Cast List on Movie Page.

> Cast cards for each cast member for the associated movie.

#### Actor Details page.

> Access the cast member details through a link in their cast card.

![][image3]

#### Pagination for Tv Show and Movie Lists.

> 100 pages of tv shows and movies available.

![][image3]

#### Favourite TV Show function and page.

> Ability to add a favourite tv show.

![][image3]

> A view of all favourite tv shows.

![][image3]

#### Sign up and login functionality.

> Page to register for the site

![][image3]

> Page to login with hyperlink to signup page for unregistered users

![][image3]

#### Different site header with protected routes for logged in user.

> Public site header

![][image3]

> Logged in user site header

![][image3]

## Storybook.

> Storybook Overview with new stories highlighted in red

![Storybook Overview][.\images\Storybook.PNG]

## Authentication.

> Authentication implemented using supabase to validate users, and store registered user information

#### Public routes

- / (homepage with list of movies from tmdb endpoint)
- /tvshows (homepage with list of tv shows from tmdb endpoint)
- /login (allows users to login)
- /signup (allows unregistered users to signup)

#### Protected routes

- /movies/:id (provides details for any movie)
- /movies/upcoming (lists upcoming movies)
- /movies/toprated (lists top rated movies)
- /reviews/:id (provides details and full text of a review)
- /reviews/form (allows users to submit a review)
- /fantasymovie (allows users to submit their fantasy movie) NB: function is broken
- /tvshows/:id (provides details for any tv show)
- /actor/:id (provides details for an actor from a movie cast)
- /movies/favourites (shows a logged in user's favourite movies)
- /tvShows/tvfavourites (shows a logged in user's favourite tv shows)

#### Supabase (if relevant)

[Include a screenshot(s) from your Supabase account that verifies its use for this app. ]

## Additional Information.

[ Briefly explain any other aspects of your app's design or implementation that is non-standard and worthy of mention.]

[image1]: ./images/image1.png
[image2]: ./images/image2.png
[image3]: ./images/image3.png
[image4]: ./images/image4.png
[image5]: ./images/image5.png
