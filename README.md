## The Challenge
One of our stakeholders would like to create a new webpage on our site. The business goal is to have keyword hub pages on our website that are associated with commonly searched keywords from organic traffic.
The stakeholder would like to create these pages so that users can easily find our great articles via organic search and once on the hub page, convert into our email marketing campaigns to receive more Foolish articles.

The first keyword they want to try creating a page for is "Stock Market News".
They have provided a basic HTML page with the copy they would like displayed (/templates/news_hub.html) along with the business requirements below.

Your technical team lead has provided the technical requirements below.
Your team and the stakeholder is expecting you to use your skills and creativity to implement the pieces of this page in a way that you think will best achieve the story goals and details.



### Business Requirements
* The page should clearly display information the user might be seeking when searching the term in a search engine.
* A clear design to highlight information so users know the topic of the articles on the page along with any other relevant information on the topic
* Displays the top 5 most recent articles on the topic (http://127.0.0.1:8000/api/articles)
* Users should be able filter articles by article bureau or by article instruments
  - If you would like to display any instrument data you can access API data at (http://127.0.0.1:8000/api/instruments)
* Display "join stock advisor" call to action (/templates/join_sa_cta.html) so users are encouraged to sign up for our flagship service, Stock Advisor



### Technical Requirements
* Needs to perform quickly on desktop and mobile.
* Feel free to use any front-end frameworks or tools you would like to enhance the experience to design. (Bootstrap, tailwind, vue, etc)
* Responsive for desktop (including large monitors) and mobile
* Ideally works in IE11, as well as the latest Safari, Edge, Firefox, and Chrome
* Code considers non-happy-paths


### Bonus Requirements
* Include any relevant meta tags, schema, or information for Search Engine Optimization of the page
