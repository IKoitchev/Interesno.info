import pinoLogger from 'pino';
import dayjs from 'dayjs';

const logger = pinoLogger({
  base: { pid: false },
  timestamp: () => `, "time":" ${dayjs().format('YYYY-MM-DD - HH:mm:ss')} "`,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export default logger;
