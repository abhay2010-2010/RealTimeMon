const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
      new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });