MERN CRUD youtube clone implemented by Hungi Kim

Library / Skills used:
React.js, Node.js, Express.js, MongoDB, jwt, bcrypt, Redux, Redux-Toolkit, styled-components, css modules, react-router-dom ...

Functionality supported:
Sign up, log in, log out, post video, edit video, delete video, user page, pop-up menu bar,
video description, views, ...
click anywhere outside pop-up menu to close the menu, ...

Reason for using redux:
    Automatically re-renders all components that use a state when that state changes which is convenient. Otherwise (e.g. with localStroage only) will have to update all the components that make use of that state manually.
    e.g. useOutsideCloser doesn't work if the menuVisible state is only inside a component because it doesn't cause re-render automatically.
    