create table users (
	id serial primary key,
	username varchar(14) not null,
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
	foreign key (follower_user_id) references users(id)
);

