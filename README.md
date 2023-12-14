# Twitter Backend App

Created a simple twitter backend app.
Used Nodejs, express and mysql for development.

## Table of Contents

- [Features](#features)
- [Hosting](#hosting)
- [Installation](#installation)
- [Database Schema](#DatabaseSchema)


## Features

1. **Signup/Login:** Allow users to create accounts and log in.

2. **Post Message:** Users can post messages or content.

3. **Follow User:** Implement a feature to follow other users.

4. **Get My Feed:** Users can retrieve a personalized feed based on their preferences and the users they follow.

5. **Unfollow User:** Allow users to stop following other users.

## hosting

The app is hosted at https://omni-app2.onrender.com/

The postman collection can be accessed using link: [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/10361154-01805a0f-7eb2-42a9-924a-008e85e05a72?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10361154-01805a0f-7eb2-42a9-924a-008e85e05a72%26entityType%3Dcollection%26workspaceId%3D906f7904-72c7-4864-924a-3a4f7019c9a2#?env%5BOMNI%20TWITTER%20LIVE%20ENV%5D=W3sia2V5IjoiYXBpIiwidmFsdWUiOiJodHRwczovL29tbmktYXBwMi5vbnJlbmRlci5jb20iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imh0dHBzOi8vb21uaS1hcHAyLm9ucmVuZGVyLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZNeXdpYm1GdFpWOXBaQ0k2SW5OelpETTBJaXdpYVdGMElqb3hOekF5TlRZNU1UTTJMQ0psZUhBaU9qRTNNREkxTnpJM016WjkuOUtuYTI3c2k2ZWlvNmtUa3ZxUy4uLiIsInNlc3Npb25JbmRleCI6MX1d)

## Installation

Follow these steps to set up the Omni App on your local machine:

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/omni-app.git](https://github.com/borkarsaish65/omni-app.git)
    ```

2. **Navigate to the project directory:**

    ```bash
    cd omni-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file:**

   Create a new file named `.env` in the root of the project.

5. **Add credentials to the `.env` file:**

   Open the `.env` file and add the following, replacing the placeholders with your actual credentials:

    ```env
    DB_HOST=your-mysql-host
    DB_USER=your-mysql-user
    DB_PASSWORD=your-mysql-password
    DB_DATABASE=your-mysql-database
    DB_PORT = 3306
    jwtSecret = secret
    ```

6. **Start the application:**

    ```bash
    npm start
    ```


## DatabaseSchema

To interact with the database in your library, users need to be aware of the underlying schema. Below is a description of the tables and their structures:


```sql

CREATE TABLE `followers` (
  `follower_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `follower_user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follower_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `content` varchar(280) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `user-posts_idx` (`user_id`),
  CONSTRAINT `user-posts` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;



```

Now, your Omni App should be up and running locally. Adjust the database credentials and any other specifics according to your project's requirements.


