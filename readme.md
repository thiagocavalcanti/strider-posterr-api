# Description
This project was developed for Strider using concepts of DDD by using a Hexagonal Architecure.
The main goal is to develop an API for an application called "Posterr", similar to Twitter
# Stack
* Node.js
* Express
* Postgresql
* TypeScript
# Phases
## Phase 1 - Coding
- [x] Build out a RESTful API 
- [ ] Create some automated tests
- [ ] Extra feature: **Search**
## Phase 2 - Planning
### Doubts
* The reply message would have the same limit as the post (777 characters)?
* What would happen if someone reply a reply? It should concatenate all the mentions(@) separated by space and ordered hierarchically?
	* If so, what happen if all the mentions concatenate together sums more than 777 characters? It wouldn't be possible to reply anymore?
* The mentioning won't be editable? If it is, if I remove, the reply will become an quote type of post?
* About the secondary feed "Posts and Replies"
	* We need to show only user's replies or replies of other users about his posts should appear as well?
	* Where in the user profile this would be? Do you have the layout updated on figma?
	* It'll use the same system of pagination using the button "show more"?
	* In this feed, it would be read-only?
* It'll be possible to reply your own post?
* Is there any type of deadline already agreed?
### Technical Planning
#### Back-end
1.	Create a new table called "replies" with same structure as "quotes", considering that it won't be possible to reply another reply. If it's, I would create two new tables ("postReplies" and "repliesReplies"), in which postReplies would be the same as "replies" and "repliesReplies" would be pretty much the same, except for the post_id that would be reply_id
2.	It would be necessary to create a new repository interface, repository implementation, entities, routes, middleware's routes for validations and the service
3.	Update all_posts view to include reply-to-post
4.	Create new automated tests (unit tests for the services and middleware and integration test for repository)
5.	Update postman documentation with new routes
#### Front-end
1. Create new atomic components on design system if they are new
2. Create a new component to be the "Posts and Replies"
3. Add api call to populate component
4. Implement pagination
5. Create unit test for the components
## Phase 3 - Self-critique & scaling
### Improvements
* Change pagination to use a SQL Seek Method or Keyset Pagination to improve perfomance ([example](https://vladmihalcea.com/sql-seek-keyset-pagination/))
* Add some migration tool to control and add versioning for database
* Add more unit tests
* Implement integration tests for repositories
### Scaling
* Evaluate queries to look for tunning, create index, etc
* Create some cache using, for example, Redis to improve performance
* Implement some charge test to test application's performance
