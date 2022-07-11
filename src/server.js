require('dotenv').config();
const app = require('./app');
const logger = require('./config/logger');

const { PORT } = require('./config/enviromnent');

app.listen(PORT, () => {
  logger.info(
    `Server is runnig in: http://localhost:${PORT} | Ctrl+C to stop !!!`
  );
});
