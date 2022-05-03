BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jesse', 'jessie@gmail.com', 5, '2018-01-01');
INSERT into login(hash, email) values ('$2a$10$YmvqZl.1YY2SSVy6B9ZuJ.oKld1ucsXC2a51rXS6jfS.lpeUrShla', 'jessie@gmail.com');

COMMIT;