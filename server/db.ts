import { Pool } from 'pg';
import sql from 'sql-template-strings';
import faker from 'faker';
import addMinutes from 'date-fns/addMinutes';
import {
  resetDb as envResetDb,
  postgresHost,
  postgresPort,
  postgresUser,
  postgresPassword,
  postgresDb,
  fakedDb,
} from './env';

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  picture: string;
  email: string;
  bio: string;
  followers: number;
  following: number;
};

export type Post = {
  id: string;
  title: string;
  picture: string;
  description: string;
  content: string;
  created_at: Date;
  likes: number;
  user_id: string;
};

export type Message = {
  id: string;
  content: string;
  created_at: Date;
  chat_id: string;
  sender_user_id: string;
};

export type Chat = {
  id: string;
};

export const dbConfig = {
  host: postgresHost,
  port: postgresPort,
  user: postgresUser,
  password: postgresPassword,
  database: postgresDb,
};

export let pool: Pool = new Pool(dbConfig);

export async function initDb(): Promise<void> {
  console.log('initDB');

  // Clear tables
  await pool.query(sql`DROP TABLE IF EXISTS users;`);
  await pool.query(sql`DROP TABLE IF EXISTS posts_users;`);
  await pool.query(sql`DROP TABLE IF EXISTS posts;`);

  await pool.query(sql`DROP TABLE IF EXISTS messages;`);
  await pool.query(sql`DROP TABLE IF EXISTS chats_users;`);
  await pool.query(sql`DROP TABLE IF EXISTS chats;`);

  // Create tables
  await pool.query(sql`CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    bio VARCHAR (255) NOT NULL,
    followers INTEGER NOT NULL,
    following INTEGER NOT NULL,
    picture VARCHAR (255) NOT NULL
  );`);

  await pool.query(sql`CREATE TABLE posts(
    id SERIAL PRIMARY KEY
    title VARCHAR (255) NOT NULL,
    picture VARCHAR (255) NOT NULL,
    description VARCHAR (255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    likes INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );`);

  await pool.query(sql`CREATE TABLE posts_users(
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );`);

  await pool.query(sql`CREATE TABLE posts_liked_users(
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );`);

  await pool.query(sql`CREATE TABLE chats(
    id SERIAL PRIMARY KEY
  );`);
  await pool.query(sql`CREATE TABLE chats_users(
    chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );`);

  await pool.query(sql`CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    content VARCHAR (355) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    sender_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );`);

  // Privileges
  await pool.query(
    sql`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO testuser;`
  );
}

export const resetDb = async () => {
  await initDb();
  console.log(`Reseting database`);

  const sampleUsers = [
    {
      id: '1',
      name: 'Uri Goldshtein',
      username: 'uri',
      password: '$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm', // 111
      email: 'uri@uri.com',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      followers: 35,
      following: 33,
      picture: 'https://robohash.org/uri?set=set5',
    },
    {
      id: '2',
      name: 'Ethan Gonzalez',
      username: 'ethan',
      password: '$2a$08$xE4FuCi/ifxjL2S8CzKAmuKLwv18ktksSN.F3XYEnpmcKtpbpeZgO', // 222
      email: 'ethan@ethan.com',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      followers: 2,
      following: 21,
      picture: 'https://robohash.org/ethan?set=set5',
    },
    {
      id: '3',
      name: 'Bryan Wallace',
      username: 'bryan',
      password: '$2a$08$UHgH7J8G6z1mGQn2qx2kdeWv0jvgHItyAsL9hpEUI3KJmhVW5Q1d.', // 333
      email: 'bryan@bryan.com',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      followers: 3,
      following: 31,
      picture: 'https://robohash.org/bryan?set=set5',
    },
    {
      id: '4',
      name: 'Avery Stewart',
      username: 'avery',
      password: '$2a$08$wR1k5Q3T9FC7fUgB7Gdb9Os/GV7dGBBf4PLlWT7HERMFhmFDt47xi', // 444
      email: 'avery@avery.com',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      followers: 4,
      following: 41,
      picture: 'https://robohash.org/avery?set=set5',
    },
    {
      id: '5',
      name: 'Katie Peterson',
      username: 'katie',
      password: '$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242', // 555
      email: 'katie@katie.com',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      followers: 5,
      following: 51,
      picture: 'https://robohash.org/katie?set=set5',
    },
  ];

  for (const sampleUser of sampleUsers) {
    await pool.query(sql`
      INSERT INTO users(id, name, username, password, email, bio, followers, following, picture)
      VALUES(${sampleUser.id}, ${sampleUser.name}, ${sampleUser.username}, ${sampleUser.password}, ${sampleUser.email},
             ${sampleUser.bio}, ${sampleUser.followers}, ${sampleUser.following}, ${sampleUser.picture})`);
  }

  await pool.query(
    sql`SELECT setval('users_id_seq', (SELECT max(id) FROM users))`
  );

  const samplePosts = [
    {
      id: '1',
      title: 'React is the best',
      picture: 'https://source.unsplash.com/1600x900/?react',
      description:
        'Lorem ipsum dolor sit ameo eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maecenas sed enim ut sem. In tellus integer feugiat scelerisque. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Neque volutpat ac tincidunt vitae. Non tellus orci ac auctor augue mauris augue neque gravida. Viverra nibh cras pulvinar mattis nunc. Lacus viverra vitae congue eu. Diam donec adipiscing tristique risus nec feugiat. Vitae sapien pellentesque habitant mo id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
      created_at: new Date(new Date().getTime() - 60 * 1000 * 1000),
      likes: 10,
      user_id: '1',
    },
    {
      id: '2',
      title: 'GraphQL is the best',
      picture: 'https://source.unsplash.com/1600x900/?graphql',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maecenas sed enim ut sem. In tellus integer feugiat scelerisque. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Neque volutpat ac tincidunt vitae. Non tellus orci ac auctor augue mauris augue neque gravida. Viverra nibh cras pulvinar mattis nunc. Lacus viverra vitae congue eu. Diam donec adipiscing tristique risus nec feugiat. Vitae sapien pellentesque habitant morbi tristique. Magna sit amet purus gravida quis blandit. Aliquam sem fringilla ut morbi tincidunt augue. Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor. Risus ultricies tristique nulla aliquet enim. Ornare aenean euismod elementum nisi quis. Auctor urna nunc id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
      created_at: new Date(new Date().getTime() - 2 * 60 * 1000 * 1000),
      likes: 5,
      user_id: '1',
    },
    {
      id: '3',
      title: 'Typescript is the best',
      picture: 'https://source.unsplash.com/1600x900/?typescript',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maecenas sed enim ut sem. In tellus integer feugiat scelerisque. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Neque volutpat ac tincidunt vitae. Non tellus orci ac auctor augue mauris augue neque gravida. Viverra nibh cras pulvinar mattis nunc. Lacus viverra vitae congue eu. Diam donec adipiscing tristique risus nec feugiat. Vitae sapien pellentesque habitant morbi tristique. Magna sit amet purus gravida quis blandit. Aliquam sem fringilla ut morbi tincidunt augue. Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor. Risus ultricies tristique nulla aliquet enim. Ornare aenean euismod elementum nisi quis. Auctor urna nunc id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
      created_at: new Date(new Date().getTime() - 4 * 60 * 1000 * 1000),
      likes: 7,
      user_id: '2',
    },
    {
      id: '4',
      title: 'Alicante is the best',
      picture: 'https://source.unsplash.com/1600x900/?alicante',
      description:
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maece',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maecenas sed enim ut sem. In tellus integer feugiat scelerisque. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat orci nique. Magna sit amet purus gravida quis blandit. Aliquam sem fringilla ut morbi tincidunt augue. Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor. Risus ultricies tristique nulla aliquet enim. Ornare aenean euismod elementum nisi quis. Auctor urna nunc id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
      created_at: new Date(new Date().getTime() - 5 * 60 * 1000 * 1000),
      likes: 20,
      user_id: '3',
    },
    {
      id: '5',
      title: 'Madrid is the best',
      picture: 'https://source.unsplash.com/1600x900/?madrid',
      description:
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maece',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maecenas sed enim ut sem. In tellus integer feugiat scelerisque. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat orci nique. Magna sit amet purus gravida quis blandit. Aliquam sem fringilla ut morbi tincidunt augue. Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor. Risus ultricies tristique nulla aliquet enim. Ornare aenean euismod elementum nisi quis. Auctor urna nunc id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
      created_at: new Date(new Date().getTime() - 6 * 60 * 1000 * 1000),
      likes: 30,
      user_id: '4',
    },
    {
      id: '6',
      title: 'Fruit is the best',
      picture: 'https://source.unsplash.com/1600x900/?fruit',
      description:
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maece',
      content:
        'Lorem ipsum doloPlacerat orci nique. Magna sit amet purus gravida quis blandit. Aliquam sem fringilla ut morbi tincidunt augue. Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor. Risus ultricies tristique nulla aliquet enim. Ornare aenean euismod elementum nisi quis. Auctor urna nunc id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
      created_at: new Date(new Date().getTime() - 3 * 60 * 1000 * 1000),
      likes: 30,
      user_id: '5',
    },
  ];

  for (const samplePost of samplePosts) {
    await pool.query(sql`
      INSERT INTO users(id, name, username, password, email, bio, followers, following, picture)
      VALUES(${sampleUser.id}, ${sampleUser.name}, ${sampleUser.username}, ${sampleUser.password}, ${sampleUser.email},
             ${sampleUser.bio}, ${sampleUser.followers}, ${sampleUser.following}, ${sampleUser.picture})`);
  }

  await pool.query(sql`DELETE FROM chats`);

  const sampleChats = [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
  ];

  for (const sampleChat of sampleChats) {
    await pool.query(sql`
      INSERT INTO chats(id)
      VALUES(${sampleChat.id})
    `);
  }

  await pool.query(
    sql`SELECT setval('chats_id_seq', (SELECT max(id) FROM chats))`
  );

  await pool.query(sql`DELETE FROM chats_users`);

  const sampleChatsUsers = [
    {
      chat_id: '1',
      user_id: '1',
    },
    {
      chat_id: '1',
      user_id: '2',
    },
    {
      chat_id: '2',
      user_id: '1',
    },
    {
      chat_id: '2',
      user_id: '3',
    },
    {
      chat_id: '3',
      user_id: '1',
    },
    {
      chat_id: '3',
      user_id: '4',
    },
    {
      chat_id: '4',
      user_id: '1',
    },
    {
      chat_id: '4',
      user_id: '5',
    },
  ];

  for (const sampleChatUser of sampleChatsUsers) {
    await pool.query(sql`
      INSERT INTO chats_users(chat_id, user_id)
      VALUES(${sampleChatUser.chat_id}, ${sampleChatUser.user_id})
    `);
  }

  await pool.query(sql`DELETE FROM messages`);

  const baseTime = new Date('1 Jan 2019 GMT').getTime();

  const sampleMessages = [
    {
      id: '1',
      content: 'You on your way?',
      created_at: new Date(baseTime - 60 * 1000 * 1000),
      chat_id: '1',
      sender_user_id: '1',
    },
    {
      id: '2',
      content: "Hey, it's me",
      created_at: new Date(baseTime - 2 * 60 * 1000 * 1000),
      chat_id: '2',
      sender_user_id: '1',
    },
    {
      id: '3',
      content: 'I should buy a boat',
      created_at: new Date(baseTime - 24 * 60 * 1000 * 1000),
      chat_id: '3',
      sender_user_id: '1',
    },
    {
      id: '4',
      content: 'This is wicked good ice cream.',
      created_at: new Date(baseTime - 14 * 24 * 60 * 1000 * 1000),
      chat_id: '4',
      sender_user_id: '1',
    },
  ];

  if (fakedDb) {
    addFakedMessages(sampleMessages, fakedDb);
  }

  for (const sampleMessage of sampleMessages) {
    await pool.query(sql`
      INSERT INTO messages(id, content, created_at, chat_id, sender_user_id)
      VALUES(${sampleMessage.id}, ${sampleMessage.content}, ${sampleMessage.created_at}, ${sampleMessage.chat_id}, ${sampleMessage.sender_user_id})
    `);
  }

  await pool.query(
    sql`SELECT setval('messages_id_seq', (SELECT max(id) FROM messages))`
  );
};

function addFakedMessages(messages: Message[], count: number) {
  const message = messages[0];
  const date = message.created_at;
  const id = messages.length + 1;

  new Array(count).fill(0).forEach((_, i) => {
    messages.push({
      ...message,
      id: `${id + i}`,
      content: faker.lorem.sentence(4),
      created_at: addMinutes(date, i + 1),
    });
  });
}

// if (envResetDb) {
//   resetDb();
// }
