import Amplify from "aws-amplify";
import config from './aws-exports'
Amplify.configure(config);
// Amplify.configure({
//     ...config,
//     ssr: true
// }) //ssr aware