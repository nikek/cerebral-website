---
title: Connect
---

## Connect

### Choosing a view
Cerebral theoretically can use any view layer. Currently it officially supports [React](https://facebook.github.io/react/) and [Inferno](http://infernojs.org/). From a Cerebral perspective they have the exact same API, you just have to choose to import from **cerebral/react** or **cerebral/inferno**. For specific API differences please check their documentation.

Choose React if you want a huge ecosystem of shared components and documentation. Inferno is faster than React and is recommended to be used when you do not depend heavily on 3rd party components.

### Connecting the controller
```js
import React from 'react'
import {render} from 'react-dom'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/react'
import App from './components/App'

const controller = Controller()

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'))
```

### Exposing state
```js
import React from 'react'
import {connect} from 'cerebral/react'

export default connect({
  isLoading: 'app.isLoading'
},
  function App(props) {
    props.isLoading
  }
)
```

Expose state based on props passed to component:

```js
import React from 'react'
import {connect} from 'cerebral/react'

export default connect((props) => ({
  isLoading: `${props.module}.isLoading`
}),
  function App(props) {
    props.isLoading
  }
)
```

### Exposing signals
```js
import React from 'react'
import {connect} from 'cerebral/react'

export default connect({
  // State deps
}, {
  clicked: 'app.somethingClicked'
},
  function App(props) {
    props.clicked
  }
)
```

Expose signals based on props passed to component:

```js
import React from 'react'
import {connect} from 'cerebral/react'

export default connect({
  // State deps
}, (props) => ({
  clicked: `${props.module}.somethingClicked`
}),
  function App(props) {
    props.clicked
  }
)
```

### Strict rendering
Due to Cerebral's "render on path change" feature, it is possible to optimize component rendering with the `strictRender` option.

```js
import React from 'react'
import {render} from 'react-dom'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/react'
import App from './components/App'

const controller = Controller({
  strictRender: true
})

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'))
```

Now the components will only render when the exact state path defined changes:

```js
import React from 'react'
import {connect} from 'cerebral/react'

export default connect({
  isLoading: 'app.isLoading'
},
  function App(props) {
    props.isLoading
  }
)
```

This component will only render when exactly **app.isLoading** changes. It will not change if there is a change to paths **app** or **app.isLoading.foo**.

When in **strict mode** you can specify children path interest. For example, a component showing a list needs to rerender when some nested path has a change. We set this by adding `.**` to the path:

```js
import React from 'react'
import {connect} from 'cerebral/react'

export default connect({
  list: 'app.list.**'
},
  function App(props) {
    props.list
  }
)
```

Or sometimes the component is only interested in the immediate children paths. For example when you base your list on a map (object), you only want to rerender when keys are added/removed from the map:

```js
import React from 'react'
import {connect} from 'cerebral/react'

export default connect({
  users: 'app.users.*'
},
  function App(props) {
    Object.keys(props.users)
  }
)
```

This render mode has a great performance improvement on your app. It is recommended to use it from the start if you are building a large application. The only **gotcha** with this approach is related to how you change parent paths.

Lets say you point to path **app.isLoading** in a component. If you change out **app** path, the component will not render. Though if you did a *merge* it would work. This is rarely an issue, but good to know.
