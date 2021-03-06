import { Factory } from 'rosie';
import faker from 'faker';

const UserFactory = new Factory()
.attrs({
  id: faker.random.uuid,
  email: faker.internet.email,
  password: faker.internet.password,
  firstName: faker.name.firstName,
  lastName: faker.name.firstName,
  userName: faker.internet.userName,
  verified: faker.random.boolean,
  blocked: faker.random.boolean,
  imageUrl: faker.image.avatar,
  bio: faker.name.jobTitle,
  gender: 'M',
  twitterUrl: faker.random.word,
  facebookUrl: faker.random.word,
  emailNotification: faker.random.boolean,
  dateOfBirth: faker.date.recent,
  role: faker.name.title,
  createdAt: faker.date.recent,
  updatedAt: faker.date.recent
});

export default UserFactory;
