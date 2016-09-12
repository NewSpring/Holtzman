import { configure } from '@kadira/storybook';

const req = require.context('../imports/', true, /\.story.js$/);
configure(() => {
  req.keys().forEach(req)
}, module);
