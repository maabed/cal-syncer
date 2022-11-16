import S from 'fluent-json-schema';

// function strictSchema() {
//   return S.object().additionalProperties(false);
// }

const user = S.object()
  .prop('id', S.string())
  .prop('name', S.string())
  .prop('email', S.string().format(S.FORMATS.EMAIL))
  .prop('image', S.string())
  .prop('accessToken', S.string())
  .prop('refreshToken', S.string())
  .prop('idToken', S.string());

export default {
  syncUser: {
    body: user,
    response: {
      200: user,
    },
  },
};
