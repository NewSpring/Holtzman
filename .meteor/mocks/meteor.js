
exports.Meteor = {
  loginWithPassword: jest.fn(),
  loginWithFacebook: jest.fn(),
  methods: jest.fn(),
  call: jest.fn(),
  subscribe: jest.fn(),
  publish: jest.fn(),
  isServer: false,
  isCordova: false,
  settings: {
    public: {
      heighliner: "https://api.newspring.cc/graphql",
    },
  },
  wrapAsync: jest.fn(() => jest.fn(() => {})),
  Error: Error,
  userId: jest.fn(),
};
