import bodyParser   from 'body-parser';
import express      from 'express';
import path         from 'path';
import db           from './models';
import faker        from "faker";
import times        from "lodash.times";
import random       from "lodash.random";

import apiAuthor    from './api/author';
import apiPost      from './api/post';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'front-end/build')));

apiPost(app, db);
apiAuthor(app, db);

db.sequelize.sync().then(() => {
    // 더미 데이터 생성
    db.author.bulkCreate(
        times(10, () => ({
            firstName: faker.name.firstName(),
            lastName : faker.name.lastName()
        }))
    );
    // 더미 데이터 생성
    db.post.bulkCreate(
        times(10, () => ({
            title: faker.lorem.sentence(),
            firstName: faker.lorem.paragraph(),
            authorId: random(1, 10)
        }))
    );
    app.listen(port, () => console.log('Express.js is listening on port' + port));
})