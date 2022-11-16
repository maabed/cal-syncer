import S from 'fluent-json-schema';

function strictSchema() {
  return S.object().additionalProperties(false);
}


const attendees = strictSchema()
  .prop('email', S.string().format(S.FORMATS.EMAIL))
  .prop('status', S.string());


const meeting = strictSchema()
  .prop('id', S.string().format(S.FORMATS.UUID))
  .prop('createdBy', S.string().format(S.FORMATS.UUID))
  .prop('calId', S.string().format(S.FORMATS.UUID))
  .prop('title', S.string())
  .prop('start', S.string())
  .prop('end', S.string())
  .prop('duration', S.integer())
  .prop('alarm', S.boolean().default(true))
  .prop('url', S.string())
  .prop('attendees', S.anyOf([S.array().items(attendees), S.null()]));

const meetingParams = strictSchema()
  .prop('count', S.integer().default(1))
  .prop('totalCount', S.integer().default(5000))


const meetingQuery = strictSchema()
  .prop('count', S.integer().default(1))
  .prop('totalCount', S.integer().default(50));

const listMeetingsResult = strictSchema()
  .prop('meetings', S.array().items(meeting))
  .prop('count', S.integer())
  .prop('totalCount', S.integer())

export default {
  listMeetings: {
    params: meetingParams,
    querystring: meetingQuery,
    response: {
      200: listMeetingsResult,
    },
  },
};
