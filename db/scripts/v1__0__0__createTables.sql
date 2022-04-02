create table users (
	id serial primary key,
	username varchar(14) unique not null,
	created_at timestamp default now() not null
);

create table posts(
	id serial primary key,
	user_id int not null,
	message varchar(777) not null,
	created_at timestamp default now() not null,
	foreign key (user_id) references users(id)
);

create table reposts(
	id serial primary key,
	user_id int not null,
	post_id int not null,
	created_at timestamp default now() not null,
	foreign key (user_id) references users(id),
	foreign key (post_id) references posts(id)
);

create table quotes(
	id serial primary key,
	user_id int not null,
	post_id int not null,
	message varchar(777) not null,
	created_at timestamp default now() not null,
	foreign key (user_id) references users(id),
	foreign key (post_id) references posts(id)
);

create table user_followers(
	id serial primary key,
	following_user_id int not null,
	follower_user_id int not null,
	created_at timestamp default now() not null,
	foreign key (following_user_id) references users(id),
	foreign key (follower_user_id) references users(id),
	unique(following_user_id, follower_user_id)
);

create view all_posts as 
select 'post' as type, id, user_id, null as origin_post_id, message, null as origin_message, created_at from posts p 
union all
select 'repost' as type, id, user_id, post_id as origin_post_id, null as message, (select message from posts p2 where p2.id = r.post_id) origin_message, created_at from reposts r
union all
select 'quote' as type, id, user_id, post_id as origin_post_id, message, (select message from posts where id = q.post_id) as origin_message, created_at from quotes q


