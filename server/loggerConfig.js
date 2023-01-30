var config = require('./src/app-config');
var loggerConfig = {
  settings: {
    ...config.logger

  },
  fields: [
  "timestamp", 
  "level", 
  {"applicationName": "App-Shell"},
  "applicationAddress",
  "instanceID",
  "tenantId", 
  "sourceAddress",
  "userid",
  "traceid",
  "message",
  "codeLocation",
  "interactionid",
  "stack"
 
        ],
        auditFields: [
          "timestamp",
          "response",
          "event-type",
          "event-category",
          "event-subtype",
          { "application-name": "App Shell" },
          { "application-address": process.env.POD_IP || "NA" },
          { "instance-id": process.env.INSTANCE_ID || "NA" },
          "source-address",
          "tenant-id",
          "source-user-or-service-id",
          "interaction-or-request-id",
          "message"
        ]

};

exports.default = loggerConfig;
