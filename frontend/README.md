# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Git Workflow

### GitHub Flow

![GitHub Flow Diagram](./src/assets/GithubFlow.png)

### Git Commands Reference

```bash
# Create and switch to a new branch
git branch <branch-name>
git checkout <branch-name>
# or use: git checkout -b <branch-name>

# Push branch to remote
git push -u origin <branch-name>

# Fetch updates from remote
git fetch

# Switch to development branch
git checkout development

# Check status of changes
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push
```

---

## React Learning Guide

### 1. React Core Concepts (Quick Review)

- **JSX**: Syntax extension for JavaScript
- **Components**: Functional and class components
- **Props & State**: Passing data and managing local state
- **Event Handling**: Handling user events

### 2. Intermediate React

#### Hooks

- `useState`, `useEffect`, `useContext`
- Custom hooks

#### Component Composition

- Children props
- Render props
- Higher-order components (HOC)

#### Context API

- Global state management without Redux

#### Forms

- Controlled vs uncontrolled components
- Form libraries: Formik, React Hook Form

#### Routing

- React Router (v6+)

#### Data Fetching

- Fetch API, Axios, SWR, React Query

### 3. Advanced React

#### Performance Optimization

- Memoization: `React.memo`, `useMemo`, `useCallback`
- Code splitting and lazy loading: `React.lazy`, `Suspense`
- Error Boundaries

#### Testing

- Unit testing with Jest and React Testing Library

#### TypeScript with React

- Optional but recommended

#### State Management

- Redux Toolkit
- Zustand
- Recoil
- Jotai
- MobX

#### Server-Side Rendering (SSR) & Static Site Generation (SSG)

- Next.js framework

#### Additional Topics

- Custom hooks & reusable components
- Accessibility (a11y)
- Animations: Framer Motion, React Spring

### 4. Best Practices & Patterns

- Folder structure and scalable architecture
- Prop drilling vs context vs state management
- Code splitting and lazy loading
- Environment variables and configuration

### 5. Ecosystem & Tooling

- **Linting**: ESLint
- **Formatting**: Prettier
- **DevTools**: React DevTools, Redux DevTools
- **Deployment**: Vercel, Netlify, AWS, etc.

### 6. Project Ideas for Practice

- Dashboard with authentication
- E-commerce frontend
- Blog with markdown support
- Real-time chat app (with WebSockets)
- Integration with REST APIs or GraphQL

---

## Contributing

Contributions are welcome! Please follow the Git workflow outlined above.

## License

This project is licensed under the MIT License.
