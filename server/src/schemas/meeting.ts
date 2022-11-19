import S from 'fluent-json-schema';

function strictSchema() {
  return S.object().additionalProperties(false);
}

const attendees = S.object().prop('email', S.string().format(S.FORMATS.EMAIL)).prop('responseStatus', S.string());

const dateTime = S.object().prop('dateTime', S.string()).prop('timeZone', S.string());

const meeting = strictSchema()
  .prop('id', S.string().format(S.FORMATS.UUID))
  .prop('summary', S.string())
  .prop('description', S.string())
  .prop('htmlLink', S.string())
  .prop('start', dateTime)
  .prop('end', dateTime)
  .prop('userId', S.string())
  .prop('url', S.string())
  .prop('status', S.string())
  .prop('attendees', S.anyOf([S.array().items(attendees), S.null()]))
  .prop('createdAt', S.string());

const meetingParams = strictSchema()
  .prop('count', S.integer().default(1))
  .prop('totalCount', S.integer().default(5000));

const meetingQuery = strictSchema().prop('count', S.integer().default(1)).prop('totalCount', S.integer().default(50));

const listMeetingsResult = strictSchema()
  .prop('meetings', S.array().items(meeting))
  .prop('count', S.integer())
  .prop('totalCount', S.integer());

export default {
  listMeetings: {
    params: meetingParams,
    querystring: meetingQuery,
    response: {
      200: listMeetingsResult,
    },
  },
};
