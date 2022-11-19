import { setupWorker } from 'msw';

import { handlers } from './handlers';

export default worker = setupWorker(...handlers);

// Example: How to use the worker in a test
// Initialize the msw worker, wait for the service worker registration to resolve, then mount
// worker
//   .start({ quiet: true })
//   .then(() => {
//     const rootNode = ReactDOM.createRoot(
//       document.getElementById('root') as HTMLElement
//     )

//     return rootNode.render(
//       <React.StrictMode>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </React.StrictMode>
//     )
//   })
//   .catch(console.error)
