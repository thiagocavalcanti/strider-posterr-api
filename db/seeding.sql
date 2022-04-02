-- Seeding users
INSERT INTO USERS(id, username) VALUES(
    1,'Thiago'
);
INSERT INTO USERS(id, username) VALUES(
    2,'Alberto'
);
INSERT INTO USERS(id, username) VALUES(
    3,'Arthur'
);
INSERT INTO USERS(id, username) VALUES(
    4,'my_h$ro'
);
INSERT INTO USERS(id, username) VALUES(
    5,'Eren'
);

-- Seeding posts
INSERT INTO POSTS(id, user_id, message) VALUES(
    1,
    1,
    'My first post ever!'
);
INSERT INTO POSTS(id, user_id, message) VALUES(
    2,
    2,
    'I love sushi'
);
INSERT INTO POSTS(id, user_id, message) VALUES(
    3,
    2,
    'I hate macarroni'
);
INSERT INTO POSTS(id, user_id, message) VALUES(
    4,
    2,
    'I love soccer'
);
INSERT INTO POSTS(id, user_id, message) VALUES(
    5,
    2,
    'I love recife'
);
INSERT INTO POSTS(id, user_id, message) VALUES(
    6,
    3,
    'Let''s go Sport'
);
INSERT INTO POSTS(id, user_id, message) VALUES(
    7,
    4,
    'I''m so crazyyy!!'
);

-- Seeding reposts
INSERT INTO REPOSTS(user_id, post_id) VALUES(
    1,
    2
);
INSERT INTO REPOSTS(user_id, post_id) VALUES(
    1,
    6
);
INSERT INTO REPOSTS(user_id, post_id) VALUES(
    5,
    1
);

-- Seeding quotes
INSERT INTO QUOTES(user_id, post_id, message) VALUES(
    1,
    3,
    'I agree with you!'
);
INSERT INTO QUOTES(user_id, post_id, message) VALUES(
    3,
    1,
    'LOL'
);

-- Seeding followers
INSERT INTO USER_FOLLOWERS(following_user_id, follower_user_id) VALUES(
    1,
    2
);
INSERT INTO USER_FOLLOWERS(following_user_id, follower_user_id) VALUES(
    1,
    3
);
INSERT INTO USER_FOLLOWERS(following_user_id, follower_user_id) VALUES(
    3,
    1
);