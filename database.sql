CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(80) UNIQUE NOT NULL,
	password VARCHAR(1000) NOT NULL,
	first_name VARCHAR (255),
	last_name VARCHAR (255)
);


CREATE TABLE friends (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users NOT NULL,
	connected_user_id INTEGER REFERENCES users NOT NULL,
	connected BOOLEAN DEFAULT false NOT NUll
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	sending_user_id INTEGER NOT NULL,
	receiving_user_id INTEGER REFERENCES users NOT NULL,
	message VARCHAR(2048)
);

CREATE TABLE wagers (
	id SERIAL PRIMARY KEY,
	initiating_user_id INTEGER NOT NULL,
	accepting_user_id INTEGER REFERENCES users NOT NULL,
	stakes VARCHAR(2048) NOT NULL,
	payment_issued BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category_name VARCHAR(255)
);

CREATE TABLE games (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users NOT NULL,
	game_name VARCHAR(255) NOT NULL,
	game_image VARCHAR(255),
	category_id INTEGER REFERENCES categories DEFAULT 1 NOT NULL
);

CREATE TABLE instances (
	id SERIAL PRIMARY KEY,
	primary_user_id INTEGER REFERENCES users NOT NULL,
	game_id INTEGER REFERENCES games NOT NULL,
	image VARCHAR(255),
	notes VARCHAR(2048),
	date_played DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE stats (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users NOT NULL,
	instance_id INTEGER REFERENCES instances,
	victory BOOLEAN DEFAULT false NOT NULL,
	score VARCHAR(255) DEFAULT '0' 	
);