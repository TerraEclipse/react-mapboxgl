@react-mapboxgl Modules
-----------------------

The @react-mapboxgl project is split into several npm modules:

- `core` provides the components and utilities required to
  render maps. Almost anything that that directly calls `mapbox-gl-js`
  methods will be found here.
- Modules like `click`, `hover`, `toggle`, etc. provide higher-level
  abstractions around common map functionality or behaviors. These will
  typically rely on lower-level components from core such as `MapEvent`, but
  wrap them in a more declarative API or provide user-facing enhancements.
- Modules like `button-layer` wrap many core components to provide convenient
  ways to accomplish more complex map/layer UI or behavior.
- `docs` provides helper components and utilities strictly used in the storybook
  entries.

Each of these modules are installed as dependencies in your projects like:

```
$ npm install --save @react-mapboxgl/core @react-mapboxgl/click
```
