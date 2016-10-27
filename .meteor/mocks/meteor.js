

exports.Meteor = {
  loginWithPassword: jest.fn(),
  loginWithFacebook: jest.fn(),
  methods: jest.fn(),
  call: jest.fn(),
  subscribe: jest.fn(),
  publish: jest.fn(),
  isServer: false,
  settings: {
    public: {
      heighliner: "/graphql",
    },
  }
};
