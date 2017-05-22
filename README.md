# myinstacockpit
Small and useful tool for Instagram.

Features:
  - get photos of provided user
  - get posts with comments (including own replies) with possibility to sort them by post date/comment date/comments count/likes count
  - get tags/locations/commentators/likers of selected photos with possibility to sort by name or by photos count of selected option
  - download big photos of loaded posts
  - restrict selected data (posts/comments/etc.) by providing dates

Since Instagram API are closed this approach is used: https://habrahabr.ru/post/302150/.
Based on it there are some restrictions:
  - there is possibility to get only last 4 comments of a post
  - there is possibility to get only 4 likes of a post
  - tool doesn't work with private accounts

Enjoy! :-)
